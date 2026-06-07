import { useEffect, useRef, useCallback, useState } from 'react';

export default function Sidebar({
    pdfDoc, pageNum, goToPage, isOpen, onClose, outline, searchIndices, searchText, toggleSidebar, fileName
}) {
    const containerRef = useRef(null);
    const thumbnailsRef = useRef({});
    const [activeTab, setActiveTab] = useState('pages'); // 'pages', 'outline', 'search', 'notes', 'timer'

    // --- Study Notes State & Actions ---
    const activeFileName = fileName || 'General Study Pad';
    const [notes, setNotes] = useState('');
    const [notesSaved, setNotesSaved] = useState(false);

    useEffect(() => {
        const savedNotes = localStorage.getItem(`skilltadka_notes_${activeFileName}`) || '';
        setNotes(savedNotes);
    }, [activeFileName, activeTab]);

    const handleNotesChange = (e) => {
        const val = e.target.value;
        setNotes(val);
        localStorage.setItem(`skilltadka_notes_${activeFileName}`, val);
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 1200);
    };

    const copyNotes = () => {
        navigator.clipboard.writeText(notes);
        alert('Notes copied to clipboard!');
    };

    const clearNotes = () => {
        if (window.confirm('Are you sure you want to delete all notes in this workspace?')) {
            setNotes('');
            localStorage.setItem(`skilltadka_notes_${activeFileName}`, '');
            setNotesSaved(true);
            setTimeout(() => setNotesSaved(false), 1200);
        }
    };

    const downloadNotes = () => {
        const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeFileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getWordCount = (text) => {
        if (!text.trim()) return 0;
        return text.trim().split(/\s+/).length;
    };

    const getCharCount = (text) => {
        return text.length;
    };

    // --- Pomodoro Focus Timer State & Actions ---
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState('focus'); // 'focus', 'short', 'long'
    const [completedSessions, setCompletedSessions] = useState(() => {
        return parseInt(localStorage.getItem('skilltadka_focus_sessions') || '0', 10);
    });

    const totalSeconds = timerMode === 'focus' ? 25 * 60 : timerMode === 'short' ? 5 * 60 : 15 * 60;

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isRunning && timeLeft === 0) {
            setIsRunning(false);
            // Web Audio API synth notification
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(660, audioCtx.currentTime); // E5
                gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.5);
            } catch (err) {
                console.error("Web Audio API error:", err);
            }

            if (timerMode === 'focus') {
                const newSessions = completedSessions + 1;
                setCompletedSessions(newSessions);
                localStorage.setItem('skilltadka_focus_sessions', newSessions.toString());
                alert('Great job! Focus session completed. Take a break!');
                setTimerMode('short');
                setTimeLeft(5 * 60);
            } else {
                alert('Break is over! Time to focus.');
                setTimerMode('focus');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, timerMode, completedSessions]);

    const handleModeChange = (mode) => {
        setIsRunning(false);
        setTimerMode(mode);
        if (mode === 'focus') setTimeLeft(25 * 60);
        else if (mode === 'short') setTimeLeft(5 * 60);
        else if (mode === 'long') setTimeLeft(15 * 60);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

    // Generate thumbnail for a specific page
    const renderThumbnail = useCallback(async (page, canvas) => {
        const viewport = page.getViewport({ scale: 0.2 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
    }, []);

    // Effect for thumbnails
    useEffect(() => {
        if (!pdfDoc || activeTab !== 'pages' || !containerRef.current) return;
        const container = containerRef.current;
        container.innerHTML = '';
        thumbnailsRef.current = {};

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${i === pageNum ? 'active' : ''}`;
            thumb.dataset.page = i;

            const placeholder = document.createElement('div');
            placeholder.className = 'thumbnail-placeholder';

            const pageLabel = document.createElement('div');
            pageLabel.className = 'thumbnail-number';
            pageLabel.textContent = i;

            thumb.appendChild(placeholder);
            thumb.appendChild(pageLabel);
            container.appendChild(thumb);

            thumb.addEventListener('click', () => {
                goToPage(i);
                if (window.innerWidth <= 768) onClose();
            });

            thumbnailsRef.current[i] = thumb;

            pdfDoc.getPage(i).then((page) => {
                const canvas = document.createElement('canvas');
                renderThumbnail(page, canvas).then(() => {
                    if (placeholder.parentNode) {
                        placeholder.parentNode.replaceChild(canvas, placeholder);
                    }
                });
            });
        }
    }, [pdfDoc, goToPage, onClose, renderThumbnail, activeTab, pageNum]);

    // Update active thumbnail scroll
    useEffect(() => {
        if (activeTab === 'pages' && thumbnailsRef.current[pageNum]) {
            thumbnailsRef.current[pageNum].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [pageNum, activeTab]);

    const goToDestination = useCallback(async (dest) => {
        if (!dest) return;
        try {
            // Resolve destination to page index
            const explicitDest = typeof dest === 'string'
                ? await pdfDoc.getDestination(dest)
                : dest;

            if (explicitDest && explicitDest[0]) {
                const pageNum = await pdfDoc.getPageIndex(explicitDest[0]);
                goToPage(pageNum + 1);
                if (window.innerWidth <= 768) onClose();
            }
        } catch (err) {
            console.error("Error jumping to destination:", err);
        }
    }, [pdfDoc, goToPage, onClose]);

    const renderOutlineItem = (item, index) => {
        return (
            <div key={index} className="outline-item-wrap">
                <div className="outline-item" onClick={() => goToDestination(item.dest)}>
                    <span className="outline-title">{item.title}</span>
                </div>
                {item.items && item.items.length > 0 && (
                    <div className="outline-children">
                        {item.items.map((child, i) => renderOutlineItem(child, i))}
                    </div>
                )}
            </div>
        );
    };

    // Close on Esc
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'pages' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pages')}
                            title="Pages"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'outline' ? 'active' : ''}`}
                            onClick={() => setActiveTab('outline')}
                            title="Outline"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
                            onClick={() => setActiveTab('search')}
                            title="Search Results"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notes')}
                            title="Study Notes"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'timer' ? 'active' : ''}`}
                            onClick={() => setActiveTab('timer')}
                            title="Focus Timer"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        </button>
                    </div>
                    <button className="icon-btn" title="Close Sidebar" onClick={onClose}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>

                <div className="sidebar-content">
                    {activeTab === 'pages' && <div className="thumbnails" ref={containerRef} />}

                    {activeTab === 'outline' && (
                        <div className="outline-view">
                            {outline && outline.length > 0 ? (
                                outline.map((item, i) => renderOutlineItem(item, i))
                            ) : (
                                <div className="sidebar-empty">No outline available</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'search' && (
                        <div className="search-results-view">
                            {searchText ? (
                                searchIndices && searchIndices.length > 0 ? (
                                    searchIndices.map((res, i) => (
                                        <div key={i} className="search-result-item" onClick={() => goToPage(res.pageNum)}>
                                            <div className="result-page">Page {res.pageNum}</div>
                                            <div className="result-snippet">{res.text}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="sidebar-empty">No results found for "{searchText}"</div>
                                )
                            ) : (
                                <div className="sidebar-empty">Enter text in the search bar to see results here</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="notes-view">
                            <div className="notes-workspace-info" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', background: 'var(--accent-subtle)', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={activeFileName}>
                                <strong>Workspace:</strong> {activeFileName}
                            </div>
                            <div className="notes-header">
                                <div className={`notes-status ${notesSaved ? 'saved' : 'saving'}`}>
                                    {notesSaved ? (
                                        <>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                            <span>Saved locally</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="saving-spinner" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 14 14" /></svg>
                                            <span>Auto-saving...</span>
                                        </>
                                    )}
                                </div>
                                <div className="notes-actions">
                                    <button className="notes-action-btn" onClick={copyNotes} title="Copy to Clipboard">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                        Copy
                                    </button>
                                    <button className="notes-action-btn" onClick={downloadNotes} title="Download notes text file">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                        Export
                                    </button>
                                    <button className="notes-action-btn btn-clear" onClick={clearNotes} title="Clear Notes">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <textarea
                                className="notes-textarea"
                                value={notes}
                                onChange={handleNotesChange}
                                placeholder="Jot down notes, reference pages, or summaries here..."
                            />
                            <div className="notes-footer" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px', borderTop: '1px solid var(--border)', paddingTop: '6px' }}>
                                <span>Words: <strong>{getWordCount(notes)}</strong></span>
                                <span>Chars: <strong>{getCharCount(notes)}</strong></span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'timer' && (
                        <div className="timer-view">
                            <div className="timer-modes">
                                <button
                                    className={`timer-mode-btn ${timerMode === 'focus' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('focus')}
                                >
                                    Focus
                                </button>
                                <button
                                    className={`timer-mode-btn ${timerMode === 'short' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('short')}
                                >
                                    Short Break
                                </button>
                                <button
                                    className={`timer-mode-btn ${timerMode === 'long' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('long')}
                                >
                                    Long Break
                                </button>
                            </div>

                            <div className="timer-display-wrap">
                                <svg width="150" height="150" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="44" className="timer-circle-bg" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="44"
                                        className="timer-circle-progress"
                                        strokeDasharray="276.46"
                                        strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                                    />
                                </svg>
                                <div className="timer-countdown">{formatTime(timeLeft)}</div>
                            </div>

                            <div className="timer-controls">
                                <button
                                    className="timer-ctrl-btn play-btn"
                                    onClick={() => setIsRunning(!isRunning)}
                                    title={isRunning ? "Pause Timer" : "Start Timer"}
                                >
                                    {isRunning ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}><polygon points="5 3 19 12 5 21" /></svg>
                                    )}
                                </button>
                                <button
                                    className="timer-ctrl-btn"
                                    onClick={() => {
                                        setIsRunning(false);
                                        setTimeLeft(totalSeconds);
                                    }}
                                    title="Reset Timer"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                                </button>
                            </div>

                            <div className="timer-streak">
                                <span>🔥 Session Streak:</span>
                                <strong>{completedSessions}</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {pdfDoc && (
                <button
                    className={`sidebar-toggle ${pdfDoc ? 'active' : ''}`}
                    title="Toggle Sidebar"
                    onClick={toggleSidebar}
                    style={{ display: pdfDoc ? 'block' : 'none' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points={isOpen ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} /></svg>
                </button>
            )}
        </>
    );
}
