import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fn } from '@storybook/test';
import React, { useEffect, useState } from 'react';

import { IconFaceSmile } from '../../icons/IconFaceSmile';
import { IconTrash } from '../../icons/IconTrash';
import { Button, ButtonPresetTheme, ButtonSize, ButtonTheme, ButtonVariant } from './Button';
import { IconShare } from '../../icons/IconShare';
import { IconAngleRight } from '../../icons/IconAngleRight';
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    // variants: {
    //   enable: true,
    //   include: ['size', 'variant', 'disabled'],
    // },
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      options: Object.values(ButtonSize),
      control: { type: 'radio' },
    },
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: 'radio' },
    },
    iconStart: {
      control: 'boolean',
    },
    iconEnd: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    theme: {
      options: Object.values(ButtonPresetTheme),
      control: { type: 'radio' },
    },
  },
  args: {
    disabled: false,
    fullWidth: false,
    iconStart: false,
    iconEnd: false,
    onClick: fn(),
    size: ButtonSize.Medium,
    variant: ButtonVariant.Primary,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => {
    const { iconStart, iconEnd, children, ...rest } = args;
    return (
      <Button
        iconStart={iconStart ? <IconFaceSmile /> : undefined}
        iconEnd={iconEnd ? <IconFaceSmile /> : undefined}
        {...rest}
      >
        {children}
      </Button>
    );
  },
};

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: ButtonVariant.Primary,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: ButtonVariant.Secondary,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const Supplementary: Story = {
  args: {
    children: 'Button',
    variant: ButtonVariant.Supplementary,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const Small: Story = {
  args: {
    children: 'Button',
    size: ButtonSize.Small,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const Danger: Story = {
  args: {
    children: 'Button',
    variant: ButtonVariant.Danger,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <>
        <Button {...rest}>{children}</Button>
        <Button {...rest} variant={ButtonVariant.Secondary}>
          {children}
        </Button>
        <Button {...rest} iconStart={<IconTrash />} variant={ButtonVariant.Supplementary}>
          {children}
        </Button>
        <Button {...rest} variant={ButtonVariant.Success}>
          {children}
        </Button>
        <Button {...rest} variant={ButtonVariant.Danger}>
          {children}
        </Button>
      </>
    );
  },
};

export const Success: Story = {
  args: {
    children: 'Button',
    variant: ButtonVariant.Success,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Button',
    fullWidth: true,
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button {...rest} data-playwright>
        {children}
      </Button>
    );
  },
};

export const Icons: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => {
    const { children } = args;
    return (
      <>
        <Button data-playwright iconStart={<IconShare />}>
          {children}
        </Button>
        <Button iconEnd={<IconAngleRight />}>{children}</Button>
        <Button iconStart={<IconShare />} iconEnd={<IconAngleRight />}>
          {children}
        </Button>
        <Button data-playwright iconStart={<IconShare />} size={ButtonSize.Small}>
          {children}
        </Button>
        <Button iconEnd={<IconAngleRight />} size={ButtonSize.Small}>
          {children}
        </Button>
        <Button iconStart={<IconShare />} iconEnd={<IconAngleRight />} size={ButtonSize.Small}>
          {children}
        </Button>
      </>
    );
  },
};

export const Loading = () => (
  <Button disabled iconStart={<LoadingSpinner small />} variant={ButtonVariant.Clear} style={{ cursor: 'wait' }}>
    Saving your changes
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

export const Themes: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => {
    const { ...rest } = args;
    return (
      <>
        <Button {...rest} data-playwright theme={ButtonPresetTheme.Coat}>
          Coat
        </Button>

        <Button {...rest} data-playwright theme={ButtonPresetTheme.Coat} variant={ButtonVariant.Secondary}>
          Coat
        </Button>

        <Button
          {...rest}
          data-playwright
          theme={ButtonPresetTheme.Coat}
          variant={ButtonVariant.Supplementary}
          iconEnd={<IconAngleRight />}
        >
          Coat
        </Button>

        <Button {...rest} data-playwright theme={ButtonPresetTheme.Black} variant={ButtonVariant.Primary}>
          Black
        </Button>

        <Button {...rest} data-playwright theme={ButtonPresetTheme.Black} variant={ButtonVariant.Secondary}>
          Black
        </Button>

        <Button
          {...rest}
          data-playwright
          theme={ButtonPresetTheme.Black}
          iconEnd={<IconAngleRight />}
          variant={ButtonVariant.Supplementary}
        >
          Black
        </Button>
      </>
    );
  },
};

export const CustomTheme: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => {
    const customTheme: ButtonTheme = {
      '--background-color-active': 'darkorange',
      '--background-color-focus': 'orange',
      '--background-color-hover': 'orange',
      '--background-color': 'grey',
      '--border-color-active': 'darkorange',
      '--border-color': 'grey',
    };
    return (
      <Button {...args} theme={customTheme} variant={ButtonVariant.Primary}>
        Custom
      </Button>
    );
  },
};

export const Link: Story = {
  args: {
    children: 'Button used as a link',
  },
  render: (args) => {
    const { children, ...rest } = args;
    return (
      <Button
        {...rest}
        onClick={() => {
          window.open('/');
        }}
        role="link"
        aria-label='Link to "/"'
      >
        {children}
      </Button>
    );
  },
};
