'use client';

import { useEffect, useRef, useState } from 'react';

const cursorStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  border: '2px solid var(--accent-1)',
  borderRadius: '50%',
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  transition: 'transform 0.1s ease, background 0.2s ease',
};

const cursorHoverStyle: React.CSSProperties = {
  ...cursorStyle,
  transform: 'scale(2)',
  background: 'var(--accent-1)',
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let animationId: number;

    const animateCursor = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.1;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }

      animationId = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .bento-card, .service-card, .gallery-item, .info-card, .value-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Re-attach hover listeners when DOM changes
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, .bento-card, .service-card, .gallery-item, .info-card, .value-card'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      style={isHovering ? cursorHoverStyle : cursorStyle}
    />
  );
}
