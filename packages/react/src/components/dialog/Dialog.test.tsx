import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Dialog, DialogProps } from './Dialog';
import { DialogHeaderProps } from './dialogHeader/DialogHeader';
import { IconAlertCircle } from '../../icons';

const descriptionId = 'test-dialog-description-id';
const descriptionText = 'This is a test dialog content';
const contentButtonText = 'Button inside Dialog';

const dialogHeaderProps: DialogHeaderProps = {
  id: 'test-dialog-title-id',
  title: 'test dialog title',
};

const dialogProps: DialogProps = {
  id: 'test-dialog-id',
  isOpen: false,
  'aria-labelledby': dialogHeaderProps.id,
  'aria-describedby': descriptionId,
  close: () => false,
  closeButtonAriaLabel: 'Close',
};

const renderOpenDialog = () =>
  render(
    <Dialog
      id={dialogProps.id}
      aria-labelledby={dialogProps['aria-labelledby']}
      aria-describedby={dialogProps['aria-describedby']}
      isOpen
      close={() => false}
      closeButtonAriaLabel={dialogProps.closeButtonAriaLabel}
    >
      <Dialog.Header
        id={dialogHeaderProps.id}
        title={dialogHeaderProps.title}
        iconLeft={<IconAlertCircle aria-hidden="true" />}
      />
      <Dialog.Content>
        <p id={dialogProps['aria-describedby']}>{descriptionText}</p>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <button type="button">{contentButtonText}</button>
      </Dialog.ActionButtons>
    </Dialog>,
  );

describe('<Dialog /> spec', () => {
  beforeEach(cleanup);

  it('renders the component', () => {
    // Because the dialog is rendered with React's createPortal inside the document.body we need to compare baseElement to snapshot.
    // Besides, it is beneficial to include the document.body into a snapshot since the dialog will toggle its class.
    const { baseElement } = renderOpenDialog();
    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    renderOpenDialog();
    const dialog = await axe(screen.queryByRole('dialog'));
    expect(dialog).toHaveNoViolations();
  });

  it('should rotate focus when user navigates with tabs', async () => {
    renderOpenDialog();
    expect(screen.getByText(dialogHeaderProps.title)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByText(contentButtonText)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByLabelText(dialogProps.closeButtonAriaLabel)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByText(contentButtonText)).toHaveFocus();
  });

  it('should rotate focus backwards when user navigates with shift + tab', async () => {
    renderOpenDialog();
    expect(screen.getByText(dialogHeaderProps.title)).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(screen.getByLabelText(dialogProps.closeButtonAriaLabel)).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(screen.getByText(contentButtonText)).toHaveFocus();
  });

  it('should shift focus to external open button after dialog close', async () => {
    const openButtonId = 'open-button-id';
    const openButtonText = 'Open Dialog';
    const OpenButtonAndDialog = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      return (
        <>
          <button id={openButtonId} type="button" onClick={() => setIsOpen(true)}>
            {openButtonText}
          </button>
          <Dialog
            id={dialogProps.id}
            aria-labelledby={dialogProps['aria-labelledby']}
            isOpen={isOpen}
            close={() => setIsOpen(false)}
            focusAfterCloseId={openButtonId}
          >
            <Dialog.Header id={dialogHeaderProps.id} title={dialogHeaderProps.title} />
            <Dialog.Content>
              <p>Dialog content</p>
            </Dialog.Content>
          </Dialog>
        </>
      );
    };
    render(<OpenButtonAndDialog />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(openButtonText)).not.toHaveFocus();
    act(() => {
      userEvent.click(screen.getByText(openButtonText));
    });
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByLabelText(dialogProps.closeButtonAriaLabel));
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(openButtonText)).toHaveFocus();
  });

  it('should close dialog when user presses Escape key', async () => {
    const DialogWithOpenState = () => {
      const [isOpen, setIsOpen] = useState<boolean>(true);
      return (
        <Dialog
          id={dialogProps.id}
          aria-labelledby={dialogProps['aria-labelledby']}
          isOpen={isOpen}
          close={() => setIsOpen(false)}
        >
          <Dialog.Header id={dialogHeaderProps.id} title={dialogHeaderProps.title} />
          <Dialog.Content>
            <p>Dialog content</p>
          </Dialog.Content>
        </Dialog>
      );
    };
    render(<DialogWithOpenState />);
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    act(() => {
      userEvent.type(screen.queryByRole('dialog'), '{esc}');
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
