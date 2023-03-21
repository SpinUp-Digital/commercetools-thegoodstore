import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { getLocalizationInfo } from 'project.config';

const useGeo = () => {
  const { locale } = useRouter();

  const isValidZipcode = useCallback((zipcode: string) => {
    return zipcode && zipcode.length >= 3 && zipcode.length <= 9;
  }, []);

  const getInfoByZipcode = useCallback(
    async (zipcode: string) => {
      if (!isValidZipcode(zipcode)) return {};

      const { countryCode } = getLocalizationInfo(locale);

      const response = await fetch(`https://api.zippopotam.us/${countryCode.toLowerCase()}/${zipcode}`);

      const data = await response.json();

      return data;
    },
    [locale, isValidZipcode],
  );

  return { getInfoByZipcode };
};

export default useGeo;
