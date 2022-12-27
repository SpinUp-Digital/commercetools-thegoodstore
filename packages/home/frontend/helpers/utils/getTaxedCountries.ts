import { ShippingMethod } from '@commercetools/frontend-domain-types/cart/ShippingMethod';
import { countryOptions } from 'helpers/countryOptions';

const findDuplicates = (arr: string[]) => {
  return arr.filter((item, index) => index !== arr.indexOf(item));
};

export const getTaxedCountries = (shippingMethods?: ShippingMethod[], projectSettingsCountries?: string[]) => {
  //list of countries with taxes information
  const taxedCountries: string[] = [];

  shippingMethods?.forEach((shippingMethod) => {
    shippingMethod?.rates?.forEach((rate) => {
      rate?.locations?.forEach((location) => {
        const listOfCountryOptions = countryOptions.map((country) => country.data);
        if (
          listOfCountryOptions.includes(location.country as string) &&
          !taxedCountries.includes(location.country as string)
        ) {
          taxedCountries.push(location.country as string);
        }
      });
    });
  });

  // combine countries from both lists without duplicates and sort them
  const availableCountries = findDuplicates([...taxedCountries, ...(projectSettingsCountries ?? [])]).sort();

  //find country options that match available countries
  return countryOptions.filter((country) => availableCountries?.indexOf(country.data) !== -1);
};
