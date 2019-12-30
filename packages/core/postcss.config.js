const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const postcssInlineSVG = require("postcss-inline-svg");
module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({ browsers: "ie > 8" }),
    postcssInlineSVG()
  ]
};
