import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile, IconTrash } from '../../icons';
import { Button, ButtonTheme, ButtonSize, ButtonPresetTheme, ButtonVariant, ButtonProps } from './Button';
import { LoadingSpinner } from '../loadingSpinner';

const onClick = action('button-click');
const defaultLabel = 'Button';

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

export const Primary = () => (
  <Button data-playwright onClick={onClick}>
    Button
  </Button>
);

export const Secondary = () => (
  <Button data-playwright onClick={onClick} variant={ButtonVariant.Secondary}>
    Button
  </Button>
);

export const Supplementary = () => (
  <Button data-playwright onClick={onClick} variant={ButtonVariant.Supplementary} iconStart={<IconTrash />}>
    Button
  </Button>
);

export const Small = () => (
  <Button data-playwright onClick={onClick} size={ButtonSize.Small}>
    Button
  </Button>
);

export const Danger = () => (
  <Button data-playwright onClick={onClick} variant={ButtonVariant.Danger}>
    Button
  </Button>
);

export const Disabled = () => (
  <>
    <Button onClick={onClick} disabled>
      Button
    </Button>
    <Button onClick={onClick} variant={ButtonVariant.Secondary} disabled>
      Button
    </Button>
    <Button iconStart={<IconTrash />} onClick={onClick} variant={ButtonVariant.Supplementary} disabled>
      Button
    </Button>
    <Button onClick={onClick} variant={ButtonVariant.Success} disabled>
      Button
    </Button>
    <Button onClick={onClick} variant={ButtonVariant.Danger} disabled>
      Button
    </Button>
  </>
);

export const Success = () => (
  <Button data-playwright onClick={onClick} variant={ButtonVariant.Success}>
    Button
  </Button>
);

export const FullWidth = () => (
  <Button data-playwright onClick={onClick} fullWidth>
    Button
  </Button>
);
FullWidth.storyName = 'Full width';

export const Icons = () => (
  <>
    <Button data-playwright onClick={onClick} iconStart={<IconShare />}>
      Button
    </Button>

    <Button onClick={onClick} iconEnd={<IconAngleRight />}>
      Button
    </Button>

    <Button onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />}>
      Button
    </Button>

    <Button data-playwright onClick={onClick} iconStart={<IconShare />} size={ButtonSize.Small}>
      Button
    </Button>

    <Button onClick={onClick} iconEnd={<IconAngleRight />} size={ButtonSize.Small}>
      Button
    </Button>

    <Button onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />} size={ButtonSize.Small}>
      Button
    </Button>
  </>
);

export const Themes = () => (
  <>
    <Button data-playwright onClick={onClick} theme={ButtonPresetTheme.Coat}>
      Coat
    </Button>

    <Button data-playwright onClick={onClick} theme={ButtonPresetTheme.Coat} variant={ButtonVariant.Secondary}>
      Coat
    </Button>

    <Button
      data-playwright
      onClick={onClick}
      theme={ButtonPresetTheme.Coat}
      variant={ButtonVariant.Supplementary}
      iconEnd={<IconAngleRight />}
    >
      Coat
    </Button>

    <Button data-playwright theme={ButtonPresetTheme.Black} onClick={onClick} variant={ButtonVariant.Primary}>
      Black
    </Button>

    <Button data-playwright theme={ButtonPresetTheme.Black} onClick={onClick} variant={ButtonVariant.Secondary}>
      Black
    </Button>

    <Button
      data-playwright
      theme={ButtonPresetTheme.Black}
      onClick={onClick}
      iconEnd={<IconAngleRight />}
      variant={ButtonVariant.Supplementary}
    >
      Black
    </Button>
  </>
);

export const CustomTheme = () => {
  const customTheme: ButtonTheme = {
    '--background-color-active': 'darkorange',
    '--background-color-focus': 'green',
    '--background-color-hover': 'green',
    '--background-color': 'darkgreen',
    '--border-color-active': 'darkgreen',
    '--border-color': 'darkgreen',
  };
  return (
    <Button onClick={onClick} theme={customTheme} variant={ButtonVariant.Primary}>
      Custom
    </Button>
  );
};

export const Loading = () => (
  <Button disabled iconStart={<LoadingSpinner small />} variant={ButtonVariant.Clear} style={{ cursor: 'wait' }}>
    Saving your changes
  </Button>
);

export const LoadingOnClick = (args: ButtonProps) => {
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

  const variant = isLoading ? ButtonVariant.Clear : args.variant;

  return (
    <Button
      {...{ ...args, variant, iconStart: isLoading ? <LoadingSpinner small /> : args.iconStart }}
      onClick={onButtonClick}
      disabled={isLoading}
      style={{ cursor: isLoading ? 'wait' : '' }}
    >
      {isLoading ? 'Saving your changes' : 'Button'}
    </Button>
  );
};
LoadingOnClick.args = {
  variant: 'primary',
};

export const Playground = ({ label, variant, theme, size, disabled, fullWidth, iconStart, iconEnd, ...args }) => {
  return (
    <Button
      variant={variant}
      theme={theme}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      iconStart={iconStart ? <IconFaceSmile /> : null}
      iconEnd={iconEnd ? <IconFaceSmile /> : null}
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
  label: defaultLabel,
  variant: ButtonVariant.Primary,
  theme: ButtonPresetTheme.Bus,
  size: ButtonSize.Medium,
  disabled: false,
  fullWidth: false,
  iconStart: false,
  iconEnd: false,
};

Playground.argTypes = {
  variant: {
    options: Object.values(ButtonVariant),
    control: { type: 'radio' },
  },
  theme: {
    options: Object.values(ButtonPresetTheme),
    control: { type: 'radio' },
  },
  size: {
    options: Object.values(ButtonSize),
    control: { type: 'radio' },
  },
  iconStart: {
    control: { type: 'boolean' },
  },
  iconEnd: {
    control: { type: 'boolean' },
  },
};

export const LinkButton = () => (
  <Button
    data-playwright
    onClick={() => {
      window.open('/');
    }}
    role="link"
    aria-label='Link to "/"'
  >
    Button used as a link
  </Button>
);
