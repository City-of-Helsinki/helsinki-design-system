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
        focusAfterCloseId={args.focusAfterCloseId}
      >
        <Dialog.Header
          id={args['aria-labelledby']}
          title="Add new item"
          iconLeft={<IconPlusCircle aria-hidden="true" />}
          close={close}
          closeButtonAriaLabel="Close"
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
              // Add operations here
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
              // Add confirm operations here
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
  id: 'confirmation-dialog',
  'aria-labelledby': 'confirmation-dialog-title',
  'aria-describedby': 'confirmation-dialog-description',
  focusAfterCloseId: 'open-confirmation-dialog-button',
};

export const ScrollableConfirmation = (args) => {
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
        scrollable
      >
        <Dialog.Header
          id={args['aria-labelledby']}
          title="Confirm dialog"
          iconLeft={<IconAlertCircle aria-hidden="true" />}
        />
        <Dialog.Content>
          <h3 id={args['aria-describedby']}>Are you sure you want to continue?</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?
          </p>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?
          </p>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?
          </p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              // Add confirm operations here
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

ScrollableConfirmation.storyName = 'Scrollable confirmation';

ScrollableConfirmation.args = {
  id: 'confirmation-scrollable-dialog',
  'aria-labelledby': 'confirmation-scrollable-title',
  'aria-describedby': 'confirmation-scrollable-description',
  focusAfterCloseId: 'open-confirmation-scrollable-dialog-button',
};
