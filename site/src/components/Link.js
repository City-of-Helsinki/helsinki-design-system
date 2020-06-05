import React from 'react';
import PropTypes from 'prop-types';
import { IconLinkExternal } from 'hds-react';

const Link = ({
  color = 'var(--theme-ui-colors-primary, #0B5FFF)',
  style = {},
  external = false,
  children,
  ...rest
}) => {
  return (
    <a
      className="customLink"
      style={{
        color,
        ...style,
      }}
      {...(external && { target: '_blank' })}
      {...rest}
    >
      {children}
      {external && <IconLinkExternal style={{ marginLeft: 'var(--spacing-3-xs)' }} size="xs" />}
    </a>
  );
};

Link.propTypes = {
  color: PropTypes.string,
  external: PropTypes.bool,
  style: PropTypes.object,
};

export default Link;