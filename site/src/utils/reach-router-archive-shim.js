// Replacement for '@reach/router' in .previous-versions/ archives.
// Archived AnchorLink.js calls useLocation() from '@reach/router'. Webpack bundles a separate copy of
// the router module into each archived page chunk, so that copy's LocationContext is never provided by
// Gatsby's Router and useLocation() throws "LocationContext.Provider was not found", leaving a blank page.
// Redirecting to '@gatsbyjs/reach-router' does not help: it still resolves to a different module instance.
// AnchorLink is the only archived consumer and only reads the location, so it does not need the router context.
// This shim is injected via webpack NormalModuleReplacementPlugin only for .previous-versions/ imports.
const serverLocation = { pathname: '', search: '', hash: '', href: '' };

export const useLocation = () => (typeof window === 'undefined' ? serverLocation : window.location);
