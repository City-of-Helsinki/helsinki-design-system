import React, { useCallback, useEffect, useRef } from 'react';

import styles from '../../../Select.module.scss';
import useForceRender from '../../../../../hooks/useForceRender';

type ScreenReaderAlertData = {
  pendingNotification?: string;
  currentText?: string;
  lastRenderedNotification?: string;
  timeoutId?: ReturnType<typeof setTimeout>;
};

type Props = {
  search?: string;
  filter?: string;
  isSearching: boolean;
  resultCount: number;
};

export function ScreenReaderNotifications({ search, filter, isSearching, resultCount }: Props) {
  const forceRender = useForceRender();
  const dataRef = useRef<ScreenReaderAlertData>({});
  const delayTime = 500;
  const updateDataRef = useCallback(
    (newProps: Partial<ScreenReaderAlertData>) => {
      dataRef.current = {
        ...dataRef.current,
        ...newProps,
      };
    },
    [dataRef],
  );
  const isPreviousNotification = useCallback(
    (newNotification: string) => {
      return (
        dataRef.current.pendingNotification === newNotification ||
        dataRef.current.currentText === newNotification ||
        dataRef.current.lastRenderedNotification === newNotification
      );
    },
    [dataRef],
  );

  const clearTimer = useCallback(() => {
    const { timeoutId } = dataRef.current;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    dataRef.current.timeoutId = undefined;
  }, [dataRef]);

  const clearPendingNotification = useCallback(() => {
    clearTimer();
    updateDataRef({ pendingNotification: undefined });
  }, [clearTimer, updateDataRef]);

  const setPendingNotification = useCallback(
    (newNotification: string) => {
      if (isPreviousNotification(newNotification)) {
        return;
      }
      clearTimer();
      updateDataRef({
        pendingNotification: newNotification,
      });
      forceRender();
    },
    [dataRef, updateDataRef, forceRender, clearTimer, isPreviousNotification],
  );

  const showPendingNotification = useCallback(() => {
    updateDataRef({
      currentText: dataRef.current.pendingNotification,
      pendingNotification: undefined,
      timeoutId: undefined,
    });
  }, [dataRef, updateDataRef]);

  const startPendingNotificationTimer = useCallback(() => {
    clearTimeout(dataRef.current.timeoutId);
    dataRef.current.timeoutId = setTimeout(() => {
      showPendingNotification();
      forceRender();
    }, delayTime);
  }, [dataRef, delayTime, forceRender, showPendingNotification]);

  const shouldRender = () => {
    if (!dataRef.current.currentText) {
      return false;
    }
    if (dataRef.current.lastRenderedNotification === dataRef.current.currentText) {
      return false;
    }
    return true;
  };

  const screenReaderTexts = {
    none: '',
    isSearching: `Searching for "${search}"`,
    filteredResults: `Filtered results for "${filter}". Found ${resultCount} options.`,
    noResults: `No options found for "${search || filter}". Try a different term.`,
    searchResults: `Found ${resultCount} options for search term "${search}".`,
  };

  const getScreenReaderTextType = (): keyof typeof screenReaderTexts => {
    if (isSearching) {
      return 'isSearching';
    }
    if (filter) {
      return 'filteredResults';
    }
    if (search && !isSearching) {
      return 'searchResults';
    }
    if (resultCount === 0) {
      return 'noResults';
    }
    return 'none';
  };

  const textType = getScreenReaderTextType();
  const notification = screenReaderTexts[textType];
  const debouncedTextTypes: Array<ReturnType<typeof getScreenReaderTextType>> = ['filteredResults', 'isSearching'];
  const isPendingTextType = debouncedTextTypes.includes(textType);

  if (!isPendingTextType) {
    if (dataRef.current.pendingNotification) {
      clearPendingNotification();
    }
    dataRef.current.currentText = notification;
  } else {
    setPendingNotification(notification);
  }

  useEffect(() => {
    if (dataRef.current.pendingNotification && !dataRef.current.timeoutId) {
      startPendingNotificationTimer();
    }
  });
  useEffect(() => {
    return () => {
      clearPendingNotification();
      dataRef.current = {};
    };
  }, [dataRef, clearPendingNotification, startPendingNotificationTimer]);

  if (!shouldRender()) {
    return null;
  }

  updateDataRef({ lastRenderedNotification: dataRef.current.currentText });
  return (
    <div aria-live="polite" className={styles.screenReaderNotifications}>
      {dataRef.current.currentText}
    </div>
  );
}
