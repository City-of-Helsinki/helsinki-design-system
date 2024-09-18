import React, { RefObject, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Dialog, DialogProps } from './Dialog';
import { DialogHeaderProps } from './dialogHeader/DialogHeader';
import { IconAlertCircle } from '../../icons';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';
import { DialogContentProps } from './dialogContent/DialogContent';
import { DialogActionButtonProps } from './dialogActionButtons/DialogActionButtons';

const descriptionId = 'test-dialog-description-id';
const descriptionText = 'This is a test dialog content';
const contentButtonText = 'Button inside Dialog';
const closeFn = () => false;
const closeButtonLabelText = 'Close';

const dialogHeaderProps: DialogHeaderProps = {
  id: 'test-dialog-title-id',
  title: 'test dialog title',
};

const dialogProps: DialogProps = {
  id: 'test-dialog-id',
  isOpen: false,
  'aria-labelledby': dialogHeaderProps.id,
  'aria-describedby': descriptionId,
};

const renderProps = {
  base: getCommonElementTestProps('div', dialogProps),
  header: {
    'data-testid': 'dialog-header-test-id',
    id: 'dialog-header-id',
    'aria-label': 'dialog-header',
  },
  content: {
    'data-testid': 'dialog-content-test-id',
    id: 'dialog-content-id',
    'aria-labelledby': 'content-label',
  },
  button: {
    'data-testid': 'dialog-buttons-test-id',
    id: 'dialog-buttons-id',
    'aria-labelledby': 'buttons-label',
  },
};

const renderOpenDialog = (
  extraProps: {
    base?: Partial<DialogProps>;
    header?: Partial<DialogHeaderProps>;
    content?: Partial<DialogContentProps>;
    button?: Partial<DialogActionButtonProps>;
  } = {},
) =>
  render(
    <Dialog
      id={dialogProps.id}
      aria-labelledby={dialogProps['aria-labelledby']}
      aria-describedby={dialogProps['aria-describedby']}
      close={closeFn}
      closeButtonLabelText={closeButtonLabelText}
      {...extraProps.base}
      isOpen
    >
      <Dialog.Header
        id={dialogHeaderProps.id}
        title={dialogHeaderProps.title}
        iconLeft={<IconAlertCircle />}
        {...extraProps.header}
      />

      <Dialog.Content {...extraProps.content}>
        <p id={dialogProps['aria-describedby']}>{descriptionText}</p>
      </Dialog.Content>
      <Dialog.ActionButtons {...extraProps.button}>
        <button type="button">{contentButtonText}</button>
      </Dialog.ActionButtons>
    </Dialog>,
  );

describe('<Dialog /> spec', () => {
  beforeEach(cleanup);

  it('renders the component', () => {
    // Because the dialog is rendered with React's createPortal inside the document.body we need to compare baseElement to snapshot.
    // Besides, it is beneficial to include the document.body into a snapshot since the dialog will toggle its class.
    const { baseElement } = renderOpenDialog(renderProps);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    renderOpenDialog();
    const dialog = await axe(screen.queryByRole('dialog') as HTMLElement);
    expect(dialog).toHaveNoViolations();
  });

  it('native html props are passed to the element', async () => {
    const { getByTestId } = renderOpenDialog(renderProps);
    const baseElement = getByTestId(renderProps.base['data-testid']);
    expect(getElementAttributesMisMatches(baseElement, renderProps.base)).toHaveLength(0);

    const headerElement = getByTestId(renderProps.header['data-testid']);
    expect(getElementAttributesMisMatches(headerElement, renderProps.header)).toHaveLength(0);

    const contentElement = getByTestId(renderProps.content['data-testid']);
    expect(getElementAttributesMisMatches(contentElement, renderProps.content)).toHaveLength(0);

    const buttonsElement = getByTestId(renderProps.button['data-testid']);
    expect(getElementAttributesMisMatches(buttonsElement, renderProps.button)).toHaveLength(0);
  });

  it('should rotate focus when user navigates with tabs', async () => {
    renderOpenDialog();
    expect(screen.getByText(dialogHeaderProps.title)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByText(contentButtonText)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByLabelText(closeButtonLabelText)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByText(contentButtonText)).toHaveFocus();
  });

  it('should rotate focus backwards when user navigates with shift + tab', async () => {
    renderOpenDialog();
    expect(screen.getByText(dialogHeaderProps.title)).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(screen.getByLabelText(closeButtonLabelText)).toHaveFocus();
  });

  it('should return focus into dialog with tab after outside click', async () => {
    renderOpenDialog();
    expect(screen.getByText(dialogHeaderProps.title)).toHaveFocus();
    userEvent.click(document.body);
    expect(screen.getByText(dialogHeaderProps.title)).not.toHaveFocus();
    userEvent.tab();
    expect(screen.getByLabelText(closeButtonLabelText)).toHaveFocus();
  });

  it('should shift focus to external open button after dialog close', async () => {
    const openButtonId = 'open-button-id';
    const openButtonText = 'Open Dialog';
    const openButtonRef: RefObject<HTMLButtonElement> = React.createRef();
    const OpenButtonAndDialog = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const close = () => setIsOpen(false);

      return (
        <>
          <button id={openButtonId} ref={openButtonRef} type="button" onClick={() => setIsOpen(true)}>
            {openButtonText}
          </button>
          <Dialog
            id={dialogProps.id}
            aria-labelledby={dialogProps['aria-labelledby']}
            isOpen={isOpen}
            close={close}
            closeButtonLabelText="Close"
            focusAfterCloseRef={openButtonRef}
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
      userEvent.click(screen.getByLabelText(closeButtonLabelText));
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
          closeButtonLabelText="Close"
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
      userEvent.type(screen.queryByRole('dialog') as HTMLElement, '{esc}');
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
