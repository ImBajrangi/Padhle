import { useEffect, useRef } from 'react';

/* ── Aurora mesh – 4 drifting colour orbs, pure CSS animation ── */
export default function Background() {
    const ref = useRef(null);

    /* Optional: subtle mouse parallax on orbs */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y}px`);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div className="aurora" ref={ref} aria-hidden="true">
            <div className="aurora-orb orb-coral" />
            <div className="aurora-orb orb-mint" />
            <div className="aurora-orb orb-lavender" />
            <div className="aurora-orb orb-gold" />
            <div className="aurora-noise" />
        </div>
    );
}
