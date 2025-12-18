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

const visuallyHiddenStyleInJS = `
  border: 0;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;`;

/**
 *
 * @param {object} objects That contain translations, key and optional parameters
 * @param string lang langcode for the wanted language
 * @param object directions object with language directions
 * @param string fallbackLang langcode for the fallback language
 * @returns object with translation objects
 */
function getTranslationObjects(objects, lang, directions, fallbackLang) {
  const translations = {};
  objects.forEach((obj) => {
    translations[obj.key] = getTranslation(obj.translations, obj.key, lang, directions, fallbackLang, obj.parameters);
  });
  return translations;
}

/**
 * Generates HTML attributes for lang and dir if needed.
 * @param {Object} translated Translation object
 * @returns string HTML attributes for lang and dir if needed
 */
function getLangAttributes(translated) {
  return translated.fallback ? `lang="${translated.lang}" dir="${translated.dir}"` : '';
}

/**
 * Generates the HTML for the aria-live region.
 * @param {boolean} isNotificationContainer - Is the element for notification container or aria-live-container.
 * @return {string} The HTML for the aria-live region.
 */
export function getAriaLiveHtml(isNotificationContainer) {
  const className = isNotificationContainer ? 'hds-cc__notification_container' : '';
  const style = isNotificationContainer ? '' : visuallyHiddenStyleInJS;
  return `<div id="${CONSTANTS.ariaLiveId}" class="${className}" style="${style}" aria-live="polite"></div>`;
}

/**
 * Generates the HTML for the notification.
 *
 * @param {object} message - The translation object containing message to display in the notification.
 * @param {object} notificationAriaLabel - The translation object containing aria-label for the notification.
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
    <section aria-label="${notificationAriaLabel.value}" class="hds-notification hds-notification--small ${typeString} enter">
      <div class="hds-notification__content">
        <div class="hds-notification__label">
          <span class="hds-icon ${iconHtml}" aria-hidden="true"></span>
        </div>
        <div class="hds-notification__body" ${getLangAttributes(message)}>${message.value}</div>
      </div>
    </section>`;
}

/**
 * Generates the HTML for the cookie banner.
 *
 * @param {Object} translations - The translations object containing the text for the banner.
 * @param {string} lang - The language code.
 * @param {Object} directions - The language directions.
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
  directions,
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

  // Get translations for the group
  const translated = getTranslationObjects(
    [
      { translations, key: 'bannerAriaLabel', parameters: translationParams },
      { translations, key: 'heading', parameters: translationParams },
      { translations, key: 'description', parameters: translationParams },
      { translations, key: 'showDetails', parameters: translationParams },
      { translations, key: 'hideDetails', parameters: translationParams },
      { translations, key: 'formHeading', parameters: translationParams },
      { translations, key: 'formText', parameters: translationParams },
      { translations, key: 'approveRequiredAndSelectedConsents', parameters: translationParams },
      { translations, key: 'approveAllConsents', parameters: translationParams },
      { translations, key: 'approveOnlyRequiredConsents', parameters: translationParams },
    ],
    lang,
    directions,
    fallbackLang,
  );

  // Set banner language and direction, fallback to fallbackLang if wanted language is not found in site settings directions
  const bannerLang = !directions[lang] ? fallbackLang : lang;
  const bannerDir = directions[bannerLang] || 'ltr';

  return `
<div id="hds-cc" class="${CONSTANTS.cookieConsentClass} ${isBanner ? 'hds-cc--banner' : 'hds-cc--page'} hds-theme--${theme}" tabindex="-1" role="region" aria-label="${translated.bannerAriaLabel.value}">
  <div class="${CONSTANTS.containerClass}">
    <div class="hds-cc__aligner" lang="${bannerLang}" dir="${bannerDir}">

      <h2 class="hds-cc__heading" ${getLangAttributes(translated.heading)}>
        ${translated.heading.value}
      </h2>
      <p class="hds-cc__description" ${getLangAttributes(translated.description)}>
        ${translated.description.value}
      </p>

      <button
        type="button"
        class="hds-cc__accordion-button ${CONSTANTS.accordionButtonDetailsClass} hds-button hds-button--small hds-button--supplementary"
        aria-controls="hds-cc-form"
        aria-expanded="false"
        aria-live="polite">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-down"></span>
        <span class="hds-cc__accordion-button-show hds-button__label" ${getLangAttributes(translated.showDetails)}>${translated.showDetails.value}</span>
        <span class="hds-cc__accordion-button-hide hds-button__label" ${getLangAttributes(translated.hideDetails)}>${translated.hideDetails.value}</span>
      </button>

      <form action="" class="hds-cc__form" id="hds-cc-form">
        <div class="hds-cc__form__animator">
          <h3 ${getLangAttributes(translated.formHeading)}>${translated.formHeading.value}</h3>
          <p ${getLangAttributes(translated.formText)}>${translated.formText.value}</p>

          <div class="hds-cc__groups">
            ${groupsHtml}
          </div>
        </div>
      </form>
      ${optionalAriaLiveElement}
      <div class="hds-cc__buttons">
        <button type="submit" class="hds-button hds-button--secondary hds-cc__selected-cookies-button" data-approved="selected">
        <span class="hds-button__label" ${getLangAttributes(translated.approveRequiredAndSelectedConsents)}>${translated.approveRequiredAndSelectedConsents.value}</span>
        </button>
        <button type="submit" class="hds-button hds-button--secondary hds-cc__all-cookies-button" data-approved="all">
          <span class="hds-button__label" ${getLangAttributes(translated.approveAllConsents)}>${translated.approveAllConsents.value}</span>
        </button>
        <button type="submit" class="hds-button hds-button--secondary hds-cc__required-cookies-button" data-approved="required">
          <span class="hds-button__label" ${getLangAttributes(translated.approveOnlyRequiredConsents)}>${translated.approveOnlyRequiredConsents.value}</span>
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
 * @param {object} directions - The language directions.
 * @param {string} fallbackLang - The fallback language.
 * @return {string} - The formatted timestamp string.
 */
export function formatTimestamp(timestamp, groupId, translations, lang, directions, fallbackLang) {
  const acceptedTranslation = getTranslationObjects(
    [
      {
        translations,
        key: 'acceptedAt',
        parameters: timestamp,
      },
    ],
    lang,
    directions,
    fallbackLang,
  );

  return timestamp
    ? `<p class="timestamp" data-group="${groupId}" ${getLangAttributes(acceptedTranslation.acceptedAt)}>${acceptedTranslation.acceptedAt.value}</p>`
    : '';
}

/**
 * Generates the HTML for a cookie group.
 *
 * @param {Object} groupData - The data for the cookie group.
 * @param {Object} translations - The translations object containing the text for the group.
 * @param {string} lang - The language code.
 * @param {Object} directions - The language directions.
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
  directions,
  fallbackLang,
  groupId,
  tableRowsHtml,
  groupRequired,
  isAccepted,
  timestamp,
) {
  const required = groupRequired ? ' checked disabled' : '';
  const accepted = isAccepted ? 'checked' : '';

  // Get translations for the group
  const translated = getTranslationObjects(
    [
      { translations: groupData, key: 'title' },
      { translations: groupData, key: 'description' },
      { translations, key: 'highlightedGroup' },
      { translations, key: 'showCookieSettings' },
      { translations, key: 'hideCookieSettings' },
      { translations, key: 'tableHeadingsName' },
      { translations, key: 'tableHeadingsHostName' },
      { translations, key: 'tableHeadingsDescription' },
      { translations, key: 'tableHeadingsExpiration' },
      { translations, key: 'tableHeadingsType' },
    ],
    lang,
    directions,
    fallbackLang,
  );

  // Add highlighted group to translations in second step as it requires dynamic content from "title"
  Object.assign(
    translated,
    getTranslationObjects(
      [
        {
          translations,
          key: 'highlightedGroupAria',
          parameters: { title: translated.title.value },
        },
      ],
      lang,
      directions,
      fallbackLang,
    ),
  );

  return `
            <div class="hds-cc__group" data-group-id="${groupId}">
              <div class="hds-checkbox">
                <input type="checkbox" id="${groupId}-cookies" class="hds-checkbox__input" ${required} ${accepted} data-group="${groupId}" />
                <label for="${groupId}-cookies" class="hds-checkbox__label" ${getLangAttributes(translated.title)}>${translated.title.value}</label>
              </div>
              ${getNotificationHtml(translated.highlightedGroup, translated.highlightedGroupAria, 'info')}
              <p ${getLangAttributes(translated.description)}>${translated.description.value}</p>
              <div data-timestamp="${groupId}">
                ${formatTimestamp(timestamp, groupId, translations, lang, directions, fallbackLang)}
              </div>

              <button
                type="button"
                class="hds-cc__accordion-button hds-cc__accordion-button--group-details hds-button hds-button--small hds-button--supplementary"
                aria-controls="hds-cc-group-details-${groupId}"
                aria-expanded="false"
                aria-live="polite">
                <span aria-hidden="true" class="hds-icon hds-icon--angle-down"></span>
                <span class="hds-cc__accordion-button-show hds-button__label" ${getLangAttributes(translated.showCookieSettings)}>${translated.showCookieSettings.value}</span>
                <span class="hds-cc__accordion-button-hide hds-button__label" ${getLangAttributes(translated.hideCookieSettings)}>${translated.hideCookieSettings.value}</span>
                <span class="visually-hidden" ${getLangAttributes(translated.title)}>${translated.title.value}</span>
              </button>
              <div class="hds-cc__group-details" id="hds-cc-group-details-${groupId}">
                <div class="hds-cc__group-details__animator">
                  <div class="hds-table-container" tabindex="0" role="region">
                    <table class="hds-table hds-table--light">
                      <thead>
                        <tr class="hds-table__header-row">
                        <th scope="col" ${getLangAttributes(translated.tableHeadingsName)}>${translated.tableHeadingsName.value}</th>
                        <th scope="col" ${getLangAttributes(translated.tableHeadingsHostName)}>${translated.tableHeadingsHostName.value}</th>
                        <th scope="col" ${getLangAttributes(translated.tableHeadingsDescription)}>${translated.tableHeadingsDescription.value}</th>
                        <th scope="col" ${getLangAttributes(translated.tableHeadingsExpiration)}>${translated.tableHeadingsExpiration.value}</th>
                        <th scope="col" ${getLangAttributes(translated.tableHeadingsType)}>${translated.tableHeadingsType.value}</th>
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
 * @param {string} rowData.storageType - The storageType of the cookie/storage item.
 * @param {Object} translations - The translations object containing the text for the table.
 * @param {string} lang - The language code.
 * @param {Object} directions - The language directions.
 * @param {string} fallbackLang - The fallback language code.
 * @return {string} The HTML for the table row.
 */
export function getTableRowHtml(rowData, translations, lang, directions, fallbackLang) {
  const storageType = `storageType${rowData.storageType}`;
  const translated = getTranslationObjects(
    [
      { translations: rowData, key: 'name' },
      { translations: rowData, key: 'host' },
      { translations: rowData, key: 'description' },
      { translations: rowData, key: 'expiration' },
      { translations, key: storageType },
    ],
    lang,
    directions,
    fallbackLang,
  );

  return `
                    <tr>
                      <td ${getLangAttributes(translated.name)}>${translated.name.value}</td>
                      <td ${getLangAttributes(translated.host)}>${translated.host.value}</td>
                      <td ${getLangAttributes(translated.description)}>${translated.description.value}</td>
                      <td ${getLangAttributes(translated.expiration)}>${translated.expiration.value}</td>
                      <td ${getLangAttributes(translated[storageType])}>${translated[storageType].value}</td>
                    </tr>
                    `;
}
