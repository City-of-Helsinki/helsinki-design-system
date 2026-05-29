const path = require('node:path');
const fs = require('node:fs');

const VERSIONED_DOCS_VERSION_RE =
  /(?:docs-release-|helsinki-design-system-|\.previous-versions\/helsinki-design-system-)(\d+\.\d+\.\d+)(?:\/|$)/;

function extractVersionFromContext(contextPath) {
  const normalized = contextPath.split(path.sep).join('/');
  const match = normalized.match(VERSIONED_DOCS_VERSION_RE);
  return match ? match[1] : null;
}

function isVersionedArchiveContext(contextPath) {
  const normalized = contextPath.split(path.sep).join('/');
  return normalized.includes('.previous-versions/') || normalized.includes('docs-release-');
}

function resolveVersionedHdsImportToAbsolute(request, version, siteDir) {
  if (!request || path.isAbsolute(request)) {
    return null;
  }
  const match = request.match(/^~?(hds-(?:core|react|design-tokens))(?:-(\d+\.\d+\.\d+))?(\/.+)$/);
  if (!match) {
    return null;
  }
  const [, pkg, embeddedVersion, subpath] = match;
  const packageName = embeddedVersion ? `${pkg}-${embeddedVersion}` : `${pkg}-${version}`;
  const absolutePath = path.resolve(siteDir, 'node_modules', packageName, subpath.slice(1));
  if (fs.existsSync(absolutePath)) {
    return absolutePath;
  }
  if (pkg === 'hds-design-tokens') {
    const fallback = path.resolve(siteDir, 'node_modules', 'hds-design-tokens', subpath.slice(1));
    return fs.existsSync(fallback) ? fallback : null;
  }
  return null;
}

function createVersionedHdsSassImporter(siteDir) {
  return function versionedHdsSassImporter(url, prev, done) {
    const prevNormalized = prev.split(path.sep).join('/');
    if (!isVersionedArchiveContext(prevNormalized)) {
      return done(null);
    }
    const version = extractVersionFromContext(prevNormalized);
    if (!version) {
      return done(null);
    }
    const absolutePath = resolveVersionedHdsImportToAbsolute(url, version, siteDir);
    if (absolutePath) {
      return done({ file: absolutePath });
    }
    return done(null);
  };
}

module.exports = {
  VERSIONED_DOCS_VERSION_RE,
  extractVersionFromContext,
  isVersionedArchiveContext,
  resolveVersionedHdsImportToAbsolute,
  createVersionedHdsSassImporter,
};
