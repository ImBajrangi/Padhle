import { useEffect, useRef } from 'react';
import PDFPage from './PDFPage';

export default function PDFCanvas({
    pdfDoc, scale, rotation, renderPageToElements, searchText, goToPage, totalPages, pdfLoaded, isFocusMode, pageNum
}) {
    const containerRef = useRef(null);
    const lastTargetPageRef = useRef(pageNum);

    // Scroll to page when pageNum changes from external controls (toolbar/sidebar)
    useEffect(() => {
        if (!containerRef.current) return;
        
        // Only scroll if pageNum is different from the page that was scrolled to
        if (pageNum !== lastTargetPageRef.current) {
            const pageElement = containerRef.current.querySelector(`[data-page-number="${pageNum}"]`);
            if (pageElement) {
                pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                lastTargetPageRef.current = pageNum;
            }
        }
    }, [pageNum]);

    if (!pdfLoaded || !pdfDoc) return null;

    const handlePageVisible = (num) => {
        lastTargetPageRef.current = num;
        goToPage(num);
    };

    return (
        <div ref={containerRef} className={`pdf-container continuous-scroll ${isFocusMode ? 'focus-mode' : ''}`}>
            {Array.from({ length: totalPages }, (_, i) => (
                <PDFPage
                    key={i + 1}
                    pageNum={i + 1}
                    scale={scale}
                    rotation={rotation}
                    renderPageToElements={renderPageToElements}
                    searchText={searchText}
                    onVisible={() => handlePageVisible(i + 1)}
                />
            ))}
        </div>
    );
}
