/* eslint-disable no-param-reassign */

/**
 * Retrieves a translation based on the provided key, language, and parameters.
 *
 * @param {object} translations - The translations object.
 * @param {string} key - The translation key.
 * @param {string} lang - The language code.
 * @param {object} directions - The language directions.
 * @param {string} fallbackLang - The fallback language code in case the translation is missing in the provided language.
 * @param {object} parameters - The parameters used to replace placeholders in the translation.
 * @return {object} - The translated object.
 * @return {string} [object.value] - The translated value.
 * @return {boolean} [object.fallback] - Whether the translation is a fallback.
 * @return {string} [object.lang] - The language code of the translation.
 * @return {string} [object.dir] - The text direction of the translation.
 * @throws {Error} - If the translation is missing for the provided key and language.
 */
// eslint-disable-next-line import/prefer-default-export

export function getTranslation(translations, key, lang, directions, fallbackLang = 'en', parameters) {
  // Debug mode, return key instead of translation
  if (lang === 'key') {
    return {
      value: key,
      fallback: true,
      lang,
      dir: 'ltr',
    };
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

  /**
   * Get language direction, fallback to ltr
   * @param {string} language - language code
   * @returns {string} - language direction
   */
  const getDir = (language) => directions[language] || 'ltr';

  // Find translation based on key, fallback if not found
  let translation = {
    value: null,
    fallback: false,
    lang: 'en',
    dir: 'ltr',
  };

  const translationKeyNotFound = !translations[key];
  const translationIsAnArray = Array.isArray(translations[key]);
  const translationIsObjectAndHasNoKeys =
    typeof translations[key] === 'object' && !translationIsAnArray && Object.keys(translations[key]).length === 0;

  // Tries to find translation in
  //   given language,
  //   fallback language or
  //   first available language,
  // in that order, returns translation key if not found

  if (translationKeyNotFound || translationIsObjectAndHasNoKeys) {
    // If translation is missing, return key
    translation = {
      value: key,
      fallback: true,
      lang: 'en',
      dir: 'ltr',
    };

    // eslint-disable-next-line no-console
    console.error(`Cookie consent: Missing translation key: ${key}, falling back to key as translation`);
  } else if (typeof translations[key] === 'string') {
    // Same translation for all languages.
    translation = {
      value: translations[key],
      fallback: false,
      lang,
      dir: getDir(lang),
    };
  } else if (typeof translations[key] === 'object' && !translationIsAnArray) {
    // Different translations for different languages.
    if (translations[key][lang] && translations[key][lang] !== '') {
      // Translation was found in given language, use it
      translation = {
        value: translations[key][lang],
        fallback: false,
        lang,
        dir: getDir(lang),
      };
    } else if (translations[key][fallbackLang] && translations[key][fallbackLang] !== '') {
      // Translation was not found in given language, but it was found in fallback language, use it
      translation = {
        value: translations[key][fallbackLang],
        fallback: true,
        lang: fallbackLang,
        dir: getDir(fallbackLang),
      };

      // Show error message only if wanted language is defined in directions (originally from siteSettings.languages)
      if (directions[lang]) {
        // eslint-disable-next-line no-console
        console.error(`Cookie consent: Missing translation: ${key}:${lang}, using fallback language: ${fallbackLang}`);
      }
    } else {
      // Translation was not found in given language or fallback language, use first available translation
      const firstLang = Object.keys(translations[key])[0];
      // translation = translations[key][firstLang];
      translation = {
        value: translations[key][firstLang],
        fallback: true,
        lang: firstLang,
        dir: getDir(firstLang),
      };
      // eslint-disable-next-line no-console
      console.error(
        `Cookie consent: Missing primary and fallback translation: ${key}:${lang}/${fallbackLang}, using first known language: ${firstLang}`,
      );
    }
  } else {
    // Translation is not a string, number or object
    throw new Error(`Cookie consent: Invalid translation: ${key}, should be string, number or object`);
  }

  if (translation && translation.value !== null) {
    // Convert translation value to string in case someone has used a number instead of a string
    translation.value = translation.value.toString();

    // Replace double curly braces in translation with corresponding data from parameters
    translation.value = translation.value.replace(/\{\{.+?\}\}/g, (match) => {
      const stripCurlyBraces = match.replace(/(^\{\{|\}\}$)/g, '');
      const parameter = index(parameters, stripCurlyBraces);

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
    return translation;
  }
  throw new Error(`Cookie consent: Missing translation: ${key}:${lang}`);
}
