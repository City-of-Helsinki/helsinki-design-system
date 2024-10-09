/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, withPrefix, Link as GatsbyLink, navigate } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Header, Footer, Link, SideNavigation, IconCheckCircleFill, IconCrossCircle, Logo, logoFi } from 'hds-react';
import Seo from './Seo';
import { PlaygroundBlock, PlaygroundPreview } from './Playground';
import SyntaxHighlighter from './SyntaxHighlighter';
import Table from './Table';
import InternalLink from './InternalLink';
import ExternalLink from './ExternalLink';
import AnchorLink from './AnchorLink';
import './layout.scss';

const classNames = (...args) => args.filter((e) => e).join(' ');

const hrefWithVersion = (href, version) => {
  return withPrefix(`${version ? `/${version}` : ''}${href}`);
};
const hrefWithoutVersion = (href, version) => {
  return href.replace(`/${version}`, '');
};

const components = (version) => ({
  IconCheckCircleFill,
  IconCrossCircle,
  InternalLink: (props) => <InternalLink {...props} href={hrefWithVersion(props.href, version)} />,
  ExternalLink,
  AnchorLink,
  Link: (props) => <Link {...props} href={hrefWithVersion(props.href, version)} />,
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
});

const resolveCurrentMenuItem = (version, menuItems, slugWithPrefix) => {
  const rootPath = hrefWithVersion('/', version);

  if (slugWithPrefix === rootPath) {
    return menuItems.find(({ link }) => hrefWithVersion(link, version) === rootPath);
  } else {
    return menuItems
      .filter(({ link }) => hrefWithVersion(link, version) !== rootPath)
      .find((menuItem) => slugWithPrefix.startsWith(hrefWithVersion(menuItem.link, version)));
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

const Layout = ({ location, children, pageContext }) => {
  const pathParts = location.pathname.split('/');
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

  const { title: pageTitle, slug: pageSlug, customLayout } = pageContext.frontmatter;
  const siteData = queryData.site.siteMetadata;
  const mdxPageData = queryData.allMdx?.edges || [];

  // filter out duplicate slug entries. It would be better to do this in graphql query
  const allPages = Object.values(
    Object.fromEntries(mdxPageData.map(({ node }) => [node.frontmatter.slug, { ...node.frontmatter, ...node.fields }])),
  );

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
  const currentMenuItem = resolveCurrentMenuItem(version, uiMenuLinks, pageSlug);
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
              <Header.ActionBarSubItem label="latest" href={hrefWithoutVersion(location.pathname, version)} />
              <Header.ActionBarSubItem
                label="release-3.9.0"
                href={hrefWithVersion(hrefWithoutVersion(location.pathname, version), 'release-3.9.0')}
              />
              <Header.ActionBarSubItem
                label="release-3.0.0"
                href={hrefWithVersion(hrefWithoutVersion(location.pathname, version), 'release-3.0.0')}
              />
            </Header.ActionBarItem>
          </Header.ActionBar>
          <Header.NavigationMenu>
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Header.Link
                active={hrefWithVersion(currentMenuItem?.link || '', version) === hrefWithVersion(link, version)}
                key={uiId}
                label={name}
                to={hrefWithVersion(link, version)}
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
                      active={pageSlug === prefixedLink || (!hasSubLevels && isMatchingParentLink(link, pageSlug))}
                      withDivider={withDivider}
                      {...(hasSubLevels
                        ? {}
                        : {
                            href: hrefWithVersion(prefixedLink, version),
                            onClick: (e) => {
                              e.preventDefault();
                              navigate(hrefWithVersion(link, version));
                            },
                          })}
                    >
                      {subLevels.map(({ navTitle, slug, prefixedLink: prefixedSubLevelLink, uiId }) => (
                        <SideNavigation.SubLevel
                          key={uiId}
                          href={hrefWithVersion(prefixedSubLevelLink, version)}
                          label={navTitle}
                          active={pageSlug === prefixedSubLevelLink || isMatchingParentLink(slug, pageSlug)}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(hrefWithVersion(slug, version));
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
            <MDXProvider components={components(version)}>{children}</MDXProvider>
          ) : (
            <main id={contentId} className="main-content">
              <MDXProvider components={components(version)}>{children}</MDXProvider>
            </main>
          )}
        </div>
        <Footer id="page-footer" className="page-footer" title={footerTitle} footerAriaLabel={footerAriaLabel}>
          <Footer.Navigation>
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Footer.Link key={uiId} label={name} to={hrefWithVersion(link, version)} as={GatsbyLink} />
            ))}
          </Footer.Navigation>
          <Footer.Base
            copyrightHolder="Copyright"
            backToTopLabel="Back to top"
            logo={<Logo src={logoFi} size="medium" alt="Helsingin kaupunki" />}
          >
            <Footer.Link
              label="Contribution"
              href={hrefWithVersion('/getting-started/contributing/how-to-contribute', version)}
            />
            <Footer.Link label="Accessibility" href={hrefWithVersion('/about/accessibility/statement', version)} />
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
