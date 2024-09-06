import React, { useEffect, useState } from 'react';

import styles from './HeaderSearch.module.scss';
import { SearchInput } from '../../../searchInput';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../../../utils/elementTypings';
import classNames from '../../../../utils/classNames';

export type NavigationSearchProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'div'>,
  {
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
  }
>;

export const HeaderSearch = ({ onChange, onSubmit, label, className, ...rest }: NavigationSearchProps) => {
  // search is always active in mobile
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (onChange) onChange(inputValue);
  }, [inputValue]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <div {...rest} className={classNames(styles.searchContainer, className)} role="search">
      <SearchInput label={label} onSubmit={handleSubmit} onChange={setInputValue} />
    </div>
  );
};

HeaderSearch.displayName = 'HeaderSearch';
