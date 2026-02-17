import { useCallback, useRef, useState } from 'react';

export default function DropZone({ onFileSelect, visible }) {
    const [isDragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const stop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);

    const handleDrop = useCallback((e) => {
        stop(e);
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) onFileSelect(file);
    }, [onFileSelect, stop]);

    if (!visible) return null;

    return (
        <div
            className={`drop-area ${isDragActive ? 'active' : ''}`}
            onDragEnter={(e) => { stop(e); setDragActive(true); }}
            onDragOver={stop}
            onDragLeave={(e) => { stop(e); setDragActive(false); }}
            onDrop={handleDrop}
        >
            <div className="drop-message">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <line x1="12" y1="8" x2="12" y2="14" />
                    <polyline points="9 11 12 8 15 11" />
                </svg>
                <h2>Open Your Study Material</h2>
                <p>Drop your notes, PDFs or assignments here — start reading instantly</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileSelect(file);
                    }}
                />
                <button className="file-input-label" onClick={() => fileInputRef.current?.click()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                    Browse Files
                </button>
            </div>
        </div>
    );
}
