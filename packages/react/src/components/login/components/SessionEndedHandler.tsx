import React from 'react';

import { useOidcClient } from '../client/hooks';
import { useErrorTracking } from '../beacon/hooks';
import { isSessionEndedSignal } from '../sessionPoller/signals';
import { Button } from '../../button';
import { Dialog, DialogProps } from '../../dialog/Dialog';

export type SessionEndedHandlerProps = {
  content: {
    title: string;
    text: string;
    buttonText: string;
    closeButtonLabelText: string;
  };
  ids?: {
    dialog?: string;
    title?: string;
    text?: string;
  };
  dialogProps?: Partial<DialogProps>;
};

/**
 * SessionEndedHandler listens to the session-ended signal. The component shows an HDS Dialog and forces the user to log out. This component can be placed anywhere inside the LoginProvider.
 * @param props SessionEndedHandlerProps
 */
export function SessionEndedHandler(
  props: React.PropsWithChildren<SessionEndedHandlerProps>,
): React.ReactElement | null {
  const [errorSignal] = useErrorTracking();
  const oidcClient = useOidcClient();
  if (!errorSignal || !isSessionEndedSignal(errorSignal)) {
    return null;
  }
  const { ids = {}, content, dialogProps } = props;
  const { title, text, buttonText, closeButtonLabelText } = content;
  const dialogId = ids.dialog || 'session-ended-dialog';
  const titleId = ids.title || `${dialogId}-title`;
  const contentId = ids.text || `${dialogId}-text`;
  const closeAndLogout = () => {
    // this will redirect browser window, so no need to close dialog
    oidcClient.logout();
  };
  return (
    <Dialog
      id={dialogId}
      aria-labelledby={titleId}
      aria-describedby={contentId}
      isOpen
      close={closeAndLogout}
      closeButtonLabelText={closeButtonLabelText}
      {...dialogProps}
    >
      <Dialog.Header id={titleId} title={title} />
      <Dialog.Content>
        <p id={contentId} className="text-body">
          {text}
        </p>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button
          onClick={() => {
            closeAndLogout();
          }}
        >
          {buttonText}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
}
