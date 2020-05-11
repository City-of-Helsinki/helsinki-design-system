import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Props, Stories, Subtitle, Title } from '@storybook/addon-docs/dist/blocks';

import TextArea from './TextArea';

const textAreaProps = {
  helperText: 'Assistive text',
  id: 'textArea',
  labelText: 'Label',
  placeholder: 'Placeholder',
};
const value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export default {
  component: TextArea,
  title: 'Components/TextArea',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <Subtitle>Props, which are not mentioned below, are passed to the native element</Subtitle>
          <Props />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Default = () => <TextArea {...textAreaProps} />;

export const Disabled = () => <TextArea {...textAreaProps} disabled defaultValue={value} />;

export const Invalid = () => <TextArea {...textAreaProps} invalid helperText="Error text" defaultValue={value} />;

export const WithLabelHidden = () => <TextArea {...textAreaProps} hideLabel defaultValue={value} />;

WithLabelHidden.story = {
  name: 'With label hidden',
};

export const Playground = () => {
  const groupGeneral = 'General';
  const groupTooltip = 'Tooltip';

  const label = text('Label', textAreaProps.labelText, groupGeneral);
  const placeholder = text('Placeholder', textAreaProps.placeholder, groupGeneral);
  const helperText = text('Helper text', textAreaProps.helperText, groupGeneral);
  const disabled = boolean('Disabled', false, groupGeneral);
  const invalid = boolean('Invalid', false, groupGeneral);
  const hideLabel = boolean('Hide label', false, groupGeneral);

  const tooltipLabel = text('Tooltip label', 'Tooltip label', groupTooltip);
  const tooltipText = text(
    'Tooltip text',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    groupTooltip,
  );
  const tooltipOpenButtonLabelText = text('Tooltip open label', 'Show tooltip', groupTooltip);
  const tooltipCloseButtonLabelText = text('Tooltip close label', 'Close tooltip', groupTooltip);

  return (
    <TextArea
      {...textAreaProps}
      labelText={label}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      invalid={invalid}
      hideLabel={hideLabel}
      tooltipLabel={tooltipLabel}
      tooltipText={tooltipText}
      tooltipOpenButtonLabelText={tooltipOpenButtonLabelText}
      tooltipCloseButtonLabelText={tooltipCloseButtonLabelText}
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
