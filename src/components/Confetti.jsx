import { useEffect, useState } from 'react';

const COLORS = ['#FF6B4A', '#48d1a5', '#7C83FF', '#FFB84D', '#FF6B8A', '#4AD4FF'];

function Particle({ color, style }) {
    return <div className="confetti-particle" style={{ ...style, background: color }} />;
}

export default function Confetti({ trigger }) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!trigger) return;
        const newParticles = Array.from({ length: 40 }, (_, i) => ({
            id: Date.now() + i,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            style: {
                '--x': `${(Math.random() - 0.5) * 600}px`,
                '--y': `${-Math.random() * 400 - 100}px`,
                '--r': `${Math.random() * 720 - 360}deg`,
                '--s': 0.5 + Math.random() * 1,
                left: '50%',
                top: '40%',
                animationDelay: `${Math.random() * 0.3}s`,
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            },
        }));
        setParticles(newParticles);
        const timer = setTimeout(() => setParticles([]), 1800);
        return () => clearTimeout(timer);
    }, [trigger]);

    if (!particles.length) return null;

    return (
        <div className="confetti-container" aria-hidden="true">
            {particles.map((p) => (
                <Particle key={p.id} color={p.color} style={p.style} />
            ))}
        </div>
    );
}
