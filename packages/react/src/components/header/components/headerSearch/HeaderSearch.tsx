import React, { KeyboardEvent, useEffect, useState } from 'react';

import styles from './HeaderSearch.module.scss';
import { TextInput } from '../../../textInput';
import { IconSearch } from '../../../../icons';
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
  }, [inputValue, onChange]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div {...rest} className={classNames(styles.searchContainer, className)} role="search">
      <TextInput
        id="header-search"
        label={label}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        buttonIcon={<IconSearch />}
        buttonAriaLabel="Search"
        onButtonClick={handleSubmit}
        clearButton
        clearButtonAriaLabel="Clear search field"
      />
    </div>
  );
};

HeaderSearch.displayName = 'HeaderSearch';
