/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { withPrefix, Link as GatsbyLink, navigate } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Header, Footer, Link, SideNavigation, IconCheckCircleFill, IconCrossCircle, Logo, LogoSize, logoFi } from 'hds-react';
import Seo from './Seo';
import { PlaygroundBlock, PlaygroundPreview } from './Playground';
import SyntaxHighlighter from './SyntaxHighlighter';
import Table from './Table';
import InternalLink from './InternalLink';
import ExternalLink from './ExternalLink';
import AnchorLink from './AnchorLink';
import './layout.scss';
import { documentationVersion, versionsFromGit } from '../version';

const classNames = (...args) => args.filter((e) => e).join(' ');

const fixUrlExceptions = (href, version) => {
  const versionNumber = version ? version.replace('release-', '')?.split('.')[0] : 1000;

  // /components/buttons has changed to /components/button after version 3.11.
  if (versionNumber > 3 && href.indexOf('/components/buttons') >= 0) {
    return href.replace('/components/buttons', '/components/button');
  }
  else if (versionNumber <= 3 && href.indexOf('/components/button') >= 0 && href.indexOf('/components/buttons') < 0) {
    return href.replace('/components/button', '/components/buttons');
  }

  // /components/dropdown is not available after version 3.11.
  if (versionNumber > 3 && href.indexOf('/components/dropdown') >= 0) {
    return href.replace('/components/dropdown', '/components');
  }

  // /components/errorsummary is not available before version 3.11.
  if (versionNumber < 3 && href.indexOf('/components/error-summary') >= 0) {
    return href.replace('/components/error-summary', '/components');
  }

  // /components/header is not available before version 3.11.
  if (versionNumber < 3 && href.indexOf('/components/header') >= 0) {
    return href.replace('/components/header', '/components');
  }

  return href;
}

const hrefWithVersion = (href, version, withoutPrefix = false) => {
  const hrefWithFixedExceptions = fixUrlExceptions(href, version);

  if (!version || hrefWithFixedExceptions === ''
    || hrefWithFixedExceptions.startsWith('mailto:')
    || hrefWithFixedExceptions.startsWith('#')
    || hrefWithFixedExceptions.startsWith('/#')
    || hrefWithFixedExceptions.startsWith('http'))
    return hrefWithFixedExceptions;

  let withVersion = '';
  let versionAdded = false;
  const pathParts = hrefWithFixedExceptions.split('/');

  pathParts.forEach((part, index) => {
    if (index > 0) {
      if (part === 'hds-demo' || part.startsWith('preview_') || versionAdded) {
        withVersion += '/' + part;
      }
      else if (!versionAdded) {
        withVersion += '/' + version + (!part.startsWith('release-') ? '/' + part : '');
        versionAdded = true;
      }
    }
  });

  const ret = withVersion.startsWith(withPrefix('')) || withoutPrefix
    ? withVersion : withPrefix(`${withVersion}`);

  return ret;
};

const hrefWithoutVersion = (href, version) => {
  return href.replace(`/${version}`, '');
};

const headingWrapper = (props) => {
  return (
    <a href={`#${props.id}`} aria-label={`${props.id} permalink`}>
      {props.children}
      <span className="anchor-link" aria-hidden="true"><span className="hds-anchor-icon hds-icon hds-icon--link" /></span>
    </a>
  );
}

const components = (version) => ({
  IconCheckCircleFill,
  IconCrossCircle,
  Link: (props) => <Link {...props} href={hrefWithVersion(props.href, version)} />,
  InternalLink: (props) => <InternalLink {...props} href={hrefWithVersion(props.href, version)} />,
  AnchorLink: (props) => <AnchorLink {...props} href={hrefWithVersion(props.href, version)} />,
  ExternalLink,
  Playground: PlaygroundBlock,
  PlaygroundPreview,
  pre: SyntaxHighlighter,
  table: Table,
  thead: Table.Head,
  tbody: Table.Body,
  th: Table.Th,
  h1: (props) => {console.log(props); return (
    <h1 {...props} className={classNames('page-heading-1 heading-xl-mobile', props.className)}>
      {headingWrapper(props)}
    </h1>
  )},
  h2: (props) => (
    <h2 {...props} className={classNames('page-heading-2 heading-l', props.className)}>
      {headingWrapper(props)}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className={classNames('page-heading-3 heading-m', props.className)}>
      {headingWrapper(props)}
    </h3>
  ),
  h4: (props) => (
    <h4 {...props} className={classNames('page-heading-4 heading-s', props.className)}>
      {headingWrapper(props)}
    </h4>
  ),
  h5: (props) => (
    <h5 {...props} className={classNames('page-heading-5 heading-xs', props.className)}>
      {headingWrapper(props)}
    </h5>
  ),
  h6: (props) => (
    <h6 {...props} className={classNames('page-heading-6 heading-xxs', props.className)}>
      {headingWrapper(props)}
    </h6>
  ),
});

const splitPathIntoParts = (path) => path.split('/').filter((l) => !!l);
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
  const { title: pageTitle, slug: pathName, customLayout } = pageContext.frontmatter;
  const pathParts = pathName.split('/');
  const version = pathParts[1].startsWith('release-') ? pathParts[1] : undefined;
  const locationWithoutVersion = hrefWithoutVersion(pathName, version);
  const versionNumber = version ? version.replace('release-', '') : documentationVersion;
  const versionLabel = `Version ${versionNumber}`;
  const hash = location.hash;

  // Some hrefs of internal links can't be replaced with MDXProvider's replace component logic.
  // this code will take care of those
  React.useEffect(() => {
    if (version) {
      const links = document.querySelectorAll('#content a[href]');
      for (const link of links) {
        const href = link.getAttribute('href');
        const hrefNew = hrefWithVersion(href, version);
        if (href !== hrefNew) {
          link.setAttribute('href', hrefNew);
          /* eslint-disable-next-line no-self-assign */
          link.outerHTML = link.outerHTML; // this removes the click handler
        }
      }
    }

    // Move focus to anchor if it is specified
    if (hash) {
      const timeout = setTimeout(() => {
        const anchor = document.querySelector(`a[href='${hash}']`);
        if (anchor) {
          anchor.focus();
        }
      }, 0);

      return () => clearTimeout(timeout);
    }


  }, [version, pathName, hash]);

  const siteData = pageContext.siteData;

  const siteTitle = siteData?.title || 'Title';
  const siteUrl = siteData?.siteUrl;
  const description = siteData?.description;
  const footerTitle = siteData?.footerTitle || siteTitle;
  const footerAriaLabel = siteData?.footerAriaLabel;

  const uiMenuLinks = pageContext.uiMenuLinks;
  const currentMenuItem = pageContext.currentMenuItem;
  const uiSubMenuLinks = pageContext.uiSubMenuLinks;
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
        <Header id="page-header" className="pageHeader" aria-label="Page header">
          <Header.SkipLink skipTo={`#${contentId}`} label="Skip to content" />
          <Header.ActionBar
            frontPageLabel="Front page"
            title={siteTitle}
            titleAriaLabel="Helsinki: Helsinki Design System"
            titleHref={siteUrl}
            logoHref={siteUrl}
            logoAriaLabel="Helsinki: Helsinki Design System"
            logo={<Logo src={logoFi} alt="Helsinki: Helsinki Design System" />}
          >
            <Header.ActionBarItem label={versionLabel} fixedRightPosition>
              {[documentationVersion, ...versionsFromGit].map((itemVersion, index) => (
                <Header.ActionBarSubItem
                  label={`Version ${itemVersion}`}
                  key={`Version ${itemVersion}`}
                  selected={itemVersion === versionNumber}
                  href={index > 0
                    ? hrefWithVersion(locationWithoutVersion, `release-${itemVersion}`)
                    : hrefWithVersion(locationWithoutVersion)}
                />
              ))}
            </Header.ActionBarItem>
          </Header.ActionBar>
          <Header.NavigationMenu>
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Header.Link
                active={hrefWithVersion(currentMenuItem?.link || '', version) === hrefWithVersion(link, version)}
                key={uiId}
                label={name}
                to={hrefWithVersion(link, version, true)}
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
                aria-label={`${currentMenuItem.name}`}
              >
                {uiSubMenuLinks.map(({ name, link, prefixedLink, uiId, withDivider, subLevels }) => {
                  const hasSubLevels = subLevels.length > 0;

                  return (
                    <SideNavigation.MainLevel
                      key={uiId}
                      id={uiId}
                      label={name}
                      active={locationWithoutVersion === prefixedLink || (!hasSubLevels && isMatchingParentLink(link, locationWithoutVersion))}
                      withDivider={withDivider}
                      {...(hasSubLevels
                        ? {}
                        : {
                            href: hrefWithVersion(prefixedLink, version),
                            onClick: (e) => {
                              e.preventDefault();
                              navigate(hrefWithVersion(link, version, true));
                            },
                          })}
                    >
                      {subLevels.map(({ navTitle, slug, prefixedLink: prefixedSubLevelLink, uiId }) => (
                        <SideNavigation.SubLevel
                          key={uiId}
                          href={hrefWithVersion(prefixedSubLevelLink, version)}
                          label={navTitle}
                          active={locationWithoutVersion === prefixedSubLevelLink || isMatchingParentLink(slug, locationWithoutVersion)}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(hrefWithVersion(slug, version, true));
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
            <main id={contentId} className="main-content">
              <MDXProvider components={components(version)}>{children}</MDXProvider>
            </main>
          ) : (
            <main id={contentId} className="main-content">
              <MDXProvider components={components(version)}>{children}</MDXProvider>
            </main>
          )}
        </div>
        <Footer id="page-footer" className="page-footer" title={footerTitle} footerAriaLabel={footerAriaLabel}>
          <Footer.Navigation>
            {uiMenuLinks.map(({ name, link, uiId }) => (
              <Footer.Link key={uiId} label={name} to={hrefWithVersion(link, version, true)} as={GatsbyLink} />
            ))}
          </Footer.Navigation>
          <Footer.Base
            copyrightHolder="Copyright"
            backToTopLabel="Back to top"
            logo={<Logo src={logoFi} size={LogoSize.Medium} alt="City of Helsinki" />}
            logoHref="https://hel.fi"
          >
            <Footer.Link
              label="Contribution"
              href={hrefWithVersion('/getting-started/contributing/how-to-contribute', version)}
            />
            <Footer.Link label="Accessibility statement" href={hrefWithVersion('/about/accessibility/statement', version)} />
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
