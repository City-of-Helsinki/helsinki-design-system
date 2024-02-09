/**
 * This takes the CHANGELOG.md and prepends the CHANGELOG.template.md to it.
 */

const fs = require('fs');
const changeLogFile = './CHANGELOG.md';

const old = fs.readFileSync(changeLogFile, 'utf8');
const template = fs.readFileSync('./scripts/changelog/CHANGELOG.template.md', 'utf8');
const latestVersionPosition = old.indexOf('## [');
changeLogWithTemplate = old.substring(0, latestVersionPosition) + template + old.substring(latestVersionPosition);

fs.writeFileSync(changeLogFile, changeLogWithTemplate);