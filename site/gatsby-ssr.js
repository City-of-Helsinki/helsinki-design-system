import React, { Fragment } from 'react';
import { withPrefix } from 'gatsby';
import { getCriticalHdsRules, hdsStyles } from 'hds-react';
import { renderToString } from 'react-dom/server';
import Layout from './src/components/layout';
import { getFaviconHeadComponents } from './src/utils/favicon-head-links';

export const replaceRenderer = async ({ bodyComponent, setHeadComponents }) => {
  const bodyHTML = renderToString(bodyComponent);

  if (hdsStyles && hdsStyles.length > 0 && bodyHTML && bodyHTML.length > 0) {
    const cssRules = await getCriticalHdsRules(bodyHTML, hdsStyles);
    const HeadComponents = [
      <style data-used-styles dangerouslySetInnerHTML={{ __html: cssRules }} />
    ];

    return setHeadComponents(HeadComponents);
  }

  return;
}

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  const faviconLinks = getFaviconHeadComponents(withPrefix);

  replaceHeadComponents([...faviconLinks, ...headComponents]);
};

export const wrapPageElement = ({ element, props }) => {
  if (props.location.pathname.includes("this-is-hds")) return <Fragment {...props}>{element}</Fragment>
  return <Layout {...props}>{element}</Layout>
}
