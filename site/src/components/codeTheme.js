/**
 * Accessible light syntax highlighting theme for prism-react-renderer.
 * Based on the github theme but with all colors meeting WCAG AA (4.5:1)
 * contrast ratio against the background color #f2f2f2.
 *
 * Contrast ratios verified against #f2f2f2:
 *   #393A34 — 10.3:1  (plain text, punctuation)
 *   #57606a —  5.7:1  (comments)     was #999988 at ~2.5:1
 *   #CE007A —  4.8:1  (strings)      was #e3116c at ~4.2:1
 *   #007A64 —  4.7:1  (numbers, variables, booleans) was #36acaa at ~2.4:1
 *   #006CCD —  4.7:1  (keywords)     was #00a4db at ~2.6:1
 *   #CD2900 —  4.8:1  (functions, tags) was #d73a49 at ~4.0:1
 *   #6f42c1 —  5.8:1  (function-variable) unchanged
 *   #00009f — 12.5:1  (tag, selector, keyword override) unchanged
 */
const accessibleLightTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#f2f2f2',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#57606a',
        fontStyle: 'italic',
      },
    },
    {
      // Removed opacity-based style to avoid contrast failures on blended colors.
      types: ['namespace'],
      style: {
        color: '#393A34',
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#CE007A',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#393A34',
      },
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
      style: {
        color: '#007A64',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#006CCD',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#CD2900',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#00009f',
      },
    },
  ],
};

export default accessibleLightTheme;
