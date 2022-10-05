import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = (callback: CallableFunction) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) callback();
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return { ref };
};

export default useClickOutside;
