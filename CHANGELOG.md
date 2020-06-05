# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
