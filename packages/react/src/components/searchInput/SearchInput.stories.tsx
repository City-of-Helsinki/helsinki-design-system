/* eslint-disable no-console */

import React from 'react';

import { SearchInput } from './SearchInput';

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
};

export const WithoutSearchButton = (args) => {
  const onSubmit = (value: string) => {
    console.log('Search for:', value);
  };
  return <SearchInput {...args} hideSearchButton onSubmit={onSubmit} />;
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
};

export const WithSuggestionsSpinner = (args) => {
  type SuggestionItemType = {
    value: string;
  };

  const getSuggestions = async (inputValue: string): Promise<SuggestionItemType[]> => {
    const suggestions = await longLastingAsynchronousSearchOperation(inputValue);
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
WithSuggestionsSpinner.storyName = 'With suggestions & spinner';
WithSuggestionsSpinner.args = {
  label: 'Search for a fruit',
  helperText: 'Assistive text',
};
