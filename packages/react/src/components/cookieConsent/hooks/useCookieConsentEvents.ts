import { useEffect, useMemo } from 'react';
import { noop } from 'lodash';

import { isSsrEnvironment } from '../../../utils/isSsrEnvironment';
import { cookieEventType } from '../../cookieConsentCore/cookieConsentCore';

export type CookieConsentChangeEvent = {
  type: string;
  acceptedGroups: string[];
  storageType?: string;
  storageKeys?: string[];
};
export type CookieConsentEventsProps = {
  onChange: (changeProps: CookieConsentChangeEvent) => void;
  onReady: () => void;
  onMonitorEvent: (changeProps: CookieConsentChangeEvent) => void;
};
export type CookieConsentEventsReturnType = () => void;

export function useCookieConsentEvents(props: CookieConsentEventsProps): CookieConsentEventsReturnType {
  const { onChange, onReady, onMonitorEvent } = props;
  const [attach, dispose] = useMemo(() => {
    if (!onChange) {
      return [noop, noop];
    }

    if (isSsrEnvironment()) {
      return [noop, noop];
    }

    const getChangeProps = (e: Event): CookieConsentChangeEvent => {
      const { detail, type } = e as CustomEvent;
      const changeProps: CookieConsentChangeEvent = {
        type,
        acceptedGroups: detail.acceptedGroups || [],
      };
      if (type === cookieEventType.MONITOR && detail.storageType && detail.keys) {
        changeProps.storageType = detail.storageType;
        changeProps.storageKeys = detail.keys;
      }
      return changeProps;
    };

    const cookieListener = (e: Event) => {
      onChange(getChangeProps(e));
    };

    const monitorListener = (e: Event) => {
      onMonitorEvent(getChangeProps(e));
    };

    const readyListener = () => {
      onReady();
    };

    const addEventListeners = () => {
      window.addEventListener(cookieEventType.CHANGE, cookieListener);
      window.addEventListener(cookieEventType.MONITOR, monitorListener);
      window.addEventListener(cookieEventType.READY, readyListener);
    };

    const removeEventListeners = () => {
      window.removeEventListener(cookieEventType.CHANGE, cookieListener);
      window.removeEventListener(cookieEventType.MONITOR, monitorListener);
      window.removeEventListener(cookieEventType.READY, readyListener);
    };

    return [addEventListeners, removeEventListeners];
  }, [onChange, onMonitorEvent, onReady]);

  useEffect(() => {
    attach();
    return () => {
      dispose();
    };
  }, []);

  return dispose;
}
