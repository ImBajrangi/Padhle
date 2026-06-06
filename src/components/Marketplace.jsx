export default function Marketplace({ onOpenReader }) {
    const categories = [
        { id: 'books', name: 'Textbooks', icon: '📖', count: '1.2k+', color: '#6366F1' },
        { id: 'notes', name: 'Special Notes', icon: '📝', count: '850+', color: '#EAB308' },
        { id: 'courses', name: 'Masterclasses', icon: '✨', count: '120+', color: '#10B981' },
        { id: 'gear', name: 'Study Setup', icon: '💻', count: '340+', color: '#EC4899' },
    ];

    const products = [
        {
            id: 0,
            name: 'Satsang Ke Bikhare Moti',
            price: 'Free',
            author: 'Spiritual Discourse Collection',
            rating: 5.0,
            sales: '15k',
            category: 'Vedic Literature',
            trending: true,
            pdfUrl: '/pdfs/satsang-ke-bikhare-moti.pdf',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 1,
            name: 'Vector Calculus: Ultimate Studio Prep',
            price: '₹599',
            author: 'Mastery Series',
            rating: 4.8,
            sales: '2.4k',
            category: 'Premium Kit',
            trending: true,
            pdfUrl: 'https://tilimltxgeucefxzerqi.supabase.co/storage/v1/object/public/pdf/Clinical%20Ai%20Architecture%20Diagrams.pdf',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 2,
            name: 'Elite Productivity: Digital Workspace',
            price: '₹229',
            author: 'MindFlow Studio',
            rating: 4.9,
            sales: '1.1k',
            category: 'Digital Resource',
            new: true,
            image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 3,
            name: 'Minimalist Physics Vol II: Optics',
            price: '₹849',
            author: 'Pure Theory',
            rating: 4.7,
            sales: '850',
            category: 'Textbook',
            image: 'https://images.unsplash.com/photo-1636466484210-9173f4439c3e?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 4,
            name: 'Frontend Mastery: React & Framer',
            price: '₹1,299',
            author: 'Frontend Pro',
            rating: 5.0,
            sales: '420',
            category: 'Video Course',
            trending: true,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600'
        },
    ];

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
                        <button className="elite-btn primary" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
                            Shop Collection
                        </button>
                        <button className="elite-btn secondary" onClick={() => onOpenReader(null)}>
                            Try Demo Reader
                        </button>
                    </div>
                </div>
            </section>

            <div className="marketplace-container">
                {/* Refined Categories */}
                <section className="category-section">
                    <div className="section-header">
                        <h3>Discover Collections</h3>
                        <button className="text-link">Browse Full Catalog</button>
                    </div>
                    <div className="bento-categories">
                        {categories.map(cat => (
                            <div key={cat.id} className="bento-item" style={{ '--accent-color': cat.color }}>
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
                            <button className="filter-chip active">All Elite</button>
                            <button className="filter-chip">Free Access</button>
                            <button className="filter-chip">Studio Premium</button>
                        </div>
                    </div>
                    <div className="product-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                    <div className="overlay-actions">
                                        <button className="action-circle" onClick={() => onOpenReader(product.pdfUrl || null)} title="Quick Preview">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        </button>
                                    </div>
                                    {product.trending && <div className="trending-badge">Trending</div>}
                                    {product.new && <div className="new-badge">New Release</div>}
                                    <div className="product-badge-overlay">{product.category}</div>
                                </div>
                                <div className="product-details">
                                    <div className="product-meta">
                                        <div className="product-rating">
                                            <span>⭐ {product.rating}</span>
                                            <span className="sales-count">({product.sales} students)</span>
                                        </div>
                                        <span className="product-author">{product.author}</span>
                                    </div>
                                    <h4>{product.name}</h4>
                                    <div className="product-footer">
                                        <div className="price-tag">
                                            <span className="currency">INR</span>
                                            <span className="val">{product.price.replace('₹', '').replace('Free', '0')}</span>
                                        </div>
                                        <button className="unlock-btn" onClick={() => onOpenReader(product.pdfUrl || null)}>Unlock Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
