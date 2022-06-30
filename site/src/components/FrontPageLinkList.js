import * as React from 'react';

import LinkboxList from './LinkboxList';

const FrontPageLinkList = () => {
  const componentData = [
    {
      name: 'Brand guidelines',
      text: 'The visual identity guidelines of the city of Helsinki',
      linkboxAriaLabel: 'Brand guidelines',
      linkAriaLabel: 'Go to the Brand guidelines page',
      href: 'https://brand.hel.fi/',
      openInExternalDomainAriaLabel: 'Opens a different website.',
      external: true,
      imgProps: {
        src: '/images/homepage/brand-guidelines.svg',
        height: 198,
        width: 300,
      },
    },
    {
      name: 'Foundation',
      text: 'Guide for applying the visual guidelines to digital experiences',
      linkboxAriaLabel: 'Foundations',
      linkAriaLabel: 'Go to the Foundations page',
      href: '/foundation',
      imgProps: {
        src: '/images/foundation/foundation.svg',
        height: 198,
        width: 300,
      },
    },
    {
      name: 'Components',
      text: 'UI components ready to use for complete layouts',
      linkboxAriaLabel: 'Components',
      linkAriaLabel: 'Go to the Components page',
      href: '/components',
      imgProps: {
        src: '/images/components/components.svg',
        height: 198,
        width: 300,
      },
    },
    {
      name: 'Patterns',
      text: 'Components and guidelines are used to build pages for specific user flows',
      linkboxAriaLabel: 'Patterns',
      linkAriaLabel: 'Go to the Patterns page',
      href: '/patterns',
      imgProps: {
        src: '/images/patterns/patterns.svg',
        height: 198,
        width: 300,
      },
    },
  ];

  return <LinkboxList data={componentData} className="front-page-link-list" />;
};

export default FrontPageLinkList;
