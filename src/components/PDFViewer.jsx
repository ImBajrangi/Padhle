import { useEffect, useRef } from 'react';
import usePdfViewer from '../hooks/usePdfViewer';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import PDFCanvas from './PDFCanvas';
import Loader from './Loader';
import ErrorModal from './ErrorModal';

export default function PDFViewer({ file, onClose }) {
    const viewer = usePdfViewer();
    const wrapperRef = useRef(null);

    // Grab and drag scroll logic for Adobe Hand Tool
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper || !viewer.isHandTool) return;

        let isDown = false;
        let startX, startY;
        let scrollLeft, scrollTop;

        const handleMouseDown = (e) => {
            // Only left click drags
            if (e.button !== 0) return;
            isDown = true;
            wrapper.classList.add('grabbing');
            startX = e.pageX - wrapper.offsetLeft;
            startY = e.pageY - wrapper.offsetTop;
            scrollLeft = wrapper.scrollLeft;
            scrollTop = wrapper.scrollTop;
        };

        const handleMouseLeave = () => {
            isDown = false;
            wrapper.classList.remove('grabbing');
        };

        const handleMouseUp = () => {
            isDown = false;
            wrapper.classList.remove('grabbing');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const y = e.pageY - wrapper.offsetTop;
            const walkX = (x - startX) * 1.5;
            const walkY = (y - startY) * 1.5;
            wrapper.scrollLeft = scrollLeft - walkX;
            wrapper.scrollTop = scrollTop - walkY;
        };

        wrapper.addEventListener('mousedown', handleMouseDown);
        wrapper.addEventListener('mouseleave', handleMouseLeave);
        wrapper.addEventListener('mouseup', handleMouseUp);
        wrapper.addEventListener('mousemove', handleMouseMove);

        return () => {
            wrapper.removeEventListener('mousedown', handleMouseDown);
            wrapper.removeEventListener('mouseleave', handleMouseLeave);
            wrapper.removeEventListener('mouseup', handleMouseUp);
            wrapper.removeEventListener('mousemove', handleMouseMove);
        };
    }, [viewer.isHandTool]);

    const { loadFromUrl, handleFileSelect } = viewer;

    // Load the file when it changes or fall back to Satsang Ke Bikhare Moti
    useEffect(() => {
        if (file) {
            if (typeof file === 'string') {
                const friendlyName = file.split('/').pop().replace(/%20/g, ' ').replace('.pdf', '');
                loadFromUrl(file, friendlyName);
            } else {
                handleFileSelect(file);
            }
        } else {
            // Default PDF for Demo Reader
            const defaultPdfUrl = '/sample.pdf';
            loadFromUrl(defaultPdfUrl, 'Studio Reader Demo');
        }
    }, [file, loadFromUrl, handleFileSelect]);

    return (
        <div className="pdf-viewer-overlay">
            <div className={`viewer-container ${viewer.isDark ? 'dark-theme' : 'light-theme'} ${viewer.isFocusMode ? 'focus-mode' : ''}`}>
                <Sidebar
                    pdfDoc={viewer.pdfDoc}
                    pageNum={viewer.pageNum}
                    goToPage={viewer.goToPage}
                    isOpen={viewer.sidebarOpen}
                    onClose={viewer.toggleSidebar}
                    outline={viewer.outline}
                    searchIndices={viewer.searchIndices}
                    searchText={viewer.searchText}
                    toggleSidebar={viewer.toggleSidebar}
                    fileName={viewer.fileName}
                />

                {viewer.sidebarOpen && (
                    <div className="sidebar-backdrop" onClick={viewer.toggleSidebar} />
                )}

                <div className="main-viewer">
                    <Toolbar
                        scale={viewer.scale}
                        pageNum={viewer.pageNum}
                        totalPages={viewer.totalPages}
                        zoomIn={viewer.zoomIn}
                        zoomOut={viewer.zoomOut}
                        setScale={viewer.setScale}
                        fitToWidth={viewer.fitToWidth}
                        fitToPage={viewer.fitToPage}
                        goToPage={viewer.goToPage}
                        prevPage={viewer.prevPage}
                        nextPage={viewer.nextPage}
                        rotate={viewer.rotate}
                        toggleFullscreen={viewer.toggleFullscreen}
                        downloadPDF={viewer.downloadPDF}
                        printPDF={viewer.printPDF}
                        pdfLoaded={viewer.pdfLoaded}
                        isFocusMode={viewer.isFocusMode}
                        toggleFocusMode={viewer.toggleFocusMode}
                        isHandTool={viewer.isHandTool}
                        toggleHandTool={viewer.toggleHandTool}
                        searchText={viewer.searchText}
                        handleSearch={viewer.handleSearch}
                    />

                    <div 
                        ref={(el) => {
                            wrapperRef.current = el;
                            viewer.setGestureRef(el);
                        }} 
                        className={`canvas-wrapper ${viewer.isHandTool ? 'hand-tool-active' : ''}`}
                    >
                        {viewer.isLoading && <Loader />}
                        {viewer.pdfLoaded ? (
                            <PDFCanvas
                                pdfDoc={viewer.pdfDoc}
                                scale={viewer.scale}
                                rotation={viewer.rotation}
                                renderPageToElements={viewer.renderPageToElements}
                                searchText={viewer.searchText}
                                goToPage={viewer.goToPage}
                                totalPages={viewer.totalPages}
                                pdfLoaded={viewer.pdfLoaded}
                                isFocusMode={viewer.isFocusMode}
                                pageNum={viewer.pageNum}
                            />
                        ) : (
                            <Loader text="Initializing Studio Reader..." />
                        )}
                    </div>

                    {viewer.pdfLoaded && (
                        <div className="keyboard-hint">
                            <span>←</span> Prev | <span>→</span> Next | <span>+/−</span> Zoom | <span>Z</span> Focus | <span>H</span> Hand | <span>F</span> Fullscreen | <span>T</span> Theme
                        </div>
                    )}

                    <button className="close-viewer-btn" onClick={onClose} title="Close Reader">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                    <ErrorModal error={viewer.error} onClose={viewer.clearError} />
                </div>
            </div>
        </div>
    );
}
