const languageMapper = {
  en: 'en_GB@GBP',
  de: 'de_DE@EUR',
};

const SDKLanguageMapper = {
  en: 'en-GB',
  de: 'de-DE',
};

const localeMapper = {
  en: 'en_GB',
  de: 'de_DE',
};

const mapLanguage = (lang) => {
  if (!languageMapper[lang]) {
    console.error(`Language mapper is missing language ${lang}`);
  }

  //If language is not defined in languageMapper then select first locale
  return languageMapper[lang] || languageMapper[Object.keys(languageMapper)[0]];
};

const mapSDKLanguage = (lang) => {
  if (!SDKLanguageMapper[lang]) {
    console.error(`SDK language mapper is missing language ${lang}`);
  }

  //If language is not defined in SDKLanguageMapper then select first locale
  return SDKLanguageMapper[lang] || SDKLanguageMapper[Object.keys(SDKLanguageMapper)[0]];
};

const mapLocaleLanguage = (lang) => {
  if (!localeMapper[lang]) {
    console.error(`Locale language mapper is missing language ${lang}`);
  }

  return localeMapper[lang] || localeMapper[Object.keys(SDKLanguageMapper)[0]];
};

module.exports = { localeMapper, languageMapper, SDKLanguageMapper, mapLanguage, mapLocaleLanguage, mapSDKLanguage };
