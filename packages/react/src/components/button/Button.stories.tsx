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
      <Button onClick={action('button-click')} size="small" iconLeft={<IconShare />}>
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
      <Button onClick={action('button-click')} fullWidth size="small" iconLeft={<IconShare />}>
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
      <Button onClick={action('button-click')} variant="secondary">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        variant="secondary"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        variant="secondary"
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
      <Button onClick={action('button-click')} variant="supplementary">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        variant="supplementary"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
      <br />
      <br />
      <Button
        onClick={action('button-click')}
        variant="supplementary"
        size="small"
        iconLeft={<IconShare />}
        iconRight={<IconAngleRight />}
      >
        Button
      </Button>
    </>
  ))
  .add('theme', () => (
    <>
      <Button onClick={action('button-click')} theme="bus">
        Bus (default)
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" theme="bus">
        Bus (default)
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" theme="bus">
        Bus (default)
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} theme="engel">
        Engel
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="secondary" theme="engel">
        Engel
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="supplementary" theme="engel">
        Engel
      </Button>
      <br />
      <br />
    </>
  ));
