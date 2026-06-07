import { useState, useEffect } from 'react';

export default function Header({ fileName, isDark, toggleTheme, onOpenFile, currentView, setView, searchQuery = '', setSearchQuery = () => {} }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        // Integrate with the global Vrindopnishad auth system
        if (window.AuthService) {
            window.AuthService.updateProfileUI('user-auth-btn');
            const unsubscribe = window.AuthService.onAuthStateChange(() => {
                const btn = document.getElementById('user-auth-btn');
                if (btn) {
                    window.AuthService.updateProfileUI('user-auth-btn');
                }
            });
            return () => {
                if (typeof unsubscribe === 'function') {
                    unsubscribe();
                }
            };
        }
    }, []);

    // ⌘K Keyboard Shortcut Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.aether-search-field__input input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header className="app-header">
            <div className="header-container-inner">
                <div className="header-left">
                    <div className="logo" onClick={() => setView('landing')} style={{ cursor: 'pointer' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <h1 className="logo-text">SKILL<span>TADKA</span></h1>
                    </div>

                    <nav className="header-tabs">
                        <button
                            className={`tab-btn ${currentView === 'marketplace' ? 'active' : ''}`}
                            onClick={() => setView('marketplace')}
                        >
                            Shop
                        </button>
                        <button
                            className={`tab-btn ${currentView === 'viewer' ? 'active' : ''}`}
                            onClick={() => setView('viewer')}
                        >
                            Reader
                        </button>
                        <button
                            className={`tab-btn ${currentView === 'stitch' ? 'active' : ''}`}
                            onClick={() => setView('stitch')}
                        >
                            Stitch
                        </button>
                        <button
                            className={`tab-btn ${currentView === 'about' ? 'active' : ''}`}
                            onClick={() => setView('about')}
                        >
                            Info
                        </button>
                    </nav>
                    {currentView === 'viewer' && fileName && (
                        <div className="header-pdf-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid var(--border)' }}>
                            <span className="pdf-name" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={fileName}>
                                {fileName}
                            </span>
                            <button 
                                className="tab-btn" 
                                onClick={onOpenFile}
                                style={{ padding: '4px 8px', fontSize: '0.75rem', height: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}
                                title="Open PDF File"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                Open
                            </button>
                        </div>
                    )}
                </div>

                <div className="header-center">
                    <label className="aether-search-field">
                        <span className="aether-search-field__label" style={{ display: 'none' }}>Search</span>
                        <span className="aether-search-field__input">
                            <svg className="aether-search-field__icon" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m21 21-4.34-4.34" />
                                <circle cx={11} cy={11} r={8} />
                            </svg>
                            <input 
                                type="search" 
                                placeholder="Search projects, files, people…" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery ? (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', color: 'var(--color-ink-tertiary)', display: 'flex', alignItems: 'center' }}
                                    title="Clear Search"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            ) : (
                                <kbd className="aether-search-field__kbd">⌘ K</kbd>
                            )}
                        </span>
                    </label>
                </div>

                <div className="header-right">
                    <div className="header-actions">
                        <button
                            className="icon-btn mobile-search-toggle"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Toggle Search"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </button>
                        <button className="icon-btn" aria-label="Cart">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                        </button>
                        <button className="icon-btn" id="user-auth-btn" aria-label="Profile">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </button>
                    </div>
                    <div className="divider"></div>
                    <div className="theme-switch-container">
                        <label className="switch" title="Toggle theme">
                            <input checked={!isDark} onChange={toggleTheme} id="checkbox" type="checkbox" />
                            <span className="slider">
                                <span className="star star_1" />
                                <span className="star star_2" />
                                <span className="star star_3" />
                                <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                                    <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff" d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" />
                                </svg>
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            <div className={`mobile-search-overlay ${isSearchOpen ? 'active' : ''}`}>
                <div className="mobile-search-container">
                    <label className="aether-search-field" style={{ flex: 1 }}>
                        <span className="aether-search-field__label" style={{ display: 'none' }}>Search</span>
                        <span className="aether-search-field__input">
                            <svg className="aether-search-field__icon" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m21 21-4.34-4.34" />
                                <circle cx={11} cy={11} r={8} />
                            </svg>
                            <input 
                                type="search" 
                                placeholder="Search projects, files, people…" 
                                autoFocus={isSearchOpen} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery ? (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', color: 'var(--color-ink-tertiary)' }}
                                    title="Clear Search"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            ) : (
                                <kbd className="aether-search-field__kbd">⌘ K</kbd>
                            )}
                        </span>
                    </label>
                    <button className="icon-btn" onClick={() => setIsSearchOpen(false)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
