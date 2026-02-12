'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // IntersectionObserverを使用してパフォーマンス改善
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // 一度表示されたら監視を解除
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}

export function useMultipleScrollReveal(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // IntersectionObserverを使用してパフォーマンス改善
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // 一度表示されたら監視を解除
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px',
      }
    );

    // 既存の要素を監視
    refs.current.forEach((el) => {
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [count]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
    // 新しい要素が追加されたら監視開始
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  };

  return setRef;
}
