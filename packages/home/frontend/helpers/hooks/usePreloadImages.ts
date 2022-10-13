import { useCallback, useEffect, useState } from 'react';
import useWindowLoaded from './useWindowLoaded';

const usePreloadImages = (sources: string[]) => {
  const [preloaded, setPreloaded] = useState(false);

  const windowLoaded = useWindowLoaded();

  const preloadImages = useCallback(() => {
    setPreloaded(false);

    for (const source of sources) {
      new Image().src = source;
    }

    setPreloaded(true);
  }, [sources]);

  useEffect(() => {
    if (windowLoaded) preloadImages();
  }, [windowLoaded, preloadImages]);

  return { preloaded };
};

export default usePreloadImages;
