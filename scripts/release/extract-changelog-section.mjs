/**
 * Prints the CHANGELOG.md section for a given release version (stdout).
 * Usage: node scripts/release/extract-changelog-section.mjs 6.0.8
 */

import fs from 'node:fs';

const version = process.argv[2];
if (!version) {
  console.error('Usage: node scripts/release/extract-changelog-section.mjs <version>');
  process.exit(1);
}

const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
const heading = `## [${version}]`;
const start = changelog.indexOf(heading);

if (start === -1) {
  console.error(`Could not find section "${heading}" in CHANGELOG.md`);
  process.exit(1);
}

const afterHeading = changelog.slice(start + heading.length);
const nextSection = afterHeading.match(/\n## \[/);
const bodyEnd = nextSection ? nextSection.index : afterHeading.length;
const section =
  heading + afterHeading.slice(0, bodyEnd).replace(/\s+$/, '');

process.stdout.write(`${section}\n`);