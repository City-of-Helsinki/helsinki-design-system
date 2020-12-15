import React, { useContext, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Tabs.module.scss';
import classNames from '../../utils/classNames';
import { FCWithName } from '../../common/types';
import { TabsContext } from './TabsContext';
import { IconAngleLeft, IconAngleRight } from '../../icons';

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
  const { focusedTab, setFocusedTab } = useContext(TabsContext);
  const [scrollIndex, setScrollIndex] = useState<number>(null);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

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
   * Check if tab element is outside the right edge of the tablist
   * @param el Element
   */
  const isElementOutsideRightEdge = (el: Element) => {
    const tabElement = el as HTMLLIElement;
    const tablistElement = tablistElementRef.current;
    const tabOffset = tabElement.offsetLeft + tabElement.offsetWidth;
    const scrollOffset = tablistElement.scrollLeft + tablistElement.clientWidth;
    return scrollOffset < tabOffset;
  };

  /**
   * Find the next tab that is outside the right edge of the tablist
   */
  const findNextElementOutsideRightEdge = () => {
    const tabListElement = tablistElementRef.current;
    const nextTabIndex = Array.from(tabListElement.children).findIndex((element) => isElementOutsideRightEdge(element));
    return nextTabIndex;
  };

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
   * Check if tab element is outside the left edge of the tablist
   * @param el Element
   */
  const isElementOutsideLeftEdge = (el: Element) => {
    const tabElement = el as HTMLLIElement;
    const tablistElement = tablistElementRef.current;
    const tabOffset = tabElement.offsetLeft;
    const scrollOffset = tablistElement.scrollLeft;
    return scrollOffset > tabOffset;
  };

  /**
   * Find the next tab that is outside the left edge of the tablist
   */
  const findNextElementOutsideLeftEdge = () => {
    const tabListElement = tablistElementRef.current;
    const previousTabIndex = Array.from(tabListElement.children)
      .reverse()
      .findIndex((element) => isElementOutsideLeftEdge(element));
    return previousTabIndex > -1 ? tabListElement.children.length - previousTabIndex - 1 : -1;
  };

  /**
   * Handle the previous button click
   */
  const onPreviousButtonClick = () => {
    const previousTabIndex = findNextElementOutsideLeftEdge();
    if (previousTabIndex > -1) {
      setScrollIndex(previousTabIndex);
    }
  };

  /**
   * Handle keyboard arrow keys
   * @param event
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      setFocusedTab(Math.min(focusedTab + 1, tabs.length - 1));
    }
    if (event.key === 'ArrowLeft') {
      setFocusedTab(Math.max(focusedTab - 1, 0));
    }
  };

  /**
   * Returns the tab element by it's index
   * @param index
   */
  const getTabElementByIndex = (index: number): HTMLElement | null => {
    if (index !== null) {
      const tabListElement = tablistElementRef.current;
      const tabElement = tabListElement.children[index];
      if (tabElement !== null && tabElement instanceof HTMLElement) {
        return tabElement;
      }
    }
    return null;
  };

  /**
   * Scroll to the focused tab.
   */
  useEffect(() => {
    setScrollIndex(focusedTab);
  }, [focusedTab]);

  /**
   * Scroll to the element based on scrollIndex
   */
  useEffect(() => {
    const tabElement = getTabElementByIndex(scrollIndex);
    if (tabElement) {
      tabElement.scrollIntoView();
    }
  }, [scrollIndex, showNextButton, showPreviousButton]);

  const updateScrollButtons = () => {
    setShowNextButton(findNextElementOutsideRightEdge() > -1);
    setShowPreviousButton(findNextElementOutsideLeftEdge() > -1);
  };

  /**
   * Hide/show resize buttons when window is resized
   */
  useEffect(() => {
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  /**
   * Hide/show resize buttons after each render
   */
  useEffect(() => {
    updateScrollButtons();
  });

  return (
    <div className={classNames(styles.tablistContainer, className)} style={style}>
      {showPreviousButton && (
        <div className={styles.scrollButton} aria-hidden="true">
          <button type="button" onClick={onPreviousButtonClick} tabIndex={-1}>
            <IconAngleLeft />
          </button>
        </div>
      )}
      <ul role="tablist" ref={tablistElementRef} className={styles.tablist} onKeyDown={onKeyDown}>
        {tabs}
      </ul>
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
