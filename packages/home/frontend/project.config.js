export const languageMapper = {
    en: 'en_GB@USD',
    //en: 'en_US@USD',
    de: 'de_DE@EUR',
  };
  
  export const mapLanguage = (lang) => {
    if (!languageMapper[lang]) {
      console.error(`Language mapper is missing language ${lang}`);
    }
  
    //If language is not defined in languageMapper then select first locale
    return languageMapper[lang] || languageMapper[Object.keys(languageMapper)[0]];
  };
  