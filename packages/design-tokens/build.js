const dictionary = require('style-dictionary');
const PLATFORMS = ['css', 'scss'];

/**
 * Helper function that prepends the given path with the destination directory and ensures that the path has a trailing slash
 * @param path  Base path to build the files
 * @returns {string}
 */
const getPath = (path = '') => {
  const fullPath = `lib/${path}`;
  const hasTrailingSlash = [...fullPath].pop() === '/';
  return hasTrailingSlash ? fullPath : `${fullPath}/`;
};

/**
 * Helper function for building the platform configuration
 * @param output      Location (without extension) to build the file, will be appended to the buildPath
 * @param buildPath   Base path to build the files
 * @param filter      A function, string or object used to filter the properties that will be included in the file. (https://amzn.github.io/style-dictionary/#/config?id=configjson)
 */
const getPlatformConfig = (output, buildPath, filter) =>
  PLATFORMS.reduce(
    (acc, platform) => ({
      ...acc,
      [platform]: {
        transformGroup: `${platform}`,
        buildPath: getPath(buildPath),
        files: [
          {
            destination: `${output}.${platform}`,
            format: `${platform}/variables`,
            options: {
              showFileHeader: false,
            },
            filter,
          },
        ],
      },
    }),
    {},
  );

// register component token filter
dictionary.registerFilter({
  name: 'isComponentToken',
  matcher(prop) {
    return !prop.primary;
  },
});

// build the token files
Object.values({
  // all tokens
  all: dictionary.extend({
    source: ['tokens/**/*.json'],
    platforms: getPlatformConfig('all'),
  }),

  /* COLORS */

  // all colors (excluding component specific colors)
  allColors: dictionary.extend({
    source: ['tokens/color/brand/*.json', 'tokens/color/ui/*.json'],
    platforms: getPlatformConfig('all', 'color'),
  }),
  // brand colors
  brandColors: dictionary.extend({
    source: ['tokens/color/brand/*.json'],
    platforms: getPlatformConfig('brand', 'color'),
  }),
  // UI colors
  uiColors: dictionary.extend({
    source: ['tokens/color/ui/*.json'],
    platforms: getPlatformConfig('ui', 'color'),
  }),

  /* SPACING */

  // all spacing tokens
  allSpacings: dictionary.extend({
    source: ['tokens/spacing/*.json'],
    platforms: getPlatformConfig('all', 'spacing'),
  }),
  // component spacing
  spacing: dictionary.extend({
    source: ['tokens/spacing/spacing.json'],
    platforms: getPlatformConfig('spacing', 'spacing'),
  }),
  // layout spacing
  layout: dictionary.extend({
    source: ['tokens/spacing/layout.json'],
    platforms: getPlatformConfig('layout', 'spacing'),
  }),

  /* TYPOGRAPHY */

  // all typography tokens
  allTypography: dictionary.extend({
    source: ['tokens/typography/*.json'],
    platforms: getPlatformConfig('all', 'typography'),
  }),
  font: dictionary.extend({
    source: ['tokens/typography/font.json'],
    platforms: getPlatformConfig('font', 'typography'),
  }),
  fontSize: dictionary.extend({
    source: ['tokens/typography/font-size.json'],
    platforms: getPlatformConfig('font-size', 'typography'),
  }),
  lineHeight: dictionary.extend({
    source: ['tokens/typography/line-height.json'],
    platforms: getPlatformConfig('line-height', 'typography'),
  }),

  /* COMPONENT */

  // all component tokens
  allComponents: dictionary.extend({
    source: ['tokens/color/brand/*.json', 'tokens/color/ui/*.json', 'tokens/color/component/**/*.json'],
    platforms: getPlatformConfig('all', 'color/component', 'isComponentToken'),
  }),
  // button
  button: dictionary.extend({
    source: ['tokens/color/brand/*.json', 'tokens/color/ui/*.json', 'tokens/color/component/button/*.json'],
    platforms: getPlatformConfig('button', 'color/component', 'isComponentToken'),
  }),
  // text-input
  textInput: dictionary.extend({
    source: ['tokens/color/brand/*.json', 'tokens/color/ui/*.json', 'tokens/color/component/text-input/*.json'],
    platforms: getPlatformConfig('text-input', 'color/component', 'isComponentToken'),
  }),
  // radio-button
  radioButton: dictionary.extend({
    source: ['tokens/color/brand/*.json', 'tokens/color/ui/*.json', 'tokens/color/component/radio-button/*.json'],
    platforms: getPlatformConfig('radio-button', 'color/component', 'isComponentToken'),
  }),
  // checkbox
  checkbox: dictionary.extend({
    source: ['tokens/color/brand/*.json', 'tokens/color/ui/*.json', 'tokens/color/component/checkbox/*.json'],
    platforms: getPlatformConfig('checkbox', 'color/component', 'isComponentToken'),
  }),
}).forEach((item) => item.buildAllPlatforms());
