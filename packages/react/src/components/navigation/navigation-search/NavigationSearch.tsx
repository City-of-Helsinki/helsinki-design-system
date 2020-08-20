import React, { ChangeEventHandler, KeyboardEvent, FocusEvent, useContext, useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';

import styles from './NavigationSearch.module.css';
import IconSearch from '../../../icons/ui/IconSearch';
import classNames from '../../../utils/classNames';
import TextInput from '../../textinput/TextInput';
import NavigationContext from '../NavigationContext';

export type NavigationSearchProps = {
  /**
   * Callback fired when the search field is blurred
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback fired when the search field is focused
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback fired when the state is changed
   */
  onSearchChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback fired when the Enter key is pressed
   */
  onSearchEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Label shown when search field isn't active.
   */
  searchLabel: string;
  /**
   * Placeholder text shown in the search input field. Uses `searchLabel` as default.
   */
  searchPlaceholder?: string;
};

const AnimatedSearchIcon = animated(IconSearch);

const NavigationSearch = ({
  onBlur = () => {
    // do nothing by default
  },
  onFocus = () => {
    // do nothing by default
  },
  onSearchChange = () => {
    // do nothing by default
  },
  onSearchEnter = () => {
    // do nothing by default
  },
  searchLabel,
  searchPlaceholder,
}: NavigationSearchProps) => {
  const { isMobile } = useContext(NavigationContext);
  // search is always active in mobile
  const [searchActive, setSearchActive] = useState(isMobile);
  const input = useRef<HTMLInputElement>(null);

  // focuses the input field
  const focusInput = (): void => input.current?.focus();

  const handleBlur = (e): void => {
    if (!isMobile) setSearchActive(false);
    onBlur(e);
  };

  useEffect(() => {
    if (!isMobile && searchActive) focusInput();
  }, [isMobile, searchActive]);

  // search field icon transition
  const transition = useTransition(searchActive, {
    from: { transform: 'translate3d(0, 8px, 0)', opacity: 0.5 },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    config: {
      friction: 20,
    },
  });

  return (
    <div className={classNames(styles.navigationSearch, searchActive && styles.active)}>
      {searchActive && (
        <>
          <TextInput
            className={styles.input}
            id="navigation-search"
            ref={input}
            placeholder={searchPlaceholder || searchLabel}
            onChange={onSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearchEnter(e);
              }
            }}
            onBlur={handleBlur}
            onFocus={onFocus}
          />
          {transition((values, item) => item && <AnimatedSearchIcon style={values} className={styles.inputIcon} />)}
        </>
      )}
      <button
        type="button"
        className={styles.openSearch}
        onClick={() => setSearchActive(true)}
        onFocus={() => setSearchActive(true)}
      >
        <IconSearch />
        <span className={styles.label}>{searchLabel}</span>
      </button>
    </div>
  );
};

export default NavigationSearch;
