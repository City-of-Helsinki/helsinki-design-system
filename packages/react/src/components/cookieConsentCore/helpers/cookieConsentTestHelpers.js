/**
 * Helper functions for testing the cookie consent component
 * @class
 */
export default class cookieConsentTestHelpers {
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
}
