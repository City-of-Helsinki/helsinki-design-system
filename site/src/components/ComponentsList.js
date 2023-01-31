import * as React from 'react';

import LinkboxList from './LinkboxList';

import * as componentData from '../data/components.json';

const ComponentsList = () => {
  const data = JSON.parse(componentData);

  return <LinkboxList data={data} />;
};

export default ComponentsList;
