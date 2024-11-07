import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

import { isSsrEnvironment } from '../../../utils/isSsrEnvironment';

export type ChangeEvent = { type: string; acceptedGroups: string[]; storageType?: string; storageKeys?: string[] };
export type CookieConsentEventsProps = {
  onChange: (changeProps: ChangeEvent) => void;
  onReady: () => void;
  onMonitorEvent: (changeProps: ChangeEvent) => void;
  submitEvent?: string;
};
export type CookieConsentEventsReturnType = () => void;

export const defaultSubmitEvent = 'cookie-consent-changed';
export const monitorEvent = 'hds-cookie-consent-unapproved-item-found';
export const readyEvent = 'hds_cookieConsent_ready';

export function useCookieConsentEvents(props: CookieConsentEventsProps): CookieConsentEventsReturnType {
  const { onChange, onReady, onMonitorEvent } = props;
  const submitEvent = props.submitEvent || defaultSubmitEvent;
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

    const getChangeProps = (e: Event): ChangeEvent => {
      const { detail, type } = e as CustomEvent;
      const changeProps: ChangeEvent = {
        type,
        acceptedGroups: detail.consentedGroups || detail.acceptedGroups || [],
      };
      if (type === monitorEvent && detail.type && detail.keys) {
        changeProps.storageType = detail.type;
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

    window.addEventListener(submitEvent, cookieListener);
    window.addEventListener(monitorEvent, monitorListener);
    window.addEventListener(readyEvent, readyListener);

    const disposer = () => {
      window.removeEventListener(submitEvent, cookieListener);
      window.removeEventListener(monitorEvent, monitorListener);
      window.removeEventListener(readyEvent, readyListener);
      listenerDisposer.current = null;
    };

    listenerDisposer.current = disposer;

    return disposer;
  }, [submitEvent, onChange, onMonitorEvent, onReady]);

  useEffect(() => {
    return () => {
      if (listenerDisposer.current) {
        listenerDisposer.current();
      }
    };
  }, []);

  return listenerDisposer.current || (() => undefined);
}
