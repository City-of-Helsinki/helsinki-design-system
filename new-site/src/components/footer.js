import * as React from 'react';
import PropTypes from 'prop-types';
import { Footer } from 'hds-react';

const PageFooter = ({ className, title, footerTitle, footerAriaLabel, footerCopyrightLinks }) => (
  <Footer className={className} title={footerTitle || title} footerAriaLabel={footerAriaLabel}>
    <Footer.Base copyrightHolder="Copyright">
      {footerCopyrightLinks && footerCopyrightLinks.map(({ label, href }) => <Footer.Item label={label} href={href} />)}
    </Footer.Base>
  </Footer>
);

PageFooter.propTypes = {
  className: PropTypes.string,
  footerTitle: PropTypes.string,
  footerAriaLabel: PropTypes.string,
  footerCopyrightLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

PageFooter.defaultProps = {
  title: `Helsinki Design System`,
};

export default PageFooter;
