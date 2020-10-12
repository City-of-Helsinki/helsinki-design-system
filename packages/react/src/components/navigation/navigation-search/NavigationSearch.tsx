import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';

import styles from './NavigationSearch.module.css';
import { IconSearch } from '../../../icons';
import classNames from '../../../utils/classNames';
import { TextInput } from '../../textInput';
import { NavigationContext } from '../NavigationContext';

export type NavigationSearchProps = {
  /**
   * Callback fired when the search field is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback fired when the search field is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback fired when the state is changed
   */
  onSearchChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback fired when the Enter key is pressed
   */
  onSearchEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Label shown when search field isn't active
   */
  searchLabel: string;
  /**
   * Placeholder text shown in the search input field. Uses the `searchLabel` value by default
   */
  searchPlaceholder?: string;
};

const AnimatedSearchIcon = animated(IconSearch);

export const NavigationSearch = ({
  onBlur = () => null,
  onFocus = () => null,
  onSearchChange = () => null,
  onSearchEnter = () => null,
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
    <div className={classNames(styles.navigationSearch, searchActive && styles.active)} role="search">
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
          {transition(
            // there is an issue with react-spring -rc3 and a new version of @types/react: https://github.com/react-spring/react-spring/issues/1102
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            (values, item) => item && <AnimatedSearchIcon style={values as any} className={styles.inputIcon} />,
          )}
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
NavigationSearch.componentName = 'NavigationSearch';
