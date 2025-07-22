import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useGTM = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'pageview',
          page: url,
        });
        console.log('GTM pageview sent:', {
          event: 'pageview',
          page: url,
        });
      } else {
        console.warn(`GTM datalayer does not exist`);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
};
