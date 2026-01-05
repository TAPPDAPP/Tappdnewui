import { useEffect } from 'react';

export function ViewportHandler() {
  useEffect(() => {
    // Set viewport meta tag programmatically if it doesn't exist
    const setViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      
      // Set optimal mobile viewport
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    };

    // Prevent zoom on iOS
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Fix viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Handle orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        setVH();
        window.scrollTo(0, 0);
      }, 100);
    };

    // Initialize
    setViewport();
    setVH();

    // Add event listeners
    document.addEventListener('touchstart', preventZoom, { passive: false });
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return null;
}