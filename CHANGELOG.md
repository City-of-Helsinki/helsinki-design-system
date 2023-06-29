# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.16.0] - June, 28, 2023

### React

#### Added

- [Select] New optional string property 'optionKeyField'
- [Combobox] New optional string property 'optionKeyField'

#### Fixed

- [FileInput] Max file size to accept sizes which equal the given limit
- [FileInput] Empty file.type prevented file uploads of unknown types

### Documentation

#### Changed

- Radio buttons should not have a default value

### Design kit

#### Changed

- [Accordion] Upgrade to Sketch version 97.1
- [Breadcrumbs] Upgrade to Sketch version 97.1
- [Buttons] Upgrade to Sketch version 97.1
- [Cards] Upgrade to Sketch version 97.1
- [Color] Upgrade to Sketch version 97.1
- [Cookies] Upgrade to Sketch version 97.1
- [Errors] Upgrade to Sketch version 97.1
- [Filters] Upgrade to Sketch version 97.1
- [Footer] Upgrade to Sketch version 97.1
- [Form Components] Upgrade to Sketch version 97.1
- [Grids and Breakpoints] Upgrade to Sketch version 97.1
- [Hero] Upgrade to Sketch version 97.1
- [Icons] Upgrade to Sketch version 97.1
- [Koros] Upgrade to Sketch version 97.1
- [Labels and Tags] Upgrade to Sketch version 97.1
- [Links] Upgrade to Sketch version 97.1 and update link-external icon
- [Loaders] Upgrade to Sketch version 97.1
- [Logo] Upgrade to Sketch version 97.1
- [Modals and Notifications] Upgrade to Sketch version 97.1
- [Navigation] Upgrade to Sketch version 97.1
- [Page templates] Upgrade to Sketch version 97.1
- [Pagination] Upgrade to Sketch version 97.1
- [Placeholders and templates] Upgrade to Sketch version 97.1
- [Shadow] Upgrade to Sketch version 97.1
- [Spacing] Upgrade to Sketch version 97.1
- [Step-by-step] Upgrade to Sketch version 97.1
- [Table] Upgrade to Sketch version 97.1
- [Tabs] Upgrade to Sketch version 97.1
- [Typography] Upgrade to Sketch version 97.1

## [2.15.0] - May, 25, 2023

### React

#### Added

- [Breadcrumb] New Breadcrumb component
- [Hero] New Hero component
- [StepByStep] New StepByStep component

- [Tooltip] Tooltips for status labels
- [Icon] 16 new UI icons

#### Fixed

- [Accordion] Fixed accordion with borders

#### Changed

- [StatusLabel] Marked default rectangular StatusLabel as deprecated. This will be removed in 3.0.0
- [Icon] New icon for link-external

### Core

#### Added

- [Breadcrumb] New Breadcrumb component
- [Hero] New Hero component
- [StepByStep] New StepByStep component

- [Tooltip] Tooltips for StatusLabels
- [Icon] 16 new UI icons

#### Changed

- [StatusLabel] Marked default rectangular StatusLabel as deprecated. This will be removed in 3.0.0
- [Icon] New icon for link-external

### Documentation

#### Added

- [Breadcrumbs] Documentation for new Breadcrumbs component
- [Hero] Documentation for new Hero component
- [StepByStep] Documentation for new StepByStep component

- [Tooltip] Tooltip documentation for all status labels
- [Button] Added example of button as a link

#### Fixed

- [Gatsby] Check and fix headers and their styles in Gatsby (H1-H6)
- [Accordion] Improve accordion examples and documentation

#### Changed

- Improved docs for creating new react components
- New and changed icons added to icon list

### Design kit

#### Added

- [Breadcrumbs] Breadcrumbs symbols for all HDS breakpoints
- [Hero] Eight Hero symbols for all HDS breakpoints
  – [Icons] Added 16 new UI icons (arrow-right-dashed, bag-cogwheel, binoculars, cogwheels, collapse, graph-columns, hammers, history, lightbulb, money-bag, money-bag-fill, scroll, scroll-cogwheel, scroll-content, scroll-group, shield)
- [Step-by-step] Step-by-step symbols for top, middle and bottom parts (two sizes: small & extra-large)

#### Changed

– [Accordion] Upgraded to Sketch version 96.3
– [Buttons] Upgraded to Sketch version 96.3
– [Cards] Upgraded to Sketch version 96.3
– [Color] Upgraded to Sketch version 96.3
– [Cookies] Upgraded to Sketch version 96.3
– [Footer] Upgraded to Sketch version 96.3
– [Form Components] Upgraded to Sketch version 96.3
– [Grids and Breakpoints] Upgraded to Sketch version 96.3
– [Icons] Upgraded to Sketch version 96.3
– [Icons] New icon for link-external
– [Koros] Upgraded to Sketch version 96.3
– [Labels and Tags] Upgraded to Sketch version 96.3
– [Links] Upgraded to Sketch version 96.3
– [Loaders] Upgraded to Sketch version 96.3
– [Logo] Upgraded to Sketch version 96.3
– [Modals and Notifications] Upgraded to Sketch version 96.3
– [Navigation] Upgraded to Sketch version 96.3
– [Pagination] Upgraded to Sketch version 96.3
– [Placeholders and templates] Upgraded to Sketch version 96.3
– [Shadow] Upgraded to Sketch version 96.3
– [Spacing] Upgraded to Sketch version 96.3
– [Table] Upgraded to Sketch version 96.3
– [Tabs] Upgraded to Sketch version 96.3
– [Typography] Upgraded to Sketch version 96.3

### Icon kit

#### Added

– [Icons] Added 16 new UI icons (arrow-right-dashed, bag-cogwheel, binoculars, cogwheels, collapse, graph-columns, hammers, history, lightbulb, money-bag, money-bag-fill, scroll, scroll-cogwheel, scroll-content, scroll-group, shield)

#### Changed

– [Icons] New icon for link-external

## [2.14.0] - May, 9, 2023

### React

#### Fixed

- [Accordion] Prevent page scroll when accordion is opened with the spacebar
- [SearchInput] SearchInput uses hds-core's SearchInput styles instead of TextInput's

#### Changed

- [SelectionGroup] Refactor code using deprecating React.Children API
- [SideNavigation] Refactor code using deprecating React.Children API
- [Tabs] Refactor code using deprecating React.Children API

### Core

#### Fixed

- [SearchInput] Unified CSS with TextInput

### Documentation

#### Fixed

- [FileInput] Added missing import
- Repository's README files updated to match current branch policy

#### Changed

- [StatusLabel] Rectangular variant marked as deprected
- Refactor code using deprecating React.Children API

### Design tokens

#### Added

- New token for focus color

### Design

#### Changed

- [Tag] Rectangular version marked as deprecated

## [2.13.0] - March, 27, 2023

### React

#### Added

- [FileInput] Supports defaultValue prop
- Styles are linted for better quality CSS

#### Changed

- [Tag] Deprecation warning for rectangular tag
- [Navigation] Deprecation warnings for Navigation components
- Storybook form validation library changed to a more stable one
- License updated

#### Fixed

- [Dialog] Fixed console error about useEffect returning null
- [NumberInput] Slow down number scrolling with mouse
- Normalized CSS doesnt' affect elements outside components anymore

### Core

#### Added

- License information added
- Styles are linted for better quality CSS

### Documentation

#### Added

- [Tag] Deprecation warning for rectangular tag
- [Navigation] Deprecation warning for Navigation

#### Changed

- Improve Stepper's accessibility documentation
- Improve repository's developer documentation on problem solving
- License updated

### Design tokens

#### Added

- License information added

### Design

- Sketch update 95.3

## [2.12.1] - February, 23, 2023

### React

#### Fixed

- Added missing helper texts and tooltips

### Documentation

- Added documentation for helper texts and tooltips
- Fixed version documentation

## [2.12.0] - February, 21, 2023

### React

#### Changed

- [Checkbox] Support for tooltips
- [Fieldset] Support for tooltips

#### Fixed

- [DateInput] Changed input type to textual so that even iOS users can write the date in addition of picking it from calendar
- [Navigation] Fixed sizing 320px screens where title overlapped menu button

### Documentation

#### Added

- Information about breaking changes and versioning in HDS

#### Fixed

- Date input default values for min and max
- Required field asterisk position to match the components

## [2.11.0] - February, 9, 2023

### React

#### Changed

- [CookieConsent] Updated missing Matomo cookies
- [CookieConsent] Improved translations

#### Fixed

- Updated dependencies
- [Dialog] Fixed background position jumping on some specific environments

### Design

#### Changed

- Update Design kit to Sketch 95.2

### Documentation

#### Added

- More component properties available in Storybook
- FAQ section about keyboard focus on Safari

#### Fixed

- Fix broken links in documentation

## [2.10.0] - January, 10, 2023

### Core

#### Changed

- [Button] Replace focus styles with focus-visible styles

### React Components

#### Added

- [CookieConsent] Add Tunnistamo signing cookies into default settings

#### Changed

- [CookieConsent] Change Matomo default domain to hel.fi

#### Fixed

- [Combobox] Keep available options visible after selecting
- [Combobox] Fix removing selected items when the options list is open
- [Tag] Remove false aria-hidden to improve accessibility in screen readers
- [SearchInput] Fix cursor jumping to the end when typing into the start or to the middle of the value
- [SearchInput] Trigger search on Enter keypress
- [SearchInput] Fix Home and End keypress functionality

### Documentation

#### Added

- [Noscript pattern] Add Finnish and Swedish translations to notification label and body texts
- [Tag] Mention the importance of the delete button aria-label in Tag accessibility documentation

#### Fixed

- [Tag] Fix Core and React accessibility examples

#### Removed

- Remove Git LFS instructions and guides since it is not used anymore in the repository
- Remove obsolete roadmap and what-is-new pages

## [2.9.0] - December, 21, 2022

### Design kit

#### Added

- [Tag] Possibility to override colours when using Tag symbols in Sketch

### React Components

#### Added

- [Accordion] Possibility to set notification heading level
- [Tag] Support for labelClass property

#### Fixed

- [DateInput] Datepicker performance improvements
- [DateInput] Unnecessary error logs removed from the tests
- [Dropdown] First dropdown tag is truncated if it's longer than the container

### Documentation

#### Changed

- Contributing guide on Github has been updated to serve a more streamlined process

#### Fixed

- Navigation component's language selector is now focusable

## [2.8.0] - November, 30, 2022

### Design kit

#### Added

- [Icons] New icon SwapUser

### React Components

#### Added

- [Icons] New icon SwapUser

#### Changed

- [CookieConsent] Text changes for the Finnish and Swedish language versions

#### Fixed

- [Dropdown] Menu scrollbar becomes visible when needed and the UI won't break
- [DateInput] No more errors when minDate is over ten years in the future
- [CookieConsent] No more errors from React. Portal if cookie consent modal is re-initialized or re-rendered after it has been closed.
- [TimeInput] No more console warning about time format

### Core

#### Added

- [Icons] New icon SwapUser

### Documentation

#### Added

- [Noscript pattern] Provides a consistent way of notifying the user to enable JavaScript to guarantee full functionality and coherent user experience

## [2.7.0] - November, 22, 2022

### Design kit

#### Added

- [Tags] New tag variants with rounded corners

### React Components

#### Added

- [Tags] New tag variants with rounded corners

#### Changed

- [DateInput, SearchInput, PasswordInput] Input fields' buttons have larger clickable area around them

#### Fixed

- [Theme] Fix useTheme hook
- [FileInput] Fix an issue with FileInput crashing

### Core

#### Added

- [Tags] New tag variants with rounded corners

### Documentation

#### Added

- [Theme] Mention CSS specificity in the SSR guidelines customization part

#### Changed

- Favicon documentation improvement

## [2.6.1] - November, 14, 2022

### Design kit

#### Fixed

- Compatibility issue with Abstract and Sketch by updating the linked library files to Sketch 94.1

## [2.6.0] - November, 9, 2022

### React Components

#### Added

- [SearchInput] Support for external value property
- [SearchInput] Search action label (or icon) on virtual keyboards

#### Changed

- Repository development guides content updated

#### Fixed

- [Combobox] Fix scrolling caused by moving the mouse
- [Select] Error icon is same as with other components

### Core

#### Changed

- Repository development guides content updated

### Design kit

#### Changed

- [Icons] Documentation examples updated – Work in progress
- [Logo] New favicons added
- Repository development guides content updated

## [2.5.0] - November, 1, 2022

### React Components

#### Added

- [Combobox, Select] Support for external label property

#### Changed

- [Icons] Childhood icon renamed to Children
- [Icons] Genderless renamed to Person-genderless
- React-scripts update to version 5

#### Fixed

- [Accordion] Fix heading accessibility
- [DateInput] Prevent Datepicker value from resetting on scroll
- [Navigation] Fix title accessibility
- [Notification] Fix toast accessibility
- [NumberInput] Fix stepper buttons accessibility

### Core

#### Changed

- [Icons] Childhood icon renamed to Children
- [Icons] Genderless renamed to Person-genderless
- [Link, Notification, Pagination, SearchInput, Tag] Simplify component style imports

### Design kit

#### Changed

- [Icons] Childhood icon renamed to Children
- [Icons] Genderless renamed to Person-genderless

### Documentation

#### Added

- Time format documentation

#### Changed

- [Icons] Childhood icon renamed to Children
- [Icons] Genderless renamed to Person-genderless

#### Fixed

- Accessibility issue i-tag was used in navigation link icons
- Accessibility issue Copy code - button did not show any feedback

## [2.4.0] - October, 10, 2022

### React Components

#### Added

- [SSR Support] for hds-react components
- [Icons] A total of 13 new UI icons added

#### Fixed

- [CookieConsent] Cookie consent title is now refocused on language change and the banner won't shrink unexpectedly
- [Link] Ability to pass an aria-label added to the Link component
- [TimeInput] Fixed an accessibility bug by grouping hours and minutes inputs under the same label. Added group="role" to the parent div of TimeInput component's hours and minutes inputs
- [TimeInput] Fixed an accessibility bug by using the correct id with the helper texts. This way the screen readers can connect the helper text to inputs
- Fixed the issue with useTheme hook throwing a warning in jest/testing-library tests when an HDS component is using a theme property
- Loki package updated. Now the Loki tests won't fail with Apple Silicon (M1)

### Core

#### Added

- [Icons] A total of 13 new UI icons added

### Design kit

#### Added

- [Icons] A total of 13 new UI icons added
  - Childhood
  - Company
  - Entrepreneur
  - Family
  - Genderless
  - Group
  - Key
  - Move
  - Occupation
  - Senior
  - Traveler
  - Vaccine
  - Virus

### Documentation

#### Added

- Documentation for the SSR support
- New UI icons

## [2.3.0] - September, 14, 2022

### React Components

#### Added

- [CookieModal] component for React
- [CookiePage] component for React

### Documentation

#### Added

- Documentation for the React CookieConsent components
- Cookie compliance Pattern documentation
- Common Helsinki cookies Pattern documentation
- Cookie consent Pattern documentation

## [2.2.0] - September, 8, 2022

### React Components

#### Added

- [Pagination] component for React
- [Table] Support for providing side effects before or after the Table component is done sorting
- [Notification] Accepts a custom aria-label for the notification section element

### Documentation

#### Added

- Documentation for the React Pagination component
- Documentation for Table component's onSort property
- Documentation for Notification component's notificationAriaLabel property

## [2.1.1] - July, 12, 2022

### React Components

#### Fixed

- [Navigation] Removed broken and unnecessary responsive CSS class causing problems with title font sizes

## [2.1.0] - June, 30, 2022

### React Components

#### Added

- [Navigation] DropdownLink component to support NavigationItem that can act as a link and as a menu toggle

#### Fixed

- [Dialog] Enable content scrolling only when the scrollable property is set to true

## [2.0.0] - June, 27, 2022

### Design Tokens

#### Breaking Changes

#### Added

- [Typography] New XXL heading size (64px)
- [Typography] New XL-Mobile heading size (40px)

#### Changed

- [Typography] Made changes to HDS heading font sizes to match Hel.fi styles
  - XL from 52 to 48px
  - L from 36 to 32px
- [Typography] Line-height tokens are no longer used for headings. All headings now have their own line-height value. Use helper CSS classes from Core to easily follow the new values.

#### Fixed

- [Colour] The grayscale tokens' hex values to match the percentage names

### Core

#### Breaking Changes

#### Added

- [Typography] Heading helper classes

#### Changed

- [Card, Notification, Table] Typography styles updated
- [Container] Only container-width-xl is restricting the container maximum width. Other maximum width restrictions for smaller screens have been removed.
- [Button] Update Supplementary button icon spacing

### React Components

#### Breaking Changes

#### Changed

- [Accordion, Card, Dialog, Footer, Linkbox, Navigation, Notification, Stepper, Table, Tooltip] Typography styles updated
- [Container] Only container-width-xl is restricting the container maximum width. Other maximum width restrictions for smaller screens have been removed.
- [Dialog] Updated Dialog header and content spacing to match the design
- [Link] The default size of the link to medium font size from small font size
- [Button] Update Supplementary button icon spacing

#### Removed

- [Accordion] Removed deprecated --button-border-color-hover theme variable
- [Table] Removed deprecated --background-color theme variable

### Design kit

#### Added

- [Typography] HDS heading styles have been synced with the new Hel.fi styles
- [Typography] New XXL heading size (64px)
  - This also means that the total amount of heading levels has been increased from 5 to 6
- [Typography] New XL-Mobile heading size (40px)
- [Accordion] Two additional Accordion sizes, L (Large) and S (Small)
- [Links] Two additional sizes for the Standalone link, S (Small) and M (Medium)

#### Changed

- [Typography] Made changes to HDS heading font sizes to match Hel.fi styles
  - XL from 52 to 48px
  - L from 36 to 32px
- [Typography] Made changes to HDS heading line-heights to match Hel.fi styles
  - XL from 62 to 48
  - L from 43 to 32
  - M from 29 to 32
  - S from 24 to 28
  - XS from 22 to 24
- [Typography] Made changes to HDS heading font weights to match Hel.fi styles
  - XL from Bold to Regular
  - L from Bold to Regular
  - M from Bold to Medium
  - S from Bold to Medium
- [Typography] Made changes to HDS body font sizes to match Hel.fi styles
  - Sizes available sizes are now 14, 16, 18 and 20px
  - The L size (18px) is now marked as the default size
- [Typography] Made changes to HDS body text line heights to match Hel.fi styles
  - S from 26 to 24
  - L from 27 to 28
  - XL from 30 to 32
- [Typography] Updated line-height token descriptions
- [Typography] Updated typography example artboards with new heading styles
- Updated all HDS example artboards with new heading styles
- [Accordion] Optional “Close” button at the bottom of Accordions
- [Accordion] Renamed and grouped the current set of Accordions under “M” size
- [Accordion] Increased the size of the collapse icon from 24x24 to 32x32 of M size symbols
- [Accordion] Small spacing changes to “Empty” accordion symbols
- [Grids and Breakpoints] Updated example artboards to reflect the new container width changes
- [Accordion] Updated symbols with new heading styles
- [Accordion] Small spacing changes to accommodate new heading styles
- [Accordion] The symbol now properly supports multi-line headers
- [Cards] Updated symbols with new heading styles
- [Cards] Small spacing changes to accommodate new heading styles
- [Footer] Updated symbols with new heading styles
- [Form Components] Updated date picker and error summary with new heading styles
- [Modals and Notifications] Updated symbols with new heading styles
- [Modals and Notifications] Small spacing changes to Notifications to accommodate slightly altered heading styles
- [Modals and Notifications] Small height changes to Dialogs to accommodate slightly altered body styles
- [Navigation] Updated symbols with new heading styles
- [Navigation] Updated the mobile symbol to use XSS heading token
- [Table] Small spacing changes to accommodate newly sized labels

#### Fixed

- [Cards] Fixed smart layout scaling of Text + heading Card with borders
- [Colour] Updated grayscale token hex values to match their exact percentage values
  - color-black-70 from #4c4c4c to #4d4d4d
  - color-black-40 from #999898 to #999999
  - color-black-30 from #b2b2b2 to #b3b3b3
  - color-black-10 from #e5e5e5 to #e6e6e6
  - color-black-5 from #f1f1f1 to #f2f2f2

#### Removed

- [Typography] Heading styles with Bussi colour (in the future, Black and White styled headings are recommended)

### Documentation

- The HDS 2.0 update features a rebuilt documentation site. The old version 1 documentation site can still be accessed at hds.hel.fi/v1. All changes included in this update are targeted at the new documentation site. The old documentation site will stay unchanged.

#### Added

- New documentation site
  - The new documentation site is entirely built with HDS components and is accessible. We hope that the new documentation site will act as an example both for using HDS components and building accessible websites with them.
  - New documentation site features include; a new page structure, redesigned component pages, live code editing for component examples, component customisation documentation, redesigned design token pages, redesigned getting started section
  - 2.0 guide pages (general explanation and migration guide)
  - FAQ page with answers to general, design, implementation, and accessibility questions
  - New HDS structure images to home and getting started pages
  - A notification to Navigation, Footer, and SideNavigation about the upcoming Hel.fi update

#### Changed

- Updated the Typography documentation
- Updated the Colour documentation to reflect new grayscale colour changes
- Updated the Breakpoint design token documentation to reflect new Container component changes
- Updated the Grid guidelines documentation to reflect new Container component changes
- Updated the What is new page
- Updated the Roadmap page
- Updated the accessibility statement
- Updated the following component statuses
- DateInput, Dialog, Link, and Table from “Draft” to “Stable”

#### Removed

- Migration guide to the 1.0 version (can be still found at the version 1 documentation site)

## [1.15.0] - May, 30, 2022

### React Components

#### Added

- [Navigation] add ariaLabel property
- [SideNavigation] add ariaLabel property

#### Fixed

- [Navigation] initializing of useMobile hook
- [SideNavigation] Keyboard navigation on small screens
- [Tabs] Tab OnClick callback is called also when a tab is selected with the keyboard

### Design kit

#### Changed

- Updated HDS Sketch libraries to Sketch 88.1

## [1.14.0] - May, 5, 2022

### React Components

#### Added

- [Dialog] className prop for dialog action button container to enable customisation
- [Link] ref prop to fix preloading content with Next.js framework
- Added support for React 17

#### Fixed

- [Dialog] Wrapping of dialog action buttons on desktop

### Design kit

#### Changed

- Updated HDS Sketch libraries to Sketch 86

## [1.13.0] - Apr, 21, 2022

### Core

#### Added

- Pagination

### React Components

#### Fixed

- [Dialog] Prevent unnecessary re-rendering when content state changes

### Design kit

#### Added

- New library: HDS Pagination
- Includes symbols for a Pagination component

#### Changed

- Updated HDS Sketch libraries to Sketch 85 (85.1)
- [Table] Removed smart layout from the Table Checkbox cell symbol (this allows hiding the Checkbox without changing the cell height)

### Documentation

#### Added

- Documentation for the Pagination component

## [1.12.0] - Mar, 22, 2022

### Core

#### Added

- [Checkbox] Indeterminate state

### React Components

#### Added

- [Checkbox] Indeterminate state
- [Tabs] initiallyActiveTab property for setting initially active tab (default is the first tab)
- [Tabs] Tab onClick property for adding callback for tab click

#### Removed

- Node engine restriction by replacing node-sass lib with sass

### Design kit

#### Added

- [Form Components] Indeterminate state for the Checkbox component

### Documentation

#### Added

- [Checkbox] Documentation for the indeterminate checkbox state

## [1.11.1] - Mar, 8, 2022

### Core

#### Fixed

- [Table] The header default background color

## [1.11.0] - Feb, 23, 2022

### Design Tokens

#### Added

- Box shadow design tokens

### Core

#### Added

- [Koros] Dense property for rendering denser patterns
- [Table] Add theme variable and a default value for table content cells' background-color
- [Card, Notification] Add possibility to add a box-shadow to elevate component

### React Components

#### Added

- Stepper
- [Koros] Dense property for rendering denser patterns
- [Table] ClassName property for table heading
- [Select, Combobox] Add clear button to Select and Combobox in single select mode
- [Card] Add possibility to customise heading aria-level
- [Table] Add theme variable and a default value for table content cells' background-color
- [Card, Dialog, Notification, Tooltip] Add possibility to add a box-shadow to elevate component

#### Changed

- [Select, Combobox] Set focus to input after the clear button is pressed

#### Fixed

- [ErrorSummary] Adds missing focus styles

### Design kit

#### Added

- [Form Components] Multi-page form Stepper component
- [Form Components] Multi-page form Stepper + heading templates
- New library: HDS Shadow
  - Includes three levels of shadow tokens; S, M and L
  - **Please refer to the HDS token documentation before using shadows!**
- [Koros] Dense koro variant
- [Koros] Angled koro variant

#### Changed

- Updated HDS Sketch libraries to Sketch version 83.2
- [Cards] An optional shadow to Card symbols
- [Footer] Added a possibility to use the new dense koro variant
- [Modals and Notifications] An optional shadow to Dialog symbols
- [Modals and Notifications] An optional shadow to Notification (Toast) symbols
- [Modals and Notifications] An optional shadow to Tooltip symbols
- [Modals & Notifications] Changed Small Tooltip symbol smart layout alignment from Left to Center. This change makes it easier to use inside other components when the tooltip text is edited.

#### Fixed

- [Typography] Incorrect link colour of the Medium Regular Centered body text

### Documentation

#### Added

- Multi-page form Stepper component documentation
- Multi-page forms Pattern documentation
- Box shadow token documentation
- [Koros] Code and usage examples for the new dense koro variant
- First draft of the inclusivity guidelines and best practices

#### Changed

- Set Fieldset, Number Input, Password Input, Phone Input, Time Input, and Toggle Button as stable components
- Replace Playground stories knobs tab with controls

#### Removed

- Removed deprecated Storybook addon/knobs library. Removes knobs-tab from stories.

## [1.10.0] - Jan, 31, 2022

### Core

#### Added

- [Icons] Thumb icons

#### Fixed

- [TextInput, TextArea] Prevent rounded corners in iOS browsers

### React

#### Added

- [Icons] Thumb icons

#### Changed

- [Tabs] Add support to use Tabs child components in Tabs namespace, for example, Tabs.TabList

#### Fixed

- [TextInput, TextArea] Prevent rounded corners in iOS browsers
- [Footer] Back-to-top will focus on the first focusable element

### Design kit

#### Added

- [Icons] Thumb icons
  - Thumbs up
  - Thumbs up filled
  - Thumbs down
  - Thumbs down filled

#### Changed

- Updated HDS Sketch libraries to Sketch 82 (82.1)

### Documentation

#### Added

- [Icons] Thumb icons to the Visual assets documentation
- [Koros] Guideline page on how to use Koro shapes

#### Changed

- [Tabs] Tabs child components use the Tabs namespace, for example, Tabs.TabList
- Updated Roadmap section

#### Fixed

- [Koros] Remove confusing inline style rotate from example

## [1.9.0] - Jan, 5, 2022

### Core

#### Added

- [Koros] Added possibility to rotate Koros
- [Search Input] Support for placeholder

### React

#### Added

- [Koros] Added possibility to rotate Koros
- [Search Input] Support for placeholder

#### Changed

- For local development of HDS React, restricted node version to supported versions 12-14

### Design kit

#### Changed

- Updated HDS Sketch libraries to Sketch 81 (81.1)

### Documentation

#### Added

- WP and Drupal notes to the developers’ Getting Started documentation
- An example of asking the user’s gender in a form in the Form pattern documentation

#### Changed

- [Koros] Added an example of a rotated wave motif shape
- [SearchInput] Added a placeholder text to all Playground and code examples

#### Fixed

- Resolved some critical dependency security threats for the new documentation site

## [1.8.0] - Dec, 9, 2021

### Core

#### Added

- [Icons] New icons
  - 4 45 deg angled arrows
  - Event
  - Coffee
  - Copy
  - Restaurant
  - Sitemap

#### Fixed

- [Buttons] Add active state to HDS buttons to add focus outline to Safari on click

### React Components

#### Added

- [Icons] New icons
  - 4 45 deg angled arrows
  - Event
  - Coffee
  - Copy
  - Restaurant
  - Sitemap
- [Search Input] Support for onChange property to listen to input value changes
- [Search Input] Support hiding search button
- [Tabs] Enable customisation through theme prop
- [Dropdown] Add icon support for multi-select variants of Select and Combobox components

#### Fixed

- [Buttons] Add active state to HDS buttons to add focus outline to Safari on click
- [Date Input] Fix previous and next month focus disappearing
- [Search Input] Clicking suggestion triggers onSubmit
- [Search Input] Removing selectedItem with an enter and a space keypress

### Design kit

**Added**

- [Form Components] Multiselect (Select and Combobox) with icon variants
- [Icons] New icons
  - 4 45 deg angled arrows
  - Event
  - Coffee
  - Copy
  - Restaurant
  - Sitemap
- [Modals and Notifications] Added new arrow positions for Tooltip to better match the implementation. New arrow symbols allow setting the arrow closer to the edge of the Tooltip.
- [Modals and Notifications] Examples of all possible arrow positions

**Changed**

- Updated HDS Sketch libraries to Sketch 80.1
- [Modals and Notifications] Slightly altered the symbol structure of the internal Tooltip symbols
- [Modals and Notifications] Renamed Above and Below Tooltips to Top and Bottom to better match terms used in the implementation
- [Modals and Notifications] Swapped names of Left and Right Tooltips to better match terms used in the implementation

### Documentation

#### Added

- New Icons: Icon set 12/2021
- Example of custom-themed Tabs
- Guidelines for using icons in Dropdown components

## [1.7.1] - Nov, 29, 2021

### React Components

#### Fixed

- [Table] Fixed duplicate id bug regarding table checkboxes

### Documentation

#### Fixed

- Typo fixes
- Fixed password input react storybook link

## [1.7.0] - Nov, 25, 2021

### React Components

#### Added

- Table
- [Date Input] Support disabling dates with custom logic
- [File Input] Support for tooltip

#### Fixed

- [Select] Accept null as component value
- [Date Input] Fix Datepicker dates keyboard navigation when min or max date is set
- [Linkbox] Pass custom className property to container element for easier styling

### Design kit

#### Added

- [Logo] Added logo language versions and size variants (40px and 60px) for Swedish and Russian
- [Tables] Symbols for table column sorting
- [Tables] Symbols for row selection (checkbox) cells
- [Tables] Symbols for empty header cells
- [Tables] Symbols for row selection column (default and zebra)
- [Tables] Detachable example tables for row selection

#### Changed

- Updated HDS Sketch libraries to Sketch version 80 (80.0)
- [Logo] Changed the component name to have a 2 letter prefix for all logo language variants. Simplified the symbol structure: logo symbols now have only three (3) colour variants; Black, White and Brand colour. The colour cannot be overridden for Black and White logos. If you need a brand colour Logo, use the “Logo/Brand colour” symbol and override with the desired brand colour.
- [Tables] Updated Table examples to show zebra colouring and selectable rows

#### Removed

- [Logo] Individual brand colour logo symbols. Use the new “Logo/Brand colour” symbol instead.

### Documentation

#### Added

- Favicon documentation to the Visual assets section
- [Tables] Documentation and examples of interactive (React) tables

#### Changed

- Updated Logo documentation to include the Russian language variant
- Updated Roadmap
- [Tables] Updated Table Playground examples to use React instead of HDS Core
- [DateInput] Added a small note to the documentation about disabling DateInput dates

## [1.6.0] - Oct, 28, 2021

### React Components

#### Fixed

- [Notification] Animations not firing with some build configurations, often in production builds

#### Added

- [Koros] Calm variant of Koros

### Core

#### Added

- [Table] Table component
- [Koros] Calm variant of Koros

### Design kit

#### Added

- [Tables] New Table symbols (new library file)
  - Column symbols
  - Cell symbols for custom tables
  - Example table symbols
- [Koros] M-sized Tyyni (Calm) variant
- [Typography] Text styles for right aligned body text

#### Changed

- Updated HDS Sketch libraries to the Sketch version 78 (78.1)
- [Koros] Clarified symbol layer naming in the override panel

#### Removed

- [Table] Marked old Table symbols as Deprecated. These will be removed in a future update

### Documentation

#### Added

- [Table] Documentation for the Table component

### Changed

- [Form pattern] Updated form examples to explain required fields better

## [1.5.1] - Oct, 11, 2021

### React Components

#### Fixed

- [Combobox] Prevented resetting selected values on tab keypress
- [Combobox] Fixed space keypress in the search, adds now a space into search term
- [Combobox] Added missing aria-expanded attribute for the dropdown button
- [File Input] Prevented unnecessary onChange calls on re-render
- [Number Input] Fixed resetting input value as an empty value
- [Time Input] Fixed value property

### Design kit

#### Changed

- Updated HDS Sketch libraries to Sketch 77 (77.1)
- [Form Components] Moved Date input symbols to the “Date & Time” category

#### Fixed

- [Form Components] Removed duplicate TextInput Active state symbols that were accidentally introduced last update
- [Icons] Removed duplicate example artboard entry for fast-forward icon

#### Removed

- [Form Components] “Date Input” category (symbols moved to “Date & Time”)

### Documentation

#### Added

- Link to the design kit to the designers’ Getting started page
- Link to the icon kit to the Icon documentation page
- Link to the favicon kit to the Logo documentation page
- Notes about Button role attribute usage when the Button is used as a link
- More Link component variation examples
  - Internal/external links, links that open in a new tab, links with icons

#### Changed

- Updated Card examples to use role="link" in their Buttons

## [1.5.0] - Sep, 22, 2021

### Core

- [Text Input] Added Info message to inform user of dynamic input value changes
- [Icons] New icons:
  - Shopping cart

### React Components

#### Added

- File Input
- [Text Input, TextArea, Password Input, Number Input, Time Input, Date Input, File Input] Added Info message to inform user of dynamic input value changes
- [Icons] New icons:
  - Shopping cart

#### Change

- [Accordion] Changed Accordion to open via header click
- [Accordion] Added support for accordion being open by default
- Use Date Input and Phone Input in the form examples
- Add Date Input and Phone Input validation in the form examples

### Design kit

#### Added

- [Form Components] File Input symbols
- [Form Components] New InfoMessage element that can be used with all form components
- Info message can be used to convey information to the user which otherwise could be left unnoticed. It is meant to inform the user if something has caused changes to the input.
- [Icons] Shopping cart icon

### Documentation

#### Added

- File Input documentation
- [Form validation pattern] Info message usage guidelines
- Missing components to form pattern documentation

#### Changed

- [Form pattern] Added missing form components to the form pattern documentation
- [Form pattern] Updated some of the images in the form pattern to use the current focus style
- Changed heading colour in all documentation site and Storybook examples from --color-bussi to --color-black-90

## [1.4.1] - Sep, 9, 2021

### React Components

#### Fixed

- [SideNavigation] Invalid CSS generating problems with testing libraries

## [1.4.0] - Sep, 7, 2021

### Core

#### Added

- [Icons] New icons:
  - Whatsapp

### React Components

#### Added

- Linkbox
- SideNavigation
- [Icons] New icons:
  - Whatsapp

#### Fixed

- [Number Input] Using stepper button will call onChange callback

### Design kit

#### Added

- [Cards] Linkbox symbols, including
  - Empty Linkboxes
  - Linkboxes with heading and text
  - Linkboxes with image, heading and text
- [Cards] Added custom Linkbox examples
- [Icons] WhatsApp icon
- [Navigation] Symbols for side navigation
  - Example navigation symbols both for Desktop and Mobile screen sizes
  - Side navigation item symbols for building custom content side navigations

#### Changed

- Updated all HDS libraries to the Sketch version 76 (76.1)
- [Cards] Updated symbol structure so it is easier to differentiate regular Card and Linkbox custom examples
- [Navigation] Renamed “Navigation” symbols to “Main navigation” to make them more easily distinguishable from the new side navigation symbols

#### Fixed

- [Cards] Text + heading with border symbol smart layout scaling

### Documentation

#### Added

- Side navigation documentation
- Linkbox documentation
- A guideline page about choosing between Checkbox, Radio button and Toggle button.

#### Changed

- Remove brand colors from form examples headings
- [Checkbox] Playground examples are now fully interactable
- [Radio button] Playground examples are now fully interactable
- Updated Roadmap

#### Fixed

- Fixed typo in the link to aremycolorsaccesible.com

## [1.3.1] - Aug, 11, 2021

### Design tokens

#### Changed

- Update color Spåra (color-tram) token value from `#009246` to `#008741`

### React Components

#### Changed

- [Navigation] Pass native event to onTitleClick
- [DateInput] Support clearing DateInput value programmatically

#### Fixed

- [Navigation] Remove border-radius from navigation focus style
- [Navigation] Add warning if lang-attribute is missing from Navigation.LanguageSelector option
- [Navigation] Fix Navigation component render when optional label property is missing
- [Footer] Fix footer icon a11y problems

### Design kit

#### Changed

- [Color] Spåra from `#009246` to `#008741` for better accessibility
  - This ensures that the Spåra is now easier to use both as a background color and as a text color
- [Form Components] Removed rounded corners from search input fields

### Documentation

#### Changed

- [Color] Updated documentation for the new Spåra (color-tram) color
- Add note about Navigation.LanguageSelector option's lang attribute

## [1.3.0] - Aug, 9, 2021

### Core

#### Added

- Link

### React Components

#### Added

- Link

#### Fixed

- [Form Components] Tooltip focus style
- [Form Components] Incorrect error icon
- [Notification] Inline notification z-index
- [TimeInput] Time input value on clear

### Design kit

#### Breaking

- Updated all HDS libraries to the Sketch version 74 (74.1)

#### Added

- [Links] New Link symbols
- Two main link variants
  - Inline links are positioned within a text element
  - Standalone links are used without an accompanying text element (similarly to buttons)
- Variants for different link types
  - Internal/External
  - File
  - Phone number
  - Email address
- [Color] Shared style for a visited link
- [Typography] Shared styles for a visited link

### Documentation

#### Added

- Link component documentation
- Upcoming breaking changes page which lists near future changes that may be considered breaking
- Guideline page for contributing for implementation
- Tutorial page for getting started with Abstract
- Links to Abstract collections to the Designers Getting started page

#### Changed

- Updated Roadmap
- Added a small note about Sketch Assistant link requiring Sketch to be installed
- Typo fixes
- Fixes to broken links

## [1.2.0] - June, 21, 2021

### Core

#### Added

- Fieldset

### React Components

#### Added

- Fieldset
- Toggle Button

#### Fixed

- [TextInput] Fixed error and success text alignments

### Design kit

#### Added

- [Buttons] Toggle button with two variants
  - Default toggle button
  - Toggle button with a horizontal label
- [Form Components] Fieldset with two variants
  - Default fieldset
  - Fieldset with borders

#### Changed

- [Form Components] Renamed all “Fixed” components to “Read-only” to match naming used in the implementation

#### Fixed

- [Color] Corrected a typo (Spåra → Metro) in the Colour Accessibility artboard
- [Grids & Breakpoints] Changed the XS template layout grid width from 296px to 288px (this now matches the HDS documentation)

### Documentation

#### Added

- Toggle button documentation and examples
- Fieldset documentation and examples
- Documentation and guidelines for creating new HDS icons
- Documentation for error messages related to multiple input fields to Form validation pattern

#### Changed

- Added a note to Checkbox documentation page about the choice between a Checkbox and a Toggle button

#### Fixed

- Corrected typos “from” to “form” in Storybook validation examples

## [1.1.0] - May, 25, 2021

### React Components

#### Added

- Password Input

#### Changed

- [Labels & Tags] Added icon support for StatusLabel
- [Labels & Tags] Increased the height of StatusLabel and Tag

#### Fixed

- [DateInput] Datepicker will use fallback positions if there is not enough space in the bottom and left.

### Design kit

#### Added

- [Color] Usage example images
- [Form Components] Password input symbols, including
- Input with a built-in visibility icon to display masked characters
- Input with external visibility icon buttons to reveal masked characters
- [Labels & Tags] StatusLabel with an icon variant

#### Changed

- [Color] Updated colour style example artboards to include some guidelines on how the colours can be used
- [Color] Separated fill colour example artboards into separate artboards Brand, Status and Grayscale
- [Form Components] Updated spacing and size of Select symbols to match newly sized Tag component
- [Form Components] Updated spacing and size of Combobox symbolss to match newly sized Tag component
- [Color] Renamed “Focus - light border” style to “Focus - slim border”
- [Labels & Tags] Slightly increased the size of the Default StatusLabel variant to match with the new icon variant
- [Labels & Tags] Slightly increased the size of the Tag to match with the new StatusLabel with icon variant

### Documentation

#### Added

- Documentation for the PasswordInput
- New examples of StatusLabel with icon to the StatusLabel documentation page
- Link to colour usage example images to the Colour documentation page

#### Changed

- Updated Storybook to version 6.2.9 to improve loading times

## [1.0.0] - May, 3, 2021

### React Components

#### Breaking Changes

#### Removed

- [Dropdowns] Removed deprecated Dropdown component

#### Changed

- Replaced alert and helper text icons with fill icons in form components
- Replaced notifications' icons with fill icons

#### Fixed

- [TextInput] Fixed text input height inside flexbox
- [DateInput] Fixed ref property
- [DateInput] Added datepicker min-width

### Design kit

#### Added

- [Logo] New favicon symbols with Light, Dark, Light transparent and Dark transparent variations
  - Favicon 16×16
  - Favicon 32×32
  - Favicon 48×48
  - MSTile 150×150
  - Apple touch icon 180×180
  - Android/Chrome favicon 192×192
  - Android/Chrome favicon 256×256
  - Safari pinned tab 260×260

#### Changed

- Updated all HDS libraries to Sketch version 71 (71.2)
- [Color] Cleaned up layer naming
- [Footer] Updated typography and icon library links
- [Form Components] Error text icon now uses a fill icon variant (alert-circle-fill)
- [Form Components] Success text icon now uses a fill icon variant (check-circle-fill)
- [Form Components] Updated Tag symbol library links
- [Form Components] Changed DateInput assistive text date format from DD.MM.YYYY to D.M.YYYY
- [Koros] Cleaned up layer naming and order
- [Labels and Tags] Updated typography and icon library links
- [Navigation] Mobile navigation symbols now use full-width button symbols. This fixes the issue where it was not possible to alter mobile navigation button labels without detaching the symbol.
- [Navigation] Updated icon library links
- [Modals and Notifications] Improved example artboard naming
- [Modals and Notifications] Notification title icon now uses fill icon variants
- [Modals and Notifications] Notification title icon now uses a corresponding status colour instead of black
- [Page templates] Updated mobile page template example with a correct content width
- [Page templates] Cleaned up artboard and layer naming
- [Placeholders and templates] Improved example artboard spacing
- [Placeholders and templates] Updated typography library links
- [Tabs] Renamed “HDS Tabs and Pages” to “HDS Tabs” to better match the library contents
- [Typography] Cleaned up layer naming and order

#### Fixed

- [Modals & Notifications] Clarified layer naming of Inline Notification variant symbols
- [Navigation] Incorrect icon library links
- [Navigation] Improved mobile navigation symbol scaling when instance size is increased horizontally

#### Removed

- [Accordion] Previously deprecated “List” symbols
- [Buttons] Previously deprecated Supplementary button symbols
- [Footer] Previously deprecated Footer symbols
- [Form Components] Previously deprecated multi-select dropdown symbols
- [Tabs] Paging symbols since they have not been implemented yet

### Documentation

#### Added

- Tutorial for transitioning to the HDS 1.0 version from older versions

#### Changed

- Component Pre-release status is now known as Draft
- Slightly updated the Draft status description on the Component overview page
- Updated multiple component statuses for the production release
- Loading spinner from Draft to Stable
- Tabs from Draft to Stable
- ImageWithCard from Draft to Stable
- Section from Draft to Stable
- Removed beta mentions from the website
- Updated Roadmap and What’s new section
- Updated Form pattern example images to use the fill icon style in error and success messages
- Updated Dialog code examples to follow better practices

#### Fixed

- Typos on most documentation pages

#### Removed

- Previously deprecated Dropdown component from the Component overview page table
- Redundant rows of LockOpen icon from the Icons page table

## [0.25.0] - April 15, 2021

### React Components

#### Breaking Changes

#### Removed

- [TextInput, TextArea, Number Input, Checkbox, RadioButton] Removed deprecated labelText property

#### Added

- Phone Input
- Dialog

#### Fixed

- [Select] Fixed content overlap with long labels

### Documentation

#### Added

- Dialog documentation
- Phone number input documentation
- Links to supportive resources

#### Changed

- Updated Roadmap
- Clarified definition of stable

### Design kit

#### Added

- [Buttons] Full-width button symbols. These are visually identical to default HDS Buttons but can be stretched in width (i.e. they use no smart layout which would resize the buttons).
- [Color] Added a shared fill style for a screen overlay
- [Form Components] Phone number input field symbols
- [Modals and Notifications] Dialog symbols with following variants: Confirm, Info, Danger and Scrollable

### Removed

- [Form Components] Removed deprecated phone number input from Text field > Input

## [0.24.0] - March 29, 2021

### Design kit

#### Added

- [Buttons] Loading button which can be shown during a loading action triggered by a button press
- [Form Components] Number input symbols
- [Icons] New set of icons, including customer-bot-negative, customer-bot-neutral, customer-bot-positive, document, headphones, save-diskette-fill, save-diskette, text-bold, text-italic and text-tool

#### Changed

- [Buttons] Changed the button state example artboard to use new Supplementary button symbols
- [Buttons] Increased Supplementary button inner spacing between icon and text label from 4px to 8px. Shorter spacing did not work well with icons with a large padding. This change is not fully implemented yet.
- [Form Components] Increased spacing between input field action buttons from 8px to 16px. This change was made to make it easier to tap actions on smaller screen sizes. This change is not fully implemented yet.
- [Icons] Divided icons into descriptive groups
- [Icons] Updated icon symbol export options

### React Components

#### Added

- Number Input
- [Buttons] Loading Button
- [Icons] New icons:
  - customer-bot-negative
  - customer-bot-neutral
  - customer-bot-positive
  - document
  - headphones
  - save-diskette-fill
  - save-diskette
  - text-bold
  - text-italic
  - text-tool

#### Fixed

- Navigation Component logout problem in SSR

### Core

#### Added

- Number Input
- [Buttons] Loading Button
- [Icons] New icons:
  - customer-bot-negative
  - customer-bot-neutral
  - customer-bot-positive
  - document
  - headphones
  - save-diskette-fill
  - save-diskette
  - text-bold
  - text-italic
  - text-tool

### Documentation

#### Added

- Number input documentation
- [Buttons] Loading button documentation
- [Icons] Documentation for new icons
- More detailed documentation about body text usage on mobile screens

#### Fixed

- Broken Storybook links for TextInput and TextArea
- Broken link in TimeInput documentation
- Incorrect text colour in TextInput error state examples

## [0.23.1] - March 15, 2021

### Design kit

#### Changed

- [Form Components] Combined Date and Time input under the same symbol group “Date and time”

#### Fixed

- [Form Components] Incorrect typography styles in the example artboards

#### Removed

- [Form Components] Time select symbols that were left out of the implementation. Use HDS Select instead.

### Documentation

#### Changed

- Updated Roadmap

## [0.23.0] - March 12, 2021

### Design kit

#### Added

- Time Input

### React Components

#### Added

- New Time Input component

#### Fixed

- Navigation component server side rendering issue

### Documentation

#### Added

- Time Input component documentation

#### Changed

- HDS roadmap updated

## [0.22.0] - March 3, 2021

### Design kit

#### Added

- Date field and date picker

#### Fixed

- Incorrect text color in TextInput Disabled state

### React Components

#### Added

- New date input with date picker

#### Fixed

- Remove unwanted footer border in Safari browser

#### Tooling

- Improve React component scaffolding script

### Documentation

#### Added

- Date input and date picker documentation

#### Changed

- HDS roadmap updated
- Add active link state to Navigation examples

#### Fixed

- Fix spelling in documentation
- Localisation page URL use British English
- Clarified data format guidelines for leading zeros for dates (leading zeros are not used for dates)

## [0.21.0] - January 19, 2021

### Core

#### Added

- New component: Search input (in [#345](https://github.com/City-of-Helsinki/helsinki-design-system/pull/345))

### React

#### Added

- Added `autocomplete` attribute for applicable fields in form validation examples (in [#359](https://github.com/City-of-Helsinki/helsinki-design-system/pull/359))

#### Fixed

- [LoadingSpinner] Fixed a bug related to cleaning of the notification area (in [#355](https://github.com/City-of-Helsinki/helsinki-design-system/pull/355))
- [TextInput, TextArea] Fixed focus outline animation glitch inside grid layout (in [#356](https://github.com/City-of-Helsinki/helsinki-design-system/pull/356))

### Documentation

#### Changed

- Updated status of multiple components to reflect their current completeness
  - Tooltip from `Pre-release` to `Stable`
  - Accordion from `Pre-release` to `Stable`
  - Card from `Pre-release` to `Stable`
  - Tag from `Pre-release` to `Stable`
  - SelectionGroup from `Pre-release` to `Stable`
- Removed `New` status from components that have been released more than 1 major release ago

## [0.20.0] - January 5, 2021

### Design kit

#### Changed

- Renamed “HDS Pagination” to “HDS Tabs and Pages”
- [Cards] Optimized images to reduce library file size
- [Cards] Updated links to shared typography styles

#### Added

- New library HDS Tabs and Pages
  - [Tabs and Pages] Tab list symbols of two sizes; Default and Small
  - [Tabs and Pages] Overflow tab list variant. This can be used in smaller screens and spaces where all tabs do not fit horizontally on the view.
  - [Tabs and Pages] Symbols for single tabs. These can be used to build tab lists with custom widths etc.
  - Library also includes old pagination symbols but they are not yet implemented into HDS and the design is subject to change
- [Color] Shared style for a lighter (2px) focus border. This style can be used in tight spaces or when the default 3px focus border is too visually distractive.

### Documentation

#### Added

- Documentation for Tabs component

#### Changed

- [TextField] Added a note about autocomplete WCAG requirement

### React

#### Added

- New component: Tabs (in [#343](https://github.com/City-of-Helsinki/helsinki-design-system/pull/343))

## [0.19.0] - December 22, 2020

### Design kit

#### Added

- HDS Accordion library, including
  - Two accordion symbols; Basic and With card variants
  - Empty accordion variant for building custom accordions
  - Tips how to build custom accordions using Buttons with icons

#### Changed

- [Buttons] Decreased Default Supplementary button minimum width from 136px to 124px

### Documentation

#### Added

- Accordion component documentation

#### Changed

- [Card] Small clarification about component intractability
- [Status label] Small clarification about icon usage with the component

#### Fixed

- Added Search input component to the Component overview list (was missing in the previous release)

### Core

#### Fixed

- [Text input, Textarea] Fixed placeholder text color on Firefox (in [#342](https://github.com/City-of-Helsinki/helsinki-design-system/pull/342))

### React

#### Changed

- [Footer] Added `logoLanguage` prop to Footer component (in [#339](https://github.com/City-of-Helsinki/helsinki-design-system/pull/339))

#### Fixed

- [TextInput, TextArea, Combobox] Fixed placeholder text color on Firefox (in [#342](https://github.com/City-of-Helsinki/helsinki-design-system/pull/342))
- [Combobox] Fixed placeholder text alignment on Firefox (in [#342](https://github.com/City-of-Helsinki/helsinki-design-system/pull/342))

#### Added

- New component: Accordion (in [#331](https://github.com/City-of-Helsinki/helsinki-design-system/pull/331/files))
- New hook: `useAccordion` for implementing custom accordions (in [#331](https://github.com/City-of-Helsinki/helsinki-design-system/pull/331/files))

## [0.18.0] - December 8, 2020

### Design kit

#### Added

- [Form Components] Search field input symbols
- [Form Components] Search suggestion symbols
- [Form Components] Error summary symbols. These can be used to list all errors in a form when using a static validation approach.
- [Form Components] Error state for Checkbox, Radio button and Selection group symbols
- [Form Components] Success state for Text Input and Text Area symbols
- [Typography] Default link style for small sized medium body text

#### Changed

- Updated all HDS library files to Sketch 70 file version
- [Form Components] Renamed “Text field/01 Input/06 Fixed” to “Text field/01 Input/07 Fixed”
- [Typography] Default link text style colour from #0072c6 to #0000bf to ensure better contrast on varying backgrounds

#### Fixed

- [Form Components] Incorrect order numbering in TextInput example artboards

#### Removed

- [Form Components] Redundant internal symbols

### Documentation

#### Added

- Documentation for the SearchInput component
- Documentation for the Form validation pattern

#### Changed

- Updated Roapmap to reflect the current state and plans of the project

### Core

#### Changed

- [TextInput, TextArea] Error icon moved below the input next to the error text (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))

#### Added

- New component: Error summary (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- [Text input, textarea, checkbox, selection group] Added error text for validation error message (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- [Text input, textArea] Added success text (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))

### React

#### Changed

- [TextInput, TextArea] Error icon moved below the input next to the error text (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))

#### Removed

- Removed `aria-hidden` attribute from input required indicator ("\*") (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))

#### Added

- New component: ErrorSummary (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- New component: SearchInput (in [#317](https://github.com/City-of-Helsinki/helsinki-design-system/pull/317))
- Added examples of form validation using Yup and Formik (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- [TextInput, TextArea] Added `successText` prop for success state message (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- [TextInput, TextArea, Checkbox, SelectionGroup] Added `errorText` prop for validation error message (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- [TextInput, TextArea] Added `aria-describedby` input attribute to reference error text, success text and assistive text (in [#320](https://github.com/City-of-Helsinki/helsinki-design-system/pull/320))
- Visual regression tests using [Loki](https://loki.js.org/) (in [#323](https://github.com/City-of-Helsinki/helsinki-design-system/pull/323))
- Accessibility tests using `jest-axe` (in [#334](https://github.com/City-of-Helsinki/helsinki-design-system/pull/323))

## [0.17.0] - November 24, 2020

### Design kit

#### Changed

- Removed non-semantic rounded corners from HDS to more accurately match the brand guidelines
  - [Form Components] Changed corner radius from 2px to 0px in Checkbox symbols
  - [Form Components] Changed corner radius from 2px to 0px in Radio button symbols
  - [Form Components] Changed corner radius from 2px to 0px in Combobox symbols
  - [Form Components] Changed corner radius from 2px to 0px in Select symbols
  - [Form Components] Changed corner radius from 2px to 0px in Text field symbols

#### Fixed

- [Form Components] Fixed an issue in Checkbox + Label symbols where the label was scaled incorrectly when the checkbox status was overridden
- [Modals and Notifications] Fixed incorrect scaling in Notification/Inline/Default symbols
- [Typography] Incorrect black colour in some of the shared body text styles

#### Removed

- [Form Components] Removed redundant internal symbols

### Documentation

#### Added

- Link to Koros Core documentation to the Koros documentation page
- Koros Core to Component overview page
- Note about the Container component to Breakpoint token page
- Note about the Container component to Grid guideline page

### Core

#### Changed

- [Checkbox] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))
- [Textarea] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))
- [Text input] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))

#### Added

- New component: Koros (in [#318](https://github.com/City-of-Helsinki/helsinki-design-system/pull/318))
- New component: Container (in [#312](https://github.com/City-of-Helsinki/helsinki-design-system/pull/312))

### React

#### Changed

- [Checkbox] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))
- [Combobox] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))
- [Select] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))
- [TextArea] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))
- [TextInput] Removed rounded corners (in [#319](https://github.com/City-of-Helsinki/helsinki-design-system/pull/319))

#### Fixed

- [Navigation] Added missing `aria-hidden` attribute to dropdown menu icon (in [#324](https://github.com/City-of-Helsinki/helsinki-design-system/pull/324))

#### Added

- New component: `Container` (in [#312](https://github.com/City-of-Helsinki/helsinki-design-system/pull/312))

## [0.16.1] - November 19, 2020

### React

#### Fixed

- [Navigation] Fixed language selector menu not closing after language is selected (in [#321](https://github.com/City-of-Helsinki/helsinki-design-system/pull/321))

## [0.16.0] - November 13, 2020

### Design kit

#### Added

- New library HDS Loaders
  - New component: Loading spinner
  - New component: Loading skeleton (implementation still missing)
- [Form Components] Added horizontal version of selection groups (both for checkbox and radio button)

#### Changed

- [Form Components] Checkbox + label symbols to use Smart layout
- [Form Componenst] Radio button + label symbols to use Smart layout

#### Fixed

- [Form Components] Disabled state radio button borders now use shared styles

### Documentation

#### Added

- Documentation for Loading spinner component
- Documentation for Tag component
- Documentation for Selection group component

#### Changed

- Added a link to Container component Storybook examples to Grid and Breakpoint documentation

#### Fixed

- Small fixes to Notification documentation subtitles
- Checkbox Playground examples are now interactable
- Radio button Playground examples are now interactable

### Core

#### Added

- New component: Loading spinner (in [#311](https://github.com/City-of-Helsinki/helsinki-design-system/pull/311))
- New component: Selection group (in [#292](https://github.com/City-of-Helsinki/helsinki-design-system/pull/292))

### React

#### Added

- New component: LoadingSpinner (in [#311](https://github.com/City-of-Helsinki/helsinki-design-system/pull/311))
- New component: SelectionGroup (in [#292](https://github.com/City-of-Helsinki/helsinki-design-system/pull/292))
- New component: Tag (in [#308](https://github.com/City-of-Helsinki/helsinki-design-system/pull/308))

#### Fixed

- [Accessibility] Added missing `aria-hidden` attribute to the icon in `Notification` component (in [#313](https://github.com/City-of-Helsinki/helsinki-design-system/pull/313))

## [0.15.1] - November 3, 2020

### Documentation

#### Changed

- Updated Supplementary button examples
- Added accordion and form validation to roadmap

### React

#### Fixed

- Fixed a stylesheet bundle issue with `Navigation` component, which caused invalid styles for mobile navigation with dropdown items.

## [0.15.0] - October 29, 2020

### Breaking changes

#### Design tokens

- Renamed colour tokens
  - `--color-coat-of-arms-blue` to `coat-of-arms`
  - `--color-coat-of-arms-gold` to `gold`
  - `--color-coat-of-arms-silver` to `silver`
  - `--color-[color name]-dark-50` to `--color-[color name]-dark`
  - `--color-[color name]-light-20` to `--color-[color name]-light`
  - `--color-[color name]-light-50` to `--color-[color name]-medium-light`
- Replaced tokens `-light-05` with `-light `
- Changed colour token values of `-light`, `-medium-light`, and `-dark`:
  - `--color-brick-light` to `#ffeeed`
  - `--color-brick-medium-light` to `#facbc8`
  - `--color-brick-dark` to `#800e04`
  - `--color-bus-light` to `#f0f0ff`
  - `--color-bus-medium-light` to `#ccccff`
  - `--color-bus-dark` to `#00005e`
  - `--color-coat-of-arms-light` to `#e6f4ff`
  - `--color-coat-of-arms-medium-light` to `#b5daf7`
  - `--color-coat-of-arms-dark` to `#005799`
  - `--color-gold-light` to `#f7f2e4`
  - `--color-gold-medium-light` to `#e8d7a7`
  - `--color-gold-dark` to `#9e823c`
  - `--color-silver-dark` to `#b0b8bf`
  - `--color-copper-light` to `#cffaf1`
  - `--color-copper-medium-light` to `#9ef0de`
  - `--color-copper-dark` to `#00a17d`
  - `--color-engel-light` to `#fff9db`
  - `--color-engel-medium-light` to `#fff3b8`
  - `--color-engel-dark` to `#dbc030`
  - `--color-fog-light` to `#e8f3fc`
  - `--color-fog-medium-light` to `#d0e6f7`
  - `--color-fog-dark` to `#72a5cf`
  - `--color-metro-light` to `#ffeee6`
  - `--color-metro-medium-light` to `#ffcab3`
  - `--color-metro-dark` to `#bd2f00`
  - `--color-summer-light` to `#fff4d4`
  - `--color-summer-medium-light` to `#ffe49c`
  - `--color-summer-dark` to `#cc9200`
  - `--color-suomenlinna-light` to `#fff0f7`
  - `--color-suomenlinna-medium-light` to `#ffdbeb`
  - `--color-suomenlinna-dark` to `#e673a5`
  - `--color-tram-light` to `#dff7eb`
  - `--color-tram-medium-light` to `#a3e3c2`
  - `--color-tram-dark` to `#006631`

#### React

- [Navigation] in ([#288](https://github.com/City-of-Helsinki/helsinki-design-system/pull/288))
  - The `animateOpen` prop was removed.
  - Replaced `menuCloseAriaLabel` and `menuOpenAriaLabel` props with a single `menuToggleAriaLabel` prop
  - The supported values for the `theme` prop were changed from `white` and `black` to `light` and `dark`.
  - [Navigation.Dropdown] The component was completely re-written. The old dropdown used a role="listbox" implementation that is intended be used in forms. It now uses a simple "menu button" implementation.
    - The component is still used the same way as before, but the supported props changed. The supported props can be seen [here](https://hds.hel.fi/storybook/react/?path=/docs/components-navigation--default) under the NavigationDropdown tab.
  - [Navigation.User] The dropdown used by the component was completely re-written for the same reason as above.
    - The component is still used the same way as before, but the supported props changed. The supported props can be seen [here](https://hds.hel.fi/storybook/react/?path=/docs/components-navigation--default) under the NavigationUser tab.
  - [Navigation.LanguageSelector] The component was completely re-written for the same reason as above.
    - The component no longer accepts options, instead it is used similarly as the `Navigation.Dropdown` component.
    ```tsx
    <Navigation.LanguageSelector label="FI">
      <Navigation.Item href="#" label="Suomeksi" />
      <Navigation.Item href="#" label="På svenska" />
      <Navigation.Item href="#" label="In English" />
    </Navigation.LanguageSelector>
    ```
    The supported props can be seen [here](https://hds.hel.fi/storybook/react/?path=/docs/components-navigation--default) under the NavigationLanguageSelector tab.
  - [Navigation.Row]
    - The prop `display` was renamed to `variant`, and the supported values for the prop were changed from `subNav` and `inline` to `default` and `inline`.
  - [Navigation.Search]
    - The `onSearchEnter` callback was renamed to `onSearch` as it can now be fired by pressing enter, or the search button.
    - The focus event is no longer passed in the `onFocus` and `onBlur` callbacks.
- [Combobox] Added a required prop - `toggleButtonAriaLabel` - that is used to describe the menu toggle button to screen readers. in ([#295](https://github.com/City-of-Helsinki/helsinki-design-system/pull/295))
- [TextArea] Replaced `tooltipOpenButtonLabelText` and `tooltipCloseButtonLabelText` props with a single `tooltipButtonLabel` prop. in ([#283](https://github.com/City-of-Helsinki/helsinki-design-system/pull/283))
- [TextInput] Replaced `tooltipOpenButtonLabelText` and `tooltipCloseButtonLabelText` props with a single `tooltipButtonLabel` prop. in ([#283](https://github.com/City-of-Helsinki/helsinki-design-system/pull/283))

## Design kit

### Added

- [Colours] New shared style for focus style on dark backgrounds
- [Navigation] New icon variant for Navigation dropdown options
- [Buttons] Icon left and icon right variants for all Small buttons.
- [Form Components] Added horizontal version of selection groups (both for checkbox and radio button)
- [Icons] Added new icons
  - cake (usage: birthday)
  - calendar-recurring
  - check-circle
  - drag (usage: draggable elements)
  - glyph-at
  - glyph-euro
  - layers
  - playback-play
  - playback-stop
  - playback-pause
  - playback-record
  - playback-next
  - playback-previous
  - playback-fastforward
  - playback-rewind
  - podcast
  - printer
  - refresh
  - rss
  - sliders (usage: filters)
  - sort
  - sort-ascending
  - sort-descending
  - sort-alphabetical-ascending
  - sort-alphabetical-descending
- [Icons] Added new icons fill-variants for better accessibility
  - error-fill
  - alert-circle-fill
  - info-circle-fill
  - check-circle-fill
  - cross-circle-fill
  - plus-circle-fill
  - minus-circle-fill
  - question-circle-fill

### Changed

- Updated design library files to Sketch version 69
- [Colour] Renamed colour tokens to value-agnostic light, light-medium and dark
- [Colour] Adjusted token values light, light-medium and dark colour to improve theming
- [Navigation] In mobile navigation menu, moved the language selection from the bottom of the menu to the top navigation bar
  - Fixed issues reported in the accessibility audit.
  - Updated example artboards to reflect new language selection position
- [Navigation] Changed "sign out" button to use Supplementary/Small/Text and Icon Left symbol instead of the only Text variant
- [Buttons] Increased the height of Small button variants by 8 pixels to comply with WCAG 2.5.5 Target Size.
- [Buttons] Changed the minimum symbol width of Small buttons variants to 44 pixels to ensure complying with WCAG 2.5.5 Target Size.
- [Buttons] Improved Small button variant symbol scaling
- [Buttons] Shortened the spacing between icon and label in Supplementary button from 8px to 4px.
- [Form Components] Checkbox + label symbols to use Smart layout
- [Form Components] Radio button + label symbols to use Smart layout

### Fixed

- [Form Components] Disabled state radio button borders now use shared styles
- [Form Components] Fixed small issues in Checkbox symbols
  - Fixed incorrect label spacing in Checkbox/Hover - selected
  - Fixed broken symbol link caused by Sketch 69 update in Checkbox/Unselected
- [Icons] Fixed legibility and pixel snapping of icons
  - microphone
  - microphone-crossed
  - volume-low
  - volume-high
  - arrow-up
  - arrow-right
  - arrow-left
  - arrow-down
  - arrow-undo
  - arrow-redo
  - angle-right
  - calendar-cross
  - clock-cross
  - check
  - download-cloud
  - display
  - cross
  - cross-circle
  - upload-cloud

### Removed

- [Colour] Removed color tokens -light-05

### Deprecated

- [Buttons] Supplementary button symbols without icons were deprecated and symbol will be completely removed in an upcoming release. This change was made to increase accessibility and usability of supplementary buttons.

## Documentation

### Added

- First HDS Pattern: Forms, documenting best practices and accessiblity considerations of designing and building forms with HDS
- [Tooltip] Component documentation
- [Card] Component documentation
- Documentation site content guidelines to the Contribution section

### Changed

- Updated all Component statuses in the Component overview
  - All components were marked Accessible
  - All components except Navigation and Footer were marked Stable
- [Button] Updated the documentation to reflect changes to Supplementary and Small buttons
- [Colour] Changed HDS Colour library documentation to match design and implementation
- [Icons] Icon visual assets documentation to match additions and changes in implementation
- Documentation site accessibility guidelines and statement
- Guidelines were updated to describe the basis of HDS accessibility as well as the process of ensuring accessibility.
- The accessibility statement was updated to list all currently known accessibility issues of the HDS documentation site. The reason for not fixing the issues was also stated.
- Updated Roadmap
- Updated What’s new section

### Fixed

- Fixed multiple broken links in the documentation site:
- Contribution page links on many pages
- Some Storybook links in the Component overview page
- Added links to dev.hel.fi site in Getting started, Contribution and Resources sections
- Added a small note about font purchase requirement for designers
- Changed the documentation page title to be dynamic (now includes the page name in the HTML title)

## Core

### Added

- [Icons] Added new icons
- New component: Card

### Changed

- Updated components to use the renamed tokens. in ([#282](https://github.com/City-of-Helsinki/helsinki-design-system/pull/282))
- [Button] Changed the minimum width and height of the `small` button. in ([#274](https://github.com/City-of-Helsinki/helsinki-design-system/pull/274))
- [Button] Shortened the spacing between icon and label in Supplementary button to 4px. in ([#274](https://github.com/City-of-Helsinki/helsinki-design-system/pull/274))

## React

### Added

- [Icons] Added new icons. in ([#286](https://github.com/City-of-Helsinki/helsinki-design-system/pull/286))
- New component: Tooltip. in ([#283](https://github.com/City-of-Helsinki/helsinki-design-system/pull/283))
- New component: Card. in ([#276](https://github.com/City-of-Helsinki/helsinki-design-system/pull/276))
- [Navigation]
  - Added a prop - `titleAriaLabel` - that is used to describe the logo and service to screen readers. in ([#288](https://github.com/City-of-Helsinki/helsinki-design-system/pull/288))
  - [Navigation.Search] Added a prop - `searchButtonAriaLabel` - that is used to describe search button to screen readers. in ([#288](https://github.com/City-of-Helsinki/helsinki-design-system/pull/288))

### Changed

- Updated components to use the renamed tokens. in ([#282](https://github.com/City-of-Helsinki/helsinki-design-system/pull/282))
- [Accessibility] Added warning when using other than strings as `Checkbox` or `RadioButton` label. in ([#300](https://github.com/City-of-Helsinki/helsinki-design-system/pull/300))
- [Button] Set `iconLeft` or `iconRight` as required for supplementary buttons. in ([#274](https://github.com/City-of-Helsinki/helsinki-design-system/pull/274))
- [Button] Changed the minimum width and height of the `small` button. in ([#274](https://github.com/City-of-Helsinki/helsinki-design-system/pull/274))
- [Button] Shortened the spacing between icon and label in Supplementary button to 4px. in ([#274](https://github.com/City-of-Helsinki/helsinki-design-system/pull/274))
- [Combobox] The selection is now cleared if the input value doesn't match the selected value. in ([#295](https://github.com/City-of-Helsinki/helsinki-design-system/pull/295))
- [Combobox] The input value is now cleared if there's no selected item when the field is blurred. in ([#299](https://github.com/City-of-Helsinki/helsinki-design-system/pull/299))
- [Footer] The copyright text is now hidden if neither `copyrightHolder` or `copyrightText` is defined. in ([#298](https://github.com/City-of-Helsinki/helsinki-design-system/pull/298))
- [Navigation] This update contains many accessibility improvements and bug fixes to the component. in ([#288](https://github.com/City-of-Helsinki/helsinki-design-system/pull/288))
  - The language selector is now always visible in the header. It used to be displayed at the bottom of the menu in mobile
  - The search now needs to be activated when using a keyboard. It used to be activated when the search button received focus
  - The search icon in the input for the `Navigation.Search` component was changed to a button
  - The mobile menu toggle now uses the correct aria attributes

### Fixed

- [Navigation] Fixed an issue where the `className` prop for `Navigation.Item` wasn't applied when the component was used inside the `Navigation.Row` component. in ([#288](https://github.com/City-of-Helsinki/helsinki-design-system/pull/288))

## [0.14.0] - October 15, 2020

### Core

#### Changed

- [Icons] Added `role="img"` to all icons. in ([#268](https://github.com/City-of-Helsinki/helsinki-design-system/pull/268))
- [Notification] Changed wrapping HTML element from `div` to `section`. in ([#273](https://github.com/City-of-Helsinki/helsinki-design-system/pull/273))
- [Notification] Added `role="alert"` for toast notifications. Removed `role` attribute from inline notifications. in ([#273](https://github.com/City-of-Helsinki/helsinki-design-system/pull/273))
- [Notification] Added `role="heading"` and `aria-level="2"` to the notification label. in ([#273](https://github.com/City-of-Helsinki/helsinki-design-system/pull/273))

#### Removed

- [Checkbox] Removed redundant aria-checked (already using `type="checkbox"`). in ([#271](https://github.com/City-of-Helsinki/helsinki-design-system/pull/271))
- [Radio button] Removed redundant aria-checked (already using `type="radio"`). in ([#271](https://github.com/City-of-Helsinki/helsinki-design-system/pull/271))

### Design kit

#### Added

- New component: Footer
- New component: Tag (documentation coming soon)
- New component: Card (implementation coming soon)
  - Example card layouts (Card on top of a photo, Image card)
- New component: Placeholders
  - Image placeholder (e.g. for a blog post which is missing the thumbnail image)
  - Avatar placeholder (e.g. for a user that is missing an avatar)
- New version of Multiselect Dropdown component. The multiselect component was divided into two separate components; Select and Combobox. Select will act like the old implementation, but it does not offer filtering. Combobox will work similarly, but it will include filtering. This change was made for accessibility reasons. Separating the implementation was needed to make keyboard and screen reader use working well and according to standards.

#### Changed

- HDS Library symbol naming and structure standardized to follow new [HDS Sketch guidelines](https://hds.hel.fi/contributing/design#guidelines-for-hds-design-library-files). This includes naming changes to most symbols but below you can find a list of the most important changes.
  - Internal (only used in HDS libraries) symbols are now grouped in x_Parts symbol folder
  - Internal (only used in HDS libraries) section symbols are now grouped in x_Sections symbol folder
  - Renamed and rearranged multiple symbol showcase artboards
  - [Buttons] Changed local text style in Button 02 Secondary hover states to use shared style
  - [Navigation] Changed symbol folder hierarchy for easier symbol swapping
  - [Modals and Notifications] Changed layer order in symbols to match layout
  - [Modals and Notifications] Fixed sub-pixel positioning in Default Alert Toast
  - [Typography] Added text styles used in HDS Footer: `Body S - Medium - 05 Link - Black` and `Body S - Medium - 05 Link - White`
- Renamed "HDS Text and Photo" library to "HDS Cards"
- [Cards] Moved current "Text+Photo" symbols to new "Example card layouts" page
- [Cards] Converted current "Text+Photo" symbols to use new Card symbols
- [Cards] Renamed "Text+Photo" symbols to "Card on top of a photo"
- [Form Components] Replaced old checkbox symbols in Multiselect with current symbols
- [Form Components] **Old Multiselect Dropdown symbols were moved to xx_Deprecated category.** These will be removed in future updates, but you may continue to use them if you do not have time to upgrade to the new design.
- [Form Components] Updated Dropdown option hover style to use brand colours. Same style is also used when browsing the options with keyboard.
- [Form Components] Symbolized error text (was previously a styled Assistive text)
- [Form Components] Moved the error icon from inside the input to the front of the error text.
- [Form Components] Added assistive text below the error description in all related component error states. This change was made to increase accessibility in situations where assistive text is essential information to fix input errors.
- [Form Components] Updated Dropdown symbol showcase artboards to reflect new changes and features.
- [Navigation] Added 2 Rows variant to 02 Dark
- [Navigation] Added Mobile sizes open variant to 02 Dark
- [Navigation] Renamed some layers to better match their usage

#### Removed

- [Form Components] Unnecessary overrides from Dropdown option symbols
- [Navigation] Redundant folders from Navigation symbols

### Documentation

#### Added

- Footer documentation
- [Icons] Added a recommendation to use aria-hidden="true" instead of role="presentation
- [Logo] Added guidelines for adding aria-labels for logos and service names

#### Changed

- Made improvements to focus colour guideline in Colour token page
- Made documentation page titles dynamic (now titles also feature page names)
- [Dropdown] Updated Dropdown documentation to reflect implementation changes
- [Dropdown] Made improvements and clarifications to the Dropdown accessibility documentation

#### Removed

- Broken mailto-link from the Support page

### React

#### Added

- Footer component. in ([#253](https://github.com/City-of-Helsinki/helsinki-design-system/pull/253))

#### Changed

- [Dropdown] The Dropdown component has gone through a complete overhaul, and the component was divided into two components; Select and Combobox. in ([#258](https://github.com/City-of-Helsinki/helsinki-design-system/pull/258))
- [Icons] Added `role="img"` to all icons. in ([#268](https://github.com/City-of-Helsinki/helsinki-design-system/pull/268))
- [Koros] Added `aria-hidden="true"` to the wave SVG. in ([#269](https://github.com/City-of-Helsinki/helsinki-design-system/pull/269))
- [Logo] Added `role="img"` to logo SVG. in ([#272](https://github.com/City-of-Helsinki/helsinki-design-system/pull/272))
- [Navigation] Added `role="search` to Navigation search wrapping div. in ([#270](https://github.com/City-of-Helsinki/helsinki-design-system/pull/270))
- [Notification] Changed wrapping HTML element from `div` to `section`. in ([#273](https://github.com/City-of-Helsinki/helsinki-design-system/pull/273))
- [Notification] Added `role="alert"` for toast notifications. Removed `role` attribute from inline notifications. in ([#273](https://github.com/City-of-Helsinki/helsinki-design-system/pull/273))
- [Notification] Added `role="heading"` and `aria-level="2"` to the notification label. in ([#273](https://github.com/City-of-Helsinki/helsinki-design-system/pull/273))

#### Fixed

- [Navigation] Fixed an issue where search appeared below navigation links in the mobile menu. in ([#270](https://github.com/City-of-Helsinki/helsinki-design-system/pull/270))

#### Removed

- [Checkbox] Removed redundant aria-checked (already using `type="checkbox"`). in ([#271](https://github.com/City-of-Helsinki/helsinki-design-system/pull/271))
- [Radio button] Removed redundant aria-checked (already using `type="radio"`). in ([#271](https://github.com/City-of-Helsinki/helsinki-design-system/pull/271))

#### Deprecated

- [Dropdown] The `Dropdown` component has been deprecated and will be removed in a future release, please use `Select` or `Combobox` instead. in ([#258](https://github.com/City-of-Helsinki/helsinki-design-system/pull/258))

## [0.13.3] - October 5, 2020

### Documentation

### Added

- lang attributes for Finnish colour names in Colour documentation Brand colour table
- lang attributes for verbose language description examples in Localisation guidelines
- Title attributes to front page image links (could not repeat the original issue of reading alt tags in wrong language)
- h3 headings after h2 “Usage” in component documentation pages, that missed a h3 heading level

#### Changed

- Moved Contribution category above Resources page in documentation site navigation
- Updated the roadmap to reflect new beta release plans and accessibility work
- Markdown links to Link component with external prop for links that open an new window
- component documentation code example h5 headings to h4
- component documentation code example heading text "React:" to "React code example:"
- component documentation code example heading text "Core:" to "Core code example:"

#### Fixed

- Japanese language code JP to JA in Localisation guidelines
- Spanish language code SP to ES in Localisation guidelines
- Insufficient link text "Here" to more descriptive in Logo guidelines
- Insufficient link text "filterable" to more descriptive "filterable variant" and added alt tag in Dropdown documentation
- Fixed `<b>` tags to `<strong>`
- Fixed `<i>` tags to `<em>`

#### Removed

- Removed the link to #designsystem-dev Slack channel in Support page (does not exist anymore)
- Removed a text about issue labeling in Support page (mentioned label does not exist anymore)

### React

#### Added

- Added a CommonJS bundle back to the package. in ([#265](https://github.com/City-of-Helsinki/helsinki-design-system/pull/265))

#### Fixed

- Fixed the wrong `sideEffects` value that caused the core base styles to be tree shaken in CRA production builds. in ([#265](https://github.com/City-of-Helsinki/helsinki-design-system/pull/265))
- [Navigation] Fixed the wrong maximum width of the component. in ([#265](https://github.com/City-of-Helsinki/helsinki-design-system/pull/265))
- [Dropdown] Fixed the label font weight. in ([#265](https://github.com/City-of-Helsinki/helsinki-design-system/pull/265))
- [TextArea] Fixed the label font weight. in ([#265](https://github.com/City-of-Helsinki/helsinki-design-system/pull/265))
- [TextInput] Fixed the label font weight. in ([#265](https://github.com/City-of-Helsinki/helsinki-design-system/pull/265))

## [0.13.2] - September 21, 2020

### Documentation

#### Added

- Sketch file and symbol guidelines to the Contributing section
- Logo component documentation page
- HDS Colour contrast accessibility examples and guidelines
- Localisation guidelines

#### Changed

- Improved styling of documentation site html elements to improve readability and visuals
- Search bar placeholder text

#### Removed

- Links to HDS Core Logo documentation (Logo is not implemented in HDS Core yet)

### React

#### Fixed

- [Navigation] Fixed an issue where the component didn't work correctly in production builds. in ([#255](https://github.com/City-of-Helsinki/helsinki-design-system/pull/255))
  - The problem was caused by the navigation component names getting mangled in production builds.

## [0.13.1] - September 9, 2020

### Documentation

#### Added

- First version of date and time format guidelines
- All components' statuses are now marked with labels. You can find the label explanations in the [Component overview page](https://hds.hel.fi/components#component-status)

#### Changed

- Updated For Designers section Abstract and Sketch screenshots

#### Fixed

- Fixed the core component storybook links

### React

#### Fixed

- Fixed typings for the `Button`, `Checkbox`, `RadioButton`, `TextArea` and `TextInput` components. in ([#240](https://github.com/City-of-Helsinki/helsinki-design-system/pull/240))
- [Dropdown] Fixed an issue where the label hover color couldn't be overridden for multiselect dropdowns. in ([#241](https://github.com/City-of-Helsinki/helsinki-design-system/pull/241))

## [0.13.0] - September 1, 2020

### Core

#### Breaking Changes

- [Notification] component was rewritten.
  - `.hds-notification--warning` was renamed to `hds-notification--alert`

#### Fixed

- [Checkbox] Fixed a bug where the label wasn't aligned correctly. in ([#226](https://github.com/City-of-Helsinki/helsinki-design-system/pull/226))
- [RadioButton] Fixed a bug where the label wasn't aligned correctly. in ([#226](https://github.com/City-of-Helsinki/helsinki-design-system/pull/226))

### Design kit

#### Added

- Navigation symbols
  - Separate symbols for light and dark background colors
  - Separate symbols for each breakpoint
  - Free form navigation symbol for service which do not follow HDS breakpoint tokens
- Modals and Notifications library back to the design kit
  - Inline notifications that are used within content. They can be configured to be closable.
  - Toast notifications that are animated into view from upper right or bottom. They can be configured to disappear automatically.
- New Tooltip design (implementation not yet released)

#### Changed

- [Notifications] Removed "WIP" text from "HDS Modals and Notifications" file name
- [Notifications] Separated notifications into two symbol groups; inline and toast
- [Notifications] Updated color of alert notification line (is now accessible on the background)
- [Notifications] Notification sizes are now named Large, Default and Small
- [Notifications] Small notifications (both Inline and Toast) now scale horizontally rather than vertically
- [Notifications] Title row now uses Smart layout. This which allows hiding icons if needed.

#### Fixed

- [Notifications] Multiple symbol scaling issues

### Design tokens

#### Changed

- Added fallback fonts to the default font token
- Updated the breakpoint and container width token values

| breakpoint token | old  | new  |
| ---------------- | ---- | ---- |
| xl               | 1224 | 1248 |

| container width token | old  | new  |
| --------------------- | ---- | ---- |
| xs                    | 304  | 288  |
| s                     | 560  | 544  |
| m                     | 752  | 720  |
| l                     | 968  | 944  |
| xl                    | 1200 | 1200 |

### Documentation

#### Added

- Documentation for all new (implemented) components; Navigation and Notifications
- New section: Data formats
- Currently includes initial guidelines for formatting date and time data

#### Changed

- Updated Breakpoints documentation with new breakpoint and container width values
- Updated Breakpoints documentation with new demonstration image

### React

#### Breaking Changes

- [Notification] component was rewritten. in ([#212](https://github.com/City-of-Helsinki/helsinki-design-system/pull/212))
  - DismissibleNotification was removed. Use the `dismissible` property instead.
  - The `labelText` prop was renamed to `label`
  - The supported types are now `info`, `error`, `alert` and `success`
  - Full list of supported props can be found [here](https://hds.hel.fi/storybook/react/?path=/docs/components-notification--default)

#### Added

- Navigation component. ([#197](https://github.com/City-of-Helsinki/helsinki-design-system/pull/197))
- Logo component. ([#197](https://github.com/City-of-Helsinki/helsinki-design-system/pull/197))

#### Changed

- Components are now bundled separately, making it possible to import only specific components instead of importing the whole package. in ([#229](https://github.com/City-of-Helsinki/helsinki-design-system/pull/229))
  - E.g. importing the `Button` component can now be done like this `import { Button } from 'hds-react/components/Button'`. Importing components directly could reduce the bundle size.
- Updated storybook. in ([#225](https://github.com/City-of-Helsinki/helsinki-design-system/pull/225))
  - Storybook should now load considerably faster.

#### Fixed

- [Dropdown] Reference equality comparison in multiselect mode. in ([#231](https://github.com/City-of-Helsinki/helsinki-design-system/pull/231))
  - Previously a selected option would be labeled as selected only if the selected items contained the exact same object. This could result in unexpected behavior for instance when a multiselect dropdown was used as a controlled component and its options list was not static.
- [Dropdown] Fixed focus issue when multiselect mode was enabled. in ([#222](https://github.com/City-of-Helsinki/helsinki-design-system/pull/222))
  - Fixed a bug where multi-select drop-downs retained their focus styles after pressing tab when the dropdown menu was open. Pressing tab now also correctly moves the focus to the next element in the tab order.
- [Checkbox] Fixed a bug where the label wasn't aligned correctly. in ([#226](https://github.com/City-of-Helsinki/helsinki-design-system/pull/226))
- [RadioButton] Fixed a bug where the label wasn't aligned correctly. in ([#226](https://github.com/City-of-Helsinki/helsinki-design-system/pull/226))

## [0.12.1] - August 19, 2020

### Core

#### Fixed

- [Button] Fixed wrong cursor being shown for buttons

### React

#### Fixed

- [Button] Fixed wrong cursor being shown for buttons

## [0.12.0] - August 14, 2020

### Core

#### Breaking Changes

- Removed all global styles that were applied by the base.css file. in ([#199](https://github.com/City-of-Helsinki/helsinki-design-system/pull/199))
  - There were some global styles applied by the `base.css` file to heading and button elements that were removed

#### Added

- Status label component. in ([#204](https://github.com/City-of-Helsinki/helsinki-design-system/pull/204))
- The core .css files are now available as minified and non-minified versions. in ([#201](https://github.com/City-of-Helsinki/helsinki-design-system/pull/201))
- Required field indicator styles to the Core text-input and textarea components. in ([#198](https://github.com/City-of-Helsinki/helsinki-design-system/pull/198))

### Design kit

#### Added

- Status label component
- [Typography] New heading scale guidelines artboard
- [Typography] Text style variants listing tables for Body and Headings
- [Koros] Example of using Koros with images

#### Changed

- [Typography] Heading font sizes from H1–H6 to heading level agnostic T-shirt sizes (XXS–XL), to allow adapting heading level scale to layout
- [Typography] Body sizes naming from Small, Default, Medium, Large to S,M,L,XL for consistency with overall HDS token naming convention and to help prevent possible confusion between the conflicting size-medium and weight-medium
- [Typography] Style naming and numbering model to help navigate the library
  - **Body/Heading** element level numbering removed as irrelevant
  - **Size** numbering changed from 01 etc. to the pixel size of the style (at default 16px rem value)
  - **Weight** numbering changed from 01 etc. to the equivalent CSS weight value:
    - 400 Regular
    - 500 Medium
    - 700 Bold
  - **Alignment** variant numbering changed to marking that differentiates the Alignment selection from Colour variant selection and visualises the effect this selection has on the text right in the name:
    - Left
    - Center
    - (••• Right if needed in the future)
  - **Colour and style** variant numbering changed to predefined structure:
    - 01 Black
    - 02 White
    - 03 Disabled
    - 04 Placeholder
    - 05 Link
    - 06 Error
    - 07 Success
    - Brand colour variants are listed without numbers
  - [Grids and Breakpoints] Small tweaks were done to breakpoint and container width tokens to allow wider outside margins in edge cases between breakpoints. Other than breakpoint-xl, breakpoints are untouched while container widths between xs and l were made slightly smaller. To see exact values changed, please refer to the design tokens package notes
  - [Colours] Changed UI helper colours to improve accessibility. Following tokens have been changed:
    - `alert-dark` from #986700 to #d18200
    - `info` from #007293 to #006b9
    - `info-light` from #dcf1f5 to #e5eff8
    - `info-dark` from #005b76 to #004f94
- [Form Components] Increased Dropdown options from 3 to 5. Excess options can be easily hidden via using Sketch's Smart Layout features
- [Form Components] Moved Dropdown component focus border behind dropdown rectangle background to reflect implementation
- [Form Components] Symbolized Dropdown options. This means changing Dropdown option state (from resting to selected for example) is now done via overriding the symbol
- [Koros] Improved Koros/M/ symbols colour override. Colour can now be changed with just one selection instead of two separate selections
- Library updates for all libraries dependent on HDS Koros

#### Fixed

- [Typography] Unified text style line heights

#### Removed

- [Notifications] Temporarily removed Modals and Notifications library. New notifications will be added in the next update, and they will replace the old implementation

#### Known issues

- Some elements (e.g. buttons) do not resize correctly if the label is changed. This is due to a bug in Sketch related to Smart Layout. We are working with Sketch to try to resolve this issue

### Design tokens

#### Breaking changes

- Removed all component specific tokens. in ([#203](https://github.com/City-of-Helsinki/helsinki-design-system/pull/203))
- Re-named the font-size design tokens to comply with the latest typography guidelines. in ([#189](https://github.com/City-of-Helsinki/helsinki-design-system/pull/189))
  - `fontsize-h-1` to `fontsize-heading-xl`
  - `fontsize-h-2` to `fontsize-heading-l`
  - `fontsize-h-3` to `fontsize-heading-m`
  - `fontsize-h-4` to `fontsize-heading-s`
  - `fontsize-h-5` to `fontsize-heading-xs`
  - `fontsize-subtitle` to `fontsize-heading-xxs`
  - `fontsize-body-small` to `fontsize-body-s`
  - `fontsize-body-default` to `fontsize-body-m`
  - `fontsize-body-medium` to `fontsize-body-l`
  - `fontsize-body-large` to `fontsize-body-xl`

### Changed

- UI helper colours to improve accessibility. in ([#192](https://github.com/City-of-Helsinki/helsinki-design-system/pull/192))

### Documentation Site

#### Added

- New issue templates and updated old ones to match HDS needs. in ([#188](https://github.com/City-of-Helsinki/helsinki-design-system/pull/188))

### Changed

- Documentation site layout improvements. in ([#191](https://github.com/City-of-Helsinki/helsinki-design-system/pull/191))
- Roadmap page updated to match the current plan. Content also now matches the GitHub repo [Project board](https://github.com/City-of-Helsinki/helsinki-design-system/projects/1). in ([#187](https://github.com/City-of-Helsinki/helsinki-design-system/pull/187))

### Fixed

- Removed unnecessary dot from HDS mail address. in ([#208](https://github.com/City-of-Helsinki/helsinki-design-system/pull/208))
- Incorrect px value of spacing-xs token in documentation page. in ([#193](https://github.com/City-of-Helsinki/helsinki-design-system/pull/193))
- Small correction to breakpoint token documentation. in ([#190](https://github.com/City-of-Helsinki/helsinki-design-system/pull/190))

### React

#### Breaking Changes

- Global styles were removed from hds-core. in ([#199](https://github.com/City-of-Helsinki/helsinki-design-system/pull/199))
  - hds-core is used as a dependency, so the change also affects the hds-react package

#### Added

- StatusLabel component. in ([#204](https://github.com/City-of-Helsinki/helsinki-design-system/pull/204))

### Changed

- Removed outdated example view from storybook. in ([#200](https://github.com/City-of-Helsinki/helsinki-design-system/pull/200))

## [0.11.3] - June 5, 2020

### React

#### Added

- [Notification][dismissablenotification] `className` prop for applying additional class names to the notification

## [0.11.2] - June 5, 2020

### Documentation site

#### Added

- Link to logo kit download to Visual elements/Logo page
- Statement to Accessibility page about which WCAG guideline version HDS follows

#### Changed

- Moved Resources page to upper navigation level for better visibility
- External links now include icon
- External links now open to a new tab
- "Work in progress" text now uses current implementation of Notification component
- "Coming soon" text no longer uses block quote (text contrast was not accessible)
- Names of links to Visual Identity Guidelines now clearly state the page title

#### Fixed

- Multiple typos
- Multiple links that pointed to old WCAG 2.0 now point to WCAG 2.1 version
- Blurry image on the Visual assets/Icons page

### React

#### Added

- [Dropdown] `selectedOption` prop for controlling the selected option(s) of a dropdown

#### Fixed

- Removed redundant style imports causing browser console warnings

## [0.11.1] - June 2, 2020

### Core

#### Fixed

- [Icons] Sizing bug

### React

#### Fixed

- [Icons] Sizing bug

## [0.11.0] - June 2, 2020

### Core

#### Breaking changes

- [Icons] The following icons were removed: `boots`, `doublelike`, `food`, `lips`, `read`, `tree`, `wine`. in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))
- [Icons] The following icons were renamed:

| Old name     | New name        |
| ------------ | --------------- |
| attention    | alert-circle    |
| calendar-add | calendar-plus   |
| close        | cross           |
| female       | person-female   |
| fill         | pen-line        |
| house        | house-smoke     |
| info         | info-circle     |
| language     | globe           |
| menu         | menu-hamburger  |
| person       | user            |
| smile        | face-smile      |
| tooltip      | question-circle |
| warning      | error           |

in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))

#### Added

- New icons. in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))
- [Icons] New classes for setting icon sizes. Available classes are `.hds-icon--size-xs`, `-s`, `-m`, `-l`, `-xl`. in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))

### Design tokens

#### Added

- Breakpoint tokens. in ([#153](https://github.com/City-of-Helsinki/helsinki-design-system/pull/153))
- Maximum content width tokens. in ([#153](https://github.com/City-of-Helsinki/helsinki-design-system/pull/153))

### Design kit

#### Changed

- Icons: All artboards to exportable
- Icons: Changed name of error-circle to error
- Icons: Removed unnecessary layer masks
- Grids and Breakpoints: Changed breakpoint guidelines to match token implementation

#### Fixed

- Icons: Fixed volume-mute cross shape
- Icons: Small optical corrections to angle icons
- Icons: Fixed small errors in documentation artboards

### Documentation site

#### Added

- Dropdown documentation page content
- Grid guidelines documentation
- Breakpoint design tokens documentation
- Icon usage documentation
- Icon component documentation
- Instructions for setting up HDS libraries to "Getting started" section
- Image of linking HDS libraries in Abstract
- Link to full release notes to "What is new" section
- Release badge to navigation sidebar
- Analytics

#### Changed

- Clarified radio button vs dropdown choice to radio button page
- Clarified instructions for setting up HDS libraries both for design kit and Abstract users
- Clarified link label naming so it is more obvious where the link leads

#### Fixed

- Multiple typos
- Minor punctuation errors and sentence structures
- Broken links
- Wrong version number in "What is new" section
- Stretching issues of multiple images

### React

#### Breaking changes

- [Icons] The following icons were removed: `IconBoots`, `IconDoubleLike`, `IconFood`, `IconLips`, `IconRead`, `IconTree`, `IconWine`
- [Icons] The following icons were renamed:

| Old name        | New name           |
| --------------- | ------------------ |
| IconAttention   | IconAlertCircle    |
| IconCalendarAdd | IconCalendarPlus   |
| IconClose       | IconCross          |
| IconFemale      | IconPersonFemale   |
| IconFill        | IconPenLine        |
| IconHouse       | IconHouseSmoke     |
| IconInfo        | IconInfoCircle     |
| IconLanguage    | IconGlobe          |
| IconMenu        | IconMenuHamburger  |
| IconPerson      | IconUser           |
| IconSmile       | IconFaceSmile      |
| IconTooltip     | IconQuestionCircle |
| IconWarning     | IconError          |

in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))

#### Added

- [Icons] `size` prop for defining the size of the icon. Available options are `xs`, `s`, `m`, `l` and `xl`. Size `s` is used by default. in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))
- [Icons] You can now pass any attributes supported by native SVG elements to the icon. Useful for defining `aria-` and `role` attributes. in ([#155](https://github.com/City-of-Helsinki/helsinki-design-system/pull/155))

#### Changed

- [Dropdown] Checking of whether an option is selected. in ([#159](https://github.com/City-of-Helsinki/helsinki-design-system/pull/159))

## [0.10.1] - May 26, 2020

### Documentation site

#### Fixed

- Link to GitHub

## [0.10.0] - May 26, 2020

### Documentation site

#### Added

- Added LargeParagraph -component for styling page summary paragraphs
- Added section for Visual assets (logo and icons)
- Added documentation for Icons
- Added documentation for all currently implemented components (Button, Checkbox, Koros, Radio button, Text fields and Text area)
- Added documentation for all currently implemented design tokens (Colours, Typography & Spacing)
- Added contact information to Support page
- Added new guidelines for contribution
- Initial content for product roadmap

#### Changed

- Site structure: Changed the order of sections in side navigation
- Site structure: About section now includes Resources and Support
- Site structure: Contribution is now its own section in the navigation
- Improved front page content
- Improved Introduction page content to work together with front page content
- Improved For designers page structure and content. Clarified setting up instructions.
- Improved For designers page structure
- Improved Accessibility and Using photographs guidelines structure and content
- Unified and improved Design tokens documentation (Colour, Spacing, Typography) structure and content to match together and with Component documentation.
- Moved files linked on Logo documentation page into separate static/assets folder
- Changed site logo from PNG to SVG

#### Fixed

- Multiple typos across the documentation
- Changed US english spelling to UK english across the page

#### Removed

- Multiple sections became redundant after content updates and were removed

### Design kit

#### Added

- Added first versions of components: Button, Checkbox, Koros, Radio button, Text field and Text area
- Added first versions of base libraries: Typography, Color, Spacing, Grids & Breakpoints
- Added first version of new icon library

### React

#### Added

- Dropdown component. in ([#141](https://github.com/City-of-Helsinki/helsinki-design-system/pull/141))
- [Checkbox] `label` prop which allows you to set the label as either a string or a React node. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [RadioButton] `label` prop which allows you to set the field label as either a string or a React node. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [TextArea] `label` prop which allows you to set the field label as either a string or a React node. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [TextArea] `required` prop which displays the label as required and sets the textarea element as required. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [TextInput] `label` prop which allows you to set the field label as either a string or a React node. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [TextInput] `required` prop which displays the label as required and sets the input element as required. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))

#### Deprecated

- [Checkbox] `labelText` prop in favour of the new `label` prop. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [RadioButton] `labelText` prop in favour of the new `label` prop. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [TextArea] `labelText` prop in favour of the new `label` prop. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
- [TextInput] `labelText` prop in favour of the new `label` prop. in ([#145](https://github.com/City-of-Helsinki/helsinki-design-system/pull/145))
