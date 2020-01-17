import React from 'react';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const checked = () => <Checkbox checked />;

export const unChecked = () => <Checkbox />;

export const disabled = () => <Checkbox checked disabled />;
