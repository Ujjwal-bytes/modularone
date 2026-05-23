// hooks/useSectionObserver.js
import { useEffect, useState, useRef } from 'react';

export const useSectionObserver = (sectionId, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -100px 0px', // Adjusts when observer triggers
      }
    );

    const currentElement = sectionRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { sectionRef, isVisible };
};