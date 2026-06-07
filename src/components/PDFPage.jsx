import { useEffect, useRef, useState } from 'react';

export default function PDFPage({
    pageNum, scale, rotation, renderPageToElements, searchText, onVisible
}) {
    const pageRef = useRef(null);
    const canvasRef = useRef(null);
    const textLayerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const isRenderedRef = useRef(false);

    // Setup IntersectionObserver to lazy load pages
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    onVisible();
                } else {
                    setIsVisible(false);
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the page is visible
            rootMargin: '100px 0px 100px 0px' // Preload slightly before scrolling into viewport
        });

        const pageEl = pageRef.current;
        if (pageEl) {
            observer.observe(pageEl);
        }

        return () => {
            if (pageEl) {
                observer.unobserve(pageEl);
            }
        };
    }, [onVisible]);

    // Handle render & cleanup based on visibility, scale, rotation, and searchText
    useEffect(() => {
        const canvas = canvasRef.current;
        const textLayer = textLayerRef.current;

        if (isVisible) {
            renderPageToElements(pageNum, canvas, textLayer);
            isRenderedRef.current = true;
        } else if (isRenderedRef.current && canvas) {
            // Cleanup canvas memory when scrolled out of view
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = 0;
            canvas.height = 0;
            canvas.style.width = '0px';
            canvas.style.height = '0px';
            if (textLayer) {
                textLayer.innerHTML = '';
                textLayer.style.width = '0px';
                textLayer.style.height = '0px';
            }
            isRenderedRef.current = false;
        }
    }, [isVisible, pageNum, scale, rotation, searchText, renderPageToElements]);

    return (
        <div ref={pageRef} className="pdf-page-container" data-page-number={pageNum}>
            <div className="pdf-wrapper">
                <canvas ref={canvasRef} className="pdf-canvas" />
                <div ref={textLayerRef} className="text-layer" />
            </div>
            <div className="pdf-page-label">Page {pageNum}</div>
        </div>
    );
}
