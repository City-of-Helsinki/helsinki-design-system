import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile, IconTrash } from '../../icons';
import { Button, ButtonCustomTheme, ButtonSize, ButtonTheme, ButtonVariant } from './Button';

const onClick = action('button-click');

const getLabel = (label = 'Button'): string => label;

export default {
  component: Button,
  title: 'Components/Button',
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

export const Primary = () => <Button onClick={onClick}>{getLabel()}</Button>;

export const Secondary = () => (
  <Button onClick={onClick} variant={ButtonVariant.Secondary}>
    {getLabel()}
  </Button>
);

export const Supplementary = () => (
  <Button onClick={onClick} variant={ButtonVariant.Supplementary} iconStart={<IconTrash />}>
    {getLabel()}
  </Button>
);

export const Small = () => (
  <Button onClick={onClick} size={ButtonSize.Small}>
    {getLabel()}
  </Button>
);

export const Danger = () => (
  <Button onClick={onClick} variant={ButtonVariant.Danger}>
    {getLabel()}
  </Button>
);

export const Disabled = () => (
  <Button onClick={onClick} disabled>
    {getLabel()}
  </Button>
);

export const Success = () => (
  <Button onClick={onClick} variant={ButtonVariant.Success}>
    {getLabel()}
  </Button>
);

export const FullWidth = () => (
  <Button onClick={onClick} fullWidth>
    {getLabel()}
  </Button>
);
FullWidth.storyName = 'Full width';

export const Icons = () => (
  <>
    <Button onClick={onClick} iconStart={<IconShare />}>
      {getLabel()}
    </Button>

    <Button onClick={onClick} iconEnd={<IconAngleRight />}>
      {getLabel()}
    </Button>

    <Button onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />}>
      {getLabel()}
    </Button>

    <Button onClick={onClick} iconStart={<IconShare />} size={ButtonSize.Small}>
      {getLabel()}
    </Button>

    <Button onClick={onClick} iconEnd={<IconAngleRight />} size={ButtonSize.Small}>
      {getLabel()}
    </Button>

    <Button onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />} size={ButtonSize.Small}>
      {getLabel()}
    </Button>
  </>
);

export const Themes = () => (
  <>
    <Button onClick={onClick} theme={ButtonTheme.Coat}>
      {getLabel('coat')}
    </Button>

    <Button onClick={onClick} theme={ButtonTheme.Coat} variant={ButtonVariant.Secondary}>
      {getLabel('coat')}
    </Button>

    <Button
      onClick={onClick}
      theme={ButtonTheme.Coat}
      variant={ButtonVariant.Supplementary}
      iconEnd={<IconAngleRight />}
    >
      {getLabel('coat')}
    </Button>

    <Button theme={ButtonTheme.Black} onClick={onClick} variant={ButtonVariant.Primary}>
      {getLabel('black')}
    </Button>

    <Button theme={ButtonTheme.Black} onClick={onClick} variant={ButtonVariant.Secondary}>
      {getLabel('black')}
    </Button>

    <Button
      theme={ButtonTheme.Black}
      onClick={onClick}
      iconEnd={<IconAngleRight />}
      variant={ButtonVariant.Supplementary}
    >
      {getLabel('black')}
    </Button>
  </>
);

export const CustomTheme = () => {
  const customTheme: ButtonCustomTheme = {
    '--background-color-active': 'darkorange',
    '--background-color-focus': 'orange',
    '--background-color-hover': 'orange',
    '--background-color': 'grey',
    '--border-color-active': 'darkorange',
    '--border-color': 'grey',
  };
  return (
    <Button onClick={onClick} theme={customTheme} variant={ButtonVariant.Primary}>
      {getLabel('custom')}
    </Button>
  );
};

export const Loading = () => (
  <Button isLoading loadingText="Saving your changes">
    {getLabel()}
  </Button>
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
    <Button
      {...{ ...args, iconStart: args.variant === ButtonVariant.Supplementary ? <IconTrash /> : undefined }}
      onClick={onButtonClick}
      isLoading={isLoading}
      loadingText="Saving your changes"
    >
      {getLabel()}
    </Button>
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
    <Button
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
    </Button>
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
  variant: ButtonVariant.Primary,
  theme: ButtonTheme.Bus,
  size: ButtonSize.Medium,
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
    options: ['bus', 'coat', 'black'],
    control: { type: 'radio' },
  },
  size: {
    options: ['medium', 'small'],
    control: { type: 'radio' },
  },
};

export const LinkButton = () => (
  <Button
    onClick={() => {
      window.open('/');
    }}
    role="link"
    aria-label='Link to "/"'
  >
    Button used as a link
  </Button>
);
