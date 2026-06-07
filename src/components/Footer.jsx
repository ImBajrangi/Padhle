export default function Footer({ setView }) {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                {/* Top: Brand + Nav in one clean row */}
                <div className="footer-row">
                    <div className="footer-brand-min" onClick={() => setView?.('landing')} style={{ cursor: 'pointer' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <span className="footer-brand-name">skill<strong>Tadka</strong></span>
                    </div>

                    <nav className="footer-nav">
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView?.('marketplace'); }}>Shop</a>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView?.('stitch'); }}>Stitch</a>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView?.('about'); }}>Info</a>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setView?.('notfound'); }} style={{ color: 'var(--accent, #f59e0b)', fontWeight: 'bold' }}>Test 404</a>
                    </nav>

                    <div className="footer-socials">
                        <a href="#" aria-label="Twitter" className="social-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" /><path d="M4 20l6.768 -6.768" /><path d="M20 4l-7.364 7.364" /></svg>
                        </a>
                        <a href="#" aria-label="GitHub" className="social-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                        </a>
                        <a href="#" aria-label="LinkedIn" className="social-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                    </div>
                </div>

                {/* Bottom: Hairline divider + copyright */}
                <div className="footer-bottom-min">
                    <span>© {year} Vrindopnishad · Studio Edition</span>
                    <span className="footer-dot">Crafted for deep focus</span>
                </div>
            </div>
        </footer>
    );
}
