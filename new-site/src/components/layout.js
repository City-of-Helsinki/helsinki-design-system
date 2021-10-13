/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, withPrefix, Link as GatsbyLink } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Container, Footer, Navigation } from 'hds-react';

import './layout.css';

const layoutData = {
  menuLinks: [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Guidelines',
      link: '/guidelines/',
    },
    {
      name: 'Elements',
      link: '/elements/',
    },
    {
      name: 'About',
      link: '/about/',
    },
  ],
  footerTitle: 'Design system',
  footerAriaLabel: 'HDS footer',
  footerCopyrightLinks: [
    {
      name: 'Github',
      link: 'https://github.com/City-of-Helsinki/helsinki-design-system',
    },
  ],
};

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const siteData = data.site.siteMetadata;
  const title = siteData?.title || 'Title';
  const contentId = 'content';
  const pathname = location?.pathname;

  return (
    <div className="page">
      <Navigation
        id="page-header"
        className="pageHeader"
        title={title}
        menuToggleAriaLabel="menu"
        skipTo={`#${contentId}`}
        skipToContentLabel="Skip to content"
      >
        <Navigation.Row>
          {layoutData.menuLinks.map(({ name, link }) => {
            const isHomeLink = link === '/';
            const isHomepage = !pathname && isHomeLink;
            const isActivePage = !isHomeLink && pathname && pathname.startsWith(withPrefix(link));
            return (
              <Navigation.Item active={isHomepage || isActivePage} key={name} label={name} to={link} as={GatsbyLink} />
            );
          })}
        </Navigation.Row>
      </Navigation>
      <Container id={contentId} className="pageContent" style={{ margin: '0 auto' }}>
        <MDXProvider>{children}</MDXProvider>
      </Container>
      <Footer
        id="page-footer"
        className="pageFooter"
        title={layoutData.footerTitle}
        footerAriaLabel={layoutData.footerAriaLabel}
      >
        <Footer.Base copyrightHolder="Copyright">
          {layoutData.footerCopyrightLinks.map(({ name, link }) => (
            <Footer.Item key={name} label={name} href={link} />
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
