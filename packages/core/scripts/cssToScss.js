#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-await-in-loop */

/**
 * Core has no scss, so importing parts of an css file to React cannot be done.
 * This converts .className to @mixin className
 */

const fs = require('fs');
const path = require('path');

const postcss = require('postcss');
const classesToMixins = require('postcss-classes-to-mixins');

// Paths point to the folder the file is run from!
// Which is usually packages/core if run via package.json
const inputPath = '../core/src/';
const outputPath = 'lib/scss/';
const files = ['utils/helpers.css'];

/**
 * Changes path/to/file.ext to file.ext
 */
function removePaths(file) {
  return file.split('/').pop();
}
/**
 * Changes path/to/file/with.any.ext to path/to/file/with.newExt
 */
function createNewFileExt(file, ext) {
  const basename = path.basename(file, path.extname(file));
  return path.join(path.dirname(file), basename + ext);
}

/**
 * Creates a dir if does not exist
 */
function createDirIfDoesNotExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

async function cssToScss() {
  createDirIfDoesNotExist(outputPath);
  const fileLog = ['Converting css to scss...'];
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async () => {
    for (const file of files) {
      const inputFilename = `${inputPath}${file}`;
      const outputFilename = createNewFileExt(`${outputPath}${removePaths(file)}`, '.scss');
      const css = fs.readFileSync(inputFilename);

      await postcss([
        classesToMixins({
          scss: outputFilename, // String: sass output
          mixinsOnly: true, // Defaults to false. true strips all non-classname selectors (like `body` etc.)
        }),
      ])
        .process(css, { from: 'undefined' })
        .then(() => {
          fileLog.push(`Processed file ${inputFilename} to ${outputFilename} successfully`);
        });
    }
    // eslint-disable-next-line no-console
    console.log(fileLog.join('\n\r'));
  });
}

cssToScss();
