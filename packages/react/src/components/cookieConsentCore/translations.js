/* eslint-disable no-param-reassign */

/**
 * Retrieves a translation based on the provided key, language, and parameters.
 *
 * @param {object} translations - The translations object.
 * @param {string} key - The translation key.
 * @param {string} lang - The language code.
 * @param {string} fallbackLang - The fallback language code in case the translation is missing in the provided language.
 * @param {object} parameters - The parameters used to replace placeholders in the translation.
 * @return {string} - The translated string.
 * @throws {Error} - If the translation is missing for the provided key and language.
 */
// eslint-disable-next-line import/prefer-default-export
export function getTranslation(translations, key, lang, fallbackLang, parameters) {
  // Debug mode, return key instead of translation
  if (lang === 'key') {
    return key;
  }

  // Fallback language is English by default
  if (!fallbackLang) {
    fallbackLang = 'en';
  }

  // Normal strings as template strings, use like:
  // index({ a: 1, b: 2 }, "${a} is smaller than ${b}")
  // returns: 1 is smaller than 2
  // https://stackoverflow.com/a/41540381
  function index(obj, is, value) {
    if (typeof is === 'string') {
      is = is.split('.');
    }
    if (is.length === 1 && value !== undefined) {
      obj[is[0]] = value;
      return value;
    }
    if (is.length === 0) {
      return obj;
    }
    return index(obj[is[0]], is.slice(1), value);
  }

  // Find translation based on key, fallback if not found
  let translation = null;

  const translationNotFound = !translations[key];
  const translationIsAnArray = Array.isArray(translations[key]);
  const translationIsObjectAndHasNoKeys =
    typeof translations[key] === 'object' && !translationIsAnArray && Object.keys(translations[key]).length === 0;

  // Tries to find translation in
  //   given language,
  //   fallback language or
  //   first available language,
  // in that order, returns translation key if not found

  if (translationNotFound || translationIsObjectAndHasNoKeys) {
    // If translation is missing, return key

    translation = key;
    // eslint-disable-next-line no-console
    console.error(`Cookie consent: Missing translation key: ${key}, falling back to key as translation`);
  } else if (typeof translations[key] === 'string' || typeof translations[key] === 'number') {
    // Same translation for all languages.
    translation = translations[key];
  } else if (typeof translations[key] === 'object' && !translationIsAnArray) {
    // Different translations for different languages.
    if (translations[key][lang]) {
      // Translation was found in given language, use it
      translation = translations[key][lang];
    } else if (translations[key][fallbackLang]) {
      // Translation was not found in given language, but it was found in fallback language, use it
      translation = translations[key][fallbackLang];
      // eslint-disable-next-line no-console
      console.error(`Cookie consent: Missing translation: ${key}:${lang}, using fallback language: ${fallbackLang}`);
    } else {
      // Translation was not found in given language or fallback language, use first available translation
      const firstLang = Object.keys(translations[key])[0];
      translation = translations[key][firstLang];
      // eslint-disable-next-line no-console
      console.error(
        `Cookie consent: Missing primary and fallback translation: ${key}:${lang}/${fallbackLang}, using first known language: ${firstLang}`,
      );
    }
  } else {
    // Translation is not a string, number or object
    throw new Error(`Cookie consent: Invalid translation: ${key}, should be string, number or object`);
  }

  if (translation) {
    // Replace dollar strings in translation with corresponding data from parameters
    return translation.replace(/\$\{.+?\}/g, (match) => {
      const stripDollarAndParenthesis = match.replace(/(^\$\{|\}$)/g, '');
      const parameter = index(parameters, stripDollarAndParenthesis);

      // Parameters may be either string or an language object
      if (typeof parameter === 'object') {
        if (parameter[lang]) {
          return parameter[lang];
        }

        // Use fallback language if translation is missing
        if (parameter[fallbackLang]) {
          return parameter[fallbackLang];
        }

        // Use first available language if translation is missing
        const firstLang = Object.keys(parameter)[0];
        if (firstLang) {
          return parameter[firstLang];
        }
      }
      return parameter;
    });
  }
  throw new Error(`Cookie consent: Missing translation: ${key}:${lang}`);
}
