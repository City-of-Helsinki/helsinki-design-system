/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Container } from 'hds-react';

import Header from './header';
import Footer from './footer';
import './layout.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          footerTitle
          footerAriaLabel
          footerCopyrightLinks {
            label
            href
          }
        }
      }
    }
  `);

  const siteDate = data.site.siteMetadata;
  const title = siteDate?.title || 'Title';

  return (
    <>
      <Header siteTitle={title} />
      <Container id="content" style={{ margin: '0 auto' }}>
        <main>{children}</main>
      </Container>
      <Footer
        title={title}
        footerTitle={siteDate?.footerTitle}
        footerAriaLabel={siteDate?.footerAriaLabel}
        footerCopyrightLinks={siteDate?.footerCopyrightLinks}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
