import React, { ChangeEventHandler, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';

import styles from './NavigationSearch.module.css';
import IconSearch from '../../../icons/ui/IconSearch';
import classNames from '../../../utils/classNames';
import TextInput from '../../textinput/TextInput';
import NavigationContext from '../NavigationContext';

// TODO: ACCESSIBILITY ATTRIBUTES
// TODO: ACCESSIBILITY ATTRIBUTES
// TODO: ACCESSIBILITY ATTRIBUTES
// TODO: onFocus prop?
// TODO: onBlur prop?

export type NavigationSearchProps = {
  /**
   * Callback fired when the state is changed
   */
  onSearchChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback fired when the Enter key is pressed
   */
  onSearchEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const AnimatedSearchIcon = animated(IconSearch);

const NavigationSearch = ({
  onSearchChange = (e) => {
    // do nothing by default
    // todo: remove
    console.log('NavigationSearch - onSearchChange', e);
  },
  onSearchEnter = (e) => {
    // do nothing by default
    // todo: remove
    console.log('NavigationSearch - onSearchEnter', e);
  },
}: NavigationSearchProps) => {
  const { isMobile, theme } = useContext(NavigationContext);
  // search is always active in mobile
  const [searchActive, setSearchActive] = useState(isMobile);
  const input = useRef<HTMLInputElement>(null);

  const focusInput = () => input.current?.focus();

  useEffect(() => {
    if (!isMobile && searchActive) {
      focusInput();
    }
  }, [searchActive, isMobile]);

  // search field icon transition
  const transition = useTransition(searchActive, {
    from: { transform: 'translate3d(0, 8px, 0)', opacity: 0.5 },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    config: {
      friction: 20,
    },
  });

  return (
    <div className={classNames(styles.navigationSearch, styles[`theme-${theme}`], searchActive && styles.active)}>
      {searchActive && (
        <>
          <TextInput
            className={styles.input}
            id="navigation-search"
            ref={input}
            placeholder="Search"
            onChange={onSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearchEnter(e);
              }
            }}
            onBlur={() => !isMobile && setSearchActive(false)}
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
        <span className={styles.label}>Search</span>
      </button>
      {/* {searchActive ? ( */}
      {/*  <> */}
      {/*    <TextInput */}
      {/*      className={styles.input} */}
      {/*      id="navigation-search" */}
      {/*      ref={input} */}
      {/*      placeholder="Search" */}
      {/*      onChange={onSearchChange} */}
      {/*      onKeyPress={(e) => { */}
      {/*        if (e.key === 'Enter') { */}
      {/*          onSearchEnter(e); */}
      {/*        } */}
      {/*      }} */}
      {/*      onBlur={() => !isMobile && setSearchActive(false)} */}
      {/*    /> */}
      {/*    {transition((values, item) => item && <AnimatedSearchIcon style={values} className={styles.inputIcon} />)} */}
      {/*  </> */}
      {/* ) : ( */}
      {/*  // "Open search" button */}
      {/*  <button */}
      {/*    type="button" */}
      {/*    className={styles.openSearch} */}
      {/*    onClick={() => setSearchActive(true)} */}
      {/*    onFocus={() => setSearchActive(true)} */}
      {/*  > */}
      {/*    <IconSearch /> */}
      {/*    <span className={styles.label}>Search</span> */}
      {/*  </button> */}
      {/* )} */}
    </div>
  );
};

export default NavigationSearch;
