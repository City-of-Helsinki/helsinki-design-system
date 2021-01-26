import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, radios, text, withKnobs } from '@storybook/addon-knobs';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile, IconTrash } from '../../icons';
import { Button } from './Button';

const onClick = action('button-click');

export default {
  component: Button,
  title: 'Components/Button',
  decorators: [withKnobs],
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

export const Loading = (args) => {
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
    <>
      <Button
        {...{ ...args, iconLeft: args.variant === 'supplementary' ? <IconTrash /> : undefined }}
        onClick={onButtonClick}
        isLoading={isLoading}
        loadingText="Saving your changes"
      >
        Button
      </Button>
    </>
  );
};
Loading.args = {
  variant: 'primary',
};

export const Playground = () => {
  const label = text('Label', 'Button');
  const variant = radios(
    'Variant',
    {
      primary: 'primary',
      secondary: 'secondary',
      supplementary: 'supplementary',
      success: 'success',
      danger: 'danger',
    },
    'primary',
  );
  const theme = radios(
    'Theme',
    {
      default: 'default',
      coat: 'coat',
      black: 'black',
    },
    'default',
  );
  const size = radios('Size', { default: 'default', small: 'small' }, 'default');
  const disabled = boolean('Disabled', false);
  const fullWidth = boolean('Full width', false);
  const iconLeft = boolean('Icon left', false);
  const iconRight = boolean('Icon right', false);
  const isLoading = boolean('Is loading', false);
  const loadingText = text('Loading text', 'Saving your changes');

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
