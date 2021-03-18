import React, { useState } from 'react';

import { Button } from '../button/Button';
import { Dialog } from './Dialog';
import { IconAlertCircle } from '../../icons';

export default {
  component: Dialog,
  title: 'Components/Dialog',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'example-dialog',
    titleId: 'example-dialog-title',
    contentId: 'example-dialog-content',
  },
};

export const Example = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog id={args.id} aria-labelledby={args.titleId} aria-describedby={args.contentId} isOpen={open} close={close}>
        <Dialog.Header id={args.titleId} title="Confirmation dialog" iconLeft={<IconAlertCircle />} />
        <Dialog.Content id={args.contentId}>
          <p>Are you sure you want to continue?</p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              console.log('confirm');
              close();
            }}
          >
            Continue
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
    </>
  );
};
