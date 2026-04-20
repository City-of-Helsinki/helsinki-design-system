// Compatibility shim for .previous-versions/ archives that use the prism-react-renderer v1 API.
// v1: Highlight was the default export, and defaultProps was a named export.
// v2: Highlight is only a named export, defaultProps was removed.
// This shim is injected via webpack NormalModuleReplacementPlugin only for .previous-versions/ imports.
export { Highlight as default, Highlight, Prism, normalizeTokens, themes, useTokenize } from 'prism-react-renderer';

// defaultProps was removed in v2. Spreading {} is a safe no-op — the theme is passed explicitly anyway.
export const defaultProps = {};
