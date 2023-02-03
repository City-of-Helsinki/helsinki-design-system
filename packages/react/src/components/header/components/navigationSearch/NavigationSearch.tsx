import React, { FC, useEffect, useState } from 'react';

import styles from './NavigationSearch.module.scss';
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
};

export const NavigationSearch: FC<NavigationSearchProps> = ({ onChange, onSubmit }) => {
  // search is always active in mobile
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchInput label="Search" onSubmit={handleSubmit} onChange={setInputValue} />
    </div>
  );
};

NavigationSearch.displayName = 'NavigationSearch';
