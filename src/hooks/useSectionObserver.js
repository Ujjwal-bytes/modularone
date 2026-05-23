// hooks/useSectionObserver.js
import { useEffect, useState, useRef } from 'react';

export const useSectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(true); // Start with TRUE so button shows initially
  const sectionRef = useRef(null);

  useEffect(() => {
    console.log('useSectionObserver - Setting up observer');
    
    // Create observer with better configuration
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('IntersectionObserver - isIntersecting:', entry.isIntersecting);
        console.log('IntersectionObserver - intersectionRatio:', entry.intersectionRatio);
        console.log('IntersectionObserver - boundingRect.top:', entry.boundingClientRect.top);
        
        // Show button if ANY part of the section is visible
        // Use isIntersecting OR if the section is above/below viewport with margin
        const shouldBeVisible = entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight;
        console.log('shouldBeVisible:', shouldBeVisible);
        
        setIsVisible(shouldBeVisible);
      },
      {
        threshold: [0, 0.1, 0.5], // Multiple thresholds
        rootMargin: '200px 0px 200px 0px', // Add margin to trigger earlier/later
      }
    );

    const currentElement = sectionRef.current;
    console.log('useSectionObserver - currentElement exists:', !!currentElement);
    
    if (currentElement) {
      observer.observe(currentElement);
      console.log('useSectionObserver - Started observing');
      
      // Initial check
      const rect = currentElement.getBoundingClientRect();
      const isVisibleNow = rect.top < window.innerHeight && rect.bottom > 0;
      console.log('Initial visibility check:', isVisibleNow);
      setIsVisible(isVisibleNow);
    } else {
      console.log('useSectionObserver - No element to observe yet');
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
        console.log('useSectionObserver - Stopped observing');
      }
    };
  }, [threshold]);

  return { sectionRef, isVisible };
};