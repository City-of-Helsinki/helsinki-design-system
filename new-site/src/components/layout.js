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
import '../styles/font.css'
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
  const contentId = 'content';

  return (
    <div className="page">
      <Header contentId={contentId} className="pageHeader" siteTitle={title} />
      <Container id={contentId} className="pageContent" style={{ margin: '0 auto' }}>
        <main>{children}</main>
      </Container>
      <Footer
        className="pageFooter"
        title={title}
        footerTitle={siteDate?.footerTitle}
        footerAriaLabel={siteDate?.footerAriaLabel}
        footerCopyrightLinks={siteDate?.footerCopyrightLinks}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
