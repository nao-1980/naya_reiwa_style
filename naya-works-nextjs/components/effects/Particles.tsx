'use client';

import { useEffect, useRef, useState } from 'react';

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -1,
  overflow: 'hidden',
};

interface ParticleConfig {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  xMove: number;
  yMove: number;
}

export default function Particles() {
  const [particles, setParticles] = useState<ParticleConfig[]>([]);
  const stylesRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const particleConfigs: ParticleConfig[] = [];
    for (let i = 0; i < 40; i++) {
      particleConfigs.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 15 + 20,
        xMove: (Math.random() - 0.5) * 200,
        yMove: (Math.random() - 0.5) * 200,
      });
    }
    setParticles(particleConfigs);

    // Create keyframe animations
    const style = document.createElement('style');
    const keyframes = particleConfigs
      .map(
        (p) => `
        @keyframes floatP${p.id} {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(${p.xMove}px, ${p.yMove}px); }
        }
      `
      )
      .join('\n');
    style.textContent = keyframes;
    document.head.appendChild(style);
    stylesRef.current = style;

    return () => {
      if (stylesRef.current) {
        document.head.removeChild(stylesRef.current);
      }
    };
  }, []);

  return (
    <div style={containerStyle}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            background: 'var(--gradient-main)',
            borderRadius: '50%',
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `floatP${particle.id} ${particle.duration}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
