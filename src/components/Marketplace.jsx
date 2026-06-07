import { useState, useEffect } from 'react';

const getBookPages = (product) => {
    if (product.id === 0) return '339 Pages';
    if (product.id === 1) return '180 Pages';
    if (product.id === 2) return '64 Pages';
    if (product.id === 3) return '240 Pages';
    if (product.id === 4) return '12 Lectures';
    return '120+ Pages';
};

const getBookTopic = (product) => {
    if (product.id === 0) return 'Vedic Philosophy';
    if (product.id === 1) return 'Calculus Prep';
    if (product.id === 2) return 'Workspace Setup';
    if (product.id === 3) return 'Wave Optics';
    if (product.id === 4) return 'React & Framer';
    return product.displayCategory || 'Exam Prep';
};

export default function Marketplace({ onOpenReader, searchQuery = '', setSearchQuery = () => {} }) {
    const categories = [
        { id: 'books', name: 'Textbooks', icon: '📖', count: '1.2k+', color: '#EA580C' },
        { id: 'notes', name: 'Special Notes', icon: '📝', count: '850+', color: '#EAB308' },
        { id: 'courses', name: 'Masterclasses', icon: '✨', count: '120+', color: '#10B981' },
        { id: 'gear', name: 'Study Setup', icon: '💻', count: '340+', color: '#D97706' },
    ];

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceFilter, setPriceFilter] = useState('all');
    const [recentFiles, setRecentFiles] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('skilltadka_recent_files') || '[]');
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    useEffect(() => {
        fetch('/catalog.json')
            .then(res => res.json())
            .then(data => setProducts(data || []))
            .catch(err => console.error("Error loading product catalog:", err));
    }, []);

    const filteredProducts = products.filter(product => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matchesSearch = product.name.toLowerCase().includes(q) || 
                                  product.author.toLowerCase().includes(q);
            if (!matchesSearch) return false;
        }

        if (selectedCategory && product.category !== selectedCategory) {
            return false;
        }

        if (priceFilter === 'free' && product.price !== 'Free') {
            return false;
        }
        if (priceFilter === 'premium' && product.price === 'Free') {
            return false;
        }

        return true;
    });

    return (
        <div className="marketplace-fade-in">
            {/* Elite Hero Experience */}
            <section className="elite-hero">
                <div className="hero-mesh"></div>
                <div className="hero-content">
                    <div className="status-pill">Elite Studio 2025 Edition</div>
                    <h2 className="elite-title">STUDIO<br />EXAM KITS</h2>
                    <p className="elite-subtitle">Elevate your academic journey with the world's most refined study resources.</p>
                    <div className="hero-actions">
                        <button className="aether-primary-btn" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
                            <span className="aether-primary-btn__label">Shop Collection</span>
                            <span className="aether-primary-btn__chip" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                        <button className="elite-btn secondary" onClick={() => onOpenReader(null)}>
                            Try Demo Reader
                        </button>
                    </div>
                </div>
            </section>

            <div className="marketplace-container">
                {/* Recent Files Section */}
                {recentFiles.length > 0 && (
                    <section className="recent-files-section" style={{ marginBottom: '2.5rem' }}>
                        <div className="section-header">
                            <h3>Continue Learning</h3>
                            <button className="text-link" onClick={() => {
                                localStorage.removeItem('skilltadka_recent_files');
                                setRecentFiles([]);
                            }}>Clear History</button>
                        </div>
                        <div className="recent-files-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {recentFiles.map((file, idx) => (
                                <div 
                                    key={idx} 
                                    className="recent-file-card" 
                                    onClick={() => onOpenReader(file.pdfUrl === 'local' ? null : file.pdfUrl)}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '16px',
                                        padding: '1.2rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s var(--ease)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.6rem',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    <div className="recent-file-icon" style={{ fontSize: '1.5rem' }}>
                                        {file.pdfUrl === 'local' ? '📁' : '📖'}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={file.name}>
                                            {file.name}
                                        </h4>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                                            {file.pdfUrl === 'local' ? 'Local Document' : 'Library Book'}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', alignSelf: 'flex-start', background: 'var(--accent-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                                        {new Date(file.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Refined Categories */}
                <section className="category-section">
                    <div className="section-header">
                        <h3>Discover Collections</h3>
                        {selectedCategory && (
                            <button className="text-link" onClick={() => setSelectedCategory(null)}>Reset Collections</button>
                        )}
                    </div>
                    <div className="bento-categories">
                        {categories.map(cat => (
                            <div 
                                key={cat.id} 
                                className={`bento-item ${selectedCategory === cat.id ? 'active' : ''}`} 
                                style={{ '--accent-color': cat.color, cursor: 'pointer' }}
                                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                            >
                                <div className="bento-glass"></div>
                                <span className="cat-icon">{cat.icon}</span>
                                <div className="cat-info">
                                    <h4>{cat.name}</h4>
                                    <span>{cat.count} curated items</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Performance Feed */}
                <section className="product-feed">
                    <div className="section-header">
                        <h3>Elite Marketplace</h3>
                        <div className="feed-filters">
                            <button 
                                className={`filter-chip ${priceFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setPriceFilter('all')}
                            >
                                All Elite
                            </button>
                            <button 
                                className={`filter-chip ${priceFilter === 'free' ? 'active' : ''}`}
                                onClick={() => setPriceFilter('free')}
                            >
                                Free Access
                            </button>
                            <button 
                                className={`filter-chip ${priceFilter === 'premium' ? 'active' : ''}`}
                                onClick={() => setPriceFilter('premium')}
                            >
                                Studio Premium
                            </button>
                        </div>
                    </div>
                    
                    <div className="product-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id} className="book-card-item">
                                    <div className="book">
                                        {/* Inside / Back of the book */}
                                        <div className="book-back">
                                            <div className="book-back-inner">
                                                <div className="book-back-meta">
                                                    <span className="book-back-author">{product.author}</span>
                                                    <div className="book-back-rating">⭐ {product.rating} <span className="sales">({product.sales})</span></div>
                                                </div>
                                                <h4 className="book-back-title">{product.name}</h4>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-tertiary)', margin: '4px 0 10px', borderTop: '1px dashed var(--border)', paddingTop: '6px' }}>
                                                    <span>{getBookTopic(product)}</span>
                                                    <span>{getBookPages(product)}</span>
                                                </div>
                                                <div className="book-back-footer">
                                                    <div className="book-back-price">
                                                        <span className="currency">INR</span>
                                                        <span className="val">{product.price.replace('₹', '').replace('Free', '0')}</span>
                                                    </div>
                                                    <div className="book-back-actions">
                                                        <button 
                                                            className="book-btn-preview" 
                                                            onClick={() => onOpenReader(product.pdfUrl || null)}
                                                            title="Quick Preview"
                                                        >
                                                            Preview
                                                        </button>
                                                        <button 
                                                            className="book-btn-unlock" 
                                                            onClick={() => onOpenReader(product.pdfUrl || null)}
                                                        >
                                                            Unlock
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Front Cover of the book */}
                                        <div className="cover">
                                            <div className="book-spine"></div>
                                            <img src={product.image} alt={product.name} loading="lazy" />
                                            {product.trending && <div className="trending-badge">Trending</div>}
                                            {product.new && <div className="new-badge">New Release</div>}
                                            <div className="product-badge-overlay">{product.displayCategory || product.category}</div>
                                            <div className="cover-title-overlay">
                                                <h4>{product.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '1rem', color: 'var(--text-tertiary)', display: 'inline-block' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                <h4 style={{ margin: '0.5rem 0' }}>No study resources match your selection</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Try clearing filters or search keywords.</p>
                                <button 
                                    className="elite-btn secondary" 
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory(null);
                                        setPriceFilter('all');
                                    }}
                                    style={{ marginTop: '1rem', padding: '8px 16px', fontSize: '0.8rem', height: 'auto', display: 'inline-block' }}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Float Invite */}
            <div className="reader-invite">
                <div className="invite-content">
                    <h4>Studio Reader Access</h4>
                    <p>Experience the most professional PDF viewer in the industry.</p>
                </div>
                <button className="primary-btn yellow-btn" style={{ gap: '0.6rem' }} onClick={() => onOpenReader(null)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                    <span>Activate Reader</span>
                </button>
            </div>
        </div>
    );
}
