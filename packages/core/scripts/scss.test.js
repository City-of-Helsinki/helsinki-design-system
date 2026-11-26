/**
 * @jest-environment node
 */
const path = require('node:path');
const { globSync } = require('node:fs');
const sassTrue = require('sass-true');
const sassEmbedded = require('sass-embedded');
global.snapshot = (contents) => {
  console.log('SNAP!', contents);
};
describe('SCSS Testing', () => {
  const sassTestFiles = globSync(path.resolve(process.cwd(), 'src/**/*.test.scss'));

  sassTestFiles.forEach((file) => {
    sassTrue.runSass(
      // True options [required]
      { describe, it, sass: sassEmbedded },
      // Sass source (path) [required]
      file,
      // Sass options [optional]
      { style: 'expanded', loadPaths: ['node_modules', '../../node_modules'] },
    );
    expect(sassTestFiles.length > 0).toBeTruthy();
  });
});
