import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useHash = () => {
  const router = useRouter();
  const [hash, setHash] = useState('#');
  const [id, setId] = useState<string | undefined>(undefined);

  const updateHash = () => {
    setHash(window.location.hash.split('/')[0] || '#');
    setId(window.location.hash.split('/')[1]);
  };

  useEffect(() => {
    updateHash();

    router.events.on('hashChangeComplete', updateHash);
    return () => {
      router.events.off('hashChangeComplete', updateHash);
    };
  }, [router.events]);

  return [hash, id];
};

export default useHash;
