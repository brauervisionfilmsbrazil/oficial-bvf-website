import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initMetaPixel, MetaEvents } from '@/lib/metaPixel';

export const useMetaPixel = () => {
  const location = useLocation();

  // Initialize pixel on mount
  useEffect(() => {
    initMetaPixel();
  }, []);

  // Track page views on route change
  useEffect(() => {
    MetaEvents.PageView();
  }, [location.pathname]);

  return {
    trackEvent: MetaEvents,
  };
};
