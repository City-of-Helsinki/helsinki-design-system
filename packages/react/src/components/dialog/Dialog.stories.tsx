import React, { useRef, useState } from 'react';

import { Button } from '../button/Button';
import { TextArea } from '../textarea/TextArea';
import { TextInput } from '../textInput/TextInput';
import { Dialog } from './Dialog';
import { IconAlertCircle, IconInfoCircle, IconPlusCircle, IconTrash } from '../../icons';
import { DateInput } from '../dateInput';

const argTypes = {
  variant: {
    options: ['primary', 'danger'],
    control: { type: 'radio' },
    defaultValue: 'primary',
  },
};

export default {
  component: Dialog,
  title: 'Components/Dialog',
  parameters: {
    controls: { expanded: true },
    loki: { skip: true },
  },
  args: {
    id: 'example-dialog',
    scrollable: false,
    boxShadow: false,
    theme: {},
    style: {},
    closeButtonLabelText: 'Close',
  },
  argTypes,
};

export const Default = (args) => {
  const openButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const titleId = 'custom-dialog-title';
  const descriptionId = 'custom-dialog-content';

  return (
    <>
      <Button ref={openButtonRef} onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        id={args.id}
        scrollable={args.scrollable}
        boxShadow={args.boxShadow}
        theme={args.theme}
        style={args.style}
        variant={args.variant}
        closeButtonLabelText={args.closeButtonLabelText}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        isOpen={open}
        focusAfterCloseRef={openButtonRef}
        close={close}
      >
        <Dialog.Header id={titleId} title="Add new item" iconLeft={<IconPlusCircle aria-hidden="true" />} />
        <Dialog.Content>
          <p id={descriptionId} className="text-body">
            Add a new item by filling the information below. All fields are mandatory.
          </p>
          <TextInput
            id="item-name"
            label="Item name"
            placeholder="E.g. Item 1"
            helperText="Item's name must be unique."
            required
          />
          <br />
          <TextArea
            id="item-description"
            label="Item description"
            placeholder="E.g. Item 1 is the first item of the system."
            required
          />
          <br />
          <DateInput id="item-date" label="Item date" required helperText="Use format D.M.YYYY" />
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

// This dialog story is part of Loki's visual regression tests. It is open by default, and it is not part of the Storybooks' docs section.
export const WithBoxShadow = (args) => {
  const dialogTargetElement = document.getElementById('root'); // Because of the story regression tests, we need to render the dialog into the root element
  const openButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(true);
  const close = () => setOpen(false);
  const titleId = 'custom-dialog-title';
  const descriptionId = 'custom-dialog-content';

  return (
    <>
      <Button ref={openButtonRef} onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        id={args.id}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        boxShadow
        isOpen={open}
        focusAfterCloseRef={openButtonRef}
        close={close}
        closeButtonLabelText="Close"
        targetElement={dialogTargetElement}
      >
        <Dialog.Header id={titleId} title="Add new item" iconLeft={<IconPlusCircle aria-hidden="true" />} />
        <Dialog.Content>
          <p id={descriptionId} className="text-body">
            Add a new item by filling the information below. All fields are mandatory.
          </p>
          <TextInput
            id="item-name"
            label="Item name"
            placeholder="E.g. Item 1"
            helperText="Item's name must be unique."
            required
          />
          <br />
          <TextArea
            id="item-description"
            label="Item description"
            placeholder="E.g. Item 1 is the first item of the system."
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

WithBoxShadow.storyName = 'With box shadow';

WithBoxShadow.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: false },
};

// This dialog story is part of Loki's visual regression tests. It is open by default, and it is not part of the Storybooks' docs section.
export const Confirmation = (args) => {
  const dialogTargetElement = document.getElementById('root'); // Because of the story regression tests, we need to render the dialog into the root element
  const openConfirmationButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(true);
  const close = () => setOpen(false);
  const titleId = 'confirmation-dialog-title';
  const descriptionId = 'confirmation-dialog-description';

  return (
    <>
      <Button ref={openConfirmationButtonRef} onClick={() => setOpen(true)}>
        Open Confirmation Dialog
      </Button>
      <Dialog
        id={args.id}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        isOpen={open}
        focusAfterCloseRef={openConfirmationButtonRef}
        targetElement={dialogTargetElement}
      >
        <Dialog.Header id={titleId} title="Confirm dialog" iconLeft={<IconAlertCircle aria-hidden="true" />} />
        <Dialog.Content>
          <p id={descriptionId} className="text-body">
            Are you sure you want to continue?
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

Confirmation.storyName = 'Confirmation';

Confirmation.args = {
  id: 'confirmation-dialog',
};

Confirmation.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: false },
};

// This dialog story is part of Loki's visual regression tests. It is open by default, and it is not part of the Storybooks' docs section.
export const Danger = (args) => {
  const dialogTargetElement = document.getElementById('root'); // Because of the story regression tests, we need to render the dialog into the root element
  const openDangerButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(true);
  const close = () => setOpen(false);
  const titleId = 'danger-dialog-title';
  const descriptionId = 'danger-dialog-description';

  return (
    <>
      <Button variant="danger" ref={openDangerButtonRef} onClick={() => setOpen(true)}>
        Open Danger Dialog
      </Button>
      <Dialog
        variant="danger"
        id={args.id}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        isOpen={open}
        focusAfterCloseRef={openDangerButtonRef}
        targetElement={dialogTargetElement}
      >
        <Dialog.Header id={titleId} title="Delete item" iconLeft={<IconAlertCircle aria-hidden="true" />} />
        <Dialog.Content>
          <p id={descriptionId} className="text-body">
            Are you sure you want to delete the item?
          </p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button theme="black" variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="danger"
            iconLeft={<IconTrash aria-hidden="true" />}
            onClick={() => {
              // Add confirm operations here
              close();
            }}
          >
            Delete
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
    </>
  );
};

Danger.storyName = 'Danger';

Danger.args = {
  id: 'danger-dialog',
};

Danger.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: false },
};

// This dialog story is part of Loki's visual regression tests. It is open by default, and it is not part of the Storybooks' docs section.
export const ScrollableConfirmation = (args) => {
  const dialogTargetElement = document.getElementById('root'); // Because of the story regression tests, we need to render the dialog into the root element
  const openScrollableConfirmationButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(true);
  const close = () => setOpen(false);
  const titleId = 'confirmation-scrollable-title';
  const descriptionId = 'confirmation-scrollable-description';

  return (
    <>
      <Button ref={openScrollableConfirmationButtonRef} onClick={() => setOpen(true)}>
        Open Scrollable Confirmation Dialog
      </Button>
      <Dialog
        id={args.id}
        style={{ width: '800px' }}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        isOpen={open}
        focusAfterCloseRef={openScrollableConfirmationButtonRef}
        targetElement={dialogTargetElement}
        scrollable
      >
        <Dialog.Header id={titleId} title="Confirm dialog" iconLeft={<IconAlertCircle aria-hidden="true" />} />
        <Dialog.Content>
          <h3 id={descriptionId}>Are you sure you want to continue?</h3>
          <p className="text-body">
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

          <p className="text-body">
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

          <p className="text-body">
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

          <p className="text-body">
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
};

ScrollableConfirmation.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: false },
};

// This dialog story is part of Loki's visual regression tests. It is open by default, and it is not part of the Storybooks' docs section.
export const LongButtonLabels = (args) => {
  const dialogTargetElement = document.getElementById('root'); // Because of the story regression tests, we need to render the dialog into the root element
  const openDialogButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(true);
  const close = () => setOpen(false);
  const titleId = 'dialog-with-long-labels-title';

  return (
    <>
      <Button ref={openDialogButtonRef} onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        id={args.id}
        aria-labelledby={titleId}
        isOpen={open}
        focusAfterCloseRef={openDialogButtonRef}
        targetElement={dialogTargetElement}
      >
        <Dialog.Header id={titleId} title="Confirm dialog" iconLeft={<IconAlertCircle aria-hidden="true" />} />
        <Dialog.Content>
          <h3>Are you sure you want to continue?</h3>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              // Add confirm operations here
              close();
            }}
          >
            Confirm this thing now with a long label
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel and go back to the beginning
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
    </>
  );
};

LongButtonLabels.storyName = 'With long button labels';

LongButtonLabels.args = {
  id: 'dialog-with-long-button-labels',
};

LongButtonLabels.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: false },
};

// This dialog story is not part of the Storybooks' docs section.
export const ConfirmationWithTerms = (args) => {
  const openConfirmationButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [termsOpen, setTermsOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const openTermsButtonRef = useRef(null);
  const closeTerms = () => setTermsOpen(false);
  const openTermsDialog = () => setTermsOpen(true);
  const confirmationTitleId = 'confirmation-title';
  const confirmationDescriptionId = 'confirmation-description';
  const termsTitleId = 'terms-title';
  const termsDescriptionId = 'terms-description';

  return (
    <>
      <Button ref={openConfirmationButtonRef} onClick={() => setOpen(true)}>
        Open Accept Terms Dialog
      </Button>
      <Dialog
        id={args.id}
        style={{ width: '800px' }}
        aria-labelledby={confirmationTitleId}
        aria-describedby={confirmationDescriptionId}
        isOpen={open}
        focusAfterCloseRef={openConfirmationButtonRef}
      >
        <Dialog.Header
          id={confirmationTitleId}
          title="Accept terms dialog"
          iconLeft={<IconAlertCircle aria-hidden="true" />}
        />
        <Dialog.Content>
          <p id={confirmationDescriptionId} className="text-body">
            Do you want to accept terms of the service?
            <br />
            <br />
            <Button
              variant="secondary"
              iconLeft={<IconInfoCircle aria-hidden="true" />}
              ref={openTermsButtonRef}
              onClick={() => openTermsDialog()}
            >
              Open service terms dialog
            </Button>
          </p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              // Add confirm operations here
              close();
            }}
          >
            Accept terms
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
      <Dialog
        id={args.termsId}
        aria-labelledby={termsTitleId}
        aria-describedby={termsDescriptionId}
        isOpen={termsOpen}
        focusAfterCloseRef={openTermsButtonRef}
        close={closeTerms}
        closeButtonLabelText="Close terms dialog"
      >
        <Dialog.Header id={termsTitleId} title="Service terms" />
        <Dialog.Content>
          <p id={termsDescriptionId} className="text-body">
            These are the terms of the service.
          </p>
          <p className="text-body">
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
              closeTerms();
            }}
          >
            Close
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
    </>
  );
};

ConfirmationWithTerms.storyName = 'Confirmation dialog with terms dialog';

ConfirmationWithTerms.parameters = {
  loki: { skip: true },
};

ConfirmationWithTerms.args = {
  id: 'confirmation-dialog',
  termsId: 'terms-dialog',
};

ConfirmationWithTerms.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};

export const WithControlledContent = (args) => {
  const openButtonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const titleId = 'custom-dialog-title';
  const descriptionId = 'custom-dialog-content';
  const [textInputValue, setTextInputValue] = useState('');
  const [textAreaInputValue, setTextAreaInputValue] = useState('');

  return (
    <>
      <Button ref={openButtonRef} onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        id={args.id}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        isOpen={open}
        focusAfterCloseRef={openButtonRef}
        close={close}
        closeButtonLabelText="Close"
      >
        <Dialog.Header id={titleId} title="Add new item" iconLeft={<IconPlusCircle aria-hidden="true" />} />
        <Dialog.Content>
          <p id={descriptionId} className="text-body">
            Add a new item by filling the information below. All fields are mandatory.
          </p>
          <TextInput
            id="item-name"
            label="Item name"
            placeholder="E.g. Item 1"
            helperText="Item's name must be unique."
            onChange={(event) => setTextInputValue(event.target.value)}
            value={textInputValue}
            required
          />
          <br />
          <TextArea
            id="item-description"
            label="Item description"
            placeholder="E.g. Item 1 is the first item of the system."
            onChange={(event) => setTextAreaInputValue(event.target.value)}
            value={textAreaInputValue}
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

WithControlledContent.storyName = 'With controlled content';
WithControlledContent.parameters = {
  loki: { skip: true },
};
