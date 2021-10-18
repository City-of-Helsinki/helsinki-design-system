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
import { Container, Footer, Navigation, SideNavigation } from 'hds-react';

import './layout.css';

const resolveCurrentMenuItem = (menuItems, slugWithPrefix) => {
  const rootPath = withPrefix('/');

  if (slugWithPrefix === rootPath) {
    return menuItems.find(({ link }) => withPrefix(link) === rootPath);
  } else {
    return menuItems
      .filter(({ link }) => withPrefix(link) !== rootPath)
      .find((menuItem) => slugWithPrefix.startsWith(withPrefix(menuItem.link)));
  }
};

const Layout = ({ children, pageContext }) => {
  const { title: pageTitle, slug: pageSlug } = pageContext.frontmatter;
  const pageSlugWithPrefix = withPrefix(pageSlug);

  const queryData = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
            subMenuLinks {
              name
              link
              withDivider
            }
          }
          footerTitle
          footerAriaLabel
          footerCopyrightLinks {
            name
            link
          }
        }
      }
      allMdx {
        edges {
          node {
            frontmatter {
              title
              slug
            }
            fields {
              subDir
            }
          }
        }
      }
    }
  `);

  const siteData = queryData.site.siteMetadata;
  const mdxPageData = queryData.allMdx?.edges || [];
  const allPages = mdxPageData.map(({ node }) => ({ ...node.frontmatter, ...node.fields }));
  const siteTitle = siteData?.title || 'Title';
  const footerTitle = siteData?.footerTitle || siteTitle;
  const footerAriaLabel = siteData?.footerAriaLabel;
  const menuLinks = siteData?.menuLinks || [];
  const currentMenuItem = resolveCurrentMenuItem(menuLinks, pageSlugWithPrefix);
  const pageSubMenuLinks = currentMenuItem?.subMenuLinks || [];
  const sideNavigation = pageSubMenuLinks.map((subMenuLink) => ({
    ...subMenuLink,
    subLevels: allPages.filter(({ subDir }) => subMenuLink.link.includes(subDir)),
  }));
  const footerCopyRightLinks = siteData?.footerCopyrightLinks || [];
  const contentId = 'content';

  return (
    <div className="page text-body">
      <Navigation
        id="page-header"
        className="pageHeader"
        title={siteTitle}
        menuToggleAriaLabel="menu"
        skipTo={`#${contentId}`}
        skipToContentLabel="Skip to content"
      >
        <Navigation.Row>
          {menuLinks.map(({ name, link }) => (
            <Navigation.Item
              active={withPrefix(currentMenuItem?.link || '') === withPrefix(link)}
              key={name}
              label={name}
              to={link}
              as={GatsbyLink}
            />
          ))}
        </Navigation.Row>
      </Navigation>
      <Container className="pageContent">
        {sideNavigation.length > 0 && (
          <aside className="sideContent" key="side-navigation">
            <SideNavigation
              defaultOpenMainLevels={[...Array(sideNavigation.length).keys()]}
              id="side-navigation"
              toggleButtonLabel="Navigate to page"
            >
              {sideNavigation.map(({ name, link, withDivider, subLevels }) => {
                const sideNavLinkWithPrefix = withPrefix(link);
                return (
                  <SideNavigation.MainLevel
                    key={`side-navigation-${link}`}
                    id={name}
                    href={sideNavLinkWithPrefix}
                    label={name}
                    active={pageSlugWithPrefix === sideNavLinkWithPrefix}
                    withDivider={withDivider}
                  >
                    {subLevels.map(({ slug, title }) => {
                      const subLevelSlugWithPrefix = withPrefix(slug);

                      return (
                        <SideNavigation.SubLevel
                          key={`${slug}`}
                          href={subLevelSlugWithPrefix}
                          label={title}
                          active={pageSlugWithPrefix === subLevelSlugWithPrefix}
                        />
                      );
                    })}
                  </SideNavigation.MainLevel>
                );
              })}
            </SideNavigation>
          </aside>
        )}
        <main id={contentId} className="mainContent">
          <MDXProvider>{children}</MDXProvider>
        </main>
      </Container>
      <Footer id="page-footer" className="pageFooter" title={footerTitle} footerAriaLabel={footerAriaLabel}>
        <Footer.Base copyrightHolder="Copyright">
          {footerCopyRightLinks.map(({ name, link }) => (
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
