import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useHash = () => {
  //next/router
  const router = useRouter();

  //current window hash
  const [hash, setHash] = useState(typeof window === 'undefined' ? '#' : window.location.hash.split('/')[0] || '#');
  const [id, setId] = useState(typeof window === 'undefined' ? undefined : window.location.hash.split('/')[1]);

  //update window hash
  const updateWindowHash = useCallback(() => {
    setHash(window.location.hash.split('/')[0] || '#');
    setId(window.location.hash.split('/')[1]);
  }, []);

  useEffect(() => {
    router.events.on('hashChangeComplete', updateWindowHash);
    return () => router.events.off('hashChangeComplete', updateWindowHash);
  }, [updateWindowHash, router.events]);

  return [hash, id];
};

export default useHash;
