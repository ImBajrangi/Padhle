import { useCallback, useRef, useState, useEffect } from 'react';

const WORDS = ['Notes', 'PDFs', 'Assignments', 'Classes', 'Books'];
const SUBJECTS = [
    { emoji: '📚', label: 'Physics' },
    { emoji: '🧮', label: 'Maths' },
    { emoji: '🧪', label: 'Chemistry' },
    { emoji: '📝', label: 'English' },
    { emoji: '🌍', label: 'History' },
    { emoji: '💻', label: 'CS' },
];

export default function DropZone({ onFileSelect, visible }) {
    const [isDragActive, setDragActive] = useState(false);
    const [wordIdx, setWordIdx] = useState(0);
    const [fadeClass, setFadeClass] = useState('morph-in');
    const cardRef = useRef(null);
    const fileInputRef = useRef(null);

    const stop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);

    const handleDrop = useCallback((e) => {
        stop(e);
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) onFileSelect(file);
    }, [onFileSelect, stop]);

    /* ── Morphing text cycle ── */
    useEffect(() => {
        const id = setInterval(() => {
            setFadeClass('morph-out');
            setTimeout(() => {
                setWordIdx((i) => (i + 1) % WORDS.length);
                setFadeClass('morph-in');
            }, 300);
        }, 2200);
        return () => clearInterval(id);
    }, []);

    /* ── 3D tilt on mouse move ── */
    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;   // -0.5 to 0.5
        const y = (e.clientY - top) / height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.01)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    }, []);

    if (!visible) return null;

    return (
        <div
            ref={cardRef}
            className={`drop-area ${isDragActive ? 'active' : ''}`}
            onDragEnter={(e) => { stop(e); setDragActive(true); }}
            onDragOver={stop}
            onDragLeave={(e) => { stop(e); setDragActive(false); }}
            onDrop={handleDrop}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Floating subject badges */}
            <div className="floating-tags">
                {SUBJECTS.map((s, i) => (
                    <span key={s.label} className="float-tag" style={{ '--i': i }}>
                        {s.emoji} {s.label}
                    </span>
                ))}
            </div>

            {/* Animated glow border */}
            <div className="glow-border" />

            <div className="drop-message">
                <div className="drop-icon-wrap">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        <line x1="12" y1="8" x2="12" y2="14" />
                        <polyline points="9 11 12 8 15 11" />
                    </svg>
                </div>

                <h2>
                    Open Your{' '}
                    <span className={`morph-word ${fadeClass}`}>{WORDS[wordIdx]}</span>
                </h2>
                <p>Drop your study material here or browse to start reading instantly</p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileSelect(f); }}
                />
                <button className="file-input-label" onClick={() => fileInputRef.current?.click()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                    Browse Files
                </button>
            </div>
        </div>
    );
}
