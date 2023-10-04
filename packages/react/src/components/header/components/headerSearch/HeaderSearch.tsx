import React, { useEffect, useState } from 'react';

import styles from './HeaderSearch.module.scss';
import { SearchInput } from '../../../searchInput';

export type NavigationSearchProps = {
  /**
   * Callback fired when the search button or Enter key is pressed
   */
  onSubmit?: (inputValue: string) => void;
  /**
   * Callback fired when the search input value is changed
   */
  onChange?: (inputValue: string) => void;
  /**
   * Label for the search element.
   */
  label: string | JSX.Element;
};

export const HeaderSearch = ({ onChange, onSubmit, label }: NavigationSearchProps) => {
  // search is always active in mobile
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <div className={styles.searchContainer} role="search">
      <SearchInput label={label} onSubmit={handleSubmit} onChange={setInputValue} />
    </div>
  );
};

HeaderSearch.displayName = 'HeaderSearch';
