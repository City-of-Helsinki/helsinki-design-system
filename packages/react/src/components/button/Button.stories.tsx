import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile, IconTrash } from '../../icons';
import { Button } from './Button';

const onClick = action('button-click');

export default {
  component: Button,
  title: 'Components/Button',
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

export const Primary = () => <Button onClick={onClick}>Button</Button>;

export const Secondary = () => (
  <Button onClick={onClick} variant="secondary">
    Button
  </Button>
);

export const Supplementary = () => (
  <Button onClick={onClick} variant="supplementary" iconLeft={<IconTrash />}>
    Button
  </Button>
);

export const Small = () => (
  <Button onClick={onClick} size="small">
    Button
  </Button>
);

export const FullWidth = () => (
  <Button onClick={onClick} fullWidth>
    Button
  </Button>
);
FullWidth.storyName = 'Full width';

export const Icons = () => (
  <>
    <Button onClick={onClick} iconLeft={<IconShare />}>
      Button
    </Button>

    <br />
    <br />

    <Button onClick={onClick} iconRight={<IconAngleRight />}>
      Button
    </Button>

    <br />
    <br />

    <Button onClick={onClick} iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
      Button
    </Button>
  </>
);

export const Loading = () => (
  <Button isLoading loadingText="Saving your changes">
    Button
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
      {...{ ...args, iconLeft: args.variant === 'supplementary' ? <IconTrash /> : undefined }}
      onClick={onButtonClick}
      isLoading={isLoading}
      loadingText="Saving your changes"
    >
      Button
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
  iconLeft,
  iconRight,
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
      iconLeft={iconLeft ? <IconFaceSmile /> : null}
      iconRight={iconRight ? <IconFaceSmile /> : null}
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
  label: 'Button',
  variant: 'primary',
  theme: 'default',
  size: 'default',
  disabled: false,
  fullWidth: false,
  iconLeft: false,
  iconRight: false,
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
