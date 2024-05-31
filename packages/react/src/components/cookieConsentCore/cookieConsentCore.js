/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */

import { getCookieBannerHtml, getGroupHtml, getTableRowHtml } from './template';
import { getTranslation, getTranslationKeys } from './translations';
import MonitorAndCleanBrowserStorages from './monitorAndCleanBrowserStorages';
import CookieHandler from './cookieHandler';

/**
 * Represents a class for managing cookie consent.
 * @class
 */
export class CookieConsentCore {
  // MARK: Private properties
  #LANGUAGE;
  #THEME;
  #TARGET_SELECTOR;
  #SPACER_PARENT_SELECTOR;
  #PAGE_CONTENT_SELECTOR;
  #SUBMIT_EVENT = false;
  #SETTINGS_PAGE_SELECTOR;
  #MONITOR;
  #TEMP_CSS_PATH;
  #COOKIE_HANDLER;

  #bannerElements = {
    bannerContainer: null,
    spacer: null,
  };

  #settingsPageElement = null;

  #resizeReference = {
    resizeObserver: null,
    bannerHeightElement: null,
  };

  #cookie_name = 'city-of-helsinki-cookie-consents'; // Overridable default value

  // MARK: Public methods
  /**
   * Creates a new instance of the CookieConsent class.
   * @constructor
   * @param {Object} options - The options for configuring the CookieConsent instance.
   * @param {string} options.siteSettingsJsonUrl - The path to the JSON file with site settings.
   * @param {string} [options.language='en'] - The page language.
   * @param {string} [options.theme='bus'] - The theme for the banner.
   * @param {string} [options.targetSelector='body'] - The selector for where to inject the banner.
   * @param {string} [options.spacerParentSelector='body'] - The selector for where to inject the spacer.
   * @param {string} [options.pageContentSelector='body'] - The selector for where to add scroll-margin-bottom.
   * @param {boolean|string} [options.submitEvent=false] - If a string, do not reload the page, but submit the string as an event after consent.
   * @param {string} [options.settingsPageSelector=null] - If this string is set and a matching element is found on the page, show cookie settings in a page replacing the matched element.
   * @param {string} [options.tempCssPath='/path/to/external.css'] - The temporary path to the external CSS file.
   * @throws {Error} Throws an error if siteSettingsJsonUrl is not provided.
   */
  constructor({
    siteSettingsJsonUrl, // Path to JSON file with site settings
    siteSettingsObj, // Object with site settings to use instead of the url
    language = 'en', // Page language
    theme = 'bus', // Theme for the banner
    targetSelector = 'body', // Where to inject the banner
    spacerParentSelector = 'body', // Where to inject the spacer
    pageContentSelector = 'body', // Where to add scroll-margin-bottom
    submitEvent = false, // if string, do not reload page, but submit the string as event after consent
    settingsPageSelector = null, // If this string is set and a matching element is found on the page, show cookie settings in a page replacing the matched element.
    tempCssPath = '/path/to/external.css', // TODO: Remove this tempoarry path to external CSS file
  }) {
    if (!siteSettingsJsonUrl && !siteSettingsObj) {
      throw new Error('Cookie consent: siteSettingsJsonUrl or siteSettingsObj is required');
    }

    this.#LANGUAGE = language;
    this.#THEME = theme;
    this.#TARGET_SELECTOR = targetSelector;
    this.#SPACER_PARENT_SELECTOR = spacerParentSelector;
    this.#PAGE_CONTENT_SELECTOR = pageContentSelector;
    this.#SUBMIT_EVENT = submitEvent;
    this.#SETTINGS_PAGE_SELECTOR = settingsPageSelector;
    this.#TEMP_CSS_PATH = tempCssPath;

    window.hds = window.hds || {};
    window.hds.cookieConsent = this;

    /**
     * Updates the shadow DOM checkboxes based on the consented group names.
     *
     * @param {Array<string>} consentedGroupNames - The array of consented group names.
     */
    const shadowDomUpdateCallback = (consentedGroupNames, formReference) => {
      if (formReference) {
        const formCheckboxes = formReference.querySelectorAll('input');
        formCheckboxes.forEach((check) => {
          // eslint-disable-next-line no-param-reassign
          check.checked = consentedGroupNames.includes(check.dataset.group);
        });
      }
    };

    const cookieHandlerOptions = {
      shadowDomUpdateCallback,
    };
    // Prefer siteSettingsObj over siteSettingsJsonUrl to avoid extra network traffic
    if (siteSettingsObj) {
      cookieHandlerOptions.siteSettingsObj = siteSettingsObj;
    } else {
      cookieHandlerOptions.siteSettingsJsonUrl = siteSettingsJsonUrl;
    }
    this.#COOKIE_HANDLER = new CookieHandler(cookieHandlerOptions);
    this.#MONITOR = new MonitorAndCleanBrowserStorages();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.#init();
      });
    } else {
      this.#init();
    }
  }

  /**
   * Get the consent status for the specified cookie group names.
   * @param {string[]} groupNamesArray - An array of group names.
   * @return {Promise<boolean>} A promise that resolves to true if all the groups are accepted, otherwise false.
   */
  getConsentStatus(groupNamesArray) {
    return this.#COOKIE_HANDLER.getConsentStatus(groupNamesArray);
  }

  /**
   * Sets the status of given cookie groups to accepted.
   *
   * @param {Array} acceptedGroupsArray - An array of cookie group names to be set as accepted.
   * @return {Promise<boolean>} - A promise that resolves to true if the groups' status is successfully set to accepted, otherwise false.
   */
  async setGroupsStatusToAccepted(acceptedGroupsArray) {
    return this.#COOKIE_HANDLER.setGroupsStatusToAccepted(acceptedGroupsArray);
  }

  /**
   * Retrieves the status of the component.
   * @return {Promise<{ cookie: string, monitor: string }>} The status object containing the cookie and monitor status.
   */
  async getStatus() {
    return {
      cookie: await this.#COOKIE_HANDLER.getStatus(),
      monitor: await this.#MONITOR.getStatus(),
    };
  }

  // MARK: Private methods

  /**
   * Removes the banner and related elements.
   * @private
   * @function #removeBanner
   */
  #removeBanner() {
    // Remove banner size observer
    if (this.#resizeReference.resizeObserver && this.#resizeReference.bannerHeightElement) {
      this.#resizeReference.resizeObserver.unobserve(this.#resizeReference.bannerHeightElement);
    }
    // Remove banner elements
    if (this.#bannerElements.bannerContainer) {
      this.#bannerElements.bannerContainer.remove();
    }
    if (this.#bannerElements.spacer) {
      this.#bannerElements.spacer.remove();
    }
    // Remove scroll-margin-bottom variable from all elements inside the contentSelector
    document.documentElement.style.removeProperty('--hds-cookie-consent-height');
  }

  /**
   * Gets the group checkbox status from form
   * @private
   * @param {HTMLFormElement} form - The form element to read the group selections from.
   * @param {boolean} [all=false] - Optional parameter to include all selections, regardless of their checked state.
   * @return {Array<string>} - An array of selected groups.
   */
  #getGroupCheckboxStatus(form, all = false) {
    const groupSelections = [];
    const formCheckboxes = form.querySelectorAll('input');
    formCheckboxes.forEach((check) => {
      if (check.checked || all) {
        groupSelections.push(check.dataset.group);
      }
    });

    return groupSelections;
  }

  /**
   * Handles button events based on the selection.
   * @private
   * @param {string} selection - The selection type ('required', 'all', 'selected').
   * @param {object} formReference - The reference to the form.
   * @param {object} siteSettings - The site settings object.
   * @return {void}
   */
  #handleButtonEvents(selection, formReference) {
    let acceptedGroups = [];
    switch (selection) {
      case 'required':
        acceptedGroups = this.#COOKIE_HANDLER.getRequiredGroupNames();
        this.#COOKIE_HANDLER.removeConsentWithdrawnCookiesBeforeSave(acceptedGroups, this.#MONITOR);
        this.#COOKIE_HANDLER.saveConsentedGroups(acceptedGroups, false);
        break;
      case 'all':
        acceptedGroups = this.#getGroupCheckboxStatus(formReference, true);
        this.#COOKIE_HANDLER.saveConsentedGroups(acceptedGroups, false);
        break;
      case 'selected':
        acceptedGroups = this.#getGroupCheckboxStatus(formReference);
        this.#COOKIE_HANDLER.removeConsentWithdrawnCookiesBeforeSave(acceptedGroups, this.#MONITOR);
        this.#COOKIE_HANDLER.saveConsentedGroups(acceptedGroups, false);
        break;
      default:
        // We should not be here, better do nothing
        break;
    }
    if (!this.#SUBMIT_EVENT) {
      window.location.reload();
    } else {
      window.dispatchEvent(new CustomEvent(this.#SUBMIT_EVENT, { detail: { acceptedGroups } }));
      if (!this.#settingsPageElement) {
        this.#removeBanner();
      }
      this.#announceSettingsSaved();
    }
  }

  #announceSettingsSaved() {
    const ARIA_LIVE_ID = 'hds-cc-aria-live';
    const SHOW_ARIA_LIVE_FOR_MS = 5000;

    // Handle selector and removal of banner depending on rendering mode: banner or page.
    const ariaParentElement = this.#settingsPageElement || document.querySelector(this.#TARGET_SELECTOR);
    if (!ariaParentElement) {
      throw new Error(`Cookie consent: Aria notification parent element '${this.#TARGET_SELECTOR}'  was not found`);
    }

    const ariaLive = document.createElement('div');
    ariaLive.id = ARIA_LIVE_ID;
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.style =
      'position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
    ariaLive.textContent = getTranslation('settingsSaved', this.#LANGUAGE);
    ariaParentElement.appendChild(ariaLive);

    // Remove ariaLive after 5 seconds
    setTimeout(() => ariaLive.remove(), SHOW_ARIA_LIVE_FOR_MS);
  }

  // MARK: Rendering

  /**
   * Determines whether to display the banner.
   * 1. If cookie doesn't exist, show banner
   * 2. If cookie wants to show banner, show banner
   * 3. Otherwise, do not show banner
   * @private
   * @return {boolean} - Returns true if the banner should be displayed, false otherwise.
   */
  #shouldDisplayBanner() {
    const browserCookie = this.#COOKIE_HANDLER.getCookie();
    // If cookie does not exist or showBanner is true, return true
    return !browserCookie || browserCookie.showBanner;
  }

  /**
   * Picks the proper translation from a given object of possible translations or returns the input string if not an object.
   * Defaults to English ('en') if the specified translation is not found.
   * @private
   * @param {string|Object} translationObj - Either a string or an object containing language key to translation value pairs.
   * @param {string} lang - Language key, e.g., 'fi' for Finnish.
   * @return {string} - Translated string based on the provided language key, or the original string if `translationObj` is not an object.
   */
  #translateSetting(translationObj, lang) {
    if (typeof translationObj === 'object') {
      if (translationObj[lang] === undefined) {
        return translationObj.en; // fallback to English translation
      }
      return translationObj[lang];
    }
    return translationObj;
  }

  /**
   * Retrieves the HTML representation of cookie groups.
   * @private
   * @param {Array} cookieGroupList - The list of cookie groups.
   * @param {string} lang - The language code.
   * @param {Object} translations - The translations object.
   * @param {boolean} groupRequired - Indicates if the group is required.
   * @param {string} cookieGroupCategoryName - The name of the category for these groups (ie. 'required' or 'optional').
   * @param {Array} acceptedGroups - The list of accepted group IDs.
   * @return {string} - The HTML representation of cookie groups.
   */
  #getCookieGroupsHtml(cookieGroupList, lang, translations, groupRequired, cookieGroupCategoryName, acceptedGroups) {
    let groupsHtml = '';
    let groupNumber = 0;
    cookieGroupList.forEach((cookieGroup) => {
      const title = this.#translateSetting(cookieGroup.title, lang);
      const description = this.#translateSetting(cookieGroup.description, lang);
      const isAccepted = acceptedGroups.includes(cookieGroup.groupId);

      // Build table rows
      let tableRowsHtml = '';
      cookieGroup.cookies.forEach((cookie) => {
        tableRowsHtml += getTableRowHtml({
          name: this.#translateSetting(cookie.name, lang),
          host: this.#translateSetting(cookie.host, lang),
          description: this.#translateSetting(cookie.description, lang),
          expiration: this.#translateSetting(cookie.expiration, lang),
          type: getTranslation(`type_${cookie.type}`, lang),
        });
      });

      groupsHtml += getGroupHtml(
        { ...translations, title, description },
        cookieGroup.groupId,
        `${cookieGroupCategoryName}_${groupNumber}`,
        tableRowsHtml,
        groupRequired,
        isAccepted,
      );
      groupNumber += 1;
    });
    return groupsHtml;
  }

  /**
   * Temporary solution to inject CSS styles into the shadow root.
   * @private
   * @param {ShadowRoot} shadowRoot - The shadow root element to inject the styles into.
   * @return {Promise<void>} - A promise that resolves when the styles are injected successfully.
   * @throws {Error} - If there is an error fetching or injecting the styles.
   */
  async #injectCssStyles(shadowRoot) {
    // TODO: Replace this temporary CSS file hack with proper preprocess CSS inlining
    // Fetch the external CSS file
    try {
      const response = await fetch(this.#TEMP_CSS_PATH);
      const cssText = await response.text();

      // Create and inject the style
      const style = document.createElement('style');
      style.textContent = cssText;
      shadowRoot.appendChild(style);
    } catch (error) {
      throw new Error(`Cookie consent: Failed to load the temporary CSS file solution: '${error}'`);
    }
  }

  /**
   * Renders the cookie consent banner or page element.
   * @private
   * @param {string} lang - The language for translations.
   * @param {Object} siteSettings - The site settings object.
   * @param {boolean} isBanner - Indicates if rendering banner or page element.
   * @param {HTMLElement} renderTarget - The target element for rendering the page element, unset otherwise.
   * @throws {Error} If the targetSelector element is not found.
   * @throws {Error} If the spacerParentSelector element is not found.
   * @throws {Error} If the contentSelector element is not found.
   * @throws {Error} If failed to load the temporary CSS file solution.
   */
  async #render(lang, siteSettings, isBanner, renderTarget = null) {
    let spacerParent;
    let renderTargetToPrepend = renderTarget;
    if (isBanner) {
      const bannerTarget = document.querySelector(this.#TARGET_SELECTOR);
      if (!bannerTarget) {
        throw new Error(`Cookie consent: targetSelector element '${this.#TARGET_SELECTOR}' was not found`);
      }
      spacerParent = document.querySelector(this.#SPACER_PARENT_SELECTOR);
      if (!spacerParent) {
        throw new Error(
          `Cookie consent: The spacerParentSelector element '${this.#SPACER_PARENT_SELECTOR}' was not found`,
        );
      }
      if (!document.querySelector(this.#PAGE_CONTENT_SELECTOR)) {
        throw new Error(`Cookie consent: contentSelector element '${this.#PAGE_CONTENT_SELECTOR}' was not found`);
      }
      renderTargetToPrepend = bannerTarget;
    }

    const container = document.createElement('div');
    container.classList.add('hds-cc__target');
    container.style.all = 'initial';
    if (!isBanner) {
      renderTargetToPrepend.innerHTML = '';
    }
    renderTargetToPrepend.prepend(container);

    const shadowRoot = container.attachShadow({ mode: 'open' });
    this.#COOKIE_HANDLER.setFormReference(shadowRoot.querySelector('form'));

    // Inject CSS styles
    await this.#injectCssStyles(shadowRoot);

    const translations = {};
    const translationKeys = getTranslationKeys();
    translationKeys.forEach((key) => {
      translations[key] = getTranslation(key, lang, siteSettings);
    });

    const browserCookie = this.#COOKIE_HANDLER.getCookie();
    const listOfAcceptedGroups = browserCookie ? Object.keys(browserCookie.groups) : [];

    const groupsHtml = [
      this.#getCookieGroupsHtml(
        siteSettings.requiredGroups,
        lang,
        translations,
        true,
        'required',
        listOfAcceptedGroups,
      ),
      this.#getCookieGroupsHtml(
        siteSettings.optionalGroups,
        lang,
        translations,
        false,
        'optional',
        listOfAcceptedGroups,
      ),
    ].join('');

    // Create banner HTML
    shadowRoot.innerHTML += getCookieBannerHtml(translations, groupsHtml, this.#THEME, isBanner);

    // Add button events
    const shadowRootForm = shadowRoot.querySelector('form');
    shadowRoot.querySelectorAll('button[type=submit]').forEach((button) => {
      button.addEventListener('click', (e) => {
        this.#handleButtonEvents(e.target.dataset.approved, shadowRootForm);
      });
    });

    if (isBanner) {
      this.#bannerElements.bannerContainer = container;

      // Add scroll-margin-bottom to all elements inside the contentSelector
      const style = document.createElement('style');
      style.innerHTML = `${this.#PAGE_CONTENT_SELECTOR} * {scroll-margin-bottom: calc(var(--hds-cookie-consent-height, -8px) + 8px);}`;
      document.head.appendChild(style);

      // Add spacer inside spacerParent (to the bottom of the page)
      const spacer = document.createElement('div');
      spacer.id = 'hds-cc__spacer';
      this.#bannerElements.spacer = spacer;
      spacerParent.appendChild(spacer);
      spacer.style.height = 'var(--hds-cookie-consent-height, 0)';

      // Update spacer and scroll-margin-bottom on banner resize
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const bannerHeight = parseInt(entry.contentRect.height, 10);
          const borderHeight = parseInt(getComputedStyle(entry.target).borderTopWidth, 10);
          document.documentElement.style.setProperty('--hds-cookie-consent-height', `${bannerHeight + borderHeight}px`);
        });
      });
      const bannerHeightElement = shadowRoot.querySelector('.hds-cc__container');
      resizeObserver.observe(bannerHeightElement);
      this.#resizeReference = { resizeObserver, bannerHeightElement };

      shadowRoot.querySelector('.hds-cc').focus();
    }
  }

  // MARK: Initializer

  /**
   * Initializes the component by removing the banner, retrieving site settings,
   * and rendering the banner if necessary.
   *
   * @private
   * @return {Promise<void>} A promise that resolves when the initialization is complete.
   */
  async #init() {
    this.#removeBanner();

    let settingsPageElement = null;
    // If settings page selector is enabled, check if the element exists
    if (this.#SETTINGS_PAGE_SELECTOR) {
      settingsPageElement = document.querySelector(this.#SETTINGS_PAGE_SELECTOR);
    }

    // const siteSettings = await this.#getSiteSettings();

    const siteSettings = await this.#COOKIE_HANDLER.init(this.#cookie_name);

    if (settingsPageElement) {
      this.#settingsPageElement = settingsPageElement;
      // If settings page element is found, render site settings in page instead of banner
      await this.#render(this.#LANGUAGE, siteSettings, false, settingsPageElement);
    } else {
      // Check if banner is needed or not
      const shouldDisplayBanner = this.#shouldDisplayBanner();
      if (shouldDisplayBanner) {
        await this.#render(this.#LANGUAGE, siteSettings, true);
      }
    }

    const monitorInterval = siteSettings.monitorInterval || 500;
    const remove = siteSettings.remove || false;
    this.#MONITOR.init(this.#cookie_name, this.#COOKIE_HANDLER, monitorInterval, remove);
  }
}

window.hds = window.hds || {};
window.hds.CookieConsentClass = CookieConsentCore;
