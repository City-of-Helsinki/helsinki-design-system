/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */

import { parse, serialize } from 'cookie';

import { formatTimestamp } from './template';

export default class CookieHandler {
  #COOKIE_DAYS = 100;
  #shadowDomUpdateCallback;
  #siteSettings;
  #lang;
  #cookieName = 'city-of-helsinki-cookie-consents'; // Overridable default value
  #formReference;

  /**
   * Represents a CookieHandler object.
   * @constructor
   * @param {Object} options - The options for the CookieHandler.
   * @param {Object} options.siteSettingsObj - Site settings object.
   * @param {string} options.lang - Site language.
   * @param {Function} options.shadowDomUpdateCallback - Callback function to update shadow DOM.
   */
  constructor({
    siteSettingsObj, // Site settings object
    lang, // Site language
    shadowDomUpdateCallback, // Callback function to update shadow DOM checkboxes
  }) {
    this.#siteSettings = siteSettingsObj;
    this.#lang = lang;
    this.#shadowDomUpdateCallback = (consentedGroupNames) => {
      shadowDomUpdateCallback(consentedGroupNames, this.#formReference);
    };
    this.#cookieName = this.#siteSettings.cookieName || this.#cookieName; // Optional override for cookie name
    this.#verifySiteSettings();
  }

  /**
   * Sets the form reference for the cookie handler.
   *
   * @param {Object} formReference - The reference to the form.
   */
  setFormReference(formReference) {
    this.#formReference = formReference;
  }

  /**
   * Get the consent status for the specified cookie group names.
   * @param {string[]} groupNamesArray - An array of group names.
   * @return {Promise<boolean>} A promise that resolves to true if all the groups are accepted, otherwise false.
   */
  getConsentStatus(groupNamesArray) {
    // Check if group names are provided as an array and not empty
    if (!Array.isArray(groupNamesArray) || groupNamesArray.length === 0) {
      // eslint-disable-next-line no-console
      console.error('Cookie consent: Group names must be provided as an non-empty array.');
      return false;
    }

    const browserCookieState = this.getCookie();

    // Check if our cookie exists and has groups set
    if (!browserCookieState || !browserCookieState.groups) {
      // console.log('Cookie is not set properly', browserCookieState, browserCookieState.groups);
      return false;
    }

    // Check if all groups are in accepted groups
    return groupNamesArray.every((groupName) => !!browserCookieState.groups[groupName]);
  }

  /**
   * Sets the status of given cookie groups to accepted.
   *
   * @param {Array} acceptedGroupsArray - An array of cookie group names to be set as accepted.
   * @return {Promise<boolean>} - A promise that resolves to true if the groups' status is successfully set to accepted, otherwise false.
   */
  async setGroupsStatusToAccepted(acceptedGroupsArray) {
    // Console error if acceptedGroupsArray is not an Array
    if (!Array.isArray(acceptedGroupsArray)) {
      // eslint-disable-next-line no-console
      console.error(
        'Cookie consent: Accepted groups must be provided as an array to setGroupsStatusToAccepted function.',
      );
      return false;
    }

    const browserCookie = this.getCookie();
    // If cookie is not set, or it has a showBanner set to true, we need to set the banner to be shown
    const showBanner = !browserCookie || browserCookie.showBanner || false;

    // If cookie is set, get the accepted groups
    let currentlyAccepted = [];
    if (browserCookie) {
      currentlyAccepted = Object.keys(browserCookie.groups);
    }

    const siteSettingsGroups = [...this.#siteSettings.requiredGroups, ...this.#siteSettings.optionalGroups];

    // Checksums for all groups calculated in parallel without waiting for each
    await Promise.all(
      siteSettingsGroups.map(async (group) => {
        const { ...groupWithoutChecksum } = group;
        delete groupWithoutChecksum.checksum;
        // eslint-disable-next-line no-param-reassign
        group.checksum = await this.#getChecksum(groupWithoutChecksum);
      }),
    );

    const groupsWhitelistedForApi = this.#siteSettings.groupsWhitelistedForApi || [];

    // Check that all accepted groups are in the whitelisted groups and return false if not
    const notWhitelistedGroups = acceptedGroupsArray.filter((group) => !groupsWhitelistedForApi.includes(group));
    if (notWhitelistedGroups.length > 0) {
      // eslint-disable-next-line no-console
      console.error(
        `Cookie consent: The group(s) "${notWhitelistedGroups.join('", "')}" not found in groupsWhitelistedForApi: "${groupsWhitelistedForApi.join('", "')}".`,
      );
      return false;
    }

    // Check that all acceptedGroupsArray items can be found in site settings
    const notFoundGroups = acceptedGroupsArray.filter(
      (group) => !siteSettingsGroups.some((siteGroup) => siteGroup.groupId === group),
    );
    if (notFoundGroups.length > 0) {
      // eslint-disable-next-line no-console
      console.error(
        `Cookie consent: The group(s) "${notFoundGroups.join('", "')}" not found in required or optional groups in site settings.`,
      );
      return false;
    }

    const newAcceptedGroupsArray = [...new Set([...currentlyAccepted, ...acceptedGroupsArray])];

    // Save accepted groups and update checkbox state
    this.saveConsentedGroups(newAcceptedGroupsArray, showBanner);
    return true;
  }

  /**
   * Retrieves and parses the cookie consent cookie.
   * @private
   * @param {string} [cookieName] - The name of the cookie to be parsed.
   * @return {Object|boolean} The parsed cookie object, or false if the cookie is not set or parsing is unsuccessful.
   */
  getCookie(cookieName = undefined) {
    try {
      let cookieNameValue;
      if (this && this.#cookieName && !cookieName) {
        cookieNameValue = this.#cookieName;
      } else if (!cookieName) {
        // `this` is not set, and cookieName is not provided
        return false;
      }
      const cookieString = parse(document.cookie)[cookieNameValue];
      if (!cookieString) {
        // console.error('Cookie is not set');
        return false;
      }
      return JSON.parse(cookieString);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Cookie parsing unsuccessful:\n${err}`);
      return false;
    }
  }

  getAllKeysInConsentedGroups(consentedGroupNames = null) {
    let groupNames = consentedGroupNames;
    if (!groupNames) {
      groupNames = this.getConsentedGroupNames();
    }
    const consentedKeys = {};
    consentedKeys.cookie = this.#getKeysInConsentedGroups(groupNames, 1);

    // Make sure that consentedKeys.cookie array of strings contains this.#cookieName string as one item
    if (!consentedKeys.cookie.includes(this.#cookieName)) {
      consentedKeys.cookie.push(this.#cookieName);
    }

    consentedKeys.localStorage = this.#getKeysInConsentedGroups(groupNames, 2);
    consentedKeys.sessionStorage = this.#getKeysInConsentedGroups(groupNames, 3);
    consentedKeys.indexedDB = this.#getKeysInConsentedGroups(groupNames, 4);
    consentedKeys.cacheStorage = this.#getKeysInConsentedGroups(groupNames, 5);
    return consentedKeys;
  }

  /**
   * Retrieves the HTML representation of cookie groups.
   * @private
   * @param {string} timestamp - UNIX timestamp.
   * @return {Object} - Parsed timestamp with date and time separated to key-value pairs.
   */
  #formatDateTimeObject(timestamp) {
    const formatted = {
      date: new Date(timestamp).toLocaleDateString('fi-FI'),
      time: new Date(timestamp).toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' }),
    };

    return formatted;
  }

  /**
   * Updates cookie consent timestamp elements in DOM.
   * @param {Array} acceptedGroups - An array of cookie group names to be handled.
   */
  timestampElementHandler(acceptedGroups) {
    // If banner is not visible, do not render timestamps either
    if (!this.#formReference) {
      return;
    }
    const timestampWrappers = this.#formReference.querySelectorAll('div[data-timestamp]');
    const cookie = this.getCookie();
    let groups = [];
    if (cookie && cookie.groups) {
      groups = cookie.groups;
    }
    timestampWrappers.forEach((timestampWrapper) => {
      const elementGroup = timestampWrapper.dataset.timestamp;
      let timestampHtml;
      if (acceptedGroups.includes(elementGroup)) {
        let timestamp;
        const cookieGroup = groups[elementGroup];
        if (cookieGroup) {
          timestamp = cookieGroup.timestamp;
        } else {
          // This should not happen, but lets make sure all bases are covered.
          timestamp = Date.now();
        }
        timestampHtml = formatTimestamp(
          this.#formatDateTimeObject(timestamp),
          elementGroup,
          this.#siteSettings.translations,
          this.#lang,
          this.#siteSettings.fallbackLanguage,
        );
      } else {
        timestampHtml = '';
      }
      // eslint-disable-next-line no-param-reassign
      timestampWrapper.innerHTML = timestampHtml;
    });
  }

  /**
   * Saves the consented cookie groups (and required groups) to cookie, unsets others.
   * @private
   * @param {Array} consentedGroupNames - The names of the consented cookie groups.
   * @param {boolean} showBanner - Whether to show the banner or not.
   */
  saveConsentedGroups(consentedGroupNames = [], showBanner = false) {
    // console.log('Saving consented cookie groups:', consentedGroupNames, showBanner);

    const consentedGroups = {};
    const consentedGroupAndRequiredGroupNames = [...this.getRequiredGroupNames(), ...consentedGroupNames];

    const { groups: browserCookieGroups } = this.getCookie();

    // Find group checksums for consented groups
    const allGroups = [...this.#siteSettings.requiredGroups, ...this.#siteSettings.optionalGroups];
    allGroups.forEach((group) => {
      if (consentedGroupAndRequiredGroupNames.includes(group.groupId)) {
        const existingTimeStamp = browserCookieGroups?.[group.groupId]?.timestamp;
        consentedGroups[group.groupId] = {
          checksum: group.checksum,
          timestamp: existingTimeStamp || Date.now(),
        };
      }
    });

    const data = {
      groups: consentedGroups,
      ...(showBanner && { showBanner: true }), // Only add showBanner if it's true
    };

    this.#setCookie(data);
    // Update consent timestamp dynamically
    this.timestampElementHandler(consentedGroupNames);
    // Update shadow dom checkbox status
    this.#shadowDomUpdateCallback(consentedGroupNames);
  }

  /**
   * Removes before saving the cookies and stored items that have consent withdrawn.
   *
   * @param {Array<string>} consentedGroupNames - The names of the consented groups.
   * @param {object} monitorReference - The reference to the monitor object.
   * @return {void}
   */
  removeConsentWithdrawnCookiesBeforeSave(consentedGroupNames, monitorReference) {
    const consentedKeysArray = this.getAllKeysInConsentedGroups(consentedGroupNames);
    const reason = 'consent withdrawn';
    monitorReference.BROWSER_STORAGES.forEach(async (storageType) => {
      const currentStoredKeysArray = await monitorReference.getCurrentKeys(storageType);
      monitorReference.deleteKeys(storageType, consentedKeysArray[storageType], currentStoredKeysArray, reason);
    });
  }

  /**
   * Returns an array of required cookie group names.
   *
   * @return {string[]} An array of required cookie group names.
   */
  getRequiredGroupNames() {
    return this.#siteSettings.requiredGroups.map((group) => group.groupId);
  }

  /**
   * Get checksum from string
   * @private
   * @param {string} message - The string to be hashed.
   * @param {number} [length=8] - The length of the hash (default is 8).
   * @return {Promise<string>} - A promise that resolves to the hash in base16 from the string.
   *
   * Reference: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   */
  async #getChecksum(message, length = 8) {
    let messageString = message;
    if (typeof message !== 'string') {
      messageString = JSON.stringify(message);
    }
    const msgUint8 = new TextEncoder().encode(messageString); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    // Return only length number of hash
    return hashHex.substring(0, length);
  }

  getConsentedGroupNames() {
    let consentedGroups = [];

    const browserCookie = this.getCookie();
    if (browserCookie && browserCookie.groups) {
      consentedGroups = Object.keys(browserCookie.groups);
    }

    // Ensure that required groups are in consented groups for monitoring
    const requiredGroups = this.getRequiredGroupNames();
    consentedGroups = [...new Set([...requiredGroups, ...consentedGroups])];

    return consentedGroups;
  }

  /**
   * Sets a cookie with the provided data.
   * @private
   * @param {Object} cookieData - The data to be stored in the cookie.
   */
  #setCookie(cookieData) {
    // console.log('#setCookie', cookieData);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.#COOKIE_DAYS);
    document.cookie = serialize(this.#cookieName, JSON.stringify(cookieData), {
      sameSite: 'strict',
      expires: expiryDate,
      path: '/',
    });
  }

  /**
   * Retrieves the keys in consented groups based on the provided parameters.
   * @private
   * @param {Array} consentedGroupNames - An array of consented group names.
   * @param {string} type - The type of cookies to filter.
   * @return {Array} - An array of consented cookie keys.
   */
  #getKeysInConsentedGroups(consentedGroupNames, type) {
    const consentedKeys = new Set();

    // Add relevant robotCookies to accepted cookies
    this.#siteSettings.robotCookies?.forEach((cookie) => {
      if (cookie.type === type) {
        consentedKeys.add(cookie.name);
      }
    });

    const allGroups = [...this.#siteSettings.requiredGroups, ...this.#siteSettings.optionalGroups];
    allGroups.forEach((group) => {
      if (consentedGroupNames.includes(group.groupId)) {
        group.cookies.forEach((cookie) => {
          if (cookie.type === type) {
            consentedKeys.add(cookie.name);
          }
        });
      }
    });
    return Array.from(consentedKeys);
  }

  /**
   * Removes invalid groups from the cookie based on the browser cookie state and site settings.
   *
   * @private
   */
  async #removeInvalidGroupsFromCookie() {
    const browserCookieState = this.getCookie();
    const siteSettingsGroups = [...this.#siteSettings.requiredGroups, ...this.#siteSettings.optionalGroups];

    // Checksums for all groups calculated in parallel without waiting for each
    await Promise.all(
      siteSettingsGroups.map(async (group) => {
        // eslint-disable-next-line no-param-reassign
        group.checksum = await this.#getChecksum(group); // This await is needed to ensure that all checksums are calculated before continuing
      }),
    );

    let invalidGroupsFound = false;
    const newCookieGroups = [];

    // Loop through all groups in site settings and store each groups name and checksum
    const siteSettingsGroupsChecksums = {};
    siteSettingsGroups.forEach((group) => {
      siteSettingsGroupsChecksums[group.groupId] = group.checksum;
    });

    // Loop through browser cookie groups and check if they are in site settings, store valid groups to be saved
    if (browserCookieState.groups) {
      Object.keys(browserCookieState.groups).forEach((groupName) => {
        const group = browserCookieState.groups[groupName];
        if (siteSettingsGroupsChecksums[groupName] && siteSettingsGroupsChecksums[groupName] === group.checksum) {
          newCookieGroups.push(groupName);
        } else {
          invalidGroupsFound = true;
          // eslint-disable-next-line no-console
          console.info(`Invalid group found in browser cookie: '${groupName}', removing from cookie.`);
        }
      });
    }

    if (invalidGroupsFound) {
      const showBanner = true;
      this.saveConsentedGroups(newCookieGroups, showBanner);
    }
  }

  /**
   * Verify siteSettings validity
   * Checks done:
   * * At least one required group is needed
   * * One of the required groups must contain the consent cookie
   * * No duplicate group names
   * @private
   * @throws {Error} If the required group or cookie is missing in the site settings.
   * @throws {Error} If there are multiple cookie groups with identical names in the site settings.
   */
  #verifySiteSettings() {
    // Check that there is at least one required group
    if (this.#siteSettings.requiredGroups.length === 0) {
      throw new Error(
        `Cookie consent: At least one required group is needed to store consent in '${this.#cookieName}'.`,
      );
    }

    // Check that there is at least one required group that contains the cookie and its type is cookie
    const requiredGroupWithCookie = this.#siteSettings.requiredGroups.find((group) =>
      group.cookies.some((cookie) => cookie.name === this.#cookieName && cookie.type === 1),
    );

    // If no required group contains the cookie, throw an error
    if (!requiredGroupWithCookie) {
      throw new Error(`Cookie consent: No group found in requiredGroups that contains cookie '${this.#cookieName}'.`);
    }

    const siteSettingsGroups = [...this.#siteSettings.requiredGroups, ...this.#siteSettings.optionalGroups];

    const cookieNames = new Set();
    const duplicateGroupNames = new Set();
    siteSettingsGroups.forEach((group) => {
      if (cookieNames.has(group.groupId)) {
        duplicateGroupNames.add(group.groupId);
      }
      cookieNames.add(group.groupId);
    });
    if (duplicateGroupNames.size > 0) {
      throw new Error(
        `Cookie consent: Groups '${Array.from(duplicateGroupNames).join(', ')}' found multiple times in settings.`,
      );
    }
  }

  /**
   * Initializes the cookie handler.
   *
   * @return {Promise<Object>} - A promise that resolves to the site settings.
   */
  async init() {
    await this.#removeInvalidGroupsFromCookie();
    return this.#siteSettings;
  }
}
