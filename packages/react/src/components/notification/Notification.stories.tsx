import React, { useEffect, useState } from 'react';
import { boolean, number, radios, text, withKnobs } from '@storybook/addon-knobs';

import Notification, { NotificationInlineSize, NotificationToastSize } from './Notification';
import Button from '../button/Button';

const props = {
  label: 'Label',
};
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export default {
  component: Notification,
  title: 'Components/Notification',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Default = () => <Notification {...props}>{content}</Notification>;

export const Alert = () => (
  <Notification {...props} type="alert">
    {content}
  </Notification>
);

export const Error = () => (
  <Notification {...props} type="error">
    {content}
  </Notification>
);

export const Success = () => (
  <Notification {...props} type="success">
    {content}
  </Notification>
);

export const Small = () => <Notification {...props} size="small" />;

export const Large = () => (
  <Notification {...props} size="large">
    {content}
  </Notification>
);

export const Invisible = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle notification</Button>
      {open && (
        <Notification label="Invisible notification" invisible>
          I&apos;m only seen by screen readers
        </Notification>
      )}
    </>
  );
};

export const Dismissible = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {!open && <Button onClick={() => setOpen(true)}>Open notification</Button>}
      {open && (
        <Notification {...props} dismissible onClose={() => setOpen(false)} closeButtonLabelText="Close notification">
          {content}
        </Notification>
      )}
    </>
  );
};

export const AutoClose = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && <Button onClick={() => setOpen(true)}>Open notification</Button>}
      {open && (
        <Notification
          {...props}
          position="top-center"
          autoClose
          autoCloseDuration={3000}
          onClose={() => setOpen(false)}
        >
          {content}
        </Notification>
      )}
    </>
  );
};

export const Playground = () => {
  const [open, setOpen] = useState(true);
  const label = text('Label', 'Label');
  const body = text('Content', content);
  const closeButtonLabelText = text('Close button label text', 'Close notification');
  const type = radios(
    'Type',
    {
      info: 'info',
      success: 'success',
      alert: 'alert',
      error: 'error',
    },
    'info',
  );
  const size = radios(
    'Size',
    {
      default: 'default',
      small: 'small',
      large: 'large',
    },
    'default',
  );
  const position = radios(
    'Position',
    {
      inline: 'inline',
      'top-left': 'top-left',
      'top-center': 'top-center',
      'top-right': 'top-right',
      'bottom-left': 'bottom-left',
      'bottom-center': 'bottom-center',
      'bottom-right': 'bottom-right',
    },
    'inline',
  );
  const invisible = boolean('Invisible', false);
  const dismissible = boolean('Dismissible', false);
  const autoClose = boolean('Close automatically', false);
  const autoCloseDuration = number('Auto close duration', 6000);

  useEffect(() => {
    if (position === 'inline') setOpen(true);
  }, [position]);

  let typedSize;
  position === 'inline' ? (typedSize = size as NotificationInlineSize) : (typedSize = size as NotificationToastSize);

  return (
    <>
      <Button
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => setOpen(!open)}
      >
        Toggle notification
      </Button>
      {open && (
        <Notification
          autoClose={autoClose}
          autoCloseDuration={autoCloseDuration}
          invisible={invisible}
          label={label}
          type={type}
          onClose={() => setOpen(false)}
          position={position}
          size={typedSize}
          dismissible={dismissible}
          closeButtonLabelText={closeButtonLabelText}
        >
          {size !== 'small' && body}
        </Notification>
      )}
    </>
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
