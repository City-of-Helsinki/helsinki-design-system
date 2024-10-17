/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { parse } from 'cookie';

import deleteCookie from './deleteCookie';

export default class MonitorAncCleanBrowserStorages {
  // MARK: Public properties
  BROWSER_STORAGES = ['cookie', 'localStorage', 'sessionStorage', 'indexedDB', 'cacheStorage'];

  // MARK: Private properties

  #MONITOR_INTERVAL;
  #REMOVE;
  #COOKIE_HANDLER;

  // Keys already reported via event
  #reportedKeys = {
    cookie: [],
    localStorage: [],
    sessionStorage: [],
    indexedDB: [],
    cacheStorage: [],
  };

  // If key removal was not successfull, add it to this list to prevent multiple tries
  #removalFailedKeys = {
    cookie: [],
    localStorage: [],
    sessionStorage: [],
    indexedDB: [],
    cacheStorage: [],
  };

  // MARK: Public methods

  /**
   * Deletes the keys that are not consented.
   * @param {string} typeString - The type of keys to be deleted.
   * @param {string[]} consentedKeysArray - An array of consented keys.
   * @param {string[]} currentStoredKeysArray - An array of current stored keys.
   * @param {string} reason - The reason for deleting the keys.
   */
  deleteKeys(typeString, consentedKeysArray, currentStoredKeysArray, reason) {
    const deleteKeys = currentStoredKeysArray.filter((key) => {
      if (
        key === '' || // If the key is empty, filter it out
        this.#isKeyConsented(key, consentedKeysArray) // If key is consented (with possible wildcards), filter it out
      ) {
        return false;
      }
      return true;
    });

    if (deleteKeys.length > 0) {
      // console.log('deleteKeys', deleteKeys, deleteKeys.length);
      deleteKeys.forEach((key) => {
        // console.log('typeString', typeString, this.#removalFailedKeys, this.#removalFailedKeys[typeString]);
        if (!this.#removalFailedKeys[typeString].includes(key)) {
          console.log(`Cookie consent: will delete ${reason} ${typeString}(s): '${deleteKeys.join("', '")}'`);

          if (typeString === 'cookie') {
            deleteCookie(key);
            if (this.#getCookie(key)) {
              console.error(`Error deleting cookie '${key}' will ignore it for now`);
              this.#removalFailedKeys.cookie.push(key);
            }
          } else if (typeString === 'localStorage') {
            localStorage.removeItem(key);
          } else if (typeString === 'sessionStorage') {
            sessionStorage.removeItem(key);
          } else if (typeString === 'indexedDB') {
            const request = indexedDB.deleteDatabase(key);
            request.onsuccess = () => {
              console.log(`Cookie consent: IndexedDB database '${key}' deleted successfully.`);
              // Remove the key from the blacklist as the deletion was successful
              this.#removalFailedKeys.indexedDB = this.#removalFailedKeys.indexedDB.filter((item) => item !== key);
            };
            request.onerror = () => {
              console.warn(`Cookie consent: Error deleting IndexedDB database '${key}'`);
              this.#removalFailedKeys.indexedDB.push(key);
            };
            request.onblocked = () => {
              console.error(`Cookie consent: IndexedDB database '${key}' deletion blocked.`);
              this.#removalFailedKeys.indexedDB.push(key);
            };
          } else if (typeString === 'cacheStorage') {
            caches.delete(key).then((response) => {
              if (response) {
                console.log(`Cookie consent: Cache '${key}' has been deleted`);
              } else {
                console.log(`Cookie consent: Cache '${key}' not found`);
              }
            });
          }
        }
      });
    }
  }

  // MARK: Private methods

  /**
   * Returns a string containing the names of all cookies.
   * @private
   * @return {array} An array containing the names of all cookies.
   */
  #getCookieNamesArray() {
    const cookies = document.cookie.split(';');
    const cookieNames = cookies.map((cookie) => cookie.split('=')[0].trim());
    return cookieNames;
  }

  /**
   * Retrieves and parses the cookie consent cookie.
   * @private
   * @param {string} [cookieName] - The name of the cookie to be parsed.
   * @return {Object|boolean} The parsed cookie object, or false if the cookie is not set or parsing is unsuccessful.
   */
  #getCookie(cookieName) {
    try {
      if (!cookieName) {
        // `this` is not set, and cookieName is not provided
        return false;
      }
      const cookieString = parse(document.cookie)[cookieName];
      if (!cookieString) {
        return false;
      }
      return JSON.parse(cookieString);
    } catch (err) {
      console.error(`Cookie parsing unsuccessful:\n${err}`);
      return false;
    }
  }

  /**
   * Retrieves the names of all indexedDB databases as a string.
   * @private
   * @return {Promise<array>} A promise that resolves to an array containing the names of all indexedDB databases. If there are no indexedDB databases, an empty array is returned.
   */
  async #getIndexedDBNamesArray() {
    if (indexedDB && indexedDB.databases) {
      const databases = await indexedDB.databases();
      const databaseNames = databases.map((db) => db.name);
      return databaseNames;
    }
    return [];
  }

  /**
   * Retrieves the names of all cache storages as a string.
   * @private
   * @return {Promise<array>} A promise that resolves to an array containing the names of all cache storages. If there are no cache storages, an empty array is returned.
   */
  async #getCacheStorageNamesString() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      return cacheNames;
    }
    return [];
  }

  /**
   * Checks if a given key is consented based on the provided consented keys with wildcards.
   *
   * @param {string} key - The key to check consent for.
   * @param {Array<string>} consentedKeys - The array of consented keys.
   * @return {boolean} - Returns true if the key is consented, false otherwise.
   */
  #isKeyConsented(key, consentedKeys) {
    // If no keys are consented, return false
    if (!Array.isArray(consentedKeys) || consentedKeys.length === 0) {
      return false;
    }
    // Check if the key is directly consented
    if (consentedKeys.includes(key)) {
      return true;
    }

    // Check if the key matches a wildcard pattern in consentedKeys that have * in them
    const consentedKeysWithWildcard = consentedKeys.filter((consentedKey) => consentedKey.includes('*'));
    const consentedKeysRegexp = consentedKeysWithWildcard.map(
      (consentedKey) => new RegExp(`^${consentedKey.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`),
    );

    // Check if the key matches any of the wildcard patterns
    return consentedKeysRegexp.some((regexp) => regexp.test(key));
  }

  /**
   * Monitors the consented keys and reports any unapproved keys. (cookies or localStorage or sessionStorage)
   * Reports found unapproved keys to console and dispatches an event based on type.
   * @private
   * @param {string} typeString - The type of keys being monitored.
   * @param {string[]} consentedKeysArray - An array of consented keys.
   * @param {string[]} reportedKeysArray - An array of reported keys.
   * @param {string[]} currentStoredKeysArray - An array of current stored keys.
   * @param {string} consentedGroups - The consented groups.
   */
  #monitor(typeString, consentedKeysArray, reportedKeysArray, currentStoredKeysArray, consentedGroups) {
    // Find items that appear only in currentStoredKeysArray and filter out the ones that are already in consentedKeysArray
    const unapprovedKeys = currentStoredKeysArray.filter((key) => {
      if (
        key === '' || // If the key is empty, filter it out
        reportedKeysArray.includes(key) || // If key is already reported, filter it out
        this.#isKeyConsented(key, consentedKeysArray) // If key is consented (with possible wildcards), filter it out
      ) {
        return false;
      }
      return true;
    });

    if (unapprovedKeys.length > 0) {
      console.log(`Cookie consent: found unapproved ${typeString}(s): '${unapprovedKeys.join("', '")}'`);

      const event = new CustomEvent('hds-cookie-consent-unapproved-item-found', {
        detail: {
          type: typeString,
          keys: unapprovedKeys,
          consentedGroups,
        },
      });
      window.dispatchEvent(event);

      reportedKeysArray.push(...unapprovedKeys);
    }

    if (this.#REMOVE) {
      this.deleteKeys(typeString, consentedKeysArray, currentStoredKeysArray, 'unapproved');
    }
  }

  /**
   * Retrieves the current keys for the specified type of browser storage.
   *
   * @param {string} storageType - The type of browser storage ('cookie', 'localStorage', 'sessionStorage', 'indexedDB', 'cacheStorage').
   * @returns {Array} - An array of keys for the specified type of browser storage.
   */
  async getCurrentKeys(storageType) {
    switch (storageType) {
      case 'cookie':
        return this.#getCookieNamesArray();
      case 'localStorage':
        return Object.keys(localStorage);
      case 'sessionStorage':
        return Object.keys(sessionStorage);
      case 'indexedDB':
        return this.#getIndexedDBNamesArray();
      case 'cacheStorage':
        return this.#getCacheStorageNamesString();
      default:
        return [];
    }
  }

  /**
   * Monitors cookies, local storage, and session storage for unconsented new keys.
   * @private
   */
  async #monitorLoop() {
    // console.log('monitoring', JSON.stringify(this.#reportedKeys));
    // MARK: Public properties
    this.BROWSER_STORAGES.forEach(async (storageType) => {
      const consentedGroups = this.#COOKIE_HANDLER.getConsentedGroupNames();
      const consentedKeys = this.#COOKIE_HANDLER.getAllKeysInConsentedGroups();

      // Loop through all browser storage types and monitor them
      this.#monitor(
        storageType,
        consentedKeys[storageType],
        this.#reportedKeys[storageType],
        await this.getCurrentKeys(storageType),
        consentedGroups,
      );
    });
  }

  /**
   * Monitors cookies and storage at a specified interval.
   * @private
   */
  #monitorCookiesAndStorage() {
    this.#monitorLoop();
    setInterval(() => {
      this.#monitorLoop();
    }, this.#MONITOR_INTERVAL);
  }

  // MARK: Initializer

  /**
   * Initializes the browser storage monitoring and cleaning when the cookie name has been read from the site settings.
   * @param {Object} cookieHandler - The cookie handler reference.
   * @param {number} [monitorInterval=500] - The interval in milliseconds at which to monitor the stored keys.
   * @param {boolean} [remove=false] - Indicates whether to remove the stored keys or not.
   */
  init(cookieHandler, monitorInterval = 0, remove = false) {
    this.#COOKIE_HANDLER = cookieHandler;
    this.#MONITOR_INTERVAL = Math.max(monitorInterval, 50);
    this.#REMOVE = remove;
    if (monitorInterval > 0) {
      this.#monitorCookiesAndStorage();
    }
  }
}
