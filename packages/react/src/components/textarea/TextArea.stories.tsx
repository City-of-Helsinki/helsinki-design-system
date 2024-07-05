import React from 'react';
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
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
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

export const ReadOnly = () => <TextArea {...textAreaProps} readOnly />;
ReadOnly.storyName = 'Read-only';

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

export const Playground = (args) => (
  <TextArea
    id={args.id}
    label={args.label}
    helperText={args.helperText}
    placeholder={args.placeholder}
    disabled={args.disabled}
    invalid={args.invalid}
    hideLabel={args.hideLabel}
    required={args.required}
    tooltipLabel={args.tooltipLabel}
    tooltipText={args.tooltipText}
    tooltipButtonLabel={args.tooltipButtonLabelText}
  />
);

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

Playground.args = {
  ...textAreaProps,
  type: 'text',
  disabled: false,
  required: false,
  readOnly: false,
  invalid: false,
  errorText: 'Error text',
  hideLabel: false,
  tooltipAriaLabel: 'Tooltip',
  tooltipText:
    'Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.',
  tooltipButtonAriaLabelText: 'Tooltip',
};
