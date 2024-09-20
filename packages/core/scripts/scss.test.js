/**
 * @jest-environment node
 */
const path = require('path');
const sassTrue = require('sass-true');
const sass = require('sass');
const glob = require('glob');
global.snapshot = (contents) => {
  console.log('SNAP!', contents);
};
describe('SCSS Testing', () => {
  const sassTestFiles = glob.sync(path.resolve(process.cwd(), 'src/**/*.test.scss'));

  sassTestFiles.forEach((file) => {
    sassTrue.runSass(
      // True options [required]
      { describe, it },
      // Sass source (path) [required]
      file,
      // Sass options [optional]
      { style: 'expanded', loadPaths: ['node_modules', '../../node_modules'] },
    );
    expect(sassTestFiles.length > 0).toBeTruthy();
  });
});
