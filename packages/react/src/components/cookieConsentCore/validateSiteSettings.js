const STORAGE_TYPES = new Set([1, 2, 3, 4, 5]);

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const requireNonEmptyString = (value, path) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Cookie consent: Invalid siteSettings.${path}; expected a non-empty string.`);
  }
};

const validateLanguages = (languages) => {
  if (!Array.isArray(languages) || languages.length === 0) {
    throw new Error('Cookie consent: Invalid siteSettings.languages; expected a non-empty array.');
  }

  languages.forEach((language, index) => {
    if (!isObject(language)) {
      throw new Error(`Cookie consent: Invalid siteSettings.languages[${index}]; expected an object.`);
    }
    requireNonEmptyString(language.code, `languages[${index}].code`);
    requireNonEmptyString(language.name, `languages[${index}].name`);
    if (!['ltr', 'rtl'].includes(language.direction)) {
      throw new Error(`Cookie consent: Invalid siteSettings.languages[${index}].direction; expected 'ltr' or 'rtl'.`);
    }
  });
};

const validateGroups = (groups, path) => {
  if (!Array.isArray(groups)) {
    throw new Error(`Cookie consent: Invalid siteSettings.${path}; expected an array.`);
  }

  groups.forEach((group, groupIndex) => {
    if (!isObject(group)) {
      throw new Error(`Cookie consent: Invalid siteSettings.${path}[${groupIndex}]; expected an object.`);
    }
    requireNonEmptyString(group.groupId, `${path}[${groupIndex}].groupId`);

    if (!Array.isArray(group.cookies) || group.cookies.length === 0) {
      throw new Error(
        `Cookie consent: Invalid siteSettings.${path}[${groupIndex}].cookies; expected a non-empty array.`,
      );
    }

    group.cookies.forEach((cookie, cookieIndex) => {
      if (!isObject(cookie)) {
        throw new Error(
          `Cookie consent: Invalid siteSettings.${path}[${groupIndex}].cookies[${cookieIndex}]; expected an object.`,
        );
      }
      requireNonEmptyString(cookie.name, `${path}[${groupIndex}].cookies[${cookieIndex}].name`);
      if (!STORAGE_TYPES.has(cookie.storageType)) {
        throw new Error(
          `Cookie consent: Invalid siteSettings.${path}[${groupIndex}].cookies[${cookieIndex}].storageType; expected an integer from 1 to 5.`,
        );
      }
    });
  });
};

/**
 * Validates the runtime shape and invariants required by CookieConsentCore.
 *
 * This intentionally validates only fields required for safe execution. Text
 * translations may be incomplete because the translation layer provides
 * fallback behavior for missing translation keys.
 *
 * @param {Object} siteSettings - Site settings to validate.
 * @return {Object} The validated settings object.
 * @throws {Error} If the settings are not valid.
 */
export function validateSiteSettings(siteSettings) {
  if (!isObject(siteSettings)) {
    throw new Error('Cookie consent: siteSettings must be an object.');
  }

  const normalizedSettings = {
    ...siteSettings,
    optionalGroups: siteSettings.optionalGroups === undefined ? [] : siteSettings.optionalGroups,
  };

  requireNonEmptyString(siteSettings.cookieName, 'cookieName');
  if (!isObject(siteSettings.translations)) {
    throw new Error('Cookie consent: Invalid siteSettings.translations; expected an object.');
  }

  validateLanguages(siteSettings.languages);
  validateGroups(normalizedSettings.requiredGroups, 'requiredGroups');
  validateGroups(normalizedSettings.optionalGroups, 'optionalGroups');

  const cookieName = normalizedSettings.cookieName;
  if (normalizedSettings.requiredGroups.length === 0) {
    throw new Error(`Cookie consent: At least one required group is needed to store consent in '${cookieName}'.`);
  }

  const requiredGroupWithCookie = normalizedSettings.requiredGroups.find((group) =>
    group.cookies.some((cookie) => cookie.name === cookieName && cookie.storageType === 1),
  );
  if (!requiredGroupWithCookie) {
    throw new Error(`Cookie consent: No group found in requiredGroups that contains cookie '${cookieName}'.`);
  }

  const siteSettingsGroups = [...normalizedSettings.requiredGroups, ...normalizedSettings.optionalGroups];
  const groupIds = siteSettingsGroups.map((group) => group.groupId);
  const duplicateGroupNames = groupIds.filter((groupId, index) => groupIds.indexOf(groupId) !== index);
  if (duplicateGroupNames.length > 0) {
    throw new Error(
      `Cookie consent: Groups '${Array.from(new Set(duplicateGroupNames)).join(', ')}' found multiple times in settings.`,
    );
  }

  return normalizedSettings;
}
