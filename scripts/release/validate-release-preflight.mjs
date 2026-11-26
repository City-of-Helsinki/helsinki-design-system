/**
 * Fails before npm publish when a new version would ship but release metadata is missing.
 * Exits 0 when all workspace packages are already on npm (nothing to publish).
 *
 * Usage:
 *   node scripts/release/validate-release-preflight.mjs
 *   node scripts/release/validate-release-preflight.mjs --patch
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const isPatch = process.argv.includes('--patch');
const VERSION = JSON.parse(
  fs.readFileSync('packages/react/package.json', 'utf8'),
).version;
const PACKAGES = ['hds-core', 'hds-design-tokens', 'hds-js', 'hds-react'];

function npmPackageStatus(name) {
  const result = spawnSync(
    'npm',
    ['view', `${name}@${VERSION}`, 'version'],
    { encoding: 'utf8' },
  );
  if (result.status === 0) {
    return 'found';
  }
  const err = `${result.stderr ?? ''}${result.stdout ?? ''}`;
  if (/E404|404\s+Not Found|404 not found/i.test(err)) {
    return 'missing';
  }
  console.error(`npm registry lookup failed for ${name}@${VERSION}`);
  console.error(err.trim());
  process.exit(1);
}

let publishNeeded = false;
for (const name of PACKAGES) {
  if (npmPackageStatus(name) === 'missing') {
    publishNeeded = true;
    break;
  }
}

if (!publishNeeded) {
  console.log(
    'All packages already on npm at this version; skipping release preflight.',
  );
  process.exit(0);
}

const changelogCheck = spawnSync(
  process.execPath,
  ['scripts/release/extract-changelog-section.mjs', VERSION],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
);
if (changelogCheck.status !== 0) {
  console.error(changelogCheck.stderr.trim() || changelogCheck.stdout.trim());
  process.exit(1);
}

if (isPatch) {
  const branch = `release-${VERSION}`;
  const remote = spawnSync(
    'git',
    ['ls-remote', '--exit-code', '--heads', 'origin', branch],
    { encoding: 'utf8' },
  );
  if (remote.status !== 0) {
    console.error(
      `Maintenance branch origin/${branch} not found. Create it before patch release.`,
    );
    process.exit(1);
  }
}

console.log(`Release preflight passed for v${VERSION}.`);