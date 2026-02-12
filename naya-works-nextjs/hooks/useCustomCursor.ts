'use client';

import { useEffect, useState, useCallback } from 'react';

export function useCustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const interactiveElements = document.querySelectorAll(
      'a, button, .bento-card, .service-card, .gallery-item, .info-card, .value-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return { isHovering };
}
