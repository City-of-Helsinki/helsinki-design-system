import { useEffect, useRef, useState, useCallback } from 'react';
import { uniqueId } from 'lodash';

import styles from './LoadingSpinner.module.scss';

const notificationAreaId = 'hds-loading-spinner-notification-area';
const activeSpinnersAttrKey = 'data-active-spinners';

const createNotificationAreaElement = (): HTMLElement => {
  const element = document.createElement('div');
  element.id = notificationAreaId;
  element.className = styles.notificationArea;
  element.setAttribute('role', 'alert');
  document.body.appendChild(element);
  return element;
};

const getNotificationAreaElement = (): HTMLElement | null => {
  if (typeof document === 'undefined') return null;
  return document.getElementById(notificationAreaId) || createNotificationAreaElement();
};

export const useNotificationArea = (loadingTextVal: string, finishedTextVal: string) => {
  const [spinnerId] = useState(uniqueId());
  const [loadingText] = useState(loadingTextVal);
  const [finishedText] = useState(finishedTextVal);
  const notificationArea = useRef(getNotificationAreaElement());

  /**
   * Set the loading text content for the Notification Area
   */
  const setLoadingText = useCallback(() => {
    if (notificationArea.current !== null) {
      notificationArea.current.textContent = loadingText;
    }
  }, [notificationArea, loadingText]);

  /**
   * Set the finished text content for the Notification Area
   */
  const setFinishedText = useCallback(() => {
    notificationArea.current.textContent = finishedText;
  }, [notificationArea, finishedText]);

  /**
   * Get the active spinner ids from the Notification Area data-attribute.
   */
  const getActiveIds = useCallback(() => {
    return (notificationArea.current.getAttribute(activeSpinnersAttrKey) || '').split(',').filter((id) => id !== '');
  }, [notificationArea]);

  /**
   * Add active spinner id to the Notification Area data-attribute.
   */
  const setActiveSpinnerId = useCallback(() => {
    const activeIds = getActiveIds();
    activeIds.push(spinnerId);
    notificationArea.current.setAttribute(activeSpinnersAttrKey, activeIds.join(','));
  }, [getActiveIds, notificationArea, spinnerId]);

  /**
   * Remove active spinner id from the Notification Area data-attribute.
   */
  const unsetActiveSpinnerId = useCallback(() => {
    const activeIds = getActiveIds().filter((id) => id !== spinnerId);
    notificationArea.current.setAttribute(activeSpinnersAttrKey, activeIds.join(','));
  }, [getActiveIds, notificationArea, spinnerId]);

  /**
   * Clean the Notification Area. Remove the current spinner id from the active spinners
   * list and remove the DOM node if there's no other active spinners left.
   */
  const cleanNotificationArea = useCallback(() => {
    if (getActiveIds().length === 0) {
      setFinishedText();
      setTimeout(() => {
        if (getActiveIds().length === 0 && notificationArea.current.parentNode) {
          notificationArea.current.parentNode.removeChild(notificationArea.current);
        }
      }, 1000);
    }
  }, [getActiveIds, setFinishedText, notificationArea]);

  useEffect(() => {
    // Exit when rendering server side
    if (notificationArea.current === null) {
      return () => null;
    }

    setLoadingText();
    setActiveSpinnerId();
    return () => {
      unsetActiveSpinnerId();
      cleanNotificationArea();
    };
  }, [setLoadingText, setActiveSpinnerId, unsetActiveSpinnerId, cleanNotificationArea]);
};
