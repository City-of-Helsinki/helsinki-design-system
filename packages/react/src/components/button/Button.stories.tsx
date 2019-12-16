import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';
import { IconShare, IconAngleRight } from '../../icons';

(Button as React.FC).displayName = 'Button';

storiesOf('Button', module)
  .add('default', () => (
    <>
      <Button onClick={action('button-click')}>Button</Button>
      <br />
      <br />
      <Button onClick={action('button-click')} disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} size="small" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
    </>
  ))
  .add('full width', () => (
    <>
      <Button onClick={action('button-click')} fullWidth>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth iconRight={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} fullWidth iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        fullWidth
        size="small"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
    </>
  ))
  .add('secondary', () => (
    <>
      <Button onClick={action('button-click')} color="secondary">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="secondary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        color="secondary"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        color="secondary"
        size="small"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
    </>
  ))
  .add('tertiary', () => (
    <>
      <Button onClick={action('button-click')} color="tertiary">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="tertiary" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        color="tertiary"
        size="small"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
    </>
  ))
  .add('supplementary', () => (
    <>
      <Button onClick={action('button-click')} color="supplementary">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} color="supplementary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        color="supplementary"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        color="supplementary"
        size="small"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
    </>
  ));
