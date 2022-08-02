import React from 'react';
import { getCriticalHDSRules, hdsStyles } from 'hds-react';
import { renderToString } from 'react-dom/server';

export const replaceRenderer = async ({ bodyComponent, setHeadComponents }) => {
  const bodyHTML = renderToString(bodyComponent);

  if (hdsStyles && hdsStyles.length > 0 && bodyHTML && bodyHTML.length > 0) {
    const cssRules = await getCriticalHDSRules(bodyHTML, hdsStyles);
    const HeadComponents = [
      <style data-used-styles dangerouslySetInnerHTML={{ __html: cssRules }} />
    ];

    return setHeadComponents(HeadComponents);
  }

  return;
}
