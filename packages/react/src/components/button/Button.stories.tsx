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
  .add('utility', () => (
    <>
      <Button onClick={action('button-click')} variant="success">
        Success
      </Button>
      <br />
      <br />
      <Button onClick={action('button-click')} variant="danger">
        Danger
      </Button>
    </>
  ))
  .add('themes', () => (
    <>
      <style>{`button {margin-right: var(--spacing-s)}`}</style>
      <h5>default | bus</h5>
      <Button onClick={action('button-click')}>Button</Button>
      <Button onClick={action('button-click')} variant="secondary">
        Button
      </Button>
      <Button onClick={action('button-click')} variant="supplementary">
        Button
      </Button>
      <h5>coat</h5>
      <Button onClick={action('button-click')} theme="coat">
        Button
      </Button>
      <Button onClick={action('button-click')} theme="coat" variant="secondary">
        Button
      </Button>
      <Button onClick={action('button-click')} theme="coat" variant="supplementary">
        Button
      </Button>
      <h5>black</h5>
      <Button onClick={action('button-click')} theme="black">
        Button
      </Button>
      <Button onClick={action('button-click')} theme="black" variant="secondary">
        Button
      </Button>
      <Button onClick={action('button-click')} theme="black" variant="supplementary">
        Button
      </Button>
    </>
  ));
