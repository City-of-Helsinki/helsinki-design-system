import * as React from 'react';
import { navigate, withPrefix } from 'gatsby';
import { Linkbox } from 'hds-react';
import PropTypes from 'prop-types';

import './LinkboxList.scss';

const LinkboxList = ({ data, className }) => (
  <div className={`linkbox-list ${className || ''}`}>
    {data.map((item) => {
      return (
        <div key={item.name} className="linkbox-list-item">
          <Linkbox
            withBorder
            className="linkbox-list-link"
            size="small"
            linkboxAriaLabel={item.linkboxAriaLabel}
            linkAriaLabel={item.linkAriaLabel}
            href={item.href}
            openInExternalDomainAriaLabel={item.openInExternalDomainAriaLabel}
            external={item.external}
            heading={item.name}
            text={item.text}
            imgProps={item.imgProps ? { ...item.imgProps, src: withPrefix(item.imgProps.src) } : undefined}
            onClick={(event) => {
              if (!item.external) {
                event.preventDefault();
                navigate(item.href);
              }
            }}
          />
        </div>
      );
    })}
  </div>
);

LinkboxList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      linkboxAriaLabel: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      openInExternalDomainAriaLabel: PropTypes.string,
      external: PropTypes.bool,
      imgProps: PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }),
    }),
  ),
  className: PropTypes.string,
};

export default LinkboxList;
