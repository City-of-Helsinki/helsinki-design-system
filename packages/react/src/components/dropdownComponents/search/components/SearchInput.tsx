import React, { forwardRef } from 'react';

import styles from './SearchInput.module.scss';
import classNames from '../../../../utils/classNames';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';
import { useSelectDataHandlers } from '../../select/hooks/useSelectDataHandlers';
import { eventIds } from '../../select/events';
import { getTextKey } from '../../select/texts';
import { getTextKeyWithType, typeIndicator } from '../../select/components/searchAndFilter/common';
// import { createInputOnChangeListener } from '../../../select/utils';
import { convertPropsToGroups } from '../../modularOptionList/utils';
import { useSearchHistory } from '../SearchHistoryContext';
import { IconSearch } from '../../../../icons/IconSearch';
import { SearchFunction } from '../../select/types';

export const SearchInput = forwardRef<
  HTMLInputElement,
  TextInputProps & { onSearch?: SearchFunction; onSend?: (value: string) => void }
>((props, ref) => {
  const classes = classNames(styles.searchInput, props.className || '');
  const dataHandlers = useSelectDataHandlers();
  const { getMetaData /* , trigger */ } = dataHandlers;
  const metaData = getMetaData();
  const [innerValue, setInnerValue] = React.useState(metaData.search || '');

  // Extract props first
  const { onSearch, onSend, onChange: onChangeFromProps, value: externalValue, ...rest } = props;

  // Determine if component is controlled
  const isControlled = externalValue !== undefined;

  // Sync innerValue with metaData.search when metadata changes (e.g., when option is clicked)
  const currentSearchValue = metaData.search || '';

  React.useEffect(() => {
    if (!isControlled) {
      setInnerValue(currentSearchValue);
    }
  }, [currentSearchValue, isControlled]);

  // Notify parent component when option is selected (in controlled mode)
  React.useEffect(() => {
    if (isControlled && currentSearchValue !== externalValue && onChangeFromProps) {
      // Create a synthetic event to call onChange
      const syntheticEvent = {
        target: { value: currentSearchValue },
      } as React.ChangeEvent<HTMLInputElement>;
      onChangeFromProps(syntheticEvent);
    }
  }, [currentSearchValue, isControlled, externalValue, onChangeFromProps]);

  const { searchHistory, addSearchItem } = useSearchHistory();

  // form group from searchHistory strings
  const historyData = React.useMemo(() => {
    if (searchHistory.length === 0) return [];
    return convertPropsToGroups({
      groups: [
        {
          label: 'Recent searches',
          options: searchHistory.map((term) => ({
            value: term,
            label: term,
            selected: false,
            isGroupLabel: false,
            visible: true,
            disabled: false,
          })),
        },
      ],
    });
  }, [searchHistory]);

  const placeholder = getTextKey(getTextKeyWithType(`${typeIndicator}Placeholder`, true), metaData);
  const clearButtonAriaLabel = getTextKey(getTextKeyWithType(`${typeIndicator}ClearButtonAriaLabel`, true), metaData);
  // const handleChange = createInputOnChangeListener({ id: eventIds.search, trigger });

  const handleFocus = () => {
    const currentValue = isControlled ? externalValue : innerValue;
    if (!currentValue) {
      dataHandlers.updateData({ groups: historyData });
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'focus' });
    }
  };

  // const handleBlur = (event: React.FocusEvent) => {
  //   // Check if the blur is moving focus to a child element
  //   if (event.currentTarget.contains(event.relatedTarget as Node)) {
  //     // return; // Don't hide if focus is moving to a child
  //   }

  //   // Check if focus moved to a search history option
  //   // const relatedTarget = event.relatedTarget as HTMLElement;
  //   // if (relatedTarget && relatedTarget.matches('[role="option"]')) {
  //   //   // Get the option text content and update search metadata
  //   //   const optionText = relatedTarget.textContent?.trim();
  //   //   if (optionText) {
  //   //     dataHandlers.updateMetaData({ search: optionText });
  //   //   }
  //   // }

  //   // dataHandlers.trigger({ id: eventIds.searchInputField, type: 'close' });
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Only update internal state if uncontrolled
    if (!isControlled) {
      setInnerValue(value);
    }

    // Call the onChange callback from props if provided
    if (onChangeFromProps) {
      onChangeFromProps(event);
    }

    if (!value) {
      // Clear the search metadata when input is cleared
      dataHandlers.updateMetaData({ search: '' });
      dataHandlers.updateData({ groups: historyData, open: false });
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'focus' });
    } else if (onSearch) {
      // clear the groups when input is changed and onSearch is provided
      dataHandlers.updateData({ groups: [] });
      dataHandlers.trigger({ id: eventIds.search, type: 'change', payload: { value } });
    } else {
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'close' });
    }

    // dataHandlers.trigger({ id: eventIds.searchInputField, type: !value ? 'focus' : 'close' });

    // // Trigger search event
    // dataHandlers.trigger({ id: eventIds.search, type: 'change', payload: { value } });
  };

  const handleSearch = () => {
    // close the dropdown
    dataHandlers.trigger({ id: eventIds.searchInputField, type: 'close' });

    const currentValue = isControlled ? externalValue : innerValue;
    if (!currentValue || !currentValue.trim()) return;
    addSearchItem(currentValue);

    // Call the optional onSend prop if provided
    if (onSend) {
      onSend(currentValue);
    }
  };

  // Use controlled value if provided, otherwise use internal state
  const inputValue = isControlled ? externalValue : innerValue;

  return (
    <div onFocus={handleFocus} /* onBlur={handleBlur} */>
      <TextInput
        {...rest}
        ref={ref}
        onChange={handleChange}
        className={classes}
        id="test"
        placeholder={placeholder}
        aria-label="Search"
        value={inputValue}
        clearButton
        clearButtonAriaLabel={clearButtonAriaLabel}
        type={onSend ? 'search' : 'text'}
        buttonIcon={onSend ? <IconSearch /> : undefined}
        onButtonClick={handleSearch}
      />
    </div>
  );
});

// import React from 'react';

// import classNames from '../../../../utils/classNames';
// import { TextInput, TextInputProps } from '../../../textInput/TextInput';
// import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
// import { eventIds } from '../events';
// import { getTextKey } from '../texts';
// import { createInputOnChangeListener } from '../utils';

// export const SearchInput = (props: Partial<TextInputProps>) => {
//   const classes = classNames(props.className || '');
//   const dataHandlers = useSearchDataHandlers();
//   const { getMetaData, trigger } = dataHandlers;
//   const metaData = getMetaData();

//   const placeholder = getTextKey('searchPlaceholder', metaData) || 'Type to search...';
//   const clearButtonAriaLabel = getTextKey('searchClearButtonAriaLabel', metaData) || 'Clear search';
//   const handleChange = createInputOnChangeListener({ id: eventIds.search, trigger });

//   return (
//     <TextInput
//       {...props}
//       {...handleChange}
//       className={classes}
//       ref={metaData.refs.searchInput}
//       id={metaData.elementIds.searchInput}
//       placeholder={placeholder}
//       aria-label={getTextKey('searchLabel', metaData) || 'Search'}
//       value={metaData.search}
//       clearButton
//       clearButtonAriaLabel={clearButtonAriaLabel}
//     />
//   );
// };
