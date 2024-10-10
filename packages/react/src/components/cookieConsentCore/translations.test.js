import { getTranslation } from './translations';

describe('getTranslation', () => {
  const translations = {
    greeting: {
      en: 'Hello',
      fi: 'Hei',
      sv: 'Hej',
      ar: 'مرحبا',
    },
    farewell: 'Goodbye',
    template: {
      en: 'Template to fill in ${value} <-',
      fi: 'Templaatti johon täytetään ${value} <-',
    },
  };

  const directions = {
    en: 'ltr',
    fi: 'ltr',
    sv: 'ltr',
    de: 'ltr',
    ar: 'rtl',
  };

  it('should return the correct direction for the language with rtl direction', () => {
    const result = getTranslation(translations, 'greeting', 'ar', directions, 'fi', {});
    expect(result).toEqual({
      value: 'مرحبا',
      fallback: false,
      lang: 'ar',
      dir: 'rtl',
    });
  });

  it('should use default fallback language if no fallback language is provided', () => {
    const result = getTranslation(translations, 'greeting', 'de', directions, undefined, {});
    expect(result).toEqual({
      value: 'Hello',
      fallback: true,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should return the key when lang is "key"', () => {
    const result = getTranslation(translations, 'greeting', 'key', directions, 'en', {});
    expect(result).toEqual({
      value: 'greeting',
      fallback: true,
      lang: 'key',
      dir: 'ltr',
    });
  });

  it('should return the same translation for all languages when translation is a string', () => {
    const resultFi = getTranslation(translations, 'farewell', 'fi', directions, 'en', {});
    expect(resultFi).toEqual({
      value: 'Goodbye',
      fallback: false,
      lang: 'fi',
      dir: 'ltr',
    });

    const resultSv = getTranslation(translations, 'farewell', 'sv', directions, 'en', {});
    expect(resultSv).toEqual({ ...resultFi, lang: 'sv' });
  });

  it('should return the translation in the specified language', () => {
    const result = getTranslation(translations, 'greeting', 'fi', directions, 'en', {});
    expect(result).toEqual({
      value: 'Hei',
      fallback: false,
      lang: 'fi',
      dir: 'ltr',
    });
  });

  it('should return the fallback translation if the specified language is missing', () => {
    const result = getTranslation(translations, 'greeting', 'de', directions, 'en', {});
    expect(result).toEqual({
      value: 'Hello',
      fallback: true,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should return the first available translation if both specified and fallback languages are missing', () => {
    const result = getTranslation(translations, 'greeting', 'de', directions, 'fr', {});
    expect(result).toEqual({
      value: 'Hello',
      fallback: true,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should return the translation key if the translation is missing', () => {
    const result = getTranslation(translations, 'missingKey', 'en', directions, 'en', {});
    expect(result).toEqual({
      value: 'missingKey',
      fallback: true,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should replace parameters in the translation', () => {
    const result = getTranslation(translations, 'template', 'en', directions, 'en', { value: 'value to fill' });
    expect(result).toEqual({
      value: 'Template to fill in value to fill <-',
      fallback: false,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should handle template parameters', () => {
    const parameters = {
      value: {
        en: 'value',
        fi: 'arvo',
      },
    };
    const result = getTranslation(translations, 'template', 'fi', directions, 'en', parameters);
    expect(result).toEqual({
      value: 'Templaatti johon täytetään arvo <-',
      fallback: false,
      lang: 'fi',
      dir: 'ltr',
    });
  });

  it('should handle template parameters with fallback language support when parameter is missing', () => {
    const parameters = {
      value: {
        en: 'value',
      },
    };
    const result = getTranslation(translations, 'template', 'fi', directions, 'en', parameters);
    expect(result).toEqual({
      value: 'Templaatti johon täytetään value <-',
      fallback: false,
      lang: 'fi',
      dir: 'ltr',
    });
  });

  it('should throw an error if the translation is invalid', () => {
    const invalidTranslations = {
      invalid: 123,
    };
    expect(() => {
      getTranslation(invalidTranslations, 'invalid', 'en', directions, 'en', {});
    }).toThrow('Cookie consent: Invalid translation: invalid, should be string, number or object');
  });

  it('should handle missing parameters gracefully', () => {
    const result = getTranslation(translations, 'template', 'en', directions, 'en', {});
    expect(result).toEqual({
      value: 'Template to fill in undefined <-',
      fallback: false,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should use fallback language for parameters if translation is missing', () => {
    const parameters = {
      value: {
        fi: 'arvo',
      },
    };
    const result = getTranslation(translations, 'template', 'en', directions, 'en', parameters);
    expect(result).toEqual({
      value: 'Template to fill in arvo <-',
      fallback: false,
      lang: 'en',
      dir: 'ltr',
    });
  });

  it('should use first available language for parameters if translation is missing in both specified and fallback languages', () => {
    const parameters = {
      value: {
        sv: 'värde',
      },
    };
    const result = getTranslation(translations, 'template', 'en', directions, 'en', parameters);
    expect(result).toEqual({
      value: 'Template to fill in värde <-',
      fallback: false,
      lang: 'en',
      dir: 'ltr',
    });
  });
});
