import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { Tabs } from 'hds-react';

import './PageTabs.scss';

const resolvePathFromSubSlug = (slug) => {
  const parts = slug
    .trim()
    .split('/')
    .filter((p) => !!p);
  return `/${parts.slice(0, -1).join('/')}`;
};

const pageTabListComponentName = 'PageTabList';
const pageTabPanelComponentName = 'PageTabPanel';
const pageTabComponentName = 'PageTab';

const PageTabs = ({ pageContext, children }) => {
  const slug = pageContext.frontmatter.slug;
  const mdxChildren = React.Children.toArray(children);
  const tabList = mdxChildren.find((reactChild) => reactChild.type.componentName === pageTabListComponentName);
  const tabPanel = mdxChildren.find((reactChild) => reactChild.type.componentName === pageTabPanelComponentName);
  const tabs = tabList.props?.children.filter((reactChild) => reactChild.type.componentName === pageTabComponentName);
  const tabActiveIndex = tabs.findIndex((tab) => slug.endsWith(tab.props.href));
  const activeIndex = tabActiveIndex === -1 ? 0 : tabActiveIndex;
  const rootPath = activeIndex === 0 ? slug : resolvePathFromSubSlug(slug);

  return (
    <Tabs initiallyActiveTab={activeIndex}>
      <Tabs.TabList className="page-tabs-list">
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.props.href}
            onClick={() => navigate(`${tab.props.href === '/' ? rootPath : rootPath + tab.props.href}`)}
          >
            {tab.props.children}
          </Tabs.Tab>
        ))}
      </Tabs.TabList>
      {tabs.map((tab, index) => (
        <Tabs.TabPanel key={tab.props.href}>{activeIndex === index ? tabPanel.props.children : <div />}</Tabs.TabPanel>
      ))}
    </Tabs>
  );
};

PageTabs.propTypes = {
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
  children: PropTypes.node.isRequired,
};

// TabList, Tab, and TabPanel are placeholder elements to be replaced with HDS Tab components after resolving suitable properties, etc.
const TabList = ({ children }) => <Tabs.TabList>{children}</Tabs.TabList>;
TabList.componentName = pageTabListComponentName;
TabList.propTypes = {
  children: PropTypes.node.isRequired,
};
const Tab = ({ href, slug, children }) => <Tabs.Tab>{children}</Tabs.Tab>;
Tab.componentName = pageTabComponentName;
Tab.propTypes = {
  slug: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};
const TabPanel = ({ children }) => <Tabs.TabPanel>{children}</Tabs.TabPanel>;
TabPanel.componentName = pageTabPanelComponentName;
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

PageTabs.TabList = TabList;
PageTabs.Tab = Tab;
PageTabs.TabPanel = TabPanel;

export default PageTabs;
