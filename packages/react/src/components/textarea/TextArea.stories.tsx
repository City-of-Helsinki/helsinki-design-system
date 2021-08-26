import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { TextArea } from './TextArea';

const textAreaProps = {
  helperText: 'Assistive text',
  id: 'textArea',
  label: 'Label',
  placeholder: 'Placeholder',
};
const value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export default {
  component: TextArea,
  title: 'Components/TextArea',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Default = () => <TextArea {...textAreaProps} />;

export const Disabled = () => <TextArea {...textAreaProps} disabled defaultValue={value} />;

export const Invalid = () => <TextArea {...textAreaProps} invalid errorText="Error text" defaultValue={value} />;

export const Success = () => <TextArea {...textAreaProps} successText="Success text" defaultValue={value} />;

export const Info = () => <TextArea {...textAreaProps} infoText="Info text" defaultValue={value} />;

export const WithLabelHidden = () => <TextArea {...textAreaProps} hideLabel defaultValue={value} />;
WithLabelHidden.storyName = 'With label hidden';

export const WithTooltip = () => (
  <TextArea
    {...textAreaProps}
    tooltipLabel="Tooltip"
    tooltipButtonLabel="Tooltip"
    tooltipText='Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.'
  />
);
WithTooltip.storyName = 'With tooltip';

export const Playground = () => {
  const groupGeneral = 'General';
  const groupTooltip = 'Tooltip';

  const label = text('Label', textAreaProps.label, groupGeneral);
  const placeholder = text('Placeholder', textAreaProps.placeholder, groupGeneral);
  const helperText = text('Helper text', textAreaProps.helperText, groupGeneral);
  const disabled = boolean('Disabled', false, groupGeneral);
  const required = boolean('Required', false, groupGeneral);
  const invalid = boolean('Invalid', false, groupGeneral);
  const hideLabel = boolean('Hide label', false, groupGeneral);

  const tooltipLabel = text('Tooltip aria-label', 'Tooltip', groupTooltip);
  const tooltipText = text(
    'Tooltip text',
    'Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.',
    groupTooltip,
  );
  const tooltipButtonLabelText = text('Tooltip trigger button aria-label', 'Tooltip', groupTooltip);

  return (
    <TextArea
      {...textAreaProps}
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      invalid={invalid}
      hideLabel={hideLabel}
      required={required}
      tooltipLabel={tooltipLabel}
      tooltipText={tooltipText}
      tooltipButtonLabel={tooltipButtonLabelText}
    />
  );
};

Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};
