const localizationMapper = {
  en: { locale: 'en_GB@GBP', currency: 'GBP', currencyCode: '£', countryCode: 'GB', countryName: 'Great Britain' },
  de: { locale: 'de_DE@EUR', currency: 'EUR', currencyCode: '€', countryCode: 'DE', countryName: 'Germany' },
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
