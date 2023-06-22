import React, { LinkHTMLAttributes } from 'react';

export type LinkProps = LinkHTMLAttributes<unknown>;

export const LinkItem = (props: LinkProps) => {
  const { children, href, ...attributes } = props;

  if (href) {
    return (
      <a href={href} {...attributes}>
        {children}
      </a>
    );
  }
  return <span {...attributes}>{children}</span>;
};
