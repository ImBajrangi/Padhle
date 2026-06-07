import { useState, useRef, useCallback, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export default function usePdfViewer() {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
    const getInitialScale = () => {
        const width = window.innerWidth;
        if (width < 480) return 0.55;
        if (width < 768) return 0.75;
        if (width < 1024) return 0.9;
        return 1.0;
    };
    
    const [scale, setScale] = useState(getInitialScale());
    const [rotation, setRotation] = useState(0);
    const [fileName, setFileName] = useState('No file selected');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchIndices, setSearchIndices] = useState([]); // Array of { pageNum, text }
    const [outline, setOutline] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isHandTool, setIsHandTool] = useState(false);

    const renderCacheRef = useRef(new Map());
    const gestureRef = useRef(null);
    const touchStateRef = useRef({
        startX: 0,
        startY: 0,
        initialDist: 0,
        initialScale: 1
    });

    // Render a page on a specific canvas and textLayer elements
    const renderPageToElements = useCallback(async (num, canvas, textLayer) => {
        if (!pdfDoc || !canvas) return;

        try {
            const page = await pdfDoc.getPage(num);
            const dpr = window.devicePixelRatio || 1;
            const viewport = page.getViewport({ scale, rotation });

            const ctx = canvas.getContext('2d');

            // Set display size (css pixels)
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;

            // Set actual size in memory (scaled to dpr)
            canvas.width = viewport.width * dpr;
            canvas.height = viewport.height * dpr;

            // Scale context to match dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Check cache first
            const cacheKey = `${num}_${scale}_${rotation}`;
            if (renderCacheRef.current.has(cacheKey)) {
                const cached = renderCacheRef.current.get(cacheKey);
                if (cached instanceof ImageBitmap) {
                    ctx.drawImage(cached, 0, 0, viewport.width, viewport.height);
                } else {
                    const img = new Image();
                    img.src = cached;
                    await new Promise((resolve) => {
                        img.onload = () => {
                            ctx.drawImage(img, 0, 0, viewport.width, viewport.height);
                            resolve();
                        };
                        img.onerror = resolve;
                    });
                }
            } else {
                await page.render({
                    canvasContext: ctx,
                    viewport: viewport
                }).promise;

                // Cache the rendered page
                try {
                    if ('createImageBitmap' in window) {
                        const bitmap = await createImageBitmap(canvas);
                        renderCacheRef.current.set(cacheKey, bitmap);
                    } else {
                        renderCacheRef.current.set(cacheKey, canvas.toDataURL());
                    }
                } catch (cacheErr) {
                    console.warn("Failed to cache page:", cacheErr);
                }
            }

            // Render text layer after canvas is done
            if (textLayer) {
                textLayer.innerHTML = '';
                textLayer.style.height = `${viewport.height}px`;
                textLayer.style.width = `${viewport.width}px`;

                const textContent = await page.getTextContent();
                const fragment = document.createDocumentFragment();

                textContent.items.forEach(item => {
                    const span = document.createElement('span');
                    const tx = pdfjsLib.Util.transform(
                        viewport.transform,
                        item.transform
                    );

                    span.style.left = `${tx[4]}px`;
                    span.style.top = `${tx[5]}px`;
                    span.style.fontSize = `${item.height * viewport.scale}px`;
                    span.style.fontFamily = item.fontName;
                    span.textContent = item.str;

                    if (searchText && item.str && item.str.toLowerCase().includes(searchText.toLowerCase())) {
                        span.classList.add('search-match');
                    }

                    fragment.appendChild(span);
                });

                textLayer.appendChild(fragment);
            }
        } catch (err) {
            console.error("Error rendering page " + num + ":", err);
        }
    }, [pdfDoc, scale, rotation, searchText]);

    // Extract Outline
    const extractOutline = useCallback(async (doc) => {
        try {
            const outlineObj = await doc.getOutline();
            setOutline(outlineObj || []);
        } catch (err) {
            console.error("Error extracting outline:", err);
            setOutline([]);
        }
    }, []);

    // Helper to clear image cache
    const clearCache = useCallback(() => {
        if (renderCacheRef.current) {
            renderCacheRef.current.forEach(value => {
                if (value instanceof ImageBitmap) {
                    value.close();
                }
            });
            renderCacheRef.current.clear();
        }
    }, []);

    // Load PDF from Uint8Array or URL String
    const loadPDF = useCallback(async (src) => {
        setIsLoading(true);
        clearCache();
        try {
            const loadingTask = typeof src === 'string'
                ? pdfjsLib.getDocument({
                    url: src,
                    disableRange: false,
                    disableAutoFetch: false,
                    disableStream: false
                  })
                : pdfjsLib.getDocument({ data: src });
            const doc = await loadingTask.promise;
            setPdfDoc(doc);
            setTotalPages(doc.numPages);
            setPageNum(1);
            setPdfLoaded(true);
            setIsFocusMode(false);
            extractOutline(doc);
        } catch (err) {
            setError('Error loading PDF: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, [extractOutline, clearCache]);

    // Load PDF from file input
    const handleFileSelect = useCallback((file) => {
        if (!file || file.type !== 'application/pdf') {
            setError('Please select a valid PDF file.');
            return;
        }
        setSelectedFile(file);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const arr = new Uint8Array(e.target.result);
            loadPDF(arr);
        };
        reader.readAsArrayBuffer(file);
    }, [loadPDF]);

    // Load PDF from URL
    const loadFromUrl = useCallback(async (url, title) => {
        setIsLoading(true);
        if (title) setFileName(title);
        loadPDF(url);
    }, [loadPDF]);

    // Navigation
    const prevPage = useCallback(() => {
        if (pageNum > 1) setPageNum(p => p - 1);
    }, [pageNum]);

    const nextPage = useCallback(() => {
        if (pageNum < totalPages) setPageNum(p => p + 1);
    }, [pageNum, totalPages]);

    // Zoom
    const zoomIn = useCallback(() => {
        if (scale < 3.0) setScale(s => Math.round((s + 0.25) * 100) / 100);
    }, [scale]);

    const zoomOut = useCallback(() => {
        if (scale > 0.5) setScale(s => Math.round((s - 0.25) * 100) / 100);
    }, [scale]);

    // Fit to container width (Adobe style)
    const fitToWidth = useCallback(async (containerWidth) => {
        if (!pdfDoc || !containerWidth) return;
        try {
            const page = await pdfDoc.getPage(pageNum);
            const originalViewport = page.getViewport({ scale: 1, rotation });
            const newScale = containerWidth / originalViewport.width;
            setScale(Math.min(Math.max(Math.round(newScale * 100) / 100, 0.4), 4.0));
        } catch (err) {
            console.error("Error fitting to width:", err);
        }
    }, [pdfDoc, pageNum, rotation]);

    // Fit to container height and width (Adobe style)
    const fitToPage = useCallback(async (containerWidth, containerHeight) => {
        if (!pdfDoc || !containerWidth || !containerHeight) return;
        try {
            const page = await pdfDoc.getPage(pageNum);
            const originalViewport = page.getViewport({ scale: 1, rotation });
            const scaleWidth = containerWidth / originalViewport.width;
            const scaleHeight = containerHeight / originalViewport.height;
            const newScale = Math.min(scaleWidth, scaleHeight);
            setScale(Math.min(Math.max(Math.round(newScale * 100) / 100, 0.4), 4.0));
        } catch (err) {
            console.error("Error fitting to page:", err);
        }
    }, [pdfDoc, pageNum, rotation]);

    // Rotate
    const rotate = useCallback(() => {
        setRotation(r => (r + 90) % 360);
    }, []);

    // Theme
    const toggleTheme = useCallback(() => setIsDark(d => !d), []);

    // Sidebar
    const toggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);

    // Focus Mode
    const toggleFocusMode = useCallback(() => setIsFocusMode(f => !f), []);

    // Hand Tool
    const toggleHandTool = useCallback(() => setIsHandTool(h => !h), []);

    // Global Search
    const handleSearch = useCallback(async (text) => {
        setSearchText(text);
        if (!text || text.length < 2) {
            setSearchIndices([]);
            return;
        }

        if (!pdfDoc) return;

        const results = [];
        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            if (pageText.toLowerCase().includes(text.toLowerCase())) {
                results.push({
                    pageNum: i,
                    text: pageText.substring(0, 100) + '...'
                });
            }
        }
        setSearchIndices(results);
    }, [pdfDoc]);

    // Fullscreen
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    // Download
    const downloadPDF = useCallback(async () => {
        if (!pdfDoc) return;
        setIsLoading(true);
        try {
            const data = await pdfDoc.getData();
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName !== 'No file selected' ? fileName : 'document.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError('Error downloading PDF: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, [pdfDoc, fileName]);

    // Print
    const printPDF = useCallback(async () => {
        if (!pdfDoc) return;
        setIsLoading(true);
        try {
            const data = await pdfDoc.getData();
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            iframe.onload = () => {
                iframe.contentWindow.print();
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    URL.revokeObjectURL(url);
                }, 1000);
            };
        } catch (err) {
            setError('Error printing PDF: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, [pdfDoc]);

    // Clear error
    const clearError = useCallback(() => setError(null), []);

    // Go to specific page
    const goToPage = useCallback((num) => {
        if (num >= 1 && num <= totalPages) setPageNum(num);
    }, [totalPages]);

    // Automatically fit to width on mobile when PDF is loaded
    useEffect(() => {
        if (pdfLoaded && window.innerWidth < 768) {
            const timer = setTimeout(() => {
                const containerWidth = window.innerWidth - 16;
                fitToWidth(containerWidth);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [pdfLoaded, fitToWidth]);

    // Touch Gestures (Pinch to Zoom) on the wrapper container
    useEffect(() => {
        const target = gestureRef.current;
        if (!target) return;

        const getDist = (touch1, touch2) => {
            return Math.sqrt(
                Math.pow(touch1.clientX - touch2.clientX, 2) +
                Math.pow(touch1.clientY - touch2.clientY, 2)
            );
        };

        const handleTouchStart = (e) => {
            if (e.touches.length === 2) {
                touchStateRef.current.initialDist = getDist(e.touches[0], e.touches[1]);
                touchStateRef.current.initialScale = scale;
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dist = getDist(e.touches[0], e.touches[1]);
                const newScale = touchStateRef.current.initialScale * (dist / touchStateRef.current.initialDist);
                const clampedScale = Math.min(Math.max(newScale, 0.5), 3.0);
                setScale(Math.round(clampedScale * 100) / 100);
            }
        };

        target.addEventListener('touchstart', handleTouchStart, { passive: true });
        target.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            target.removeEventListener('touchstart', handleTouchStart);
            target.removeEventListener('touchmove', handleTouchMove);
        };
    }, [scale, pdfDoc]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            if (!pdfDoc) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case 'ArrowLeft': prevPage(); break;
                case 'ArrowRight': nextPage(); break;
                case '+': case '=': zoomIn(); break;
                case '-': zoomOut(); break;
                case 'f': case 'F': toggleFullscreen(); break;
                case 't': case 'T': toggleTheme(); break;
                case 'z': case 'Z': toggleFocusMode(); break;
                case 'h': case 'H': toggleHandTool(); break;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [pdfDoc, prevPage, nextPage, zoomIn, zoomOut, toggleFullscreen, toggleTheme, toggleFocusMode, toggleHandTool]);

    // Clean up cache on unmount
    useEffect(() => {
        const cache = renderCacheRef.current;
        return () => {
            if (cache) {
                cache.forEach(value => {
                    if (value instanceof ImageBitmap) {
                        value.close();
                    }
                });
                cache.clear();
            }
        };
    }, []);

    const setGestureRef = useCallback((el) => {
        gestureRef.current = el;
    }, []);

    return {
        // State
        pdfDoc, pageNum, totalPages, scale, rotation,
        fileName, isLoading, error, isDark, sidebarOpen, pdfLoaded,
        isFocusMode, searchText, searchIndices, outline, selectedFile,
        // Actions
        setGestureRef,
        handleFileSelect, loadFromUrl, prevPage, nextPage,
        zoomIn, zoomOut, setScale, fitToWidth, fitToPage, rotate, toggleTheme, toggleSidebar,
        toggleFocusMode, toggleHandTool, handleSearch,
        toggleFullscreen, downloadPDF, printPDF, clearError, goToPage,
        isHandTool,
        renderPageToElements
    };
}
