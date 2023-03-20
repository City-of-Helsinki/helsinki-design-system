import React, { useContext, useEffect, useRef, useState } from 'react';

import styles from './NavigationSearch.module.scss';
import { IconSearch } from '../../../icons';
import { NavigationContext } from '../NavigationContext';
import classNames from '../../../utils/classNames';
import getIsElementFocused from '../../../utils/getIsElementFocused';
import getIsElementBlurred from '../../../utils/getIsElementBlurred';
import { Visible } from '../../../internal/visible/Visible';

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
   * Callback fired when the search button or Enter key is pressed
   */
  onSearch?: (
    inputValue: string,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  /**
   * Callback fired when the search input value is changed
   */
  onSearchChange?: (inputValue: string, event: React.ChangeEvent<HTMLInputElement>) => void;
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

/**
 * NavigationSearch will be removed in the next major release. Upcoming Header component will provide the replacement component.
 * @deprecated
 */
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
  const [searchActive, setSearchActive] = useState<boolean>(isMobile);
  const [inputValue, setInputValue] = useState<string>('');
  const input = useRef<HTMLInputElement>(null);

  // focuses the input field
  const focusInput = (): void => input.current?.focus();

  useEffect(() => {
    if (!isMobile && searchActive) focusInput();
  }, [isMobile, searchActive]);

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (getIsElementFocused(e)) {
      onFocus();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (getIsElementBlurred(e)) {
      if (!isMobile) setSearchActive(false);
      onBlur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    onSearchChange(value, e);
  };

  return (
    <div className={classNames(styles.search, searchActive && styles.active)} role="search">
      <Visible above="m">
        <button type="button" className={styles.searchToggleButton} onClick={() => setSearchActive(true)}>
          <IconSearch aria-hidden />
          <span className={styles.label}>{searchLabel}</span>
        </button>
      </Visible>
      {searchActive && (
        <div className={styles.searchContainer} onFocus={handleFocus} onBlur={handleBlur}>
          <input
            type="text"
            className={styles.input}
            id="navigation-search"
            ref={input}
            placeholder={searchPlaceholder || searchLabel}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onSearch(inputValue, e);
            }}
          />
          <button
            type="button"
            className={styles.searchButton}
            aria-label={searchButtonAriaLabel || searchLabel}
            onClick={(e) => onSearch(inputValue, e)}
          >
            <IconSearch aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};
NavigationSearch.componentName = 'NavigationSearch';
