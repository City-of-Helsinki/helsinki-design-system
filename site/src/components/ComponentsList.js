import * as React from 'react';

import LinkboxList from './LinkboxList';

import componentData from '../data/components.json';

const ComponentsList = () => {
  return <LinkboxList data={componentData} />;
};

export default ComponentsList;
