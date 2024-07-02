/**
 * Generates the HTML for the aria-live region.
 * @param {string} ariaLiveId - The ID for the aria-live region.
 * @param {string} ariaLiveClass - The class for the aria-live region.
 * @return {string} The HTML for the aria-live region.
 */
export function getAriaLiveHtml(ariaLiveId, ariaLiveClass) {
  return `<div id="${ariaLiveId}" class="${ariaLiveClass}" aria-live="polite"></div>`;
}

/**
 * Generates the HTML for the cookie banner.
 *
 * @param {Object} translations - The translations object containing the text for the banner.
 * @param {string} translations.bannerAriaLabel - The aria-label for the banner.
 * @param {string} translations.heading - The heading text for the banner.
 * @param {string} translations.description - The description text for the banner.
 * @param {string} translations.showDetails - The text for the "Show Details" button.
 * @param {string} translations.hideDetails - The text for the "Hide Details" button.
 * @param {string} translations.form_heading - The heading text for the form.
 * @param {string} translations.form_text - The text for the form.
 * @param {string} translations.approveAllConsents - The text for the "Approve All Consents" button.
 * @param {string} translations.approveRequiredAndSelectedConsents - The text for the "Approve Required and Selected Consents" button.
 * @param {string} translations.approveOnlyRequiredConsents - The text for the "Approve Only Required Consents" button.
 * @param {string} groupsHtml - The HTML for the consent groups.
 * @param {string} theme - The theme for the banner.
 * @param {string} ariaLiveId - The ID for the aria-live region.
 * @param {boolean} isBanner - Indicates if the code is rendered as banner or part of a page.
 * @return {string} The HTML for the cookie banner.
 */
export function getCookieBannerHtml(translations, groupsHtml, theme, ariaLiveId, isBanner = true) {
  let optionalAriaLiveElement = '';
  if (!isBanner) {
    optionalAriaLiveElement = getAriaLiveHtml(ariaLiveId, 'hds-cc__notification_container');
  }
  return `
<div id="hds-cc" class="hds-cc ${isBanner ? 'hds-cc--banner' : 'hds-cc--page'} hds-theme--${theme}" tabindex="-1" role="region" aria-label="${translations.bannerAriaLabel}">
  <div class="hds-cc__container">
    <div class="hds-cc__aligner">

      <h2 class="hds-cc__heading">
        ${translations.heading}
      </h2>
      <p class="hds-cc__description">
        ${translations.description}
      </p>

      <button
        type="button"
        class="hds-cc__accordion-button hds-cc__accordion-button--details hds-button hds-button--small hds-button--supplementary"
        onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');"
        aria-controls="hds-cc-form"
        aria-expanded="false"
        aria-live="polite">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-down"></span>
        <span class="hds-cc__accordion-button-show hds-button__label">${translations.showDetails}</span>
        <span class="hds-cc__accordion-button-hide hds-button__label">${translations.hideDetails}</span>
      </button>

      <form action="" class="hds-cc__form" id="hds-cc-form">
        <div class="hds-cc__form__animator">
          <h3>${translations.form_heading}</h3>
          <p>${translations.form_text}</p>

          <div class="hds-cc__groups">
            ${groupsHtml}
          </div>
        </div>
      </form>
      ${optionalAriaLiveElement}
      <div class="hds-cc__buttons">
        <button type="submit" class="hds-button hds-button--secondary hds-cc__selected-cookies-button" data-approved="selected">
        <span class="hds-button__label">${translations.approveRequiredAndSelectedConsents}</span>
        </button>
        <button type="submit" class="hds-button hds-button--secondary hds-cc__all-cookies-button" data-approved="all">
          <span class="hds-button__label">${translations.approveAllConsents}</span>
        </button>
        <button type="submit" class="hds-button hds-button--secondary hds-cc__required-cookies-button" data-approved="required">
          <span class="hds-button__label">${translations.approveOnlyRequiredConsents}</span>
        </button>
      </div>
    </div>
  </div>
</div>`;
}

/**
 * Generates the HTML for a cookie group.
 *
 * @param {Object} translations - The translations object containing the text for the group.
 * @param {string} groupId - The ID of the cookie group.
 * @param {string} groupUniqueId - The unique ID of the cookie group.
 * @param {string} tableRowsHtml - The HTML for the table rows.
 * @param {boolean} groupRequired - Indicates if the group is required.
 * @param {boolean} isAccepted - Indicates if the group is accepted.
 * @return {string} The generated HTML for the cookie group.
 */
export function getGroupHtml(translations, groupId, groupUniqueId, tableRowsHtml, groupRequired, isAccepted) {
  const required = groupRequired ? ' checked disabled' : '';
  const accepted = isAccepted ? 'checked' : '';
  return `
            <div class="hds-cc__group">
              <div class="hds-checkbox">
                <input type="checkbox" id="${groupId}-cookies" class="hds-checkbox__input" ${required} ${accepted} data-group="${groupId}" />
                <label for="${groupId}-cookies" class="hds-checkbox__label">${translations.title}</label>
              </div>
              <p>${translations.description}</p>

              <button
                type="button"
                class="hds-cc__accordion-button hds-cc__accordion-button--group-details hds-button hds-button--small hds-button--supplementary"
                onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');"
                aria-controls="hds-cc-group-details-${groupUniqueId}"
                aria-expanded="false"
                aria-live="polite">
                <span aria-hidden="true" class="hds-icon hds-icon--angle-down"></span>
                <span class="hds-cc__accordion-button-show hds-button__label">${translations.showCookieSettings}</span>
                <span class="hds-cc__accordion-button-hide hds-button__label">${translations.hideCookieSettings}</span>
                <span class="visually-hidden">${translations.title}</span>
              </button>
              <div class="hds-cc__group-details" id="hds-cc-group-details-${groupUniqueId}">
                <div class="hds-cc__group-details__animator">
                  <div class="hds-table-container" tabindex="0" role="region">
                    <table class="hds-table hds-table--light">
                      <thead>
                        <tr class="hds-table__header-row">
                        <th scope="col">${translations.tableHeadingsName}</th>
                        <th scope="col">${translations.tableHeadingsHostName}</th>
                        <th scope="col">${translations.tableHeadingsDescription}</th>
                        <th scope="col">${translations.tableHeadingsExpiration}</th>
                        <th scope="col">${translations.tableHeadingsType}</th>
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
 * @return {string} The HTML for the table row.
 */
export function getTableRowHtml(rowData) {
  return `
                    <tr>
                      <td>${rowData.name}</td>
                      <td>${rowData.host}</td>
                      <td>${rowData.description}</td>
                      <td>${rowData.expiration}</td>
                      <td>${rowData.type}</td>
                    </tr>
                    `;
}

/**
 * Generates the HTML for the notification.
 *
 * @param {string} message - The message to display in the notification.
 * @param {string} notificationAriaLabel - The aria-label for the notification.
 * @return {string} The HTML for the notification.
 */
export function getNotificationHtml(message, notificationAriaLabel) {
  return `
    <section aria-label="${notificationAriaLabel}" class="hds-notification hds-notification--small hds-notification--success enter">
      <div class="hds-notification__content">
        <div class="hds-notification__label">
          <span class="hds-icon hds-icon--check-circle-fill" aria-hidden="true"></span>
        </div>
        <div class="hds-notification__body">${message}</div>
      </div>
    </section>`;
}
