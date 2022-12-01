import { useMemo } from 'react';
import { useRouter } from 'next/router';

const useI18n = () => {
  const { locale } = useRouter();

  const country = useMemo(
    () =>
      ({
        en: 'GB',
        de: 'DE',
      }[locale]),
    [locale],
  );

  return { country };
};

export default useI18n;
