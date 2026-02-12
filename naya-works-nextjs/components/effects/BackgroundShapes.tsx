'use client';

import { useEffect, useRef } from 'react';

const shapeConfigs = [
  {
    className: 'bg-shape-1',
    style: {
      width: '600px',
      height: '600px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.3) 100%)',
      top: '-200px',
      left: '-100px',
    },
    speed: 0.05,
  },
  {
    className: 'bg-shape-2',
    style: {
      width: '500px',
      height: '500px',
      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.35) 0%, rgba(244, 114, 182, 0.25) 100%)',
      top: '30%',
      right: '-150px',
    },
    speed: 0.08,
  },
  {
    className: 'bg-shape-3',
    style: {
      width: '400px',
      height: '400px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)',
      bottom: '10%',
      left: '20%',
    },
    speed: 0.03,
  },
  {
    className: 'bg-shape-4',
    style: {
      width: '300px',
      height: '300px',
      background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%)',
      top: '60%',
      left: '-50px',
    },
    speed: 0.06,
  },
  {
    className: 'bg-shape-5',
    style: {
      width: '350px',
      height: '350px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)',
      top: '10%',
      right: '20%',
    },
    speed: 0.04,
  },
];

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

const baseShapeStyle: React.CSSProperties = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.5,
};

export default function BackgroundShapes() {
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollPosRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;

    const updateShapes = () => {
      shapesRef.current.forEach((shape, index) => {
        if (!shape) return;
        const config = shapeConfigs[index];
        const speed = config.speed;
        const direction = index % 2 === 0 ? 1 : -1;
        const scrollOffsetY = scrollPosRef.current * speed * direction * 100;
        const scrollOffsetX = scrollPosRef.current * speed * 0.3 * (index % 2 === 0 ? -1 : 1) * 100;
        const mouseIntensity = (index + 1) * 15;
        const mouseOffsetX = mouseRef.current.x * mouseIntensity;
        const mouseOffsetY = mouseRef.current.y * mouseIntensity;
        shape.style.transform = `translate(${scrollOffsetX + mouseOffsetX}px, ${scrollOffsetY + mouseOffsetY}px)`;
      });
      animationId = requestAnimationFrame(updateShapes);
    };

    const handleScroll = () => {
      scrollPosRef.current = window.scrollY / window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    updateShapes();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={containerStyle}>
      {shapeConfigs.map((config, index) => (
        <div
          key={config.className}
          ref={(el) => { shapesRef.current[index] = el; }}
          style={{ ...baseShapeStyle, ...config.style }}
        />
      ))}
    </div>
  );
}
