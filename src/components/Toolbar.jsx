import { useState, useEffect } from 'react';

export default function Toolbar({
    scale, pageNum, totalPages,
    zoomIn, zoomOut, setScale, fitToWidth, fitToPage, goToPage,
    prevPage, nextPage, rotate, toggleFullscreen, downloadPDF, printPDF, pdfLoaded,
    isFocusMode, toggleFocusMode, isHandTool, toggleHandTool, searchText, handleSearch
}) {
    const [pageInput, setPageInput] = useState(pageNum);

    // Sync input when page changes externally
    useEffect(() => {
        setPageInput(pageNum);
    }, [pageNum]);

    if (!pdfLoaded) return null;

    const handlePageSubmit = (e) => {
        if (e.key === 'Enter') {
            const page = parseInt(pageInput, 10);
            if (page >= 1 && page <= totalPages) {
                goToPage(page);
            } else {
                setPageInput(pageNum); // Revert
            }
        }
    };

    const handlePageBlur = () => {
        const page = parseInt(pageInput, 10);
        if (page >= 1 && page <= totalPages) {
            goToPage(page);
        } else {
            setPageInput(pageNum); // Revert
        }
    };

    const handleZoomSelect = (e) => {
        const val = e.target.value;
        if (val === 'width') {
            fitToWidth();
        } else if (val === 'page') {
            fitToPage();
        } else {
            setScale(parseFloat(val));
        }
    };

    return (
        <div className={`toolbar active ${isFocusMode ? 'focus-mode-active' : ''}`}>
            <div className="toolbar-section left">
                <div className="zoom-controls">
                    <button className="tool-btn mobile-hide" title="Zoom Out (−)" onClick={zoomOut} disabled={scale <= 0.5} aria-label="Zoom out">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                    </button>
                    
                    <div className="zoom-select-wrap">
                        <select 
                            className="zoom-select" 
                            value={['0.5', '0.75', '1.0', '1.25', '1.5', '2.0', '3.0'].includes(scale.toString()) ? scale.toString() : 'custom'} 
                            onChange={handleZoomSelect}
                        >
                            <option value="width">Fit to Width</option>
                            <option value="page">Fit to Page</option>
                            <option value="0.5">50%</option>
                            <option value="0.75">75%</option>
                            <option value="1.0">100%</option>
                            <option value="1.25">125%</option>
                            <option value="1.5">150%</option>
                            <option value="2.0">200%</option>
                            <option value="3.0">300%</option>
                            {!['0.5', '0.75', '1.0', '1.25', '1.5', '2.0', '3.0'].includes(scale.toString()) && (
                                <option value="custom">{Math.round(scale * 100)}%</option>
                            )}
                        </select>
                    </div>

                    <button className="tool-btn mobile-hide" title="Zoom In (+)" onClick={zoomIn} disabled={scale >= 3.0} aria-label="Zoom in">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                    </button>
                </div>

                <div className="search-box mobile-hide">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="toolbar-section center">
                <div className="page-controls">
                    <button className="tool-btn" title="Previous (←)" onClick={prevPage} disabled={pageNum <= 1} aria-label="Previous page">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    
                    <div className="page-input-wrap">
                        <input
                            type="text"
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            onKeyDown={handlePageSubmit}
                            onBlur={handlePageBlur}
                            className="page-input"
                            aria-label="Current Page"
                        />
                        <span className="page-total">/ {totalPages}</span>
                    </div>

                    <button className="tool-btn" title="Next (→)" onClick={nextPage} disabled={pageNum >= totalPages} aria-label="Next page">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>
            </div>

            <div className="toolbar-section right mobile-hide">
                <div className="view-controls">
                    <button 
                        className={`tool-btn mobile-hide ${!isHandTool ? 'active' : ''}`} 
                        title="Select Text Tool" 
                        onClick={() => isHandTool && toggleHandTool()}
                        aria-label="Select Text Tool"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" /></svg>
                    </button>
                    <button 
                        className={`tool-btn mobile-hide ${isHandTool ? 'active' : ''}`} 
                        title="Pan Hand Tool" 
                        onClick={() => !isHandTool && toggleHandTool()}
                        aria-label="Pan Hand Tool"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v5" /><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6" /><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8.5" /><path d="M6 14V8a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7.5" /><path d="M2 13a4 4 0 0 0 4 4h1.5A5.5 5.5 0 0 0 13 11.5" /></svg>
                    </button>
                    <div className="divider" style={{ height: '16px', margin: '0 4px', width: '1px', background: 'var(--border)' }} />
                    <button className={`tool-btn ${isFocusMode ? 'active' : ''}`} title="Focus Mode (Z)" onClick={toggleFocusMode} aria-label="Focus mode">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    <button className="tool-btn" title="Rotate" onClick={rotate} aria-label="Rotate">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                    </button>
                    <button className="tool-btn" title="Fullscreen (F)" onClick={toggleFullscreen} aria-label="Fullscreen">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
                    </button>
                    <button className="tool-btn" title="Download" onClick={downloadPDF} aria-label="Download PDF">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </button>
                    <button className="tool-btn mobile-hide" title="Print" onClick={printPDF} aria-label="Print PDF">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
