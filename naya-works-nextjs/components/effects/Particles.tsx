'use client';

import { useEffect, useState } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // SSRガード
    if (typeof window === 'undefined') return;

    // スマホ判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // パーティクル数をスマホでは15、デスクトップでは40に
    const particleCount = window.innerWidth < 768 ? 15 : 40;
    const particleConfigs: ParticleConfig[] = [];

    for (let i = 0; i < particleCount; i++) {
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

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // スマホではパーティクルを非表示にしてパフォーマンス改善
  if (isMobile) {
    return null;
  }

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
            // Safari互換: CSS変数を使わず、直接transformをアニメーション
            animation: `floatParticle-${particle.id} ${particle.duration}s ease-in-out infinite`,
          }}
        >
          <style>{`
            @keyframes floatParticle-${particle.id} {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(${particle.xMove}px, ${particle.yMove}px); }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
