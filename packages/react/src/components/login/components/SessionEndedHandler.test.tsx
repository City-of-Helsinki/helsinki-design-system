import React from 'react';
import { render, act, waitFor, screen, fireEvent } from '@testing-library/react';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { LoginContextProvider } from './LoginContext';
import { SessionEndedHandler, SessionEndedHandlerProps } from './SessionEndedHandler';
import { Beacon, ConnectedModule } from '../beacon/beacon';
import { createSessionPollerErrorSignal } from '../sessionPoller/signals';
import { SessionPollerError, sessionPollerErrors } from '../sessionPoller/sessionPollerError';
import { OidcClient, oidcClientNamespace } from '../client';

const loginProps = getDefaultOidcClientTestProps();
const content: SessionEndedHandlerProps['content'] = {
  title: 'Session has ended!',
  text: 'Your session on the server has ended. You will be logged out in this window too.',
  buttonText: 'Logout',
  closeButtonLabelText: 'Logout',
};
const ids: SessionEndedHandlerProps['ids'] = {
  dialog: 'dialog',
  title: 'dialog-title',
  text: 'dialog-body',
};

afterEach(() => {
  jest.restoreAllMocks();
  sessionStorage.clear();
});

describe('SessionEndedHandler', () => {
  let beacon: Beacon;
  const renderComponent = (dialogProps: SessionEndedHandlerProps) => {
    const helperModule: ConnectedModule = {
      namespace: 'helper',
      connect: (targetBeacon) => {
        beacon = targetBeacon;
      },
    };
    return render(
      <LoginContextProvider loginProps={loginProps} modules={[helperModule]}>
        <div id="root">
          <p>Some content</p>
          <SessionEndedHandler {...dialogProps} />
        </div>
      </LoginContextProvider>,
    );
  };

  const getDialogElement = () => screen.queryByRole('dialog') as HTMLElement;
  const getTitleElement = () => screen.getByText(content.title) as HTMLElement;
  const getTextElement = () => screen.getByText(content.text) as HTMLElement;
  const getButtonElement = () => screen.getByText(content.buttonText) as HTMLElement;
  const spyOnOidcClientLogout = () => {
    const oidcClient = beacon.getSignalContext(oidcClientNamespace) as OidcClient;
    return jest.spyOn(oidcClient, 'logout').mockResolvedValue(Promise.resolve());
  };

  it('the dialog is shown when session ended signal is emitted', async () => {
    renderComponent({ content, ids });
    expect(getDialogElement()).toBeNull();
    act(() => {
      beacon.emit(createSessionPollerErrorSignal(new SessionPollerError('test', sessionPollerErrors.SESSION_ENDED)));
    });
    await waitFor(() => {
      expect(getDialogElement()).not.toBeNull();
    });
    const dialog = getDialogElement();
    const title = getTitleElement();
    const text = getTextElement();
    const button = getButtonElement();
    expect(dialog.getAttribute('id')).toBe(ids.dialog);
    expect(title.getAttribute('id')).toBe(ids.title);
    expect(text.getAttribute('id')).toBe(ids.text);
    expect(button).not.toBeNull();
  });
  it('The button calls oidcClient.logout', async () => {
    renderComponent({ content, ids });
    expect(getDialogElement()).toBeNull();
    act(() => {
      beacon.emit(createSessionPollerErrorSignal(new SessionPollerError('test', sessionPollerErrors.SESSION_ENDED)));
    });
    await waitFor(() => {
      expect(getDialogElement()).not.toBeNull();
    });
    const spy = spyOnOidcClientLogout();
    fireEvent.click(getButtonElement());
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('There are default ids for the elements', async () => {
    renderComponent({ content });
    expect(getDialogElement()).toBeNull();
    act(() => {
      beacon.emit(createSessionPollerErrorSignal(new SessionPollerError('test', sessionPollerErrors.SESSION_ENDED)));
    });
    await waitFor(() => {
      expect(getDialogElement()).not.toBeNull();
    });
    const dialog = getDialogElement();
    const title = getTitleElement();
    const text = getTextElement();
    expect(!!dialog.getAttribute('id')).toBeTruthy();
    expect(!!title.getAttribute('id')).toBeTruthy();
    expect(!!text.getAttribute('id')).toBeTruthy();
  });
  it('Dialog props are overridden', async () => {
    renderComponent({ content, dialogProps: { 'aria-labelledby': 'foo', className: 'bar' } });
    expect(getDialogElement()).toBeNull();
    act(() => {
      beacon.emit(createSessionPollerErrorSignal(new SessionPollerError('test', sessionPollerErrors.SESSION_ENDED)));
    });
    await waitFor(() => {
      expect(getDialogElement()).not.toBeNull();
    });
    const dialog = getDialogElement();
    expect(dialog.getAttribute('class')?.includes('bar')).toBeTruthy();
    expect(dialog.getAttribute('aria-labelledby')?.includes('foo')).toBeTruthy();
  });
});
