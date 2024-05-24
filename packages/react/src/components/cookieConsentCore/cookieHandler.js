/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */

import { parse, serialize } from 'cookie/index';

export default class CookieHandler {
  #SITE_SETTINGS_JSON_URL;
  #SITE_SETTINGS_OBJ;
  #COOKIE_DAYS = 100;
  #ESSENTIAL_GROUP_NAME = 'essential';
  #shadowDomUpdateCallback;
  #siteSettings;
  #cookie_name;

  /**
   * Represents a CookieHandler object.
   * @constructor
   * @param {Object} options - The options for the CookieHandler.
   * @param {string} options.siteSettingsJsonUrl - Path to JSON file with site settings.
   * @param {Object} options.siteSettingsObj - Site settings object.
   * @param {Function} options.shadowDomUpdateCallback - Callback function to update shadow DOM.
   * @param {Object} options.backReference - Reference to the back reference object.
   */
  constructor({
    siteSettingsJsonUrl, // Path to JSON file with site settings
    siteSettingsObj, // Site settings object
    shadowDomUpdateCallback, // Callback function to update shadow DOM checkboxes
    backReference, // Reference to the back reference object
  }) {
    this.#SITE_SETTINGS_JSON_URL = siteSettingsJsonUrl;
    this.#SITE_SETTINGS_OBJ = siteSettingsObj;
    this.#shadowDomUpdateCallback = (consentedGroupNames) =>
      shadowDomUpdateCallback(consentedGroupNames, backReference);
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
    const browserCookie = this.getCookie();
    // If cookie is not set, or it has a showBanner set to true, we need to set the banner to be shown
    const showBanner = !browserCookie || browserCookie.showBanner || false;

    // If cookie is set, get the accepted groups
    let currentlyAccepted = [];
    if (browserCookie) {
      currentlyAccepted = Object.keys(browserCookie.groups);
    }

    // Try to fetch the site settings from the JSON file
    let siteSettings = null;
    try {
      siteSettings = await this.#getSiteSettings();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Cookie consent: Unable to fetch cookie consent settings: ${err}`);
      return false;
    }

    const siteSettingsGroups = [...siteSettings.requiredGroups, ...siteSettings.optionalGroups];

    // Checksums for all groups calculated in parallel without waiting for each
    await Promise.all(
      siteSettingsGroups.map(async (group) => {
        // eslint-disable-next-line no-param-reassign
        group.checksum = await this.#getChecksum(group);
      }),
    );

    // Save accepted groups and update checkbox state
    this.saveConsentedGroups([...currentlyAccepted, ...acceptedGroupsArray], showBanner);
    return true;
  }

  /**
   * Retrieves the status of the component.
   * @return {Promise<{ cookie: string, monitor: string }>} The status object containing the cookie and monitor status.
   */
  async getStatus() {
    let cookie = 'unset';

    const browserCookie = await this.getCookie();
    if (browserCookie) {
      cookie = browserCookie;
    }

    return cookie;
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
      if (this && this.#cookie_name && !cookieName) {
        cookieNameValue = this.#cookie_name;
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

    // Make sure that consentedKeys.cookie array of strings contains this.#cookie_name string as one item
    if (!consentedKeys.cookie.includes(this.#cookie_name)) {
      consentedKeys.cookie.push(this.#cookie_name);
    }

    consentedKeys.localStorage = this.#getKeysInConsentedGroups(groupNames, 2);
    consentedKeys.sessionStorage = this.#getKeysInConsentedGroups(groupNames, 3);
    consentedKeys.indexedDB = this.#getKeysInConsentedGroups(groupNames, 4);
    consentedKeys.cacheStorage = this.#getKeysInConsentedGroups(groupNames, 5);
    return consentedKeys;
  }

  /**
   * Saves the consented cookie groups to cookie, unsets others.
   * @private
   * @param {Array} consentedGroupNames - The names of the consented cookie groups.
   * @param {boolean} showBanner - Whether to show the banner or not.
   */
  saveConsentedGroups(consentedGroupNames = [], showBanner = false) {
    // console.log('Saving consented cookie groups:', consentedGroupNames, showBanner);

    const consentedGroups = {};

    // Find group checksums for consented groups
    const allGroups = [...this.#siteSettings.requiredGroups, ...this.#siteSettings.optionalGroups];
    allGroups.forEach((group) => {
      if (consentedGroupNames.includes(group.groupId)) {
        consentedGroups[group.groupId] = group.checksum;
      }
    });

    const data = {
      groups: consentedGroups,
      ...(showBanner && { showBanner: true }), // Only add showBanner if it's true
    };

    this.#setCookie(data);

    // Update shadow dom checkbox status
    this.#shadowDomUpdateCallback(consentedGroupNames);
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
   * @return {string} - The hash in base16 from the string.
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
    document.cookie = serialize(this.#cookie_name, JSON.stringify(cookieData), {
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
   * @param {Array} siteSettingsGroups - Required and optional cookie groups combined array from site settings.
   * @param {Object} browserCookieState - The browser cookie state object.
   * @param {Object} siteSettings - The site settings object.
   * @return {Object} - The updated site settings object.
   */
  async #removeInvalidGroupsFromCookie(siteSettingsGroups, browserCookieState, siteSettings) {
    // console.log('#removeInvalidGroupsFromCookie', siteSettingsGroups, browserCookieState, siteSettings);
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
        if (siteSettingsGroupsChecksums[groupName] && siteSettingsGroupsChecksums[groupName] === group) {
          newCookieGroups.push(group.groupId);
        } else {
          invalidGroupsFound = true;
          // eslint-disable-next-line no-console
          console.info(`Invalid group found in browser cookie: '${group.groupId}', removing from cookie.`);
        }
      });
    }

    if (invalidGroupsFound) {
      const showBanner = true;
      this.saveConsentedGroups(newCookieGroups, showBanner);
    }

    return siteSettings;
  }

  /**
   * Retrieves the site settings and performs necessary checks.
   * @private
   * @return {Promise<unknown>} A promise that resolves to the result of removing invalid groups from the site settings.
   * @throws {Error} If the required group or cookie is missing in the site settings.
   * @throws {Error} If there are multiple cookie groups with identical names in the site settings.
   */
  async #getAndVerifySiteSettings() {
    const siteSettings = await this.#getSiteSettings();

    this.#cookie_name = siteSettings.cookieName || this.#cookie_name; // Optional override for cookie name

    const browserCookie = this.getCookie();

    const essentialGroup = siteSettings.requiredGroups.find((group) => group.groupId === this.#ESSENTIAL_GROUP_NAME);
    if (!essentialGroup) {
      // The site site settings must have required group named by ESSENTIAL_GROUP_NAME
      throw new Error(`Cookie consent error: '${this.#ESSENTIAL_GROUP_NAME}' group missing`);
    }
    const requiredCookieFound = essentialGroup.cookies.find((cookie) => cookie.name === this.#cookie_name);
    if (!requiredCookieFound) {
      // The required "essential" group must have cookie with name matching the root level 'cookieName'
      throw new Error(
        `Cookie consent error: Missing cookie entry for '${this.#cookie_name}' in group '${this.#ESSENTIAL_GROUP_NAME}'`,
      );
    }

    const siteSettingsGroups = [...siteSettings.requiredGroups, ...siteSettings.optionalGroups];

    const cookieNames = [];
    siteSettingsGroups.forEach((cookie) => {
      if (cookieNames.includes(cookie.groupId)) {
        // The site settings must not contain cookie groups that have identical names
        throw new Error(`Cookie consent error: Group '${cookie.groupId}' found multiple times in settings.`);
      }
      cookieNames.push(cookie.groupId);
    });

    // Checksums for all groups calculated in parallel without waiting for each
    await Promise.all(
      siteSettingsGroups.map(async (group) => {
        // eslint-disable-next-line no-param-reassign
        group.checksum = await this.#getChecksum(group); // This await is needed to ensure that all checksums are calculated before continuing
      }),
    );

    // Temporarily save the site settings to the instance, so that invalid groups can be removed from the cookie
    this.#siteSettings = siteSettings;

    return this.#removeInvalidGroupsFromCookie(siteSettingsGroups, browserCookie, siteSettings);
  }

  /**
   * Fetches the site settings from Object or a JSON file and returns them as an object.
   * @private
   * @return {Promise<Object>} A promise that resolves to the site settings object.
   * @throws {Error} If there is an error fetching the cookie consent settings or parsing the JSON.
   */
  async #getSiteSettings() {
    // If site settings object is available, return it
    if (this.#SITE_SETTINGS_OBJ) {
      return this.#SITE_SETTINGS_OBJ;
    }

    // Fetch the site settings JSON file
    let siteSettingsRaw;
    try {
      siteSettingsRaw = await fetch(this.#SITE_SETTINGS_JSON_URL).then((response) => response.text());
    } catch (error) {
      throw new Error(`Cookie consent: Unable to fetch cookie consent settings: ${error}`);
    }

    // Parse the fetched site settings string to JSON
    let siteSettings;
    try {
      siteSettings = JSON.parse(siteSettingsRaw);
    } catch (error) {
      throw new Error(`Cookie consent settings parsing failed: ${error}`);
    }

    return siteSettings;
  }

  /**
   * Initializes the cookie handler.
   *
   * @param {string} cookieName - The name of the consent cookie.
   * @return {Promise<Object>} - A promise that resolves to the site settings.
   */
  async init(cookieName) {
    this.#cookie_name = cookieName;
    this.#siteSettings = await this.#getAndVerifySiteSettings();
    return this.#siteSettings;
  }
}
