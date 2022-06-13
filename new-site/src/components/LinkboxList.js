import * as React from 'react';
import { navigate } from 'gatsby';
import { Linkbox } from 'hds-react';
import PropTypes from 'prop-types'

import './LinkboxList.scss';

const LinkboxList = ({ data}) => {
  return (
    <div className="linkbox-list">
      {data.map(( item ) => {
        return (
          <div key={item.name} className="linkbox-list-item">
            <Linkbox
              withBorder
              className="linkbox-list-link"
              size="small"
              linkboxAriaLabel={item.linkboxAriaLabel}
              linkAriaLabel={item.linkAriaLabel}
              href={item.href}
              heading={item.name}
              text={item.text}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.href);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

LinkboxList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    linkboxAriaLabel: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }))
};

export default LinkboxList;
