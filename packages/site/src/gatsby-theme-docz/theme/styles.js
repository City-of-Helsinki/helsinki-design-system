const styles = {
  Container: {
    p: 4,
    maxWidth: 1040
  },
  root: {
    fontSize: null,
    color: "text",
    bg: "background"
  },
  a: {
    color: "primary",
    textDecoration: "none",
    "&:hover": {
      color: "secondary",
      textDecoration: "underline"
    }
  },
  h1: {
    fontSize: null
  },
  h2: {
    fontSize: null
  },
  h3: {
    fontSize: null
  },
  h4: {
    fontSize: null
  },
  h5: {
    fontSize: null
  },
  h6: {
    fontSize: null
  },
  li: {
    marginBottom: 1
  },
  blockquote: {
    my: 4,
    mx: 0,
    py: 3,
    px: 4,
    bg: "blockquote.bg",
    borderLeft: t => `5px solid ${t.colors.blockquote.boder}`,
    color: "blockquote.color",
    fontStyle: "italic",
    "> p": {
      m: 0
    }
  },
  code: {
    fontFamily: "monospace"
  },
  inlineCode: {
    fontFamily: "monospace"
  },
  pre: {
    my: 4,
    p: 3,
    variant: "prism",
    textAlign: "left",
    fontFamily: "monospace",
    borderRadius: "radius"
  },
  table: {
    width: "100%",
    my: 4,
    borderCollapse: "separate",
    borderSpacing: 0,
    [["th", "td"]]: {
      textAlign: "left",
      py: "4px",
      pr: "4px",
      pl: 0,
      borderColor: "muted",
      borderBottomStyle: "solid"
    }
  },
  th: {
    verticalAlign: "bottom",
    borderBottomWidth: "2px"
  },
  td: {
    verticalAlign: "top",
    borderBottomWidth: "1px"
  },
  hr: {
    border: 0,
    borderBottom: t => `1px solid ${t.colors.border}`
  }
};

export default styles;
