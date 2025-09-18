import React, { useCallback, useEffect, useRef } from 'react';

import useForceRender from '../../../../hooks/useForceRender';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { ScreenReaderNotification } from '../../modularOptionList/types';

export function ScreenReaderNotifications() {
  const { getMetaData, updateMetaData } = useSearchDataHandlers();
  const lastCleaningRef = useRef(0);
  if (!lastCleaningRef.current) {
    lastCleaningRef.current = Date.now();
  }
  const forceRender = useForceRender();
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevRenderedContentRef = useRef('');
  const getJoinedContents = (notifications: ScreenReaderNotification[]) => {
    return notifications.map((n) => n.content).join(' ');
  };
  const hideTime = 2000;
  const cleanUpInterval = 20000;
  const getCurrentNotifications = useCallback(() => {
    const timeNow = Date.now();
    const hasPassedShowTimeOrIsEmpty = (n: ScreenReaderNotification) => {
      if (!n.content) {
        return true;
      }
      if (n.showTime > 0 && n.showTime + hideTime <= timeNow) {
        return true;
      }
      return false;
    };
    if (timeNow - lastCleaningRef.current > cleanUpInterval) {
      const cleanedList = getMetaData().screenReaderNotifications.filter((n) => {
        return !hasPassedShowTimeOrIsEmpty(n);
      });
      updateMetaData({ screenReaderNotifications: cleanedList });
      lastCleaningRef.current = Date.now();
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
    if (prevRenderedContentRef.current !== getJoinedContents(getCurrentNotifications())) {
      forceRender();
    }
  }, [getMetaData]);

  if (!tickRef.current) {
    tickRef.current = setInterval(tick, 200);
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
  prevRenderedContentRef.current = getJoinedContents(nextNotifications);
  return (
    <div
      aria-live="polite"
      className="hds-search-screen-reader-notifications"
      data-testid="hds-search-screen-reader-notifications"
    >
      {nextNotifications.map((n) => {
        if (!n.showTime) {
          // eslint-disable-next-line no-param-reassign
          n.showTime = timeNow;
        }
        return <span key={n.content}>{n.content}</span>;
      })}
    </div>
  );
}
