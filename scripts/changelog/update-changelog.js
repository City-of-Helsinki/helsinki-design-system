/**
 * Prepends CHANGELOG.template.md to CHANGELOG.md before the latest released version.
 */

const fs = require('node:fs');

const changeLogFile = './CHANGELOG.md';
const templateFile = './scripts/changelog/CHANGELOG.template.md';

const old = fs.readFileSync(changeLogFile, 'utf8');
const firstHeadingIndex = old.indexOf('## [');

if (firstHeadingIndex === -1) {
  console.error('Could not find a version heading in CHANGELOG.md.');
  process.exit(1);
}

const firstHeadingLine = old.slice(firstHeadingIndex).split('\n')[0];
const releasedTopMatch = firstHeadingLine.match(/^## \[(\d+)\.(\d+)\.(\d+)\]/);
const unreleasedTopMatch = firstHeadingLine.match(/^## \[(\d+)\.X\.X\]/);

if (unreleasedTopMatch) {
  console.error(
    'An unreleased section (## [x.X.X]) is already at the top of CHANGELOG.md. ' +
      'Finalize that release before prepending a new template.',
  );
  process.exit(1);
}

if (!releasedTopMatch) {
  console.error(
    `The first version heading is not a released version: ${firstHeadingLine}. ` +
      'Expected ## [x.y.z] after a release.',
  );
  process.exit(1);
}

const majorVersion = releasedTopMatch[1];
const releasedChangelog = old.substring(firstHeadingIndex);

let template = fs.readFileSync(templateFile, 'utf8').trimEnd();
template = template.replace(
  /^## \[[^\]]+\](.*)$/m,
  `## [${majorVersion}.X.X]$1`,
);

const changeLogWithTemplate =
  old.substring(0, firstHeadingIndex) + `${template}\n\n${releasedChangelog}`;

fs.writeFileSync(changeLogFile, changeLogWithTemplate);