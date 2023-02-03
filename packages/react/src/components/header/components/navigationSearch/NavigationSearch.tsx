import React, { ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';

import { IconSearch } from '../../../../icons';
import styles from './NavigationSearch.module.scss';

export type NavigationSearchProps = {
  /**
   * Callback fired when the search button or Enter key is pressed
   */
  onSubmit?: (inputValue: string, event: FormEvent) => void;
  /**
   * Callback fired when the search input value is changed
   */
  onChange?: (inputValue: string) => void;
  /**
   * The aria-label for the search button. Uses `searchLabel` by default
   */
  submitButtonAriaLabel?: string;
  /**
   * Placeholder text shown in the search input field. Uses the `searchLabel` value by default
   */
  inputPlaceholder?: string;
};

export const NavigationSearch = ({
  onChange,
  onSubmit,
  submitButtonAriaLabel = 'Hae',
  inputPlaceholder = '',
}: NavigationSearchProps): JSX.Element => {
  // search is always active in mobile
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => setInputValue(event.target.value);
  const handleSubmit: FormEventHandler = (event) => {
    if (onSubmit) onSubmit(inputValue, event);
    event.preventDefault();
    return false;
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit} aria-label="Haku">
      <label>
        <h3>Haku</h3>
        <input
          type="text"
          id="navigation-search"
          className={styles.input}
          placeholder={inputPlaceholder}
          onChange={handleChange}
        />
      </label>
      <button type="submit" aria-label={submitButtonAriaLabel} className={styles.searchButton}>
        <IconSearch aria-hidden />
      </button>
    </form>
  );
};
NavigationSearch.componentName = 'NavigationSearch';
