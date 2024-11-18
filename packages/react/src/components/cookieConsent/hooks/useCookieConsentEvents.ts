import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

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
  const listenerDisposer: MutableRefObject<(() => void) | null> = useRef(null);

  useMemo(() => {
    if (listenerDisposer.current) {
      listenerDisposer.current();
      listenerDisposer.current = null;
    }

    if (!onChange) {
      return () => undefined;
    }

    if (isSsrEnvironment()) {
      return () => undefined;
    }

    const getChangeProps = (e: Event): CookieConsentChangeEvent => {
      const { detail, type } = e as CustomEvent;
      const changeProps: CookieConsentChangeEvent = {
        type,
        acceptedGroups: detail.consentedGroups || detail.acceptedGroups || [],
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

    window.addEventListener(cookieEventType.CHANGE, cookieListener);
    window.addEventListener(cookieEventType.MONITOR, monitorListener);
    window.addEventListener(cookieEventType.READY, readyListener);

    const disposer = () => {
      window.removeEventListener(cookieEventType.CHANGE, cookieListener);
      window.removeEventListener(cookieEventType.MONITOR, monitorListener);
      window.removeEventListener(cookieEventType.READY, readyListener);
      listenerDisposer.current = null;
    };

    listenerDisposer.current = disposer;

    return disposer;
  }, [onChange, onMonitorEvent, onReady]);

  useEffect(() => {
    return () => {
      if (listenerDisposer.current) {
        listenerDisposer.current();
      }
    };
  }, []);

  return listenerDisposer.current || (() => undefined);
}
