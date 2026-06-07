import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Shield, Cpu, Clock, FileText, ArrowRight, Zap, Volume2, Lock, EyeOff } from 'lucide-react';
import './LandingPage.css';

const MORPH_WORDS = ['Textbooks', 'Research Papers', 'Lecture Notes', 'Study Guides', 'Vedic Literature'];

export default function LandingPage({ onStartLearning, isDark, toggleTheme }) {
    const [morphIdx, setMorphIdx] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    // Interactive Bento States
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(1500); // 25:00
    const [activeBentoHover, setActiveBentoHover] = useState(null);

    const portalRef = useRef(null);
    const fileInputRef = useRef(null);
    const dragCounterRef = useRef(0);
    const rectRef = useRef(null);

    // Morphing text cycle
    useEffect(() => {
        const id = setInterval(() => {
            setIsExiting(true);
            setTimeout(() => {
                setMorphIdx((i) => (i + 1) % MORPH_WORDS.length);
                setIsExiting(false);
            }, 280);
        }, 2800);
        return () => clearInterval(id);
    }, []);

    // Interactive Pomodoro Ticking inside Bento Card
    useEffect(() => {
        let interval = null;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimerSeconds((sec) => (sec > 0 ? sec - 1 : 1500));
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerRunning]);

    const formatBentoTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleMouseEnter = useCallback(() => {
        if (portalRef.current) {
            rectRef.current = portalRef.current.getBoundingClientRect();
        }
    }, []);

    // Dynamic 3D tilt on the Focus Core
    const handleTilt = useCallback((e) => {
        if (!portalRef.current) return;
        if (!rectRef.current) {
            rectRef.current = portalRef.current.getBoundingClientRect();
        }
        const r = rectRef.current;
        const x = ((e.clientX - r.left) / r.width - 0.5) * 15;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 15;
        portalRef.current.style.transform =
            `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02, 1.02, 1.02)`;
    }, []);

    const resetTilt = useCallback(() => {
        rectRef.current = null;
        if (portalRef.current) {
            portalRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        }
    }, []);

    // Drag and Drop Handling
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current--;
        if (dragCounterRef.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounterRef.current = 0;

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'application/pdf') {
                // Dynamically process file upload
                const reader = new FileReader();
                reader.onload = () => {
                    onStartLearning();
                    setTimeout(() => {
                        // Triggers open reader callback
                        const selectEvent = new CustomEvent('skilltadka-load-file', { detail: file });
                        window.dispatchEvent(selectEvent);
                    }, 50);
                };
                reader.readAsArrayBuffer(file);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            onStartLearning();
            setTimeout(() => {
                const selectEvent = new CustomEvent('skilltadka-load-file', { detail: file });
                window.dispatchEvent(selectEvent);
            }, 50);
        }
    };

    return (
        <div 
            className="lp"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Ambient Background Grid and Orbs */}
            <div className="lp-ambient" aria-hidden="true">
                <div className="lp-grid-layer" />
                <div className="lp-glow lp-glow--primary" />
                <div className="lp-glow lp-glow--secondary" />
                <div className="lp-glow lp-glow--tertiary" />
            </div>

            {/* Drag Overlay Notification */}
            <div className={`lp-drag-overlay ${isDragging ? 'active' : ''}`}>
                <div className="drag-overlay-card">
                    <div className="drag-icon-pulse">
                        <FileText size={48} />
                    </div>
                    <h2>Initialize Reader Portal</h2>
                    <p>Release to parse and load your document locally</p>
                    <div className="drag-border-accent"></div>
                </div>
            </div>

            {/* ── HEADER ── */}
            <header className="lp-header">
                <div className="lp-wrap header-inner">
                    <a className="lp-brand" href="/" onClick={(e) => e.preventDefault()}>
                        <div className="brand-logo">
                            <span className="logo-spark">✨</span>
                        </div>
                        <span className="lp-brand-text">skillTadka</span>
                    </a>

                    <nav className="lp-nav">
                        <a href="#features" className="lp-nav-link">Toolkit</a>
                        <a href="#workflow" className="lp-nav-link">Core Engine</a>
                        
                        <div className="theme-switch-container" style={{ margin: '0 8px', scale: '0.85' }}>
                            <label className="switch" title="Toggle theme">
                                <input checked={!isDark} onChange={toggleTheme} id="checkbox-lp" type="checkbox" />
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

                        <button className="lp-cta-sm glow-btn" onClick={onStartLearning}>Explore Library</button>
                    </nav>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="lp-hero">
                <div className="lp-wrap hero-grid">
                    {/* Left: Branding & Message */}
                    <div className="hero-left-content">
                        <div className="status-pill-wrap">
                            <span className="pulse-dot"></span>
                            <span className="status-pill-text">Local-First Sandbox V2</span>
                        </div>

                        <h1 className="hero-main-title">
                            Studio Study Space<br />
                            For Your <span className={`highlight-text ${isExiting ? 'exit' : ''}`}>{MORPH_WORDS[morphIdx]}</span>
                        </h1>

                        <p className="hero-description">
                            A highly tailored, private reading workspace designed for deep cognitive flow. No databases, zero telemetry, and 100% cost-free.
                        </p>

                        <div className="hero-button-actions">
                            <button className="primary-glow-btn" onClick={triggerFileInput}>
                                <Sparkles size={18} />
                                <span>Load Local PDF</span>
                            </button>
                            <button className="aether-primary-btn" onClick={() => onStartLearning()}>
                                <span className="aether-primary-btn__label">Enter Free Library</span>
                                <span className="aether-primary-btn__chip" aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <div className="trust-badges">
                            <div className="trust-badge"><Shield size={14} /> 100% Secure</div>
                            <div className="trust-badge"><EyeOff size={14} /> Zero Cloud Space</div>
                            <div className="trust-badge"><Zap size={14} /> GPU Accelerated</div>
                        </div>
                    </div>

                    {/* Right: Holographic 3D Focus Core */}
                    <div className="hero-right-portal">
                        <div 
                            ref={portalRef}
                            className="focus-portal"
                            onMouseEnter={handleMouseEnter}
                            onMouseMove={handleTilt}
                            onMouseLeave={resetTilt}
                            onClick={triggerFileInput}
                        >
                            <div className="portal-glass-panel"></div>
                            
                            {/* Rotating concentric decorative rings */}
                            <div className="portal-ring ring-outer"></div>
                            <div className="portal-ring ring-middle"></div>
                            <div className="portal-ring ring-inner"></div>

                            {/* Dynamic glowing core sensor */}
                            <div className="portal-core">
                                <div className="core-glow-sphere"></div>
                                <div className="core-icon-container">
                                    <div className="glow-icon-wrap">
                                        <FileText size={32} strokeWidth={1.2} />
                                    </div>
                                    <span className="core-label">Drop PDF File</span>
                                    <span className="core-sublabel">or click to browse local files</span>
                                </div>
                            </div>

                            {/* Floating satellite particles */}
                            <div className="orbiting-dot dot-1"></div>
                            <div className="orbiting-dot dot-2"></div>
                            <div className="orbiting-dot dot-3"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hidden Input File */}
            <input 
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {/* ── BENTO TOOLKIT SHOWCASE ── */}
            <section className="lp-features" id="features">
                <div className="lp-wrap">
                    <div className="section-title-container">
                        <span className="section-pre">STUDIO INTEGRATED</span>
                        <h2 className="section-h2">The Cognitive Bento Grid</h2>
                        <p className="section-desc">Hand-crafted utilities built to maximize reading retention and academic focus.</p>
                    </div>

                    <div className="lp-bento-grid">
                        {/* Bento Item 1: Dynamic Focus Clock Widget */}
                        <div 
                            className={`lp-bento-card lp-bento-card--double ${activeBentoHover === 1 ? 'hovered' : ''}`}
                            onMouseEnter={() => setActiveBentoHover(1)}
                            onMouseLeave={() => setActiveBentoHover(null)}
                        >
                            <div className="lp-bento-card-bg"></div>
                            <div className="lp-bento-widget-layout">
                                <div className="widget-header">
                                    <Clock size={20} className="widget-icon text-yellow" />
                                    <div>
                                        <h4>Pomodoro Focus Engine</h4>
                                        <p>Maintain deep work streaks with integrated focus intervals.</p>
                                    </div>
                                </div>
                                <div className="widget-body-timer">
                                    <div className="timer-face">
                                        <div className="timer-ring-svg">
                                            <svg width="120" height="120" viewBox="0 0 120 120">
                                                <defs>
                                                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="var(--primary)" />
                                                        <stop offset="100%" stopColor="var(--secondary)" />
                                                    </linearGradient>
                                                </defs>
                                                <circle cx="60" cy="60" r="50" className="timer-circle-track" />
                                                <circle 
                                                    cx="60" 
                                                    cy="60" 
                                                    r="50" 
                                                    className="timer-circle-progress"
                                                    stroke="url(#timerGradient)"
                                                    style={{
                                                        strokeDashoffset: `${314 - (314 * (timerSeconds / 1500))}`
                                                    }}
                                                />
                                            </svg>
                                        </div>
                                        <div className="timer-text-overlay">
                                            <span className="timer-digits">{formatBentoTime(timerSeconds)}</span>
                                            <span className="timer-state">{timerRunning ? 'ACTIVE' : 'READY'}</span>
                                        </div>
                                    </div>
                                    <div className="timer-controls">
                                        <button 
                                            className={`timer-play-btn ${timerRunning ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setTimerRunning(!timerRunning);
                                            }}
                                        >
                                            {timerRunning ? 'Pause Engine' : 'Start Focus Session'}
                                        </button>
                                        <button 
                                            className="timer-reset-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setTimerRunning(false);
                                                setTimerSeconds(1500);
                                            }}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bento Item 2: Secure Sandbox */}
                        <div 
                            className={`lp-bento-card ${activeBentoHover === 2 ? 'hovered' : ''}`}
                            onMouseEnter={() => setActiveBentoHover(2)}
                            onMouseLeave={() => setActiveBentoHover(null)}
                        >
                            <div className="lp-bento-card-bg"></div>
                            <div className="lp-bento-icon-box bg-amber">
                                <Lock size={24} />
                            </div>
                            <h3>100% Free &amp; Private</h3>
                            <p>No account setup, no paid cloud space subscriptions. Your books process locally in your browser memory.</p>
                            <div className="lp-bento-badge-footer">
                                <span>Zero Servers</span>
                            </div>
                        </div>

                        {/* Bento Item 3: Acoustic Waveform Visualizer */}
                        <div 
                            className={`lp-bento-card ${activeBentoHover === 3 ? 'hovered' : ''}`}
                            onMouseEnter={() => setActiveBentoHover(3)}
                            onMouseLeave={() => setActiveBentoHover(null)}
                        >
                            <div className="lp-bento-card-bg"></div>
                            <div className="lp-bento-icon-box bg-emerald">
                                <Volume2 size={24} />
                            </div>
                            <h3>Acoustic Soundscapes</h3>
                            <p>Integrated Web Audio API alerts. Crisp synth frequencies design high-efficiency study reminders.</p>
                            <div className="mini-waveform">
                                <span className={`bar ${timerRunning ? 'anim' : ''}`}></span>
                                <span className={`bar ${timerRunning ? 'anim' : ''}`}></span>
                                <span className={`bar ${timerRunning ? 'anim' : ''}`}></span>
                                <span className={`bar ${timerRunning ? 'anim' : ''}`}></span>
                                <span className={`bar ${timerRunning ? 'anim' : ''}`}></span>
                                <span className={`bar ${timerRunning ? 'anim' : ''}`}></span>
                            </div>
                        </div>

                        {/* Bento Item 4: GPU Acceleration */}
                        <div 
                            className={`lp-bento-card lp-bento-card-wide ${activeBentoHover === 4 ? 'hovered' : ''}`}
                            onMouseEnter={() => setActiveBentoHover(4)}
                            onMouseLeave={() => setActiveBentoHover(null)}
                        >
                            <div className="lp-bento-card-bg"></div>
                            <div className="lp-bento-widget-layout horizontal">
                                <div className="lp-bento-icon-box bg-orange">
                                    <Cpu size={24} />
                                </div>
                                <div className="lp-bento-horizontal-text">
                                    <h3>High-Speed Cache Render Engine</h3>
                                    <p>Our custom cache layers and PDFJS canvas rendering deliver lightning-fast 60fps scrolling on large files and textbook collections.</p>
                                </div>
                                <div className="cache-matrix-grid">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <span key={i} className="cache-block" style={{ animationDelay: `${i * 0.05}s` }}></span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bento Item 5: Dynamic 3D Dimensions Widget */}
                        <div className="lp-bento-card">
                            <div className="lp-bento-card-bg"></div>
                            <div className="lp-bento-widget-layout">
                                <div className="wrap_card">
                                    <div className="card">
                                        <div className="content">
                                            <span>X</span>
                                            <svg fill="none" viewBox="0 0 24 24" height={48} width={48} className="icon" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="url(#gradient-full)" d="M12.3999 17.4999C11.8999 17.2999 11.2999 17.3999 11.0999 17.8999L9.29989 21.4999C8.99989 21.9999 9.19989 22.5999 9.69989 22.8999C9.79989 22.9999 9.99989 22.9999 10.1999 22.9999C10.5999 22.9999 10.8999 22.7999 11.0999 22.4999L12.8999 18.8999C13.0999 18.2999 12.8999 17.6999 12.3999 17.4999Z" />
                                                <path fill="url(#gradient-full)" d="M17 17.4999C16.5 17.2999 15.9 17.3999 15.7 17.8999L13.9 21.4999C13.7 21.9999 13.8 22.5999 14.3 22.7999C14.4 22.8999 14.6 22.8999 14.8 22.8999C15.2 22.8999 15.5 22.6999 15.7 22.3999L17.5 18.7999C17.7 18.2999 17.5 17.6999 17 17.4999Z" />
                                                <path fill="url(#gradient-full)" d="M7.89994 17.4999C7.39994 17.2999 6.79994 17.3999 6.59994 17.8999L4.79994 21.4999C4.59994 21.9999 4.69994 22.5999 5.19994 22.7999C5.29994 22.9999 5.49994 22.9999 5.59994 22.9999C5.99994 22.9999 6.29994 22.7999 6.49994 22.4999L8.29994 18.8999C8.59994 18.2999 8.39994 17.6999 7.89994 17.4999Z" />
                                                <path fill="url(#gradient-full)" d="M15.2 1C12.4 1 9.9 2.5 8.5 4.8C8 4.7 7.5 4.6 7 4.6C3.7 4.6 1 7.3 1 10.6C1 13.9 3.7 16.6 7 16.6H15.2C19.5 16.6 23 13.1 23 8.8C23 4.5 19.5 1 15.2 1Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="content">
                                            <span>Y</span>
                                            <svg fill="none" viewBox="0 0 24 24" height={48} width={48} className="icon" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="url(#gradient-full)" d="M12.2999 22.0001C9.59992 22.0001 6.99992 21.0001 4.99992 19.0001C0.999923 15.0001 0.999923 8.70009 4.89992 4.80009C6.29992 3.30009 8.19992 2.30009 10.2999 2.00009C10.6999 1.90009 11.0999 2.10009 11.2999 2.50009C11.4999 2.90009 11.4999 3.30009 11.1999 3.60009C8.99992 6.10009 9.19992 10.0001 11.5999 12.4001C13.9999 14.8001 17.7999 15.0001 20.2999 12.8001C20.5999 12.5001 21.0999 12.5001 21.3999 12.7001C21.7999 12.9001 21.9999 13.3001 21.8999 13.7001C21.5999 15.8001 20.5999 17.6001 19.1999 19.1001C17.2999 21.0001 14.7999 22.0001 12.2999 22.0001Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="content">
                                            <span>Z</span>
                                            <svg fill="none" viewBox="0 0 24 24" height={48} width={48} className="icon" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="url(#gradient-full)" d="M8.49995 22.9999C8.19995 22.9999 7.89995 22.8999 7.59995 22.7999C6.79995 22.3999 6.39995 21.5999 6.59995 20.7999L7.79995 14.9999H5.99995C5.19995 14.9999 4.49995 14.4999 4.19995 13.7999C3.89995 13.0999 3.99995 12.2999 4.59995 11.7999L14.0999 1.6999C14.6999 1.0999 15.6999 0.899901 16.3999 1.2999C17.1999 1.6999 17.5999 2.4999 17.3999 3.2999L16.1999 9.0999H17.9999C18.7999 9.0999 19.4999 9.5999 19.7999 10.2999C20.0999 10.9999 19.9999 11.7999 19.3999 12.2999L9.89995 22.3999C9.49995 22.7999 8.99995 22.9999 8.49995 22.9999Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <svg style={{ visibility: 'hidden', width: 0, height: 0 }}>
                                        <defs>
                                            <linearGradient id="gradient-full" x1="0%" y1="0%" x2="120%" y2="120%">
                                                <stop offset="0%" stopColor="#ffffff" />
                                                <stop offset="100%" stopColor="#ffffff00" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="lines">
                                        <div className="line" />
                                        <div className="line" />
                                    </div>
                                </div>
                                <div style={{ marginTop: '0.75rem', width: '100%', textAlign: 'center' }}>
                                    <h3>3D Canvas Sandbox</h3>
                                    <p>Hardware accelerated layer coordinate mapping keeps text layouts extremely crisp.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PREMIUM SPOTLIGHT ── */}
            <section className="lp-spotlight">
                <div className="lp-wrap spotlight-grid">
                    <div className="spotlight-text">
                        <span className="section-pre">STUDIO EXCLUSIVE</span>
                        <h2>Premium Font Assets</h2>
                        <p>
                            Elevate your study notes and presentation layouts. Gain access to the world's most highly refined font families designed to reduce eye strain and maximize readability.
                        </p>
                        <button className="primary-glow-btn" onClick={onStartLearning}>
                            <span>Unlock All Assets</span>
                            <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                        </button>
                    </div>
                    <div className="spotlight-card-container">
                        <div className="spotlight-card">
                            <div className="spotlight-wrapper">
                                <div className="spotlight-image">Aa</div>
                                <div className="spotlight-content">
                                    <p className="spotlight-title">Uiverse Premium Font</p>
                                    <div className="spotlight-price-row">
                                        <p className="spotlight-price">INR 249</p>
                                        <p className="spotlight-old-price">INR 499</p>
                                    </div>
                                </div>
                                <button className="spotlight-btn" onClick={onStartLearning}>DOWNLOAD</button>
                            </div>
                            <p className="spotlight-tag">-50%</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TIMELINE WORKFLOW ── */}
            <section className="lp-how" id="workflow">
                <div className="lp-wrap">
                    <div className="section-title-container">
                        <span className="section-pre">TECHNICAL SCHEMATIC</span>
                        <h2 className="section-h2">Local Reading Pipelines</h2>
                        <p className="section-desc">Experience zero-cost serving. Everything runs on client CPU threads.</p>
                    </div>

                    <div className="flow-timeline">
                        <div className="flow-step">
                            <div className="flow-step-number">01</div>
                            <div className="flow-step-glow"></div>
                            <h3>Load &amp; Initialize</h3>
                            <p>Inject your document or tap archive collections. The browser allocates sandbox memory instantly.</p>
                        </div>
                        <div className="flow-connector">
                            <div className="connector-line"></div>
                            <div className="connector-pulse"></div>
                        </div>
                        <div className="flow-step">
                            <div className="flow-step-number">02</div>
                            <div className="flow-step-glow"></div>
                            <h3>GPU Rasterization</h3>
                            <p>Text blocks and layers render dynamically to local Canvas nodes, keeping frame rates at maximum speed.</p>
                        </div>
                        <div className="flow-connector">
                            <div className="connector-line"></div>
                            <div className="connector-pulse"></div>
                        </div>
                        <div className="flow-step">
                            <div className="flow-step-number">03</div>
                            <div className="flow-step-glow"></div>
                            <h3>Workspace Activation</h3>
                            <p>Write notes, track reading progress, and maintain timer limits. Everything saves to secure localStorage cache.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="lp-footer">
                <div className="lp-wrap footer-flex">
                    <div className="footer-brand">
                        <span className="brand-dot">●</span>
                        <p>© 2026 skillTadka. Designed under the Vrindopnishad Focus standard.</p>
                    </div>
                    <div className="footer-links">
                        <button className="footer-link-btn" onClick={() => onStartLearning()}>Launch Dashboard</button>
                        <span className="bullet-sep">•</span>
                        <a href="#features" className="footer-link">Features</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
