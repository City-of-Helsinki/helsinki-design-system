import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import Dropdown from './Dropdown';

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

export const Playground = () => {
  const multiselect = boolean('Multiselect', false);
  const filterable = boolean('Filterable', false);
  const invalid = boolean('Invalid', false);
  const disabled = boolean('Disabled', false);
  const closeMenuOnSelect = boolean('Close menu on select', true);
  const placeholder = text('Placeholder', 'Placeholder');

  return (
    <Dropdown
      multiselect={multiselect}
      filterable={filterable}
      invalid={invalid}
      disabled={disabled}
      placeholder={placeholder}
      closeMenuOnSelect={closeMenuOnSelect}
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
