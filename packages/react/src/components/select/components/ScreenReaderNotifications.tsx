import React, { useCallback, useEffect, useRef } from 'react';

import styles from '../Select.module.scss';
import useForceRender from '../../../hooks/useForceRender';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import { ScreenReaderNotification } from '../types';

export function ScreenReaderNotifications() {
  const { getMetaData, updateMetaData } = useSelectDataHandlers();
  const forceRender = useForceRender();
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTime = 1000;
  const getCurrentNotifications = useCallback(() => {
    const timeNow = Date.now();
    const hasPassedShowTimeOrIsEmpty = (n: ScreenReaderNotification) => {
      if (!n.content) {
        return true;
      }
      if (n.showTime > 0 && n.showTime + hideTime > timeNow) {
        return true;
      }
      return false;
    };
    if (getMetaData().screenReaderNotifications.length > 10) {
      const cleanedList = getMetaData().screenReaderNotifications.filter(hasPassedShowTimeOrIsEmpty);
      updateMetaData({ screenReaderNotifications: cleanedList });
    }
    const notificationFilter = (n: ScreenReaderNotification) => {
      if (hasPassedShowTimeOrIsEmpty(n)) {
        return false;
      }
      if (!n.delay) {
        return true;
      }
      return n.addTime + n.delay <= timeNow;
    };
    return getMetaData().screenReaderNotifications.filter(notificationFilter);
  }, [getMetaData]);
  const tick = useCallback(() => {
    if (getCurrentNotifications().length) {
      forceRender();
    }
  }, [getMetaData]);

  if (!tickRef.current) {
    tickRef.current = setInterval(tick, 100);
  }

  useEffect(() => {
    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, []);
  const nextNotifications = getCurrentNotifications();
  const timeNow = Date.now();
  return (
    <div aria-live="polite" className={styles.screenReaderNotifications}>
      {nextNotifications.map((n) => {
        // eslint-disable-next-line no-param-reassign
        n.showTime = timeNow;
        return <span key={n.content}>{n.content}</span>;
      })}
    </div>
  );
}
