/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Container, Footer, Navigation } from 'hds-react';

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
      <Navigation
        className="pageHeader"
        title={title}
        menuToggleAriaLabel="menu"
        skipTo={`#${contentId}`}
        skipToContentLabel="Skip to content"
      />
      <Container id={contentId} className="pageContent" style={{ margin: '0 auto' }}>
        <MDXProvider>{children}</MDXProvider>
      </Container>
      <Footer className="pageFooter" title={siteDate?.footerTitle || title} footerAriaLabel={siteDate?.footerAriaLabel}>
        <Footer.Base copyrightHolder="Copyright">
          {siteDate?.footerCopyrightLinks &&
            siteDate?.footerCopyrightLinks.map(({ label, href }) => (
              <Footer.Item key={href} label={label} href={href} />
            ))}
        </Footer.Base>
      </Footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
