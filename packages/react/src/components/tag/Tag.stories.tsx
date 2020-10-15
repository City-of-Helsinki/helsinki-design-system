import React from 'react';
import { action } from '@storybook/addon-actions';

import { Tag } from './Tag';

export default {
  component: Tag,
  title: 'Components/Tag',
};

export const Example = () => {
  const label = 'Americum';
  return <Tag deleteButtonAriaLabel={`Delete: ${label}`} onDelete={() => action(`Delete: ${label}`)} label={label} />;
};
