/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, withPrefix, Link as GatsbyLink, navigate } from 'gatsby';
import { MDXProvider, mdx } from '@mdx-js/react';
import { Header, Footer, Link, SideNavigation, IconCheckCircleFill, IconCrossCircle, Logo, LogoSize, logoFi } from 'hds-react';
import Seo from './Seo';
import { PlaygroundBlock, PlaygroundPreview } from './Playground';
import SyntaxHighlighter from './SyntaxHighlighter';
import Table from './Table';
import InternalLink from './InternalLink';
import ExternalLink from './ExternalLink';
import AnchorLink from './AnchorLink';
import './layout.scss';

import { MDXRenderer } from 'gatsby-plugin-mdx';

const classNames = (...args) => args.filter((e) => e).join(' ');

const components = {
  IconCheckCircleFill,
  IconCrossCircle,
  InternalLink,
  ExternalLink,
  AnchorLink,
  Link,
  Playground: PlaygroundBlock,
  PlaygroundPreview,
  pre: SyntaxHighlighter,
  table: Table,
  thead: Table.Head,
  tbody: Table.Body,
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
    <h5 {...props} className={classNames('page-heading-5 heading-xs', props.className)}>
      {props.children}
    </h5>
  ),
  h6: (props) => (
    <h6 {...props} className={classNames('page-heading-6 heading-xxs', props.className)}>
      {props.children}
    </h6>
  ),
};

const withVersion = (version, link) => {
//  console.log('withVersion', version, link, (version ? `/${version}` : '') + withPrefix(link));
  return (version ? `/${version}` : '') + withPrefix(link);
}
const withoutVersion = (version, link) => {
//  console.log('withoutVersion', version, link, link.replace(`/${version}`, ''));
//  console.log(version);
  return link.replace(`/${version}`, '');
}

const resolveCurrentMenuItem = (version, menuItems, slugWithPrefix) => {
  const rootPath = withVersion(version, '/');

  if (slugWithPrefix === rootPath) {
    return menuItems.find(({ link }) => withVersion(version, link) === rootPath);
  } else {
    return menuItems
      .filter(({ link }) => withVersion(version, link) !== rootPath)
      .find((menuItem) => slugWithPrefix.startsWith(withVersion(version, menuItem.link)));
  }
};

const generateUiIdFromPath = (path, prefix) => {
  console.log('generateUiIdFromPath', path);
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


const VersionedLink = ({ to, version, ...props }) => {
  const versionedTo = version ? `/${version}${withPrefix(to)}` : withPrefix(to);
  return <GatsbyLink to={versionedTo} {...props} />;
};

const TransformLinks = ({ children, version }) => {
  const transform = (child) => {
    if (React.isValidElement(child)) {
        console.log(child.props);
      if (child.props.href) {
        return (
          <VersionedLink to={child.props.href} version={version} {...child.props}>
            {child.props.children}
          </VersionedLink>
        );
      }

      return React.cloneElement(child, {
        children: React.Children.map(child.props.children, transform),
      });
    }
    return child;
  };

  return <>{React.Children.map(children, transform)}</>;
};


const Layout = ({ location, children, pageContext }) => {
/*
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
            parent {
              ... on File {
                gitRemote {
                  ref
                }
              }
            }
          }
        }
      }
    }
  `);
*/

  const pathParts = location.pathname.split("/");
  const version = pathParts[1].startsWith('release-') ? pathParts[1] : undefined;

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

  // Todo check available versions

  console.log(pageContext.frontmatter);
  console.log('location', location);
  console.log('version', version);
//  console.log('children', children);
//  console.log('pageContext', pageContext);

  const { title: pageTitle, slug: pageSlug, customLayout } = pageContext?.frontmatter
    ? pageContext?.frontmatter
    : {title: "", slug: ""};
  const pageSlugWithPrefix = withVersion(version, pageSlug);

//  console.log('children', children);

  const childrenMDX = children;

/*
  const childrenMDX = (
    <TransformLinks version={version}>
      {children}
    </TransformLinks>
  );
*/

//  console.log('pageSlug', pageSlug);


  const siteData = queryData.site.siteMetadata;
  const mdxPageData = queryData.allMdx?.edges || [];
//  const allPages = mdxPageData.map(({ node }) => ({ ...node.frontmatter, ...node.fields }));

/*
  const allPages = mdxPageData
    .filter(({ node }) => node?.parent?.gitRemote?.ref === version)
    .map(({ node }) => ({ ...node.frontmatter, ...node.fields }));
*/

  const slugPages = Object.fromEntries(mdxPageData
    .map(({ node }) => ([node.frontmatter.slug, { ...node.frontmatter, ...node.fields }])));
  const allPages = Object.values(slugPages);


//  console.log('allPages', allPages);

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
  const currentMenuItem = resolveCurrentMenuItem(version, uiMenuLinks, pageSlugWithPrefix);
  console.log('currentMenuItem', currentMenuItem);
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
    prefixedLink: subMenuLink.link,
    uiId: generateUiIdFromPath(subMenuLink.link, 'side-nav'),
    subLevels: allPages
      .filter(isNavPage)
      .filter(isLinkParentForPage(subMenuLink.link, 3))
      .map((subLevelLink) => ({
        ...subLevelLink,
        uiId: generateUiIdFromPath(subLevelLink.slug, 'side-nav-sub'),
        prefixedLink: subLevelLink.slug,
      }))
      .sort(sortByPageTitle),
  }));
  const contentId = 'content';

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
        <Header id="page-header" className="pageHeader">
          <Header.SkipLink skipTo={`#${contentId}`} label="Skip to content" />
          <Header.ActionBar
            frontPageLabel="Front page"
            title={siteTitle}
            titleAriaLabel="Helsinki: Helsinki Design System"
            titleHref={siteUrl}
            logoHref={siteUrl}
            logoAriaLabel="City of Helsinki Logo"
            logo={<Logo src={logoFi} alt="Helsingin kaupunki" />}
          >
            <Header.ActionBarItem label={version} fixedRightPosition>
              <Header.ActionBarSubItem label="latest" href={withoutVersion(version, location.pathname)} />
              <Header.ActionBarSubItem label="release-3.0.0" href={withVersion('release-3.0.0', withoutVersion(version, location.pathname))} />
              <Header.ActionBarSubItem label="release-2.17.0" href={withVersion('release-2.17.0', withoutVersion(version, location.pathname))} />
              <Header.ActionBarSubItem label="release-2.14.0" href={withVersion('release-2.14.0', withoutVersion(version, location.pathname))} />
            </Header.ActionBarItem>
          </Header.ActionBar>
          <Header.NavigationMenu>
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Header.Link
                active={withVersion(version, currentMenuItem?.link || '') === withVersion(version, link)}
                key={uiId}
                label={name}
                to={withVersion(version, link)}
                as={GatsbyLink}
              />
            ))}
          </Header.NavigationMenu>
        </Header>
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
                            href: withVersion(version, prefixedLink),
                            onClick: (e) => {
                              e.preventDefault();
                              navigate(withVersion(version, link));
                            },
                          })}
                    >
                      {subLevels.map(({ navTitle, slug, prefixedLink: prefixedSubLevelLink, uiId }) => (
                        <SideNavigation.SubLevel
                          key={uiId}
                          href={withVersion(version, prefixedSubLevelLink)}
                          label={navTitle}
                          active={pageSlugWithPrefix === prefixedSubLevelLink || isMatchingParentLink(slug, pageSlug)}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(withVersion(version, slug));
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
            <MDXProvider components={components}>{childrenMDX}</MDXProvider>
          ) : (
            <main id={contentId} className="main-content">
              <MDXProvider components={components}>{childrenMDX}</MDXProvider>
            </main>
          )}
        </div>
        <Footer id="page-footer" className="page-footer" title={footerTitle} footerAriaLabel={footerAriaLabel}>
          <Footer.Navigation>
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Footer.Link key={uiId} label={name} to={withVersion(version, link)} as={GatsbyLink} />
            ))}
          </Footer.Navigation>
          <Footer.Base
            copyrightHolder="Copyright"
            backToTopLabel="Back to top"
            logo={<Logo src={logoFi} size={LogoSize.Medium} alt="Helsingin kaupunki" />}
          >
            <Footer.Link label="Contribution" href={withVersion(version, '/getting-started/contributing/how-to-contribute')} />
            <Footer.Link label="Accessibility" href={withVersion(version, '/about/accessibility/statement')} />
            <Footer.Link label="GitHub" href="https://github.com/City-of-Helsinki/helsinki-design-system" />
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
