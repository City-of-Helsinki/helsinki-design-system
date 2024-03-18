import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile, IconTrash } from '../../icons';
import { NewButton, NewButtonSize, NewButtonTheme, NewButtonVariant } from './NewButton';

const onClick = action('button-click');

const getLabel = (label = 'New button'): string => label;

export default {
  component: NewButton,
  title: 'Components/NewButton',
  decorators: [
    (storyFn) => (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>{storyFn()}</div>
    ),
  ],
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

export const Primary = () => <NewButton onClick={onClick}>{getLabel()}</NewButton>;

export const Secondary = () => (
  <NewButton onClick={onClick} variant={NewButtonVariant.Secondary}>
    {getLabel()}
  </NewButton>
);

export const Supplementary = () => (
  <NewButton onClick={onClick} variant={NewButtonVariant.Supplementary} iconStart={<IconTrash />}>
    {getLabel()}
  </NewButton>
);

export const Small = () => (
  <NewButton onClick={onClick} size={NewButtonSize.Small}>
    {getLabel()}
  </NewButton>
);

export const Danger = () => (
  <NewButton onClick={onClick} variant={NewButtonVariant.Danger}>
    {getLabel()}
  </NewButton>
);

export const Disabled = () => (
  <NewButton onClick={onClick} disabled>
    {getLabel()}
  </NewButton>
);

export const Success = () => (
  <NewButton onClick={onClick} variant={NewButtonVariant.Success}>
    {getLabel()}
  </NewButton>
);

export const FullWidth = () => (
  <NewButton onClick={onClick} fullWidth>
    {getLabel()}
  </NewButton>
);
FullWidth.storyName = 'Full width';

export const Icons = () => (
  <>
    <NewButton onClick={onClick} iconStart={<IconShare />}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconEnd={<IconAngleRight />}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconStart={<IconShare />} size={NewButtonSize.Small}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconEnd={<IconAngleRight />} size={NewButtonSize.Small}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />} size={NewButtonSize.Small}>
      {getLabel()}
    </NewButton>
  </>
);

export const Themes = () => (
  <>
    <NewButton onClick={onClick} theme={NewButtonTheme.Coat}>
      {getLabel('coat')}
    </NewButton>

    <NewButton onClick={onClick} theme={NewButtonTheme.Coat} variant={NewButtonVariant.Secondary}>
      {getLabel('coat')}
    </NewButton>

    <NewButton
      onClick={onClick}
      theme={NewButtonTheme.Coat}
      variant={NewButtonVariant.Supplementary}
      iconEnd={<IconAngleRight />}
    >
      {getLabel('coat')}
    </NewButton>

    <NewButton onClick={onClick} iconStart={<IconShare />} size={NewButtonSize.Small}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconEnd={<IconAngleRight />} size={NewButtonSize.Small}>
      {getLabel()}
    </NewButton>

    <NewButton onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />} size={NewButtonSize.Small}>
      {getLabel()}
    </NewButton>
  </>
);

export const Loading = () => (
  <NewButton isLoading loadingText="Saving your changes">
    {getLabel()}
  </NewButton>
);

export const LoadingOnClick = (args) => {
  const [isLoading, setIsLoading] = useState(false);
  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true);
  };
  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);
  return (
    <NewButton
      {...{ ...args, iconStart: args.variant === NewButtonVariant.Supplementary ? <IconTrash /> : undefined }}
      onClick={onButtonClick}
      isLoading={isLoading}
      loadingText="Saving your changes"
    >
      {getLabel()}
    </NewButton>
  );
};
LoadingOnClick.args = {
  variant: 'primary',
};

export const Playground = ({
  label,
  variant,
  theme,
  size,
  disabled,
  fullWidth,
  iconStart,
  iconEnd,
  isLoading,
  loadingText,
  ...args
}) => {
  return (
    <NewButton
      variant={variant}
      theme={theme}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      iconStart={iconStart ? <IconFaceSmile /> : null}
      iconEnd={iconEnd ? <IconFaceSmile /> : null}
      isLoading={isLoading}
      loadingText={loadingText}
      {...args}
    >
      {label}
    </NewButton>
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

Playground.args = {
  label: getLabel(),
  variant: 'primary',
  theme: 'default',
  size: 'default',
  disabled: false,
  fullWidth: false,
  iconStart: false,
  iconEnd: false,
  isLoading: false,
  loadingText: 'Saving your changes',
};

Playground.argTypes = {
  variant: {
    options: ['primary', 'secondary', 'supplementary', 'success', 'danger'],
    control: { type: 'radio' },
  },
  theme: {
    options: ['default', 'coat', 'black'],
    control: { type: 'radio' },
  },
  size: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
};

export const LinkButton = () => (
  <NewButton
    onClick={() => {
      window.open('/');
    }}
    role="link"
    aria-label='Link to "/"'
  >
    Button used as a link
  </NewButton>
);
