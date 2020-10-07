# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


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

| breakpoint token | old  | new |
| ---------------- | -----| ---- |
| xl               | 1224 | 1248 |

| container width token | old | new |
| --------------------- | --- | --- |
| xs                    | 304 | 288 |
| s                     | 560 | 544 |
| m                     | 752 | 720 |
| l                     | 968 | 944 |
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
- [Notification][DismissableNotification] `className` prop for applying additional class names to the notification


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

| Old name | New name |
| --- | --- |
| attention | alert-circle |
| calendar-add | calendar-plus |
| close | cross |
| female | person-female |
| fill | pen-line |
| house | house-smoke |
| info | info-circle |
| language | globe |
| menu | menu-hamburger |
| person | user |
| smile | face-smile |
| tooltip | question-circle |
| warning | error |

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

| Old name | New name |
| --- | --- |
| IconAttention | IconAlertCircle |
| IconCalendarAdd | IconCalendarPlus |
| IconClose | IconCross |
| IconFemale | IconPersonFemale |
| IconFill | IconPenLine |
| IconHouse | IconHouseSmoke |
| IconInfo | IconInfoCircle |
| IconLanguage | IconGlobe |
| IconMenu | IconMenuHamburger |
| IconPerson | IconUser |
| IconSmile | IconFaceSmile |
| IconTooltip | IconQuestionCircle |
| IconWarning | IconError |

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
