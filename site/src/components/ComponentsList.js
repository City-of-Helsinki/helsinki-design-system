import * as React from 'react';

import LinkboxList from './LinkboxList';

const ComponentsList = () => {
  const componentData = [
    {
      name: 'Accordion',
      text: 'Accordions can be used to hide and reveal information.',
      linkboxAriaLabel: 'Accordion component',
      linkAriaLabel: 'Go to the Accordion component page',
      href: '/components/accordion',
      imgProps: { 
        src: '/images/components/overview/accordion@2x.png', 
        alt: 'An illustration of the Accordion component.'
      },
    },
    {
      name: 'Button',
      text: 'Buttons are meant to make actions easily visible and understandable to the user.',
      linkboxAriaLabel: 'Button component',
      linkAriaLabel: 'Go to the Button component page',
      href: '/components/buttons',
      imgProps: { 
        src: '/images/components/overview/button@2x.png', 
        alt: 'An illustration of the Button component.'
      },
    },
    {
      name: 'Card',
      text: 'Cards can be used to divide and organise interface content.',
      linkboxAriaLabel: 'Card component',
      linkAriaLabel: 'Go to the Card component page',
      href: '/components/card',
      imgProps: { 
        src: '/images/components/overview/card@2x.png', 
        alt: 'An illustration of the Card component.'
      },
    },
    {
      name: 'Checkbox',
      text: 'Checkboxes are used to select from one of more options.',
      linkboxAriaLabel: 'Checkbox component',
      linkAriaLabel: 'Go to the Checkbox component page',
      href: '/components/checkbox',
      imgProps: { 
        src: '/images/components/overview/checkbox@2x.png', 
        alt: 'An illustration of the Checkbox component.'
      },
    },
    {
      name: 'CookieConsent',
      text: 'The cookie compliance components informs users about cookie usage.',
      linkboxAriaLabel: 'CookieConsent components',
      linkAriaLabel: 'Go to the CookieConsent components page',
      href: '/components/cookie-consent',
      imgProps: { 
        src: '/images/components/overview/cookieconsent@2x.png', 
        alt: 'An illustration of the CookieConsent component.'
      },
    },
    {
      name: 'DateInput',
      text: 'Date input allows the user to easily input a specific date or a date range. ',
      linkboxAriaLabel: 'DateInput component',
      linkAriaLabel: 'Go to the DateInput component page',
      href: '/components/date-input',
      imgProps: { 
        src: '/images/components/overview/dateinput@2x.png', 
        alt: 'An illustration of the DateInput component.'
      },
    },
    {
      name: 'Dialog',
      text: 'Dialogs initiate a conversation between the service and the user.',
      linkboxAriaLabel: 'Dialog component',
      linkAriaLabel: 'Go to the Dialog component page',
      href: '/components/dialog',
      imgProps: { 
        src: '/images/components/overview/dialog@2x.png', 
        alt: 'An illustration of the Dialog component.'
      },
    },
    {
      name: 'Dropdown',
      text: 'A dropdown offers a user a list of options, of which one or multiple can be selected.',
      linkboxAriaLabel: 'Dropdown component',
      linkAriaLabel: 'Go to the Dropdown component page',
      href: '/components/dropdown',
      imgProps: { 
        src: '/images/components/overview/dropdown@2x.png', 
        alt: 'An illustration of the Dropdown component.'
      },
    },
    {
      name: 'Fieldset',
      text: 'Fieldset groups multiple related form input fields together.',
      linkboxAriaLabel: 'Fieldset component',
      linkAriaLabel: 'Go to the Fieldset component page',
      href: '/components/fieldset',
      imgProps: { 
        src: '/images/components/overview/fieldset@2x.png', 
        alt: 'An illustration of the Fieldset component.'
      },
    },
    {
      name: 'FileInput',
      text: 'A file input helps to browse and select files to be uploaded to the service.',
      linkboxAriaLabel: 'FileInput component',
      linkAriaLabel: 'Go to the FileInput component page',
      href: '/components/file-input',
      imgProps: { 
        src: '/images/components/overview/fileinput@2x.png', 
        alt: 'An illustration of the FileInput component.'
      },
    },
    {
      name: 'Footer',
      text: 'The footer is located at the bottom of the page below the main body content.',
      linkboxAriaLabel: 'Footer component',
      linkAriaLabel: 'Go to the Footer component page',
      href: '/components/footer',
      imgProps: { 
        src: '/images/components/overview/footer@2x.png', 
        alt: 'An illustration of the Footer component.'
      },
    },
    {
      name: 'Icon',
      text: 'Icons are used for providing visual cues and highlighting actions.',
      linkboxAriaLabel: 'Icon component',
      linkAriaLabel: 'Go to the Icon component page',
      href: '/components/icon',
      imgProps: { 
        src: '/images/components/overview/icon@2x.png', 
        alt: 'An illustration of the Icon component.'
      },
    },
    {
      name: 'Koros',
      text: 'Koros, also known as Wave motifs, are part of the visual identity of City of Helsinki.',
      linkboxAriaLabel: 'Koros component',
      linkAriaLabel: 'Go to the Koros component page',
      href: '/components/koros',
      imgProps: { 
        src: '/images/components/overview/koros@2x.png', 
        alt: 'An illustration of the Koros component.'
      },
    },
    {
      name: 'Link',
      text: 'Links are used as navigational elements and can be standalone or inline.',
      linkboxAriaLabel: 'Link component',
      linkAriaLabel: 'Go to the Link component page',
      href: '/components/link',
      imgProps: { 
        src: '/images/components/overview/link@2x.png', 
        alt: 'An illustration of the Link component.'
      },
    },
    {
      name: 'Linkbox',
      text: 'Linkboxes are used to combine elements into a single interactable element.',
      linkboxAriaLabel: 'Linkbox component',
      linkAriaLabel: 'Go to the Linkbox component page',
      href: '/components/linkbox',
      imgProps: { 
        src: '/images/components/overview/linkbox@2x.png', 
        alt: 'An illustration of the Linkbox component.'
      },
    },
    {
      name: 'LoadingSpinner',
      text: 'Loading spinner is used for notifying users that their action is being processed.',
      linkboxAriaLabel: 'LoadingSpinner component',
      linkAriaLabel: 'Go to the LoadingSpinner component page',
      href: '/components/loading-spinner',
      imgProps: { 
        src: '/images/components/overview/loadingspinner@2x.png', 
        alt: 'An illustration of the LoadingSpinner component.'
      },
    },
    {
      name: 'Logo',
      text: 'The logo is used to identify the service as an official City of Helsinki service.',
      linkboxAriaLabel: 'Logo component',
      linkAriaLabel: 'Go to the Logo component page',
      href: '/components/logo',
      imgProps: { 
        src: '/images/components/overview/logo@2x.png', 
        alt: 'An illustration of the Logo component.'
      },
    },
    {
      name: 'Navigation',
      text: 'A navigation component is the main way to navigate and locate in the service.',
      linkboxAriaLabel: 'Navigation component',
      linkAriaLabel: 'Go to the Navigation component page',
      href: '/components/navigation',
      imgProps: { 
        src: '/images/components/overview/navigation@2x.png', 
        alt: 'An illustration of the Navigation component.'
      },
    },
    {
      name: 'Notification',
      text: 'Notifications are used to present timely information to the user.',
      linkboxAriaLabel: 'Notification component',
      linkAriaLabel: 'Go to the Notification component page',
      href: '/components/notification',
      imgProps: { 
        src: '/images/components/overview/notification@2x.png', 
        alt: 'An illustration of the Notification component.'
      },
    },
    {
      name: 'NumberInput',
      text: 'A number input allows the user to enter numeric values.',
      linkboxAriaLabel: 'NumberInput component',
      linkAriaLabel: 'Go to the NumberInput component page',
      href: '/components/number-input',
      imgProps: { 
        src: '/images/components/overview/numberinput@2x.png', 
        alt: 'An illustration of the NumberInput component.'
      },
    },
    {
      name: 'Pagination',
      text: 'The pagination component allows the user to navigate between pages.',
      linkboxAriaLabel: 'Pagination component',
      linkAriaLabel: 'Go to the Pagination component page',
      href: '/components/pagination',
      imgProps: { 
        src: '/images/components/overview/pagination@2x.png', 
        alt: 'An illustration of the Pagination component.'
      },
    },
    {
      name: 'PasswordInput',
      text: 'A password field is an input field component that is used to input password data.',
      linkboxAriaLabel: 'PasswordInput component',
      linkAriaLabel: 'Go to the PasswordInput component page',
      href: '/components/password-input',
      imgProps: { 
        src: '/images/components/overview/passwordinput@2x.png', 
        alt: 'An illustration of the PasswordInput component.'
      },
    },
    {
      name: 'PhoneInput',
      text: 'A phone input allows the user to enter phone number values.',
      linkboxAriaLabel: 'PhoneInput component',
      linkAriaLabel: 'Go to the PhoneInput component page',
      href: '/components/phone-input',
      imgProps: { 
        src: '/images/components/overview/phoneinput@2x.png', 
        alt: 'An illustration of the PhoneInput component.'
      },
    },
    {
      name: 'RadioButton',
      text: 'Radio buttons are used to pick an option when only one option can be chosen.',
      linkboxAriaLabel: 'RadioButton component',
      linkAriaLabel: 'Go to the RadioButton component page',
      href: '/components/radio-button',
      imgProps: { 
        src: '/images/components/overview/radiobutton@2x.png', 
        alt: 'An illustration of the RadioButton component.'
      },
    },
    {
      name: 'SearchInput',
      text: 'A search input allows the user to find relevant content.',
      linkboxAriaLabel: 'SearchInput component',
      linkAriaLabel: 'Go to the SearchInput component page',
      href: '/components/search-input',
      imgProps: { 
        src: '/images/components/overview/searchinput@2x.png', 
        alt: 'An illustration of the SearchInput component.'
      },
    },
    {
      name: 'SelectionGroup',
      text: 'Selection group allows grouping form selection elements to each other.',
      linkboxAriaLabel: 'SelectionGroup component',
      linkAriaLabel: 'Go to the SelectionGroup component page',
      href: '/components/selection-group',
      imgProps: { 
        src: '/images/components/overview/selectiongroup@2x.png', 
        alt: 'An illustration of the SelectionGroup component.'
      },
    },
    {
      name: 'SideNavigation',
      text: 'A side navigation is an additional navigation located on the left of the viewport.',
      linkboxAriaLabel: 'SideNavigation component',
      linkAriaLabel: 'Go to the SideNavigation component page',
      href: '/components/side-navigation',
      imgProps: { 
        src: '/images/components/overview/sidenavigation@2x.png', 
        alt: 'An illustration of the SideNavigation component.'
      },
    },
    {
      name: 'StatusLabel',
      text: 'Status labels can be used to highlight different statuses or items to the user.',
      linkboxAriaLabel: 'StatusLabel component',
      linkAriaLabel: 'Go to the StatusLabel component page',
      href: '/components/status-label',
      imgProps: { 
        src: '/images/components/overview/statuslabel@2x.png', 
        alt: 'An illustration of the StatusLabel component.'
      },
    },
    {
      name: 'Stepper',
      text: 'The stepper helps to see the progression and to navigate between form steps.',
      linkboxAriaLabel: 'Stepper component',
      linkAriaLabel: 'Go to the Stepper component page',
      href: '/components/stepper',
      imgProps: { 
        src: '/images/components/overview/stepper@2x.png', 
        alt: 'An illustration of the Stepper component.'
      },
    },
    {
      name: 'Table',
      text: 'Tables are used to present tabulated data to the user in a consistent manner.',
      linkboxAriaLabel: 'Table component',
      linkAriaLabel: 'Go to the Table component page',
      href: '/components/table',
      imgProps: { 
        src: '/images/components/overview/table@2x.png', 
        alt: 'An illustration of the Table component.'
      },
    },
    {
      name: 'Tabs',
      text: 'Tabs are used to navigate between contents that have a relation.',
      linkboxAriaLabel: 'Tabs component',
      linkAriaLabel: 'Go to the Tabs component page',
      href: '/components/tabs',
      imgProps: { 
        src: '/images/components/overview/tabs@2x.png', 
        alt: 'An illustration of the Tabs component.'
      },
    },
    {
      name: 'Tag',
      text: 'Tags are used to show attributes of an object or element such as categories.',
      linkboxAriaLabel: 'Tag component',
      linkAriaLabel: 'Go to the Tag component page',
      href: '/components/tag',
      imgProps: { 
        src: '/images/components/overview/tag@2x.png', 
        alt: 'An illustration of the Tag component.'
      },
    },
    {
      name: 'TextArea',
      text: 'A text area is an input used for multiline answers.',
      linkboxAriaLabel: 'TextArea component',
      linkAriaLabel: 'Go to the TextArea component page',
      href: '/components/text-area',
      imgProps: { 
        src: '/images/components/overview/textarea@2x.png', 
        alt: 'An illustration of the TextArea component.'
      },
    },
    {
      name: 'TextInput',
      text: 'A text field is an input field that the user can use to input content and data.',
      linkboxAriaLabel: 'TextInput component',
      linkAriaLabel: 'Go to the TextInput component page',
      href: '/components/text-input',
      imgProps: { 
        src: '/images/components/overview/textinput@2x.png', 
        alt: 'An illustration of the TextInput component.'
      },
    },
    {
      name: 'TimeInput',
      text: 'A time input helps the user select a specific time.',
      linkboxAriaLabel: 'TimeInput component',
      linkAriaLabel: 'Go to the TimeInput component page',
      href: '/components/time-input',
      imgProps: { 
        src: '/images/components/overview/timeinput@2x.png', 
        alt: 'An illustration of the TimeInput component.'
      },
    },
    {
      name: 'ToggleButton',
      text: 'Toggle button allows to switch between two states such as "On" and "Off".',
      linkboxAriaLabel: 'ToggleButton component',
      linkAriaLabel: 'Go to the ToggleButton component page',
      href: '/components/toggle-button',
      imgProps: { 
        src: '/images/components/overview/togglebutton@2x.png', 
        alt: 'An illustration of the ToggleButton component.'
      },
    },
    {
      name: 'Tooltip',
      text: 'Tooltips are used to present context or background information to the user.',
      linkboxAriaLabel: 'Tooltip component',
      linkAriaLabel: 'Go to the Tooltip component page',
      href: '/components/tooltip',
      imgProps: { 
        src: '/images/components/overview/tooltip@2x.png', 
        alt: 'An illustration of the Tooltip component.'
      },
    },
  ];

  return <LinkboxList data={componentData} />;
};

export default ComponentsList;
