import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, radios, text, withKnobs } from '@storybook/addon-knobs';
import { Props, Stories, Subtitle, Title } from '@storybook/addon-docs/dist/blocks';

import Button from './Button';
import { IconShare, IconAngleRight, IconSmile } from '../../icons';

const onClick = action('button-click');

export default {
  component: Button,
  title: 'Components/Button',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <Subtitle>Props, which are not mentioned below, are spread into the component</Subtitle>
          <Props />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

/**
 * Primary
 */
export const Primary = () => <Button onClick={onClick}>Button</Button>;

/**
 * Secondary
 */
export const Secondary = () => (
  <Button onClick={onClick} variant="secondary">
    Button
  </Button>
);

/**
 * Supplementary
 */
export const Supplementary = () => (
  <Button onClick={onClick} variant="supplementary">
    Button
  </Button>
);

/**
 * Small
 */
export const Small = () => (
  <Button onClick={onClick} size="small">
    Button
  </Button>
);

/**
 * Full width
 */
export const FullWidth = () => (
  <Button onClick={onClick} fullWidth>
    Button
  </Button>
);

FullWidth.story = {
  name: 'Full width',
};

/**
 * Icons
 */
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

/**
 * Playground
 */
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
      iconLeft={iconLeft ? <IconSmile /> : null}
      iconRight={iconRight ? <IconSmile /> : null}
    >
      {label}
    </Button>
  );
};

Playground.story = {
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    docs: {
      disable: true,
    },
  },
};
