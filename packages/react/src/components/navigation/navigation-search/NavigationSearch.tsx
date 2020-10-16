import React, { FocusEvent, useContext, useEffect, useRef, useState } from 'react';

import styles from './NavigationSearch.module.scss';
import { IconSearch } from '../../../icons';
import { NavigationContext } from '../NavigationContext';
import classNames from '../../../utils/classNames';
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';

export type NavigationSearchProps = {
  /**
   * Callback fired when the search field is blurred
   */
  onBlur?: () => void;
  /**
   * Callback fired when the search field is focused
   */
  onFocus?: () => void;
  /**
   * Callback fired when the state is changed
   */
  onSearchChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback fired when the search button or Enter key is pressed
   */
  onSearch?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * The aria-label for the search button. Uses `searchLabel` by default
   */
  searchButtonAriaLabel?: string;
  /**
   * Label shown when search field isn't active
   */
  searchLabel: string;
  /**
   * Placeholder text shown in the search input field. Uses the `searchLabel` value by default
   */
  searchPlaceholder?: string;
};

export const NavigationSearch = ({
  onBlur = () => null,
  onFocus = () => null,
  onSearchChange = () => null,
  onSearch = () => null,
  searchButtonAriaLabel,
  searchLabel,
  searchPlaceholder,
}: NavigationSearchProps) => {
  const { isMobile } = useContext(NavigationContext);
  // search is always active in mobile
  const [searchActive, setSearchActive] = useState(isMobile);
  const input = useRef<HTMLInputElement>(null);

  // focuses the input field
  const focusInput = (): void => input.current?.focus();

  useEffect(() => {
    if (!isMobile && searchActive) focusInput();
  }, [isMobile, searchActive]);

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (getIsElementFocused(e)) {
      onFocus();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (getIsElementBlurred(e)) {
      if (!isMobile) setSearchActive(false);
      onBlur();
    }
  };

  return (
    <div className={classNames(styles.search, searchActive && styles.active)} role="search">
      {!isMobile && (
        <button
          type="button"
          className={styles.searchToggleButton}
          onClick={() => setSearchActive(true)}
          onFocus={() => setSearchActive(true)}
        >
          <IconSearch aria-hidden />
          <span className={styles.label}>{searchLabel}</span>
        </button>
      )}
      {searchActive && (
        <div className={styles.searchContainer} onFocus={handleFocus} onBlur={handleBlur}>
          <input
            type="text"
            className={styles.input}
            id="navigation-search"
            ref={input}
            placeholder={searchPlaceholder || searchLabel}
            onChange={onSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onSearch(e);
            }}
          />
          <button
            type="button"
            className={styles.searchButton}
            aria-label={searchButtonAriaLabel || searchLabel}
            onClick={(e) => onSearch(e)}
          >
            <IconSearch aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};
NavigationSearch.componentName = 'NavigationSearch';
