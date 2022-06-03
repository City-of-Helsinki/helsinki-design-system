import * as React from 'react';
import { navigate } from 'gatsby';
import { Linkbox } from 'hds-react';

import './ComponentsList.scss';

const ComponentsList = ({ data }) => {

  const componentData = [
    {
      name: 'Accordion',
      text: 'Accordions can be used to hide and reveal information.',
      linkboxAriaLabel: 'Accordion component',
      linkAriaLabel: 'Go to the Accordion component page',
      href: '/components/accordion',
    },
    {
      name: 'Button',
      text: 'Buttons are meant to make actions easily visible and understandable to the user.',
      linkboxAriaLabel: 'Button component',
      linkAriaLabel: 'Go to the Button component page',
      href: '/components/buttons',
    },
    {
      name: 'Card',
      text: 'Cards can be used to divide and organise interface content.',
      linkboxAriaLabel: 'Card component',
      linkAriaLabel: 'Go to the Card component page',
      href: '/components/card',
    },
    {
      name: 'Checkbox',
      text: 'Checkboxes are used to select from one of more options.',
      linkboxAriaLabel: 'Checkbox component',
      linkAriaLabel: 'Go to the Checkbox component page',
      href: '/components/checkbox',
    },
    {
      name: 'DateInput',
      text: 'Date input allows the user to easily input a specific date or a date range. ',
      linkboxAriaLabel: 'DateInput component',
      linkAriaLabel: 'Go to the DateInput component page',
      href: '/components/date-input',
    },
    {
      name: 'Dialog',
      text: 'Dialogs initiate a conversation between the service and the user.',
      linkboxAriaLabel: 'Dialog component',
      linkAriaLabel: 'Go to the Dialog component page',
      href: '/components/dialog',
    },
    {
      name: 'Dropdown',
      text: 'A dropdown offers a user a list of options, of which one or multiple can be selected.',
      linkboxAriaLabel: 'Dropdown component',
      linkAriaLabel: 'Go to the Dropdown component page',
      href: '/components/dropdown',
    },
    {
      name: 'Fieldset',
      text: 'Fieldset groups multiple related form input fields together.',
      linkboxAriaLabel: 'Fieldset component',
      linkAriaLabel: 'Go to the Fieldset component page',
      href: '/components/fieldset',
    },
    {
      name: 'FileInput',
      text: 'A file input helps to browse and select files to be uploaded to the service.',
      linkboxAriaLabel: 'FileInput component',
      linkAriaLabel: 'Go to the FileInput component page',
      href: '/components/file-input',
    },
    {
      name: 'Footer',
      text: 'The footer is located at the bottom of the page below the main body content.',
      linkboxAriaLabel: 'Footer component',
      linkAriaLabel: 'Go to the Footer component page',
      href: '/components/footer',
    },
    {
      name: 'Icon',
      text: 'Icons are used for providing visual cues and highlighting actions.',
      linkboxAriaLabel: 'Icon component',
      linkAriaLabel: 'Go to the Icon component page',
      href: '/components/icon',
    },
    {
      name: 'Koros',
      text: 'Koros, also known as Wave motifs, are part of the visual identity of City of Helsinki.',
      linkboxAriaLabel: 'Koros component',
      linkAriaLabel: 'Go to the Koros component page',
      href: '/components/koros',
    },
    {
      name: 'Link',
      text: 'Links are used as navigational elements and can be standalone or inline.',
      linkboxAriaLabel: 'Link component',
      linkAriaLabel: 'Go to the Link component page',
      href: '/components/link',
    },
    {
      name: 'Linkbox',
      text: 'Linkboxes are used to combine elements into a single interactable element.',
      linkboxAriaLabel: 'Linkbox component',
      linkAriaLabel: 'Go to the Linkbox component page',
      href: '/components/linkbox',
    },
    {
      name: 'LoadingSpinner',
      text: 'Loading spinner is used for notifying users that their action is being processed.',
      linkboxAriaLabel: 'LoadingSpinner component',
      linkAriaLabel: 'Go to the LoadingSpinner component page',
      href: '/components/loading-spinner',
    },
    {
      name: 'Logo',
      text: 'The logo is used to identify the service as an official City of Helsinki service.',
      linkboxAriaLabel: 'Logo component',
      linkAriaLabel: 'Go to the Logo component page',
      href: '/components/logo',
    },
    {
      name: 'Navigation',
      text: 'A navigation component is the main way to navigate and locate in the service.',
      linkboxAriaLabel: 'Navigation component',
      linkAriaLabel: 'Go to the Navigation component page',
      href: '/components/navigation',
    },
    {
      name: 'Notification',
      text: 'Notifications are used to present timely information to the user.',
      linkboxAriaLabel: 'Notification component',
      linkAriaLabel: 'Go to the Notification component page',
      href: '/components/notification',
    },
    {
      name: 'NumberInput',
      text: 'A number input allows the user to enter numeric values.',
      linkboxAriaLabel: 'NumberInput component',
      linkAriaLabel: 'Go to the NumberInput component page',
      href: '/components/number-input',
    },
    {
      name: 'PasswordInput',
      text: 'A password field is an input field component that is used to input password data.',
      linkboxAriaLabel: 'PasswordInput component',
      linkAriaLabel: 'Go to the PasswordInput component page',
      href: '/components/password-input',
    },
    {
      name: 'PhoneInput',
      text: 'A phone input allows the user to enter phone number values.',
      linkboxAriaLabel: 'PhoneInput component',
      linkAriaLabel: 'Go to the PhoneInput component page',
      href: '/components/phone-input',
    },
    {
      name: 'RadioButton',
      text: 'Radio buttons are used to pick an option when only one option can be chosen.',
      linkboxAriaLabel: 'RadioButton component',
      linkAriaLabel: 'Go to the RadioButton component page',
      href: '/components/radio-button',
    },
    {
      name: 'SearchInput',
      text: 'A search input allows the user to find relevant content.',
      linkboxAriaLabel: 'SearchInput component',
      linkAriaLabel: 'Go to the SearchInput component page',
      href: '/components/search-input',
    },
    {
      name: 'SelectionGroup',
      text: 'Selection group allows grouping form selection elements to each other.',
      linkboxAriaLabel: 'SelectionGroup component',
      linkAriaLabel: 'Go to the SelectionGroup component page',
      href: '/components/selection-group',
    },
    {
      name: 'SideNavigation',
      text: 'A side navigation is an additional navigation located on the left of the viewport.',
      linkboxAriaLabel: 'SideNavigation component',
      linkAriaLabel: 'Go to the SideNavigation component page',
      href: '/components/side-navigation',
    },
    {
      name: 'StatusLabel',
      text: 'Status labels can be used to highlight different statuses or items to the user.',
      linkboxAriaLabel: 'StatusLabel component',
      linkAriaLabel: 'Go to the StatusLabel component page',
      href: '/components/status-label',
    },
    {
      name: 'Stepper',
      text: 'The stepper helps to see the progression and to navigate between form steps.',
      linkboxAriaLabel: 'Stepper component',
      linkAriaLabel: 'Go to the Stepper component page',
      href: '/components/stepper',
    },
    {
      name: 'Table',
      text: 'Tables are used to present tabulated data to the user in a consistent manner.',
      linkboxAriaLabel: 'Table component',
      linkAriaLabel: 'Go to the Table component page',
      href: '/components/table',
    },
    {
      name: 'Tabs',
      text: 'Tabs are used to navigate between contents that have a relation.',
      linkboxAriaLabel: 'Tabs component',
      linkAriaLabel: 'Go to the Tabs component page',
      href: '/components/tabs',
    },
    {
      name: 'Tag',
      text: 'Tags are used to show attributes of an object or element such as categories.',
      linkboxAriaLabel: 'Tag component',
      linkAriaLabel: 'Go to the Tag component page',
      href: '/components/tag',
    },
    {
      name: 'TextArea',
      text: 'A text area is an input used for multiline answers.',
      linkboxAriaLabel: 'TextArea component',
      linkAriaLabel: 'Go to the TextArea component page',
      href: '/components/text-area',
    },
    {
      name: 'TextInput',
      text: 'A text field is an input field that the user can use to input content and data.',
      linkboxAriaLabel: 'TextInput component',
      linkAriaLabel: 'Go to the TextInput component page',
      href: '/components/text-input',
    },
    {
      name: 'TimeInput',
      text: 'A time input helps the user select a specific time.',
      linkboxAriaLabel: 'TimeInput component',
      linkAriaLabel: 'Go to the TimeInput component page',
      href: '/components/time-input',
    },
    {
      name: 'ToggleButton',
      text: 'Toggle button allows to switch between two states such as "On" and "Off".',
      linkboxAriaLabel: 'ToggleButton component',
      linkAriaLabel: 'Go to the ToggleButton component page',
      href: '/components/toggle-button',
    },
    {
      name: 'Tooltip',
      text: 'Tooltips are used to present context or background information to the user.',
      linkboxAriaLabel: 'Tooltip component',
      linkAriaLabel: 'Go to the Tooltip component page',
      href: '/components/tooltip',
    },
  ];

  return (
    <div className="components-list">
      { componentData.map((component) => {
        return (
          <div key={component.name} className="components-list__item">
            <Linkbox
              className="components-list__linkbox"
              size="small"
              noBackground
              linkboxAriaLabel={component.linkboxAriaLabel}
              linkAriaLabel={component.linkAriaLabel}
              href={component.href}
              heading={component.name}
              text={component.text}
              onClick={(event) => {
                event.preventDefault();
                navigate(component.href);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ComponentsList;
