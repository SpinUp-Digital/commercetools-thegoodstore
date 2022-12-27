import React, { useCallback, useEffect } from 'react';

const useResizeObserver = (ref: React.RefObject<HTMLElement>, callback: (entry?: ResizeObserverEntry) => void) => {
  const resizeCallback = useCallback(
    (entries: ResizeObserverEntry[]) => {
      callback(entries[0]);
    },
    [callback],
  );

  useEffect(() => {
    callback();
    const observer = new ResizeObserver(resizeCallback);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback, resizeCallback]);
};

export default useResizeObserver;
