import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, radios, text, withKnobs } from '@storybook/addon-knobs';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile } from '../../icons';
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
  <Button onClick={onClick} variant="supplementary">
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

  return (
    <Button
      variant={variant}
      theme={theme}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      iconLeft={iconLeft ? <IconFaceSmile /> : null}
      iconRight={iconRight ? <IconFaceSmile /> : null}
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
