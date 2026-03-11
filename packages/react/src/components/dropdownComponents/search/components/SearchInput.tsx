import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import styles from './SearchInput.module.scss';
import classNames from '../../../../utils/classNames';
import { TextInput, TextInputProps } from '../../../textInput/TextInput';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import { eventIds } from '../events';
import { getTextKey } from '../texts';
import { convertPropsToGroups } from '../../modularOptionList/utils';
import { useSearchHistory } from '../SearchHistoryContext';
import { IconClock } from '../../../../icons/IconClock';
import { IconSearch } from '../../../../icons/IconSearch';
import { SearchFunction } from '../types';
import {
  createScreenReaderNotification,
  addOrUpdateScreenReaderNotificationByType,
} from '../../shared/utils/screenReader';

export interface SearchInputHandle extends HTMLInputElement {
  submit: () => void;
}

export const SearchInput = forwardRef<
  SearchInputHandle,
  TextInputProps & { onSearch?: SearchFunction; onSend?: (value: string) => void; hideSubmitButton?: boolean }
>((props, ref) => {
  const classes = classNames(styles.searchInput, props.className || '');
  const dataHandlers = useSearchDataHandlers();
  const { getMetaData /* , trigger */ } = dataHandlers;
  const metaData = getMetaData();
  const [innerValue, setInnerValue] = React.useState(metaData.search || '');
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract props first
  const {
    onSearch,
    onSend,
    hideSubmitButton,
    onChange: onChangeFromProps,
    value: externalValue,
    onFocus: onFocusFromProps,
    onBlur: onBlurFromProps,
    ...rest
  } = props;

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

  const { searchHistory, addSearchItem, historyEnabled } = useSearchHistory();

  const historyLabel = getTextKey('historyLabel', metaData) ?? 'Recent searches';

  // form group from searchHistory strings
  const historyData = React.useMemo(() => {
    if (searchHistory.length === 0) return [];
    return convertPropsToGroups({
      groups: [
        {
          label: historyLabel,
          options: searchHistory.map((term) => ({
            value: term,
            label: term,
            selected: false,
            isGroupLabel: false,
            visible: true,
            disabled: false,
            iconStart: <IconClock aria-hidden />,
          })),
        },
      ],
    });
  }, [searchHistory, historyLabel]);

  const placeholder = getTextKey('searchPlaceholder', metaData);
  const clearButtonAriaLabel = getTextKey('searchClearButtonAriaLabel', metaData);

  const isMouseClickRef = React.useRef(false);

  const handleInputMouseDown = () => {
    isMouseClickRef.current = true;
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Call the user's onFocus callback if provided
    if (onFocusFromProps) {
      onFocusFromProps(event);
    }

    // Open dropdown on mouse/touch click, but NOT on keyboard Tab focus.
    if (isMouseClickRef.current) {
      isMouseClickRef.current = false;
      const currentValue = isControlled ? externalValue : innerValue;
      if (!currentValue) {
        dataHandlers.updateData({ groups: historyData });
        // Announce history count if history is available
        if (historyData.length > 0 && historyData[0].options && historyData[0].options.length > 0) {
          const content = getTextKey('historyInfo', dataHandlers.getMetaData());
          const notification = createScreenReaderNotification('history', content, 0);
          addOrUpdateScreenReaderNotificationByType(notification, dataHandlers);
        }
      }
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'focus' });
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { open } = dataHandlers.getData();
    if (!open && event.key === 'ArrowDown') {
      // Open dropdown with history when pressing ArrowDown on closed dropdown
      const currentValue = isControlled ? externalValue : innerValue;
      if (!currentValue) {
        dataHandlers.updateData({ groups: historyData });
      }
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'focus' });
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;

    // Call the user's onBlur callback if provided
    if (onBlurFromProps) {
      onBlurFromProps(event);
    }

    // Check if focus is moving to a button within the TextInput
    if (relatedTarget && relatedTarget.tagName === 'BUTTON') {
      // Close dropdown when tabbing/clicking to clear button or search button
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'close' });
    }
    // Note: If relatedTarget is null or outside the component, the Container's blur handler will close the dropdown
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Clear virtual focus when user types so ArrowDown restarts from the first item
    inputRef.current?.removeAttribute('aria-activedescendant');

    // Only update internal state if uncontrolled
    if (!isControlled) {
      setInnerValue(value);
    }

    // Call the onChange callback from props if provided
    if (onChangeFromProps) {
      onChangeFromProps(event);
    }

    if (!value) {
      // Clear the search when input is cleared
      if (onSearch) {
        // Trigger search change event with empty value to cancel ongoing search
        dataHandlers.trigger({ id: eventIds.search, type: 'change', payload: { value: '' } });
      }
      dataHandlers.updateMetaData({ search: '' });
      dataHandlers.updateData({ groups: historyData, open: false });
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'focus' });
    } else if (onSearch) {
      // clear the groups when input is changed and onSearch is provided
      dataHandlers.updateData({ groups: [] });
      dataHandlers.trigger({ id: eventIds.search, type: 'change', payload: { value } });
    } else {
      // Update metaData.search even when onSearch is not provided
      dataHandlers.updateMetaData({ search: value });
      dataHandlers.trigger({ id: eventIds.searchInputField, type: 'close' });
    }
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

  // Read open state for aria-expanded
  const { open } = dataHandlers.getData();

  // Expose both the input element and submit method via ref
  useImperativeHandle(
    ref,
    () => {
      const inputElement = inputRef.current as SearchInputHandle;
      if (inputElement) {
        inputElement.submit = handleSearch;
      }
      return inputElement;
    },
    [handleSearch],
  );

  // Determine if history info should be announced (history available + input empty)
  const hasHistory = searchHistory.length > 0;
  const showHistoryInfo = hasHistory && !inputValue;
  const historyInfoId = metaData.elementIds.historyInfo;
  const ariaDescribedBy = showHistoryInfo
    ? `${metaData.elementIds.assistiveText} ${historyInfoId}`
    : metaData.elementIds.assistiveText;

  // The input is a combobox only when it can have a popup (search suggestions or history enabled)
  const hasPopup = !!onSearch || historyEnabled;

  return (
    <>
      <TextInput
        {...rest}
        ref={inputRef}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        onMouseDown={handleInputMouseDown}
        className={classes}
        id={metaData.elementIds.searchInput}
        placeholder={placeholder}
        role={hasPopup ? 'combobox' : 'searchbox'}
        aria-autocomplete={hasPopup ? 'list' : undefined}
        aria-expanded={hasPopup ? open : undefined}
        aria-controls={hasPopup ? metaData.elementIds.list : undefined}
        aria-labelledby={metaData.elementIds.label}
        value={inputValue}
        clearButton
        clearButtonAriaLabel={clearButtonAriaLabel}
        type={onSend ? 'search' : 'text'}
        buttonIcon={onSend && !hideSubmitButton ? <IconSearch className={styles.searchButtonIcon} /> : undefined}
        onButtonClick={handleSearch}
        buttonAriaLabel={getTextKey('searchButtonAriaLabel', metaData)}
        aria-describedby={ariaDescribedBy}
      />
      {hasHistory && (
        <div id={historyInfoId} className={styles.historyInfo} hidden={!showHistoryInfo}>
          {getTextKey('historyInfo', metaData)}
        </div>
      )}
    </>
  );
});
