const styles = {
  Container: {
    p: 4,
    maxWidth: 1200,
  },
  root: {
    fontSize: null,
    color: 'text',
    bg: 'background',
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    '&:hover': {
      color: 'secondary',
      textDecoration: 'underline',
    },
  },
  h1: {
    fontSize: null,
  },
  h2: {
    fontSize: '5 rem',
  },
  h3: {
    fontSize: null,
  },
  h4: {
    fontSize: null,
  },
  h5: {
    fontSize: null,
  },
  h6: {
    fontSize: null,
  },
  p: {
    maxWidth: 600,
    marginBottom: 'var(--spacing-layout-xs)',
  },
  li: {
    marginBottom: 0,
    maxWidth: 600,
  },
  ul: {
    marginBottom: 'var(--spacing-layout-xs)',
    maxWidth: 600,
  },
  ol: {
    marginBottom: 'var(--spacing-layout-xs)',
    maxWidth: 600,
  },
  img: {
    overflow: 'visible',
    marginBottom: 'var(--spacing-layout-xs)',
  },
  blockquote: {
    my: 'var(--spacing-layout-xs)',
    mx: 0,
    py: 'var(--spacing-s)',
    px: 'var(--spacing-s)',
    bg: 'var(--color-coat-of-arms-blue-light-5)',
    borderLeft: (t) => `5px solid ${t.colors.blockquote.boder}`,
    color: 'var(--color-black-70)',
    maxWidth: 600,
  },
  code: {
    fontFamily: 'monospace',
  },
  inlineCode: {
    fontFamily: 'Inconsolata',
    py: 0,
    px: 'var(--spacing-4-xs)',
    bg: 'var(--color-black-5)',
    border: `1px solid var(--color-black-20)`,
    color: 'var(--color-black-70)',
    borderRadius: 3,
  },
  pre: {
    my: 4,
    p: 3,
    variant: 'prism',
    textAlign: 'left',
    fontFamily: 'monospace',
    borderRadius: 'radius',
  },
  table: {
    width: '100%',
    my: 4,
    borderCollapse: 'separate',
    borderSpacing: 0,
    [['th', 'td']]: {
      textAlign: 'left',
      py: 'var(--spacing-3-xs)',
      pr: 'var(--spacing-m)',
      pl: 0,
      borderColor: 'muted',
      borderBottomStyle: 'solid',
    },
  },
  th: {
    verticalAlign: 'bottom',
    borderBottomWidth: '2px',
  },
  td: {
    verticalAlign: 'middle',
    borderBottomWidth: '1px',
  },
  hr: {
    border: 0,
    borderBottom: (t) => `1px solid ${t.colors.border}`,
    my: 'var(--spacing-layout-s)',
  },
};

export default styles;
