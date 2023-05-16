/* eslint-disable no-console */

import React, { useRef, useState } from 'react';

import { SearchInput } from './SearchInput';
import { Button } from '../button';

export default {
  component: SearchInput,
  title: 'Components/SearchInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '420px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
};

const fruits = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Coconut',
  'Cranberry',
  'Date',
  'Dragonfruit',
  'Fig',
  'Gooseberry',
  'Grape',
  'Honeyberry',
  'Jackfruit',
  'Kiwifruit',
  'Lemon',
  'Lime',
  'Mango',
  'Melon',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Pineapple',
  'Raspberry',
  'Satsuma',
  'Start fruit',
  'Strawberry',
  'Tangelo',
  'Tomato',
].map((fruit) => ({ value: fruit }));

const asynchronousSearchOperation = (inputValue: string, timeout = 0) => {
  return new Promise<Array<{ value: string }>>((resolve) => {
    const filteredItems = fruits.filter((fruit) => {
      return fruit.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    });
    setTimeout(() => {
      resolve(filteredItems);
    }, timeout);
  });
};

const longLastingAsynchronousSearchOperation = (inputValue: string) => asynchronousSearchOperation(inputValue, 5000);

export const Default = (args) => {
  const onSubmit = (value: string) => {
    console.log('Search for:', value);
  };
  return <SearchInput {...args} onSubmit={onSubmit} />;
};
Default.args = {
  label: 'Search',
  helperText: 'Assistive text',
  placeholder: 'Placeholder',
};

export const WithCustomSearchButton = (args) => {
  const currentValue = useRef<string>('');

  const onChange = (value: string) => {
    console.log('Input value changed:', value);
    currentValue.current = value;
  };

  const onSubmit = (string) => {
    console.log('Search for:', string);
  };

  const doSearch = () => {
    if (currentValue.current) console.log('Search:', currentValue.current);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <style>
        {`
        .search-button {
          margin-left: 10px;
        }

        @media only screen and (max-width: ${getComputedStyle(document.documentElement).getPropertyValue(
          '--breakpoint-m',
        )}) {
          .search-input,
          .search-button {
            width: 100%;
          }

          .search-button {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      `}
      </style>
      <SearchInput
        className="search-input"
        {...args}
        hideSearchButton
        onSubmit={onSubmit}
        onChange={onChange}
        placeholder="Placeholder"
      />
      <Button className="search-button" onClick={doSearch}>
        Search
      </Button>
    </div>
  );
};

export const WithSuggestions = (args) => {
  type SuggestionItemType = {
    value: string;
  };

  const getSuggestions = async (inputValue: string): Promise<SuggestionItemType[]> => {
    const suggestions = await asynchronousSearchOperation(inputValue);
    return suggestions;
  };

  const onSubmit = (value: string) => {
    console.log('Submitted value:', value);
  };

  return (
    <SearchInput<SuggestionItemType>
      {...args}
      suggestionLabelField="value"
      getSuggestions={getSuggestions}
      onSubmit={onSubmit}
    />
  );
};
WithSuggestions.storyName = 'With suggestions';
WithSuggestions.args = {
  label: 'Search for a fruit',
  helperText: 'Assistive text',
  placeholder: 'Placeholder',
};

export const WithSuggestionsAndHighlighting = (args) => {
  type SuggestionItemType = {
    value: string;
  };

  const getSuggestions = async (inputValue: string): Promise<SuggestionItemType[]> => {
    const suggestions = await asynchronousSearchOperation(inputValue);
    return suggestions;
  };

  const onSubmit = (value: string) => {
    console.log('Submitted value:', value);
  };

  return (
    <SearchInput<SuggestionItemType>
      {...args}
      suggestionLabelField="value"
      getSuggestions={getSuggestions}
      onSubmit={onSubmit}
    />
  );
};

WithSuggestionsAndHighlighting.storyName = 'With suggestions and highlighting';
WithSuggestionsAndHighlighting.args = {
  label: 'Search for a fruit',
  helperText: 'Assistive text',
  highlightSuggestions: true,
  placeholder: 'Placeholder',
};

export const WithHistoryAndSuggestions = (args) => {
  type SuggestionItemType = {
    value: string;
  };

  const getSuggestions = async (inputValue: string): Promise<SuggestionItemType[]> => {
    const suggestions = await asynchronousSearchOperation(inputValue);
    return suggestions;
  };

  const searchHistoryKey = 'search-history';

  const getStorageHistoryItems = (): string[] => {
    const historyString = sessionStorage.getItem(searchHistoryKey);
    if (!historyString) {
      return [];
    }

    return historyString.split(',');
  };

  const getSearchHistory = (): SuggestionItemType[] => {
    const historyItems = getStorageHistoryItems();
    return historyItems.map((value) => ({ value }));
  };

  const setHistoryItem = (value): void => {
    const historyStringItems = getStorageHistoryItems();
    const uniqueHistoryWithNew = Array.from(new Set([value, ...historyStringItems]));
    return sessionStorage.setItem(searchHistoryKey, uniqueHistoryWithNew.join());
  };

  const onSubmit = (value: string) => {
    console.log('Submitted value:', value);
    setHistoryItem(value);
  };

  return (
    <SearchInput<SuggestionItemType>
      {...args}
      onSubmit={onSubmit}
      searchHistoryGroupLabel="Search history"
      getSearchHistory={getSearchHistory}
      suggestionLabelField="value"
      suggestionGroupLabel="All suggestions"
      getSuggestions={getSuggestions}
    />
  );
};

WithHistoryAndSuggestions.args = {
  label: 'Search for a fruit',
  helperText: 'Assistive text',
  highlightSuggestions: true,
  placeholder: 'Placeholder',
};

WithHistoryAndSuggestions.parameters = {
  loki: { skip: true },
};

export const WithSuggestionsSpinner = (args) => {
  type SuggestionItemType = {
    value: string;
  };

  const getSuggestions = async (inputValue: string): Promise<SuggestionItemType[]> => {
    const suggestions = await longLastingAsynchronousSearchOperation(inputValue);
    return suggestions;
  };

  const onChange = (value: string) => {
    console.log('input value changed:', value);
  };

  const onSubmit = (value: string) => {
    console.log('Submitted value:', value);
  };

  return (
    <SearchInput<SuggestionItemType>
      {...args}
      suggestionLabelField="value"
      getSuggestions={getSuggestions}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};
WithSuggestionsSpinner.storyName = 'With suggestions & spinner';
WithSuggestionsSpinner.args = {
  label: 'Search for a fruit',
  helperText: 'Assistive text',
  placeholder: 'Placeholder',
};

export const WithDefaultValue = (args) => {
  type SuggestionItemType = {
    value: string;
  };
  const [searchValue, setSearchValue] = useState<string>(args.value);

  const getSuggestions = async (inputValue: string): Promise<SuggestionItemType[]> => {
    const suggestions = await asynchronousSearchOperation(inputValue);
    return suggestions;
  };

  const onSubmit = (value: string) => {
    console.log('Submitted value:', value);
  };

  const onChange = (value: string) => {
    console.log('Changed value: ', value);
    setSearchValue(value);
  };

  return (
    <SearchInput<SuggestionItemType>
      {...args}
      suggestionLabelField="value"
      getSuggestions={getSuggestions}
      onSubmit={onSubmit}
      value={searchValue}
      onChange={onChange}
    />
  );
};
WithDefaultValue.storyName = 'With default value';
WithDefaultValue.args = {
  label: 'Search for a fruit',
  helperText: 'Assistive text',
  placeholder: 'Placeholder',
  value: 'Banana',
};
