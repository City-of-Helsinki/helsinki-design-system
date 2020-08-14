# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
