import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Dialog } from './Dialog';
import { Button } from '../button/Button';
import { IconAlertCircle } from '../../icons';

// Because Dialog uses React's createPortal we need to provide a container for render
const renderDialog = (dialogComponent: JSX.Element) => render(dialogComponent, { container: document.body });

describe('<Dialog /> spec', () => {
  const id = 'test-dialog-id';
  const titleId = 'test-dialog-title-id';
  const contentId = 'test-dialog-description-id';
  const isOpen = true;
  const close = () => false;

  it('renders the component', () => {
    const { asFragment } = renderDialog(
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

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = renderDialog(
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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
