import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
  }
}

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is loaded (it is loaded asynchronously in index.html)
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-5K6CX06E5S', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default Analytics;