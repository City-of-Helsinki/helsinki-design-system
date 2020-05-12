import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import Dropdown from './Dropdown';
import Combobox from './Combobox';

export default {
  component: Dropdown,
  title: 'Components/Dropdown',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Default = () => (
  <Dropdown placeholder="Choose one" labelText="Label" helperText="Assistive text">
    Dropdown
  </Dropdown>
);

export const Invalid = () => (
  <Dropdown placeholder="Placeholder" labelText="Label" helperText="Error text" invalid>
    Dropdown
  </Dropdown>
);

export const Disabled = () => (
  <Dropdown placeholder="Placeholder" labelText="Label" helperText="Assistive text" disabled>
    Dropdown
  </Dropdown>
);

export const DefaultCombobox = () => (
  <Combobox placeholder="Placeholder" inputId="combobox" labelText="Label" helperText="Assistive text" />
);

export const Playground = () => {
  const multiselect = boolean('Multiselect', false);
  const invalid = boolean('Invalid', false);

  return (
    <Dropdown
      multiselect={multiselect}
      invalid={invalid}
      placeholder="Placeholder"
      labelText="Label"
      helperText="Assistive text"
    />
  );
};

Playground.story = {
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    docs: {
      disable: true,
    },
  },
};
