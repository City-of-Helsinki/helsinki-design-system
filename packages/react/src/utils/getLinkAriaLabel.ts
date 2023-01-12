import React from 'react';

export default (
  ariaLabel: string,
  label: React.ReactNode,
  openInNewTabAriaLabel?: string,
  openInExternalDomainAriaLabel?: string,
  external?: boolean,
  openInNewTab?: boolean,
) => {
  let childrenText = ariaLabel || label;
  const newTabText = openInNewTab ? openInNewTabAriaLabel || 'Avautuu uudessa välilehdessä.' : '';
  const externalText = external ? openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon.' : '';

  if (childrenText && childrenText.slice(-1) !== '.') {
    childrenText = `${childrenText}.`;
  }

  return [childrenText, newTabText, externalText].filter((text) => text).join(' ');
};
