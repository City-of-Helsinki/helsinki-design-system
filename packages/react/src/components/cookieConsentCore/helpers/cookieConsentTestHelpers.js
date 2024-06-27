export default class cookieConsentTestHelpers {
  static approveAll(shadowroot, fireEvent) {
    const allButton = shadowroot.querySelector('button[data-approved="all"]');
    fireEvent.click(allButton);
  }

  static approveCategory(shadowroot, fireEvent, category) {
    const selectedCheckbox = shadowroot.querySelector(`#${category}-cookies`);
    fireEvent.click(selectedCheckbox);

    const selectedButton = shadowroot.querySelector('button[data-approved="selected"]');
    fireEvent.click(selectedButton);
  }

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
