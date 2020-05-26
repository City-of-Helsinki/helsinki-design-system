# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
