import { getTranslation } from './translations';

/**
 * Classes and IDs referred from elsewhere in the code.
 * @type {Object}
 * @property {string} cookieConsentClass - The main wrapping class for the cookie consent banner.
 * @property {string} ariaLiveId - The ID for the aria-live region.
 * @property {string} targetClass - The class for the target where to render banner element.
 * @property {string} spacerId - The ID for the spacer element.
 * @property {string} containerClass - The class for the container element.
 * @property {string} groupHighlightClass - The class for the highlighted group that gets added dynamicly.
 * @property {string} accordionButtonDetailsClass - The class for the details accordion button.
 */
export const CONSTANTS = {
  cookieConsentClass: 'hds-cc',
  ariaLiveId: 'hds-cc-aria-live',
  targetClass: 'hds-cc__target',
  spacerId: 'hds-cc__spacer',
  containerClass: 'hds-cc__container',
  groupHighlightClass: 'hds-cc__group--highlight',
  accordionButtonDetailsClass: 'hds-cc__accordion-button--details',
};

/**
 * Generates the HTML for the aria-live region.
 * @param {boolean} isNotificationContainer - Is the element for notification container or aria-live-container.
 * @return {string} The HTML for the aria-live region.
 */
export function getAriaLiveHtml(isNotificationContainer) {
  const ariaLiveClass = isNotificationContainer ? 'hds-cc__notification_container' : 'hds-cc__aria-live-container';
  return `<div id="${CONSTANTS.ariaLiveId}" class="${ariaLiveClass}" aria-live="polite"></div>`;
}

/**
 * Generates the HTML for the notification.
 *
 * @param {string} message - The message to display in the notification.
 * @param {string} notificationAriaLabel - The aria-label for the notification.
 * @param {string} type - The type of the notification. Either 'success' or 'info' are supported.
 * @return {string} The HTML for the notification.
 */
export function getNotificationHtml(message, notificationAriaLabel, type = 'success') {
  let typeString;
  let iconHtml;
  switch (type) {
    case 'info':
      typeString = 'hds-notification--info';
      iconHtml = 'hds-icon--info-circle-fill';
      break;
    default:
      typeString = 'hds-notification--success';
      iconHtml = 'hds-icon--check-circle-fill';
      break;
  }
  return `
    <section aria-label="${notificationAriaLabel}" class="hds-notification hds-notification--small ${typeString} enter">
      <div class="hds-notification__content">
        <div class="hds-notification__label">
          <span class="hds-icon ${iconHtml}" aria-hidden="true"></span>
        </div>
        <div class="hds-notification__body">${message}</div>
      </div>
    </section>`;
}

/**
 * Generates the HTML for the cookie banner.
 *
 * @param {Object} translations - The translations object containing the text for the banner.
 * @param {string} lang - The language code.
 * @param {string} fallbackLang - The fallback language code.
 * @param {Object} translationParams - The parameters used to replace placeholders in the translation.
 * @param {string} groupsHtml - The HTML for the consent groups.
 * @param {string} theme - The theme for the banner.
 * @param {boolean} isBanner - Indicates if the code is rendered as banner or part of a page.
 * @return {string} The HTML for the cookie banner.
 */
export function getCookieBannerHtml(
  translations,
  lang,
  fallbackLang,
  translationParams,
  groupsHtml,
  theme,
  isBanner = true,
) {
  let optionalAriaLiveElement = '';
  if (!isBanner) {
    optionalAriaLiveElement = getAriaLiveHtml(true);
  }
  return `
<div id="hds-cc" class="${CONSTANTS.cookieConsentClass} ${isBanner ? 'hds-cc--banner' : 'hds-cc--page'} hds-theme--${theme}" tabindex="-1" role="region" aria-label="${getTranslation(translations, 'bannerAriaLabel', lang, fallbackLang)}">
  <div class="${CONSTANTS.containerClass}">
    <div class="hds-cc__aligner">

      <h2 class="hds-cc__heading">
        ${getTranslation(translations, 'heading', lang, fallbackLang, translationParams)}
      </h2>
      <p class="hds-cc__description">
        ${getTranslation(translations, 'description', lang, fallbackLang)}
      </p>

      <button
        type="button"
        class="hds-cc__accordion-button ${CONSTANTS.accordionButtonDetailsClass} hds-button hds-button--small hds-button--supplementary"
        onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');"
        aria-controls="hds-cc-form"
        aria-expanded="false"
        aria-live="polite">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-down"></span>
        <span class="hds-cc__accordion-button-show hds-button__label">${getTranslation(translations, 'showDetails', lang, fallbackLang)}</span>
        <span class="hds-cc__accordion-button-hide hds-button__label">${getTranslation(translations, 'hideDetails', lang, fallbackLang)}</span>
      </button>

      <form action="" class="hds-cc__form" id="hds-cc-form">
        <div class="hds-cc__form__animator">
          <h3>${getTranslation(translations, 'form_heading', lang, fallbackLang)}</h3>
          <p>${getTranslation(translations, 'form_text', lang, fallbackLang)}</p>

          <div class="hds-cc__groups">
            ${groupsHtml}
          </div>
        </div>
      </form>
      ${optionalAriaLiveElement}
      <div class="hds-cc__buttons">
        <button type="submit" class="hds-button hds-button--secondary hds-cc__selected-cookies-button" data-approved="selected">
        <span class="hds-button__label">${getTranslation(translations, 'approveRequiredAndSelectedConsents', lang, fallbackLang)}</span>
        </button>
        <button type="submit" class="hds-button hds-button--secondary hds-cc__all-cookies-button" data-approved="all">
          <span class="hds-button__label">${getTranslation(translations, 'approveAllConsents', lang, fallbackLang)}</span>
        </button>
        <button type="submit" class="hds-button hds-button--secondary hds-cc__required-cookies-button" data-approved="required">
          <span class="hds-button__label">${getTranslation(translations, 'approveOnlyRequiredConsents', lang, fallbackLang)}</span>
        </button>
      </div>
    </div>
  </div>
</div>`;
}

/**
 * Formats the timestamp and returns the formatted string.
 *
 * @param {number} timestamp - The timestamp to be formatted.
 * @param {string} groupId - The group ID associated with the timestamp.
 * @param {object} translations - The translations object containing language translations.
 * @param {string} lang - The current language.
 * @param {string} fallbackLang - The fallback language.
 * @return {string} - The formatted timestamp string.
 */
export function formatTimestamp(timestamp, groupId, translations, lang, fallbackLang) {
  const acceptedTranslation = getTranslation(translations, 'acceptedAt', lang, fallbackLang, timestamp);
  return timestamp ? `<p class="timestamp" data-group="${groupId}">${acceptedTranslation}</p>` : '';
}

/**
 * Generates the HTML for a cookie group.
 *
 * @param {Object} groupData - The data for the cookie group.
 * @param {Object} translations - The translations object containing the text for the group.
 * @param {string} lang - The language code.
 * @param {string} fallbackLang - The fallback language code.
 * @param {string} groupId - The ID of the cookie group.
 * @param {string} tableRowsHtml - The HTML for the table rows.
 * @param {boolean} groupRequired - Indicates if the group is required.
 * @param {boolean} isAccepted - Indicates if the group is accepted.
 * @param {Object} timestamp - Contains the date and time for category acceptance.
 * @return {string} The generated HTML for the cookie group.
 */
export function getGroupHtml(
  groupData,
  translations,
  lang,
  fallbackLang,
  groupId,
  tableRowsHtml,
  groupRequired,
  isAccepted,
  timestamp,
) {
  const required = groupRequired ? ' checked disabled' : '';
  const accepted = isAccepted ? 'checked' : '';
  const title = getTranslation(groupData, 'title', lang, fallbackLang);
  const description = getTranslation(groupData, 'description', lang, fallbackLang);

  const highlightedGroup = getTranslation(translations, 'highlightedGroup', lang, fallbackLang);
  const highlightedGroupAria = getTranslation(translations, 'highlightedGroupAria', lang, fallbackLang, { title });
  return `
            <div class="hds-cc__group" data-group-id="${groupId}">
              <div class="hds-checkbox">
                <input type="checkbox" id="${groupId}-cookies" class="hds-checkbox__input" ${required} ${accepted} data-group="${groupId}" />
                <label for="${groupId}-cookies" class="hds-checkbox__label">${title}</label>
              </div>
              ${getNotificationHtml(highlightedGroup, highlightedGroupAria, 'info')}
              <p>${description}</p>
              <div data-timestamp="${groupId}">
                ${formatTimestamp(timestamp, groupId, translations, lang, fallbackLang)}
              </div>

              <button
                type="button"
                class="hds-cc__accordion-button hds-cc__accordion-button--group-details hds-button hds-button--small hds-button--supplementary"
                onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');"
                aria-controls="hds-cc-group-details-${groupId}"
                aria-expanded="false"
                aria-live="polite">
                <span aria-hidden="true" class="hds-icon hds-icon--angle-down"></span>
                <span class="hds-cc__accordion-button-show hds-button__label">${getTranslation(translations, 'showCookieSettings', lang, fallbackLang)}</span>
                <span class="hds-cc__accordion-button-hide hds-button__label">${getTranslation(translations, 'hideCookieSettings', lang, fallbackLang)}</span>
                <span class="visually-hidden">${title}</span>
              </button>
              <div class="hds-cc__group-details" id="hds-cc-group-details-${groupId}">
                <div class="hds-cc__group-details__animator">
                  <div class="hds-table-container" tabindex="0" role="region">
                    <table class="hds-table hds-table--light">
                      <thead>
                        <tr class="hds-table__header-row">
                        <th scope="col">${getTranslation(translations, 'tableHeadingsName', lang, fallbackLang)}</th>
                        <th scope="col">${getTranslation(translations, 'tableHeadingsHostName', lang, fallbackLang)}</th>
                        <th scope="col">${getTranslation(translations, 'tableHeadingsDescription', lang, fallbackLang)}</th>
                        <th scope="col">${getTranslation(translations, 'tableHeadingsExpiration', lang, fallbackLang)}</th>
                        <th scope="col">${getTranslation(translations, 'tableHeadingsType', lang, fallbackLang)}</th>
                        </tr>
                      </thead>
                      <tbody class="hds-table__content">
                        ${tableRowsHtml}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            `;
}

/**
 * Generates HTML for a table row based on the provided row data.
 *
 * @param {Object} rowData - The data for the table row.
 * @param {string} rowData.name - Cookie key string
 * @param {string} rowData.host - The host of the cookie.
 * @param {string} rowData.description - The description of the cookie.
 * @param {string} rowData.expiration - The expiration of the cookie.
 * @param {string} rowData.type - The type of the cookie/storage item.
 * @param {Object} translations - The translations object containing the text for the table.
 * @param {string} lang - The language code.
 * @param {string} fallbackLang - The fallback language code.
 * @return {string} The HTML for the table row.
 */
export function getTableRowHtml(rowData, translations, lang, fallbackLang) {
  return `
                    <tr>
                      <td>${getTranslation(rowData, 'name', lang, fallbackLang)}</td>
                      <td>${getTranslation(rowData, 'host', lang, fallbackLang)}</td>
                      <td>${getTranslation(rowData, 'description', lang, fallbackLang)}</td>
                      <td>${getTranslation(rowData, 'expiration', lang, fallbackLang)}</td>
                      <td>${getTranslation(translations, `type_${rowData.type}`, lang, fallbackLang)}</td>
                    </tr>
                    `;
}
