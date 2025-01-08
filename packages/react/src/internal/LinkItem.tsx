import React, { LinkHTMLAttributes } from 'react';

/**
 * @internal
 */
export type LinkProps = LinkHTMLAttributes<unknown>;

/**
 * @internal
 */
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
