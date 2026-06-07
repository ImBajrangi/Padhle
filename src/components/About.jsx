import React, { useEffect, useRef } from 'react';
import { Shield, Zap, Palette, ServerOff, Smartphone, Diamond, Sparkles, Layers, Cpu } from 'lucide-react';

export default function About() {
    const pinWrapperRef = useRef(null);
    const pinTrackRef = useRef(null);

    useEffect(() => {
        let requestRef;
        let currentProgress = 0;
        let targetProgress = 0;
        const lerpFactor = 0.1; // Smoothness factor

        const updatePin = () => {
            if (pinWrapperRef.current && pinTrackRef.current) {
                const wrapper = pinWrapperRef.current;
                const track = pinTrackRef.current;
                const rect = wrapper.getBoundingClientRect();
                const wrapperH = wrapper.offsetHeight;
                const viewH = window.innerHeight;
                const scrollableDistance = wrapperH - viewH;

                if (scrollableDistance > 0) {
                    // Offset rect.top by header height (80px) for progress sync
                    const headerOffset = 80;
                    let rawProgress = -(rect.top - headerOffset) / scrollableDistance;
                    targetProgress = Math.max(0, Math.min(1, rawProgress));
                }

                // Lerp the progress for that "premium" smooth lag feel
                currentProgress += (targetProgress - currentProgress) * lerpFactor;

                // Precise panel-based translation (4 panels total)
                const PANELS = 4;
                const translateX = currentProgress * -(PANELS - 1) * 100;
                track.style.transform = `translate3d(${translateX}vw, 0, 0)`;

                // Update per-panel focus and highlight progress
                const panels = track.querySelectorAll('.journey-panel');
                panels.forEach((panel, i) => {
                    const panelProgress = (currentProgress * (PANELS - 1)) - i;
                    // Focus: 1 when panel is centered (panelProgress = 0)
                    const focusFactor = Math.max(0, 1 - Math.abs(panelProgress) * 1.5);
                    panel.classList.toggle('is-focused', focusFactor > 0.5);

                    // Highlight progress: 0 to 1 as panel comes into focus
                    const highlightProgress = Math.max(0, Math.min(1, (panelProgress + 0.5) * 2));
                    panel.style.setProperty('--highlight-progress', highlightProgress.toFixed(2));

                    // Special handle for hx-13 select-width
                    if (i === 3) { // 4th panel
                        const selectProgress = Math.max(0, Math.min(1, (panelProgress + 0.5) * 2));
                        panel.style.setProperty('--select-width', `${(selectProgress * 103).toFixed(2)}%`);
                    }
                });
            }
            requestRef = requestAnimationFrame(updatePin);
        };

        requestRef = requestAnimationFrame(updatePin);
        return () => cancelAnimationFrame(requestRef);
    }, []);

    return (
        <div className="about-page fade-in">
            {/* Dynamic Immersive Hero */}
            <section className="about-hero bento-hero">
                <div className="hero-mesh"></div>
                <div className="aurora-orb orb-lavender" style={{ '--mx': '20%', '--my': '20%' }}></div>
                <div className="aurora-orb orb-gold" style={{ '--mx': '80%', '--my': '80%' }}></div>

                <div className="about-hero-inner">
                    <div className="about-content">
                        <div className="status-pill floating">
                            <Sparkles size={12} className="mr-2" />
                            The Studio Standard
                        </div>
                        <h2 className="about-title outline-text">skillTadka<br /><span className="solid-text">STUDIO</span></h2>
                        <p className="about-subtitle">
                            A masterclass in digital focus. We've stripped away the noise to engineer
                            the world's most premium, private, and frictionless academic toolkit.
                        </p>
                    </div>

                    <div className="about-holo-wrapper" aria-hidden="true">
                        <div className="holo-logo">
                            <div className="holo-layer holo-layer--back">ST</div>
                            <div className="holo-layer holo-layer--mid">ST</div>
                            <div className="holo-layer holo-layer--front">ST</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Original Bento Grid Restoration */}
            <div className="about-container">
                <div className="bento-grid-master">
                    {/* Bento 1: Ultra Privacy (Large Square) */}
                    <div className="bento-card bento-privacy">
                        <div className="bento-glass-overlay"></div>
                        <div className="bento-icon-wrap glow-shield">
                            <Shield size={42} strokeWidth={1.5} />
                        </div>
                        <h3>Absolute Privacy</h3>
                        <p>
                            Designed on the principle of "Local-First" architecture.
                            Zero cloud telemetry. Your study materials remain strictly on your machine.
                        </p>
                        <div className="bento-stats horizontal">
                            <div className="b-stat"><span>100%</span>Local Safe</div>
                            <div className="b-stat"><span>0</span>Leaks</div>
                        </div>
                    </div>

                    {/* Bento 2: Performance (Tall Rectangle) */}
                    <div className="bento-card bento-performance">
                        <div className="bento-glass-overlay"></div>
                        <div className="bento-icon-wrap text-gold">
                            <Zap size={36} strokeWidth={1.5} />
                        </div>
                        <h3>Engineered for Flow</h3>
                        <p>
                            Powered by an optimized rendering core, skillTadka eliminates the microscopic delays that break concentration.
                        </p>
                        <div className="perf-tag-list">
                            <span className="perf-tag"><Cpu size={14} /> Core V2</span>
                            <span className="perf-tag"><Zap size={14} /> 60fps</span>
                        </div>
                        <div className="perf-bar-group">
                            <div className="perf-bar"><div className="fill" style={{ width: '98%' }}></div><span>Speed</span></div>
                            <div className="perf-bar"><div className="fill" style={{ width: '95%' }}></div><span>Clarity</span></div>
                        </div>
                    </div>

                    {/* Bento 3: Offline (Small Square) */}
                    <div className="bento-card bento-offline">
                        <div className="bento-glass-overlay"></div>
                        <ServerOff size={28} className="text-secondary mb-3" />
                        <h4>Offline Power</h4>
                        <p>Total functionality without connection. Study anywhere.</p>
                    </div>

                    {/* Bento 4: Aesthetics (Wide Rectangle) */}
                    <div className="bento-card bento-aesthetics">
                        <div className="bento-glass-overlay"></div>
                        <div className="bento-icon-wrap text-indigo">
                            <Palette size={32} />
                        </div>
                        <div className="aes-content">
                            <h3>Studio Detail</h3>
                            <p>
                                Every pixel is intentional. From mesh gradients to glassmorphism,
                                the UI acts as a calm framing device for your knowledge.
                            </p>
                            <div className="aes-features">
                                <span><Layers size={14} /> Glassmorphism</span>
                                <span><Sparkles size={14} /> Micro-animations</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento 5: Responsive (Small Square) */}
                    <div className="bento-card bento-responsive">
                        <div className="bento-glass-overlay"></div>
                        <Smartphone size={28} className="text-secondary mb-3" />
                        <h4>Fluid UI</h4>
                        <p>Perfectly maps to desktop, tablet, and mobile paradigms.</p>
                    </div>
                </div>
            </div>

            {/* NEW: The Studio Journey (Horizontal Scroll Effect) */}
            <div className="journey-section-wrapper" ref={pinWrapperRef}>
                <div className="journey-pin-inner">
                    <div className="journey-track" ref={pinTrackRef}>
                        <div className="journey-panel panel-intro">
                            <div className="panel-content">
                                <span className="panel-number">01</span>
                                <h2>THE CONCEPT</h2>
                                <p>We started with a <span className="studio-highlight">blank canvas</span> and one rule: respect the silence of thought.</p>
                                <div className="panel-deco">◈</div>
                            </div>
                        </div>
                        <div className="journey-panel panel-craft">
                            <div className="panel-content">
                                <span className="panel-number">02</span>
                                <h2>THE CRAFT</h2>
                                <p>Months of engineering to ensure every transition feels <span className="studio-highlight">physical</span> and purposeful.</p>
                                <div className="panel-deco">✧</div>
                            </div>
                        </div>
                        <div className="journey-panel panel-flow">
                            <div className="panel-content">
                                <span className="panel-number">03</span>
                                <h2>THE FLOW</h2>
                                <p>An interface that doesn't just work, but vanishes, leaving only <span className="studio-highlight">you and your goals</span>.</p>
                                <div className="panel-deco">✦</div>
                            </div>
                        </div>

                        <div className="journey-panel panel-reflection">
                            <div className="panel-content">
                                <span className="panel-number">04</span>
                                <h2>REFLECTIONS</h2>
                                <p>
                                    <span className="hx-13"><span className="hx__select"></span>"Actions that would be deemed unethical or reprehensible on an individual level can be rationalized and justified within the context of the crowd."</span>
                                </p>
                                <div className="panel-deco">◉</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Context / CTA */}
            <section className="company-info premium-cta">
                <div className="company-logo float-slow">
                    <Diamond size={48} strokeWidth={1} />
                </div>
                <h4>A Vrindopnishad Masterpiece</h4>
                <p>
                    We build tools that respect the student's intellect. No gimmicks, no superficial features—just raw, unfiltered performance wrapped in unprecedented elegance.
                </p>
                <div className="cta-actions">
                    <button className="elite-btn primary shimmer-btn">Experience The Studio</button>
                </div>
            </section>
        </div>
    );
}
