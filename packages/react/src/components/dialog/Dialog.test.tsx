import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { getQueriesForElement } from '@testing-library/dom';
import { axe } from 'jest-axe';

import { Dialog } from './Dialog';
import { Button } from '../button/Button';
import { IconAlertCircle } from '../../icons';

const id = 'test-dialog-id';
const titleId = 'test-dialog-title-id';
const contentId = 'test-dialog-description-id';
const isOpen = true;
const close = () => false;

const renderDialog = (dialogComponent: JSX.Element): { baseElement: HTMLElement; dialog: HTMLElement } => {
  const { baseElement } = render(dialogComponent);
  return { baseElement, dialog: getQueriesForElement(baseElement).queryByRole('dialog') };
};

describe('<Dialog /> spec', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the component', () => {
    // Because the dialog is rendered with React's createPortal inside the document.body we need to compare baseElement to snapshot.
    // Besides, it is beneficial to include the document.body into a snapshot since the dialog will toggle its class.
    const { baseElement } = renderDialog(
      <Dialog id={id} aria-labelledby={titleId} aria-describedby={contentId} isOpen={isOpen} close={close}>
        <Dialog.Header id={titleId} title="Confirmation dialog" iconLeft={<IconAlertCircle aria-hidden="true" />} />
        <Dialog.Content id={contentId}>
          <p>Confirmation Dialog</p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              close();
            }}
          >
            Continue
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </Dialog.ActionButtons>
      </Dialog>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { dialog } = renderDialog(
      <Dialog id={id} aria-labelledby={titleId} aria-describedby={contentId} isOpen={isOpen} close={close}>
        <Dialog.Header id={titleId} title="Confirmation dialog" iconLeft={<IconAlertCircle aria-hidden="true" />} />
        <Dialog.Content id={contentId}>
          <p>Confirmation Dialog</p>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button
            onClick={() => {
              close();
            }}
          >
            Continue
          </Button>
          <Button onClick={close} variant="secondary">
            Cancel
          </Button>
        </Dialog.ActionButtons>
      </Dialog>,
    );
    const results = await axe(dialog);
    expect(results).toHaveNoViolations();
  });
});
