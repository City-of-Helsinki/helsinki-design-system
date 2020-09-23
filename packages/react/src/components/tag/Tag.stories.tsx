import React from 'react';

import { Tag } from './Tag';

export default {
  component: Tag,
  title: 'Components/Tag',
};

export const Example = () => {
  const label = 'Americum';
  return <Tag deleteButtonAriaLabel={`Delete: ${label}`} onDelete={() => console.log('Delete!')} label={label} />;
};
