/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import "hds-core";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, withPrefix, Link as GatsbyLink, navigate } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Footer, Link, Navigation, SideNavigation, IconCheckCircleFill, IconCrossCircle } from 'hds-react';
import Seo from './Seo';
import { PlaygroundBlock, PlaygroundPreview } from './Playground';
import SyntaxHighlighter from './SyntaxHighlighter';
import Table from './Table';
import InternalLink from './InternalLink';
import ExternalLink from './ExternalLink';
import './layout.scss';

const classNames = (...args) => args.filter((e) => e).join(' ');

const components = {
  IconCheckCircleFill,
  IconCrossCircle,
  InternalLink,
  ExternalLink,
  Link,
  Playground: PlaygroundBlock,
  PlaygroundPreview,
  pre: SyntaxHighlighter,
  table: Table,
  thead: Table.Thead,
  tbody: Table.Tbody,
  th: Table.Th,
  h1: (props) => (
    <h1 {...props} className={classNames('page-heading-1 heading-xl-mobile', props.className)}>
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 {...props} className={classNames('page-heading-2 heading-l', props.className)}>
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className={classNames('page-heading-3 heading-m', props.className)}>
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 {...props} className={classNames('page-heading-4 heading-s', props.className)}>
      {props.children}
    </h4>
  ),
  h5: (props) => (
    <h4 {...props} className={classNames('page-heading-5 heading-xs', props.className)}>
      {props.children}
    </h4>
  ),
};

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

const generateUiIdFromPath = (path, prefix) => {
  const pathStr =
    !path && path === '/'
      ? 'home'
      : path
          .split('/')
          .filter((str) => !!str)
          .join('-');
  return `${prefix}-${pathStr}`;
};

const isNavPage = (page) => page.slug && page.navTitle;
const splitPathIntoParts = (path) => path.split('/').filter((l) => !!l);
const isLinkParentForPage = (parentPath, level) => (page) => {
  const pathParts = splitPathIntoParts(page.slug);
  return pathParts.length === level && pathParts.slice(0, -1).every((pathPart) => parentPath.includes(pathPart));
};
const sortByPageTitle = (pageA, pageB) => pageA.title.localeCompare(pageB.title);
const isMatchingParentLink = (link, slug) => {
  const linkParts = splitPathIntoParts(link);
  const slugParts = splitPathIntoParts(slug);
  const slugPartsWithoutLast = slugParts.slice(0, -1);

  return (
    linkParts.length === slugPartsWithoutLast.length &&
    linkParts.length >= 2 &&
    linkParts.every((linkPart, index) => linkPart === slugPartsWithoutLast[index])
  );
};

const Layout = ({ children, pageContext }) => {
  const { title: pageTitle, slug: pageSlug, customLayout } = pageContext.frontmatter;
  const pageSlugWithPrefix = withPrefix(pageSlug);

  const queryData = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
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
        }
      }
      allMdx {
        edges {
          node {
            frontmatter {
              title
              slug
              navTitle
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
  const siteUrl = siteData?.siteUrl;
  const description = siteData?.description;
  const footerTitle = siteData?.footerTitle || siteTitle;
  const footerAriaLabel = siteData?.footerAriaLabel;
  const menuLinks = siteData?.menuLinks || [];
  const uiMenuLinks = menuLinks.map((menuLink) => ({
    ...menuLink,
    uiId: generateUiIdFromPath(menuLink.link, 'nav'),
  }));
  const currentMenuItem = resolveCurrentMenuItem(uiMenuLinks, pageSlugWithPrefix);
  const subMenuLinks = currentMenuItem?.subMenuLinks || [];
  const subMenuLinksFromPages =
    currentMenuItem && currentMenuItem.link
      ? allPages
          .filter(isNavPage)
          .filter(isLinkParentForPage(currentMenuItem.link, 2))
          .map((page) => ({ name: page.title, title: page.title, link: page.slug }))
          .sort(sortByPageTitle)
      : [];

  const uiSubMenuLinks = [...subMenuLinks, ...subMenuLinksFromPages].map((subMenuLink) => ({
    ...subMenuLink,
    prefixedLink: withPrefix(subMenuLink.link),
    uiId: generateUiIdFromPath(subMenuLink.link, 'side-nav'),
    subLevels: allPages
      .filter(isNavPage)
      .filter(isLinkParentForPage(subMenuLink.link, 3))
      .map((subLevelLink) => ({
        ...subLevelLink,
        uiId: generateUiIdFromPath(subLevelLink.slug, 'side-nav-sub'),
        prefixedLink: withPrefix(subLevelLink.slug),
      }))
      .sort(sortByPageTitle),
  }));
  const contentId = 'content';
  const NavigationTitle = () => (
    <div className="page-header-title">
      <div>{siteTitle}</div>
      <div className="page-header-title-badge">
        <img
          style={{ filter: 'invert(1)' }}
          alt="HDS version number: 2.0.0"
          src="https://img.shields.io/github/v/release/City-of-Helsinki/helsinki-design-system?label=&style=for-the-badge&color=1a1a1a"
        />
      </div>
    </div>
  );

  return (
    <>
      <Seo
        title={siteTitle}
        pageTitle={pageTitle}
        description={description}
        meta={[
          {
            property: 'og:url',
            content: siteUrl,
          },
        ]}
      />
      <div className="page text-body">
        <Navigation
          id="page-header"
          className="pageHeader"
          title={<NavigationTitle />}
          titleAriaLabel="Helsinki: Helsinki Design System"
          titleUrl={siteUrl}
          onTitleClick={(event) => {
            event.preventDefault();
            navigate('/');
          }}
          menuToggleAriaLabel="menu"
          skipTo={`#${contentId}`}
          skipToContentLabel="Skip to content"
        >
          <Navigation.Row ariaLabel="Site navigation">
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Navigation.Item
                active={withPrefix(currentMenuItem?.link || '') === withPrefix(link)}
                key={uiId}
                label={name}
                to={link}
                as={GatsbyLink}
              />
            ))}
          </Navigation.Row>
        </Navigation>
        <div className={customLayout ? undefined : 'page-content'}>
          {uiSubMenuLinks.length > 0 && (
            <aside className="side-content" key="side-navigation">
              <SideNavigation
                defaultOpenMainLevels={[...Array(uiSubMenuLinks.length).keys()]}
                id="side-navigation"
                toggleButtonLabel="Navigate to page"
                ariaLabel={`${currentMenuItem.name}`}
              >
                {uiSubMenuLinks.map(({ name, link, prefixedLink, uiId, withDivider, subLevels }) => {
                  const hasSubLevels = subLevels.length > 0;

                  return (
                    <SideNavigation.MainLevel
                      key={uiId}
                      id={uiId}
                      label={name}
                      active={
                        pageSlugWithPrefix === prefixedLink || (!hasSubLevels && isMatchingParentLink(link, pageSlug))
                      }
                      withDivider={withDivider}
                      {...(hasSubLevels
                        ? {}
                        : {
                            href: prefixedLink,
                            onClick: (e) => {
                              e.preventDefault();
                              navigate(link);
                            },
                          })}
                    >
                      {subLevels.map(({ navTitle, slug, prefixedLink: prefixedSubLevelLink, uiId }) => (
                        <SideNavigation.SubLevel
                          key={uiId}
                          href={prefixedSubLevelLink}
                          label={navTitle}
                          active={pageSlugWithPrefix === prefixedSubLevelLink || isMatchingParentLink(slug, pageSlug)}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(slug);
                          }}
                        />
                      ))}
                    </SideNavigation.MainLevel>
                  );
                })}
              </SideNavigation>
            </aside>
          )}
          {customLayout ? (
            <MDXProvider components={components}>{children}</MDXProvider>
          ) : (
            <main id={contentId} className="main-content">
              <MDXProvider components={components}>{children}</MDXProvider>
            </main>
          )}
        </div>
        <Footer id="page-footer" className="page-footer" title={footerTitle} footerAriaLabel={footerAriaLabel}>
          <Footer.Base copyrightHolder="Copyright">
            <Footer.Item label="Contribution" href={withPrefix('/getting-started/contributing/how-to-contribute')} />
            <Footer.Item label="Accessibility" href={withPrefix('/about/accessibility/statement')} />
            <Footer.Item label="GitHub" href="https://github.com/City-of-Helsinki/helsinki-design-system" />
          </Footer.Base>
        </Footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
