'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const revealOnScroll = () => {
      const top = element.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        element.classList.add('active');
      }
    };

    // Initial check
    revealOnScroll();

    window.addEventListener('scroll', revealOnScroll);
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return ref;
}

export function useMultipleScrollReveal(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const revealOnScroll = () => {
      refs.current.forEach((el) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    // Initial check
    revealOnScroll();

    window.addEventListener('scroll', revealOnScroll);
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, [count]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return setRef;
}
