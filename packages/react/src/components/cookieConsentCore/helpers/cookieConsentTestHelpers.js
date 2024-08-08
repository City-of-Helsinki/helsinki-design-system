/**
 * Helper functions for testing the cookie consent component
 * @class
 */
export default class cookieConsentTestHelpers {
  /**
   * Call cookieConsent instance from window.hds to set the status of the given groups to accepted
   * @param {string[]} groupsArray Groups to set status to accepted
   * @return {Promise<boolean>} - A promise that resolves to true if the groups' status is successfully set to accepted, otherwise false.
   */
    static async setGroupsStatusToAccepted(groupsArray) {
      return window.hds.cookieConsent.setGroupsStatusToAccepted(groupsArray);
    }

    /**
     * Get the consent status for the specified cookie group names.
     * @param {string[]} groupNamesArray - An array of group names.
     * @return {Promise<boolean>} A promise that resolves to true if all the groups are accepted, otherwise false.
     */
    static async getConsentStatus(groupNamesArray) {
      return window.hds.cookieConsent.getConsentStatus(groupNamesArray);
    }

  /**
   * Approve all cookies
   * @param {*} shadowroot - The shadowroot of the component
   * @param {*} fireEvent - The fireEvent function from testing-library
   */
  static approveAll(shadowroot, fireEvent) {
    const allButton = shadowroot.querySelector('button[data-approved="all"]');
    fireEvent.click(allButton);
  }

  /**
   * Approve only cookies from the given category
   * @param {*} shadowroot - The shadowroot of the component
   * @param {*} fireEvent - The fireEvent function from testing-library
   * @param {*} category - The category to approve
   */
  static approveCategory(shadowroot, fireEvent, category) {
    const selectedCheckbox = shadowroot.querySelector(`#${category}-cookies`);
    fireEvent.click(selectedCheckbox);

    const selectedButton = shadowroot.querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton);
  }

  /**
   * Unapprove cookies from the given category
   * @param {*} shadowroot - The shadowroot of the component
   * @param {*} fireEvent - The fireEvent function from testing-library
   * @param {*} category - The category to unapprove
   */
  static unApproveCategory(shadowroot, fireEvent, category) {
    const checkboxes = shadowroot.querySelectorAll('.hds-checkbox input');
    checkboxes.forEach((box) => {
      if (box.attributes['data-group'].value === category) {
        fireEvent.click(box);
      }
    });

    const selectedButton = shadowroot.querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton);
  }

  static openBanner(highlightedGroups = []) {
    return window.hds.cookieConsent.openBanner(highlightedGroups);
  }
}
