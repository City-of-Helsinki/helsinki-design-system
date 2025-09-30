import React, { useRef } from 'react';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';
import { action } from '@storybook/addon-actions';

import { TextInput, TextInputProps } from './TextInput';
import { Button, ButtonPresetTheme, ButtonSize } from '../button';
import { IconSearch } from '../../icons';
import { Tooltip } from '../tooltip';

const textInputProps = {
  helperText: 'Assistive text',
  id: 'hdsInput',
  label: 'Label',
  placeholder: 'Placeholder',
};

export default {
  component: TextInput,
  title: 'Components/TextInput',
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

export const Default = () => <TextInput {...textInputProps} data-playwright />;

export const ReadOnly = () => (
  <TextInput {...textInputProps} readOnly defaultValue="Text input value" data-playwright />
);
ReadOnly.storyName = 'Read-only';

export const Disabled = () => (
  <TextInput {...textInputProps} disabled defaultValue="Text input value" data-playwright />
);

export const Invalid = () => <TextInput {...textInputProps} invalid errorText="Error text" />;

export const Success = () => <TextInput {...textInputProps} successText="Success text" />;

export const Info = () => <TextInput {...textInputProps} infoText="Info text" />;

export const WithLabelHidden = () => <TextInput {...textInputProps} hideLabel />;
WithLabelHidden.storyName = 'With label hidden';

export const WithTooltip = () => (
  <TextInput
    {...textInputProps}
    tooltip={
      <Tooltip tooltipLabel="Tooltip" buttonLabel="Tooltip">
        Tooltips contain &quot;nice to have&quot; information. Default Tooltip contents should not be longer than two to
        three three sentences. For longer descriptions, provide a link to a separate page.
      </Tooltip>
    }
  />
);
WithTooltip.storyName = 'With tooltip';

export const NumberInput = () => <TextInput {...textInputProps} type="number" />;

export const UsingRef = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        onClick={() => ref?.current?.focus()}
        style={{ marginBottom: '1rem' }}
        theme={ButtonPresetTheme.Black}
        size={ButtonSize.Small}
      >
        Focus input
      </Button>
      <TextInput {...textInputProps} ref={ref} />
    </>
  );
};
UsingRef.storyName = 'Using ref';

export const Playground = (args: TextInputProps & { tooltipButtonAriaLabelText: string }) => (
  <TextInput
    id={args.id}
    label={args.label}
    helperText={args.helperText}
    placeholder={args.placeholder}
    readOnly={args.readOnly}
    type={args.type}
    disabled={args.disabled}
    invalid={args.invalid}
    errorText={args.errorText}
    hideLabel={args.hideLabel}
    required={args.required}
    tooltipLabel={args.tooltipLabel}
    tooltipText={args.tooltipText}
    tooltipButtonLabel={args.tooltipButtonAriaLabelText}
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
  ...textInputProps,
  type: 'text',
  disabled: false,
  required: false,
  readOnly: false,
  invalid: false,
  errorText: undefined,
  hideLabel: false,
  tooltipAriaLabel: 'Tooltip',
  tooltipText:
    'Tooltips contain "nice to have" information. Default Tooltip contents should not be longer than two to three sentences. For longer descriptions, provide a link to a separate page.',
  tooltipButtonAriaLabelText: 'Tooltip',
};

export const SimpleSearchInput = (args: TextInputProps) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

  const doSearch = (value: string | undefined) => {
    action('search for')(value);
  };

  const onButtonClick = () => {
    doSearch(ref?.current?.value);
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onKeyUpHandler = (e) => {
    if (e.key === 'Enter') {
      doSearch(e.target.value);
    }
  };

  return (
    <TextInput
      {...args}
      buttonAriaLabel={`Search for ${inputValue}`}
      buttonIcon={<IconSearch />}
      clearButtonAriaLabel="Clear search"
      label="Simple search"
      aria-label="simple search"
      onButtonClick={onButtonClick}
      onChange={onChangeHandler}
      onKeyUp={onKeyUpHandler}
      ref={ref}
      type="search"
      data-playwright
    />
  );
};

SimpleSearchInput.storyName = 'As search input';

export const SimpleSearchInputWithDefaultValue = (args: TextInputProps) => {
  return <SimpleSearchInput {...args} defaultValue="test input" />;
};

SimpleSearchInputWithDefaultValue.storyName = 'As search input with default value';

export const WithCustomStyles = (args: TextInputProps) => {
  const customStyles = {
    '--helper-background-color-info': 'var(--color-info)',
    '--helper-background-color-invalid': 'var(--color-error)',
    '--helper-background-color-success': 'var(--color-success)',
    '--helper-color-default': 'var(--color-success)',
    '--helper-color-invalid': 'var(--color-white)',
    '--helper-icon-color-invalid': ' var(--color-white)',
    '--helper-color-success': 'var(--color-white)',
    '--helper-icon-color-success': ' var(--color-white)',
    '--helper-color-info': 'var(--color-white)',
    '--helper-icon-color-info': ' var(--color-white)',
    '--icon-color': 'var(--color-white)',
    '--input-background-default': 'var(--color-black)',
    '--input-background-disabled': 'var(--color-black-40)',
    '--input-border-color-default': 'var(--color-black-10)',
    '--input-border-color-hover': 'var(--color-black-20)',
    '--input-border-color-focus': 'var(--color-black-90)',
    '--input-border-color-invalid': 'var(--color-error-light)',
    '--input-border-color-disabled': 'var(--color-black-10)',
    '--input-border-color-success': 'var(--color-success)',
    '--input-color-default': 'var(--color-white)',
    '--input-color-disabled': 'var(--color-black-40)',
    '--label-color-default': 'var(--color-success)',
    '--label-color-invalid': 'var(--color-error)',
    '--placeholder-color': 'var(--color-black-50)',
  } as React.CSSProperties;
  return (
    <TextInput
      {...textInputProps}
      style={customStyles}
      invalid
      clearButtonAriaLabel="Clear"
      buttonAriaLabel="Search"
      buttonIcon={<IconSearch />}
      onButtonClick={() => undefined}
      defaultValue={"I'm customised!"}
      data-playwright
      successText="Success!"
      errorText="Error!"
      infoText="Info!"
      type="search"
      {...args}
    />
  );
};
