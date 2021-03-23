import React, { useState } from 'react';

import { Button } from '../button/Button';
import { TextArea } from '../textarea/TextArea';
import { TextInput } from '../textInput/TextInput';
import { Dialog } from './Dialog';
import { IconAlertCircle, IconPlusCircle } from '../../icons';

export default {
  component: Dialog,
  title: 'Components/Dialog',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'example-dialog',
    'aria-labelled-by': 'example-dialog-title',
    'aria-describedby': 'example-dialog-content',
    focusAfterCloseId: 'open-dialog-button',
  },
};

export const Default = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button id={args.focusAfterCloseId} onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        id={args.id}
        aria-labelledby={args['aria-labelledby']}
        aria-describedby={args['aria-describedby']}
        isOpen={open}
        close={close}
        focusAfterCloseId={args.focusAfterCloseId}
      >
        <Dialog.Header
          id={args['aria-labelledby']}
          title="Add new item"
          iconLeft={<IconPlusCircle aria-hidden="true" />}
        />
        <Dialog.Content>
          <p id={args['aria-describedby']}>Add new item form. All fields are mandatory.</p>
          <TextInput
            id="item-name"
            label="Item name"
            placeholder="E.g. Item 1"
            helperText="Item's name is a mandatory field."
            required
          />
          <br />
          <TextArea
            id="item-description"
            label="Item description"
            placeholder="E.g. Item 1 is the first item of the system."
            helperText="Item's description is a mandatory field."
            required
          />
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              console.log('Add item');
              close();
            }}
          >
            Add item
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
    </>
  );
};

export const Confirmation = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button id={args.focusAfterCloseId} onClick={() => setOpen(true)}>
        Open Confirmation Dialog
      </Button>
      <Dialog
        id={args.id}
        aria-labelledby={args['aria-labelledby']}
        aria-describedby={args['aria-describedby']}
        isOpen={open}
        close={close}
        focusAfterCloseId={args.focusAfterCloseId}
      >
        <Dialog.Header
          id={args['aria-labelledby']}
          title="Confirm dialog"
          iconLeft={<IconAlertCircle aria-hidden="true" />}
        />
        <Dialog.Content>
          <p id={args['aria-describedby']}>Are you sure you want to continue?</p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              console.log('Confirm');
              close();
            }}
          >
            Confirm
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
    </>
  );
};

Confirmation.storyName = 'Confirmation';

Confirmation.args = {
  id: 'delete-dialog',
  'aria-labelledby': 'delete-dialog-title',
  'aria-describedby': 'delete-dialog-description',
  focusAfterCloseId: 'open-confimation-dialog-button',
};
