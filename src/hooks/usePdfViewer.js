import { useState, useRef, useCallback, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString();

export default function usePdfViewer() {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const [fileName, setFileName] = useState('No file selected');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pdfLoaded, setPdfLoaded] = useState(false);

    const pdfDataRef = useRef(null);
    const canvasRef = useRef(null);
    const renderingRef = useRef(false);
    const pendingRef = useRef(null);

    // Render a page on the canvas
    const renderPage = useCallback(async (num) => {
        if (!pdfDoc || !canvasRef.current) return;
        if (renderingRef.current) {
            pendingRef.current = num;
            return;
        }
        renderingRef.current = true;
        setIsLoading(true);

        try {
            const page = await pdfDoc.getPage(num);
            const viewport = page.getViewport({ scale, rotation });
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: ctx, viewport }).promise;
        } catch (err) {
            setError('Error rendering page: ' + err.message);
        } finally {
            renderingRef.current = false;
            setIsLoading(false);

            if (pendingRef.current !== null) {
                const next = pendingRef.current;
                pendingRef.current = null;
                renderPage(next);
            }
        }
    }, [pdfDoc, scale, rotation]);

    // Load PDF from Uint8Array
    const loadPDF = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const doc = await pdfjsLib.getDocument({ data }).promise;
            setPdfDoc(doc);
            setTotalPages(doc.numPages);
            setPageNum(1);
            setPdfLoaded(true);
        } catch (err) {
            setError('Error loading PDF: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load PDF from file input
    const handleFileSelect = useCallback((file) => {
        if (!file || file.type !== 'application/pdf') {
            setError('Please select a valid PDF file.');
            return;
        }
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const arr = new Uint8Array(e.target.result);
            pdfDataRef.current = arr;
            loadPDF(arr);
        };
        reader.readAsArrayBuffer(file);
    }, [loadPDF]);

    // Load PDF from URL
    const loadFromUrl = useCallback(async (url, title) => {
        setIsLoading(true);
        if (title) setFileName(title);
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const buf = await res.arrayBuffer();
            const arr = new Uint8Array(buf);
            pdfDataRef.current = arr;
            loadPDF(arr);
        } catch (err) {
            setError('Error loading PDF: ' + err.message);
            setIsLoading(false);
        }
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

    // Rotate
    const rotate = useCallback(() => {
        setRotation(r => (r + 90) % 360);
    }, []);

    // Theme
    const toggleTheme = useCallback(() => setIsDark(d => !d), []);

    // Sidebar
    const toggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);

    // Fullscreen
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    // Download
    const downloadPDF = useCallback(() => {
        if (!pdfDataRef.current) return;
        const blob = new Blob([pdfDataRef.current], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName !== 'No file selected' ? fileName : 'document.pdf';
        a.click();
        URL.revokeObjectURL(url);
    }, [fileName]);

    // Print
    const printPDF = useCallback(() => {
        if (!pdfDataRef.current) return;
        const blob = new Blob([pdfDataRef.current], { type: 'application/pdf' });
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
    }, []);

    // Clear error
    const clearError = useCallback(() => setError(null), []);

    // Go to specific page
    const goToPage = useCallback((num) => {
        if (num >= 1 && num <= totalPages) setPageNum(num);
    }, [totalPages]);

    // Re-render when page/scale/rotation changes
    useEffect(() => {
        if (pdfDoc) renderPage(pageNum);
    }, [pageNum, pdfDoc, scale, rotation, renderPage]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            if (!pdfDoc) return;
            switch (e.key) {
                case 'ArrowLeft': prevPage(); break;
                case 'ArrowRight': nextPage(); break;
                case '+': case '=': zoomIn(); break;
                case '-': zoomOut(); break;
                case 'f': case 'F': toggleFullscreen(); break;
                case 't': case 'T': toggleTheme(); break;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [pdfDoc, prevPage, nextPage, zoomIn, zoomOut, toggleFullscreen, toggleTheme]);

    return {
        // State
        pdfDoc, pageNum, totalPages, scale, rotation,
        fileName, isLoading, error, isDark, sidebarOpen, pdfLoaded,
        canvasRef,
        // Actions
        handleFileSelect, loadFromUrl, prevPage, nextPage,
        zoomIn, zoomOut, rotate, toggleTheme, toggleSidebar,
        toggleFullscreen, downloadPDF, printPDF, clearError, goToPage,
    };
}
