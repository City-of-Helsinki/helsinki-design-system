import React, { useCallback } from 'react';

import { ModularOptionList } from './ModularOptionList';
import { getOptionLabels } from './batch.options';
import { ModularOptionListProps, Texts } from './types';

export default {
  component: ModularOptionList,
  title: 'Components/ModularOptionList',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requireOneSelection: ModularOptionListProps['onChange'] = (selectedOptions, clickedOption, data) => {
  const hasSelections = selectedOptions.length > 0;

  return {
    invalid: !hasSelections,
    texts: {
      error: hasSelections ? '' : 'A selection is required',
    },
  };
};

const defaultTexts: Partial<Texts> = {
  selectedOptionsCount_one: 'One selected option.',
  selectedOptionsCount_multiple: '{{selectionCount}} selected options.',
  error: 'Wrong choice!',
  language: 'en',
};

export const Singleselect = () => {
  const options = getOptionLabels(20);
  const onChange: ModularOptionListProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    return requireOneSelection(selectedOptions, lastClickedOption, props);
  }, []);
  return <ModularOptionList options={options} onChange={onChange} texts={defaultTexts} id="hds-select-component" />;
};
