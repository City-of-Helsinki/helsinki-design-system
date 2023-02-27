import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Tabs.module.scss';
import classNames from '../../utils/classNames';
import { FCWithName } from '../../common/types';
import { TabsContext } from './TabsContext';
import { IconAngleLeft, IconAngleRight } from '../../icons';
import { getChildByIndex, isElementOutsideLeftEdge, isElementOutsideRightEdge } from './tabUtils';

export type TabListProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the Tablist
   */
  className?: string;
  /**
   * Additional styles to apply to the Tablist
   */
  style?: React.CSSProperties;
}>;

export const TabList = ({ children, className, style = {} }: TabListProps) => {
  const tablistElementRef = useRef<HTMLUListElement>(null);
  const tablistContainerRef = useRef<HTMLDivElement>(null);
  const { focusedTab, setFocusedTab } = useContext(TabsContext);
  const [tablistWidth, setTablistWidth] = useState<number>(0);
  const [scrollIndex, setScrollIndex] = useState<number>(null);
  const [showPreviousButton, setShowPreviousButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);
  const [scrollValue, setScrollValue] = useState<number>(0);

  /**
   * Pass the index as prop to each tab element
   */
  const tabs = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && (child.type as FCWithName).componentName === 'Tab') {
      return React.cloneElement(child, { index });
    }
    return null;
  });

  /**
   * Calculate the scroll position
   */
  const updateScrollPosition = useCallback(() => {
    // Get the tab element by the index
    const tabElement = getChildByIndex(scrollIndex, tablistElementRef.current);
    if (tabElement !== null) {
      // Calculate the distance of tab edges to the left edge of the tablist
      const tabRightEdgeDistance = tabElement.offsetLeft + tabElement.offsetWidth;
      const tabLeftEdgeDistance = tabElement.offsetLeft;
      // Calculate how much tab right edge is outside the tablist container
      const tabListContainerWidth = tablistContainerRef.current.offsetWidth;
      const tabRightEdgeOffset = tabRightEdgeDistance - tabListContainerWidth;
      // Check if tab right edge is outside the right edge of the container
      if (
        tabRightEdgeOffset > 0 &&
        (scrollValue < tabRightEdgeOffset || scrollIndex === tablistElementRef.current.children.length - 1)
      ) {
        setScrollValue(tabRightEdgeOffset);
      }
      // Check if tab left edge is outside the left edge of the container
      else if (tabLeftEdgeDistance < scrollValue) {
        setScrollValue(tabLeftEdgeDistance);
      }
    }
  }, [scrollIndex, scrollValue]);

  /**
   * Find the next tab that is outside the right edge of the tablist container
   */
  const findNextElementOutsideRightEdge = useCallback(() => {
    const tabListElement = tablistElementRef.current;
    const tabIndex = Array.from(tabListElement.children).findIndex((element) =>
      isElementOutsideRightEdge(element, tablistContainerRef.current, scrollValue),
    );
    return tabIndex;
  }, [scrollValue]);

  /**
   * Find the next tab that is outside the left edge of the tablist
   */
  const findNextElementOutsideLeftEdge = useCallback(() => {
    const tabListElement = tablistElementRef.current;
    const tabIndex = Array.from(tabListElement.children)
      .reverse()
      .findIndex((element) => isElementOutsideLeftEdge(element, scrollValue));
    return tabIndex > -1 ? tabListElement.children.length - tabIndex - 1 : -1;
  }, [scrollValue]);

  /**
   * Hide/show scroll buttons
   */
  const updateScrollButtons = useCallback(() => {
    setShowPreviousButton(findNextElementOutsideLeftEdge() !== -1);
    setShowNextButton(findNextElementOutsideRightEdge() !== -1);
  }, [findNextElementOutsideLeftEdge, findNextElementOutsideRightEdge]);

  /**
   * Calculate tablist width
   */
  useEffect(() => {
    const totalWidth = Array.from(tablistElementRef.current.children).reduce((total, el) => {
      return total + (el as HTMLElement).offsetWidth;
    }, 0);
    setTablistWidth(totalWidth);
  }, [children]);

  /**
   * Update scroll position when focus changes
   */
  useEffect(() => {
    setScrollIndex(focusedTab);
  }, [focusedTab]);

  /**
   * Hide/show next/prev buttons when necessary
   */
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  /**
   * Update the scroll position when buttons are hidden/shown
   */
  useEffect(() => {
    updateScrollPosition();
  }, [updateScrollPosition, scrollIndex, showPreviousButton, showNextButton]);

  /**
   * Handle the next button click
   */
  const onNextButtonClick = () => {
    const nextTabIndex = findNextElementOutsideRightEdge();
    if (nextTabIndex > -1) {
      setScrollIndex(nextTabIndex);
    }
  };

  /**
   * Handle the previous button click
   */
  const onPreviousButtonClick = () => {
    const nextTabIndex = findNextElementOutsideLeftEdge();
    if (nextTabIndex > -1) {
      setScrollIndex(nextTabIndex);
    }
  };

  /**
   * Handle keyboard arrow keys
   * @param event
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    let nextIndex: number = null;
    if (event.key === 'ArrowRight') {
      nextIndex = Math.min(focusedTab + 1, tabs.length - 1);
    }
    if (event.key === 'ArrowLeft') {
      nextIndex = Math.max(focusedTab - 1, 0);
    }
    if (nextIndex !== null) {
      setFocusedTab(nextIndex);
    }
  };

  return (
    <div className={classNames(styles.tablistBar, className)} style={style}>
      {showPreviousButton && (
        <div className={styles.scrollButton} aria-hidden="true">
          <button type="button" onClick={onPreviousButtonClick} tabIndex={-1}>
            <IconAngleLeft />
          </button>
        </div>
      )}
      <div className={styles.tablist} ref={tablistContainerRef}>
        <ul
          role="tablist"
          ref={tablistElementRef}
          onKeyDown={onKeyDown}
          style={{
            width: `${tablistWidth}px`,
            transform: scrollValue ? `translateX(${-1 * scrollValue}px)` : undefined,
          }}
        >
          {tabs}
        </ul>
      </div>
      {showNextButton && (
        <div className={styles.scrollButton} aria-hidden="true">
          <button type="button" onClick={onNextButtonClick} tabIndex={-1}>
            <IconAngleRight />
          </button>
        </div>
      )}
    </div>
  );
};
TabList.componentName = 'TabList';
