/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */

import styles from 'hds-core/lib/components/cookie-consent/cookieConsent';

import {
  CONSTANTS as TEMPLATE_CONSTANTS,
  getCookieBannerHtml,
  getGroupHtml,
  getTableRowHtml,
  getNotificationHtml,
  getAriaLiveHtml,
} from './template';
import { getTranslation } from './translations';
import MonitorAndCleanBrowserStorages from './monitorAndCleanBrowserStorages';
import CookieHandler from './cookieHandler';

// This private symbol is being used as a way to ensure that the constructor is not called without the create method.
const privateSymbol = Symbol('private');

/**
 * Represents a class for managing cookie consent.
 * @class
 */
// eslint-disable-next-line import/prefer-default-export
export class CookieConsentCore {
  // MARK: Private properties
  #language;
  #theme;
  #targetSelector;
  #spacerParentSelector;
  #pageContentSelector;
  #submitEvent = false;
  #settingsPageSelector;
  #monitor;
  #cookieHandler;
  #siteSettings;
  #shadowRootElement = null;

  #bannerElements = {
    bannerContainer: null,
    spacer: null,
    ariaLive: null,
  };

  #settingsPageElement = null;

  #resizeReference = {
    resizeObserver: null,
    bannerHeightElement: null,
  };

  // MARK: Public methods
  /**
   * Creates a new instance of the CookieConsent class. It's not meant to be called from outside.
   * @constructor
   * @param {Object} siteSettingsObj - The site settings object to use instead of the URL.
   * @param {Object} options - The options for configuring the CookieConsent instance.
   * @param {string} [options.language='en'] - The page language.
   * @param {string} [options.theme='bus'] - The theme for the banner.
   * @param {string} [options.targetSelector='body'] - The selector for where to inject the banner.
   * @param {string} [options.spacerParentSelector='body'] - The selector for where to inject the spacer.
   * @param {string} [options.pageContentSelector='body'] - The selector for where to add scroll-margin-bottom.
   * @param {string} [options.submitEvent=false] - If a string, do not reload the page, but submit the string as an event after consent.
   * @param {string} [options.settingsPageSelector=null] - If this string is set and a matching element is found on the page, show cookie settings in a page replacing the matched element.
   * @param {boolean} [calledFromCreate=false] - Indicates if the constructor was called from the create method.
   * @throws {Error} Throws an error if called from outside the create method.
   * @throws {Error} Throws an error if siteSettingsObj is not provided.
   */
  constructor(
    siteSettingsObj, // Object with site settings to use instead of the url
    {
      language = 'en', // Page language
      theme = 'bus', // Theme for the banner
      targetSelector = 'body', // Where to inject the banner
      spacerParentSelector = 'body', // Where to inject the spacer
      pageContentSelector = 'body', // Where to add scroll-margin-bottom
      submitEvent = false, // if string, do not reload page, but submit the string as event after consent
      settingsPageSelector = null, // If this string is set and a matching element is found on the page, show cookie settings in a page replacing the matched element.
    },
    calledFromCreate = false,
  ) {
    if (calledFromCreate !== privateSymbol) {
      throw new Error(
        'Cookie consent: direct construction not allowed. Use `await CookieConsentCore.create()` instead.',
      );
    }

    this.#language = language;
    this.#theme = theme;
    this.#targetSelector = targetSelector;
    this.#spacerParentSelector = spacerParentSelector;
    this.#pageContentSelector = pageContentSelector;
    this.#submitEvent = submitEvent;
    this.#settingsPageSelector = settingsPageSelector;

    CookieConsentCore.addToHdsScope('cookieConsent', this);

    /**
     * Updates the shadow DOM checkboxes based on the consented group names.
     *
     * @param {Array<string>} consentedGroupNames - The array of consented group names.
     * @param {Array<string>} formReference - The reference to the form element.
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

    this.#cookieHandler = new CookieHandler({ shadowDomUpdateCallback, siteSettingsObj, lang: language });
    this.#monitor = new MonitorAndCleanBrowserStorages();
  }

  /**
   * Creates the window.hds object if it does not exist.
   * Adds a value to the window.hds scope.
   * @param {string} name - The name of the value.
   * @param {any} value - The value to add.
   */
  static addToHdsScope(name, value) {
    if (!window.hds) {
      window.hds = {};
    }
    window.hds[name] = value;
  }

  /**
   * Creates and inits a new instance of the CookieConsent class.
   * @param {Object} siteSettingsParam - The URL to the JSON file with site settings or contents of the site settings as an object.
   * @param {Object} options - The options for configuring the CookieConsent instance.
   * @param {string} [options.language='en'] - The page language.
   * @param {string} [options.theme='bus'] - The theme for the banner.
   * @param {string} [options.targetSelector='body'] - The selector for where to inject the banner.
   * @param {string} [options.spacerParentSelector='body'] - The selector for where to inject the spacer.
   * @param {string} [options.pageContentSelector='body'] - The selector for where to add scroll-margin-bottom.
   * @param {boolean|string} [options.submitEvent=false] - If a string, do not reload the page, but submit the string as an event after consent.
   * @param {string} [options.settingsPageSelector=null] - If this string is set and a matching element is found on the page, show cookie settings in a page replacing the matched element.
   * @return {Promise<CookieConsentCore>} A promise that resolves to a new instance of the CookieConsent class.
   * @throws {Error} Throws an error if the siteSettingsParam is not a string or an object.
   * @throws {Error} Throws an error if siteSettingsParam is an URL string and the fetch fails.
   * @throws {Error} Throws an error if siteSettingsParam is an URL string and the JSON parsing fails.
   */
  static async create(siteSettingsParam, options) {
    let instance;
    if (!siteSettingsParam && (typeof siteSettingsParam !== 'string' || typeof siteSettingsParam !== 'object')) {
      throw new Error(
        'Cookie consent: siteSettingsParam is required, it should be an URL string or an siteSettings object.',
      );
    }
    if (typeof siteSettingsParam === 'string') {
      // Fetch the site settings JSON file
      const siteSettingsRaw = await fetch(siteSettingsParam).then((response) => {
        if (!response.ok) {
          throw new Error(
            `Cookie consent: Unable to fetch cookie consent settings: '${response.status}' from: '${siteSettingsParam}' `,
          );
        }
        return response.text();
      });

      // Parse the fetched site settings string to JSON
      let siteSettingsObj;
      try {
        siteSettingsObj = JSON.parse(siteSettingsRaw);
      } catch (error) {
        throw new Error(`Cookie consent: siteSettings JSON parsing failed: ${error}`);
      }
      instance = new CookieConsentCore(siteSettingsObj, options, privateSymbol);
    } else {
      instance = new CookieConsentCore(siteSettingsParam, options, privateSymbol);
    }

    // Initialise the class instance
    await instance.#init();

    // Return reference to the class instance
    return instance;
  }

  /**
   * Get the consent status for the specified cookie group names.
   * @param {string[]} groupNamesArray - An array of group names.
   * @return {Promise<boolean>} A promise that resolves to true if all the groups are accepted, otherwise false.
   */
  getConsentStatus(groupNamesArray) {
    return this.#cookieHandler.getConsentStatus(groupNamesArray);
  }

  /**
   * Sets the status of given cookie groups to accepted.
   *
   * @param {Array} acceptedGroupsArray - An array of cookie group names to be set as accepted.
   * @return {Promise<boolean>} - A promise that resolves to true if the groups' status is successfully set to accepted, otherwise false.
   */
  async setGroupsStatusToAccepted(acceptedGroupsArray) {
    return this.#cookieHandler.setGroupsStatusToAccepted(acceptedGroupsArray);
  }

  /**
   * Opens banner when not on cookie settings page.
   */
  async openBanner(highlightedGroups = []) {
    if (this.#settingsPageSelector && document.querySelector(this.#settingsPageSelector)) {
      // eslint-disable-next-line no-console
      console.error(`Cookie consent: The user is already on settings page`);
      return;
    }
    this.#removeBanner();
    await this.#render(this.#language, this.#siteSettings, true, null, highlightedGroups);
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
      this.#bannerElements.bannerContainer = null;
    }
    if (this.#bannerElements.spacer) {
      this.#bannerElements.spacer.remove();
      this.#bannerElements.spacer = null;
    }
    if (this.#bannerElements.ariaLive) {
      this.#bannerElements.ariaLive.remove();
      this.#bannerElements.ariaLive = null;
    }
    // Remove scroll-margin-bottom variable from all elements inside the contentSelector
    document.documentElement.style.removeProperty('--hds-cookie-consent-height');
  }

  /**
   * Gets accepted checkbox groups from form
   * @private
   * @param {HTMLFormElement} form - The form element to read the group selections from.
   * @param {boolean} [all=false] - Optional parameter to include all selections, regardless of their checked state.
   * @return {Array<string>} - An array of selected groups.
   */
  #getAcceptedGroups(form, all = false) {
    const groupSelections = [];
    const formCheckboxes = form.querySelectorAll('input[data-group]');
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
        acceptedGroups = this.#cookieHandler.getRequiredGroupNames();
        this.#cookieHandler.removeConsentWithdrawnCookiesBeforeSave(acceptedGroups, this.#monitor);
        this.#cookieHandler.saveConsentedGroups(acceptedGroups, false);
        break;
      case 'all':
        acceptedGroups = this.#getAcceptedGroups(formReference, true);
        this.#cookieHandler.saveConsentedGroups(acceptedGroups, false);
        break;
      case 'selected':
        acceptedGroups = this.#getAcceptedGroups(formReference);
        this.#cookieHandler.removeConsentWithdrawnCookiesBeforeSave(acceptedGroups, this.#monitor);
        this.#cookieHandler.saveConsentedGroups(acceptedGroups, false);
        break;
      default:
        // We should not be here, better do nothing
        break;
    }
    if (!this.#submitEvent) {
      window.location.reload();
    } else {
      window.dispatchEvent(new CustomEvent(this.#submitEvent, { detail: { acceptedGroups } }));
      if (!this.#settingsPageElement) {
        this.#announceSettingsSaved();
        this.#removeBanner();
        return;
      }
      this.#announceSettingsSaved();
    }
  }

  /**
   * Prepares the aria-live element for announcements.
   */
  #prepareAnnouncementElement() {
    if (!this.#bannerElements.ariaLive) {
      const ariaLiveElement = this.#shadowRootElement.getElementById(TEMPLATE_CONSTANTS.ariaLiveId);

      // Render aria-live element depending on rendering mode: page or banner.
      this.#bannerElements.ariaLive = ariaLiveElement;
    }
  }

  /**
   * Announces that the settings have been saved and removes the message after a set time.
   */
  #announceSettingsSaved() {
    const SHOW_ARIA_LIVE_FOR_MS = 5000;

    if (!this.#bannerElements.ariaLive) {
      this.#prepareAnnouncementElement();
    }

    const message = getTranslation(
      this.#siteSettings.translations,
      'settingsSaved',
      this.#language,
      this.#siteSettings.fallbackLanguage,
    );
    const notificationAriaLabel = getTranslation(
      this.#siteSettings.translations,
      'notificationAriaLabel',
      this.#language,
      this.#siteSettings.fallbackLanguage,
    );

    if (this.#settingsPageElement) {
      const notificationHtml = getNotificationHtml(message, notificationAriaLabel, 'success');
      this.#bannerElements.ariaLive.innerHTML = notificationHtml;
    } else {
      this.#bannerElements.ariaLive.textContent = message;
    }

    // Remove ariaLive after 5 seconds
    setTimeout(() => {
      if (this.#bannerElements.ariaLive) {
        // If banner has been removed, remove ariaLive element too
        if (!this.#bannerElements.bannerContainer) {
          if (this.#settingsPageElement) {
            const notificationElem = this.#bannerElements.ariaLive.querySelector('.hds-notification');
            if (notificationElem) {
              notificationElem.classList.remove('enter');
              notificationElem.classList.add('exit');
              notificationElem.addEventListener('animationend', () => {
                notificationElem.remove();
                this.#bannerElements.ariaLive = null;
              });
            } else {
              this.#bannerElements.ariaLive.innerHTML = '';
              this.#bannerElements.ariaLive = null;
            }
          } else {
            this.#bannerElements.ariaLive.remove();
            this.#bannerElements.ariaLive = null;
          }

          // Otherwise, clear the content
        } else {
          const notificationElem = this.#bannerElements.ariaLive.querySelector('.hds-notification');
          if (notificationElem) {
            notificationElem.classList.remove('enter');
            notificationElem.classList.add('exit');
            notificationElem.addEventListener('animationend', () => {
              notificationElem.remove();
              this.#bannerElements.ariaLive = null;
            });
          } else {
            this.#bannerElements.ariaLive.innerHTML = '';
            this.#bannerElements.ariaLive = null;
          }
        }
      }
    }, SHOW_ARIA_LIVE_FOR_MS);
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
    const browserCookie = this.#cookieHandler.getCookie();
    // If cookie does not exist or showBanner is true, return true
    return !browserCookie || browserCookie.showBanner;
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
   * Retrieves the HTML representation of cookie groups.
   * @private
   * @param {Array} cookieGroupList - The list of cookie groups.
   * @param {string} lang - The language code.
   * @param {Object} translations - The translations object.
   * @param {boolean} groupRequired - Indicates if the group is required.
   * @param {Array} acceptedGroups - The list of accepted group IDs.
   * @return {string} - The HTML representation of cookie groups.
   */
  #getCookieGroupsHtml(cookieGroupList, lang, translations, groupRequired, acceptedGroups) {
    let groupsHtml = '';
    // Collect accepted groupId's
    const acceptedGroupIds = Object.keys(acceptedGroups);
    cookieGroupList.forEach((cookieGroup) => {
      const isAccepted = acceptedGroupIds.includes(cookieGroup.groupId);
      let timestamp = false;
      if (isAccepted) {
        timestamp = this.#formatDateTimeObject(acceptedGroups[cookieGroup.groupId].timestamp);
      }

      // Build table rows
      let tableRowsHtml = '';
      cookieGroup.cookies.forEach((cookie) => {
        tableRowsHtml += getTableRowHtml(cookie, translations, lang, this.#siteSettings.fallbackLanguage);
      });

      groupsHtml += getGroupHtml(
        cookieGroup,
        translations,
        lang,
        this.#siteSettings.fallbackLanguage,
        cookieGroup.groupId,
        tableRowsHtml,
        groupRequired,
        isAccepted,
        timestamp,
      );
    });
    return groupsHtml;
  }

  /**
   * Inject CSS styles into the shadow root.
   * @private
   * @param {ShadowRoot} shadowRoot - The shadow root element to inject the styles into.
   * @return {Promise<void>} - A promise that resolves when the styles are injected successfully.
   * @throws {Error} - If there is an error fetching or injecting the styles.
   */
  async #injectCssStyles(shadowRoot) {
    // Create and inject the style
    const style = document.createElement('style');
    style.textContent = styles;
    shadowRoot.appendChild(style);
  }

  /**
   * Renders the cookie consent banner or page element.
   * @private
   * @param {string} lang - The language for translations.
   * @param {Object} siteSettings - The site settings object.
   * @param {boolean} isBanner - Indicates if rendering banner or page element.
   * @param {HTMLElement} renderTarget - The target element for rendering the page element, unset otherwise.
   * @param {Array} highlightedGroups - The groups that need consent.
   * @throws {Error} If the targetSelector element is not found.
   * @throws {Error} If the spacerParentSelector element is not found.
   * @throws {Error} If the contentSelector element is not found.
   */
  async #render(lang, siteSettings, isBanner, renderTarget = null, highlightedGroups = []) {
    let spacerParent;
    let renderTargetToPrepend = renderTarget;
    if (isBanner) {
      const bannerTarget = document.querySelector(this.#targetSelector);
      if (!bannerTarget) {
        throw new Error(`Cookie consent: The targetSelector element '${this.#targetSelector}' was not found`);
      }
      spacerParent = document.querySelector(this.#spacerParentSelector);
      if (!spacerParent) {
        throw new Error(
          `Cookie consent: The spacerParentSelector element '${this.#spacerParentSelector}' was not found`,
        );
      }
      if (!document.querySelector(this.#pageContentSelector)) {
        throw new Error(`Cookie consent: The pageContentSelector element '${this.#pageContentSelector}' was not found`);
      }
      renderTargetToPrepend = bannerTarget;
    }

    const container = document.createElement('div');
    container.classList.add(TEMPLATE_CONSTANTS.targetClass);
    container.style.all = 'var(--hds-cc--all-override, initial)!important';
    if (!isBanner) {
      renderTargetToPrepend.innerHTML = '';
    }
    renderTargetToPrepend.prepend(container);

    if (isBanner) {
      const ariaLiveElement = getAriaLiveHtml(false);
      container.insertAdjacentHTML('beforebegin', ariaLiveElement);
      this.#bannerElements.ariaLive = renderTargetToPrepend.querySelector(`#${TEMPLATE_CONSTANTS.ariaLiveId}`);
    }

    const shadowRoot = container.attachShadow({ mode: 'open' });

    // Inject CSS styles
    await this.#injectCssStyles(shadowRoot);

    const browserCookie = this.#cookieHandler.getCookie();
    const listOfAcceptedGroups = browserCookie ? browserCookie.groups : [];

    const groupsHtml = [
      this.#getCookieGroupsHtml(
        siteSettings.requiredGroups,
        lang,
        siteSettings.translations,
        true,
        listOfAcceptedGroups,
      ),
      this.#getCookieGroupsHtml(
        siteSettings.optionalGroups,
        lang,
        siteSettings.translations,
        false,
        listOfAcceptedGroups,
      ),
    ].join('');

    // Create banner HTML
    shadowRoot.innerHTML += getCookieBannerHtml(
      siteSettings.translations,
      lang,
      siteSettings.fallbackLanguage,
      siteSettings,
      groupsHtml,
      this.#theme,
      isBanner,
    );

    this.#shadowRootElement = shadowRoot;
    this.#cookieHandler.setFormReference(shadowRoot.querySelector('form'));

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
      style.innerHTML = `${this.#pageContentSelector} * {scroll-margin-bottom: calc(var(--hds-cookie-consent-height, -8px) + 8px);}`;
      document.head.appendChild(style);

      // Add spacer inside spacerParent (to the bottom of the page)
      const spacer = document.createElement('div');
      spacer.id = TEMPLATE_CONSTANTS.spacerId;
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
      const bannerHeightElement = shadowRoot.querySelector(`.${TEMPLATE_CONSTANTS.containerClass}`);
      resizeObserver.observe(bannerHeightElement);
      this.#resizeReference = { resizeObserver, bannerHeightElement };

      shadowRoot.querySelector('.hds-cc').focus();
    }
    this.#prepareAnnouncementElement();

    // If highlights are requested, apply them
    if (highlightedGroups.length > 0) {
      let firstElement = null;
      highlightedGroups.forEach((group) => {
        const groupElement = shadowRootForm.querySelector(`div[data-group-id=${group}]`);
        if (groupElement) {
          groupElement.classList.add(TEMPLATE_CONSTANTS.groupHighlightClass);
          if (firstElement === null) {
            firstElement = groupElement;
          }
        }
      });

      if (firstElement !== null) {
        shadowRoot.querySelector(`.${TEMPLATE_CONSTANTS.accordionButtonDetailsClass}`).click();
        setTimeout(() => {
          firstElement.scrollIntoView({ behavior: 'auto' });
        }, 500);
      }
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
    await new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });

    this.#removeBanner();

    let settingsPageElement = null;
    // If settings page selector is enabled, check if the element exists
    if (this.#settingsPageSelector) {
      settingsPageElement = document.querySelector(this.#settingsPageSelector);
    }

    const siteSettings = await this.#cookieHandler.init();
    this.#siteSettings = siteSettings;

    if (settingsPageElement) {
      this.#settingsPageElement = settingsPageElement;
      // If settings page element is found, render site settings in page instead of banner
      await this.#render(this.#language, siteSettings, false, settingsPageElement);
    } else {
      // Check if banner is needed or not
      const shouldDisplayBanner = this.#shouldDisplayBanner();
      if (shouldDisplayBanner) {
        await this.#render(this.#language, siteSettings, true);
      }
    }

    const monitorInterval = siteSettings.monitorInterval || 0;
    const remove = siteSettings.remove || false;
    this.#monitor.init(this.#cookieHandler, monitorInterval, remove);
  }
}

CookieConsentCore.addToHdsScope('CookieConsentClass', CookieConsentCore);
