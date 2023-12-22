export function stripParagraphAsFirstChild(children) {
  if (children && children.type === 'p' && children.props && children.props.children) {
    return children.props.children;
  }
  return children;
}
