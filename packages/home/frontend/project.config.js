const localizationMapper = {
  en: {
    locale: 'en_GB',
    currency: 'GBP',
    currencyCode: '£',
    countryCode: 'GB',
    countryName: 'United Kingdom',
  },
  de: {
    locale: 'de_DE',
    currency: 'EUR',
    currencyCode: '€',
    countryCode: 'DE',
    countryName: 'Germany',
  },
};

const getLocalizationInfo = (locale) => {
  if (!(locale in localizationMapper)) {
    console.warn(
      `Invalid locale ${locale} provided. Possible values are ${Object.keys(localizationMapper).join(', ')}`,
    );

    return localizationMapper.en;
  }

  return localizationMapper[locale];
};

module.exports = { getLocalizationInfo };
