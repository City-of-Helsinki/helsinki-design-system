const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const postcssInlineSVG = require("postcss-inline-svg");
const postcssNesting = require("postcss-nesting");
const postcssMixins = require("postcss-mixins");

module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({ browsers: "ie > 8" }),
    postcssInlineSVG(),
    postcssMixins(),
    postcssNesting()
  ]
};
