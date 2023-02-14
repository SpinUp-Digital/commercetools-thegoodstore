import { useCallback } from 'react';
import ccType from 'credit-card-type';

const useResolveCCImage = () => {
  const resolveCCImage = useCallback((number: string) => {
    const types = ccType(number);

    if (!number || types.length == 0) return '';

    return (
      {
        visa: '/images/visa.png',
        mastercard: '/images/mc.png',
      }[types[0].type] ?? ''
    );
  }, []);

  return resolveCCImage;
};

export default useResolveCCImage;
