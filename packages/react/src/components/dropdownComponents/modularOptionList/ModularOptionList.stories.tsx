import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';

import { ModularOptionList } from './ModularOptionList';
import { getOptionLabels } from './batch.options';
import { ModularOptionListProps, Texts, Option } from './types';
import { IconDocument, IconUser } from '../../../icons';

export default {
  component: ModularOptionList,
  title: 'Components/DropdownComponents/ModularOptionList',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const genericOnChangeCallback: ModularOptionListProps['onChange'] = (selectedOptions, clickedOption, data) => {
  action('onChange');
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

const defaultTextsForMultiSelect: Partial<Texts> = {
  ...defaultTexts,
  label: 'Select multiple fruits or vegetables',
};

export const Singleselect = () => {
  const options = getOptionLabels(20);
  const onChange: ModularOptionListProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    return requireOneSelection(selectedOptions, lastClickedOption, props);
  }, []);
  return <ModularOptionList options={options} onChange={onChange} texts={defaultTexts} id="hds-select-component" />;
};

export const SingleselectWithGroups = () => {
  const groups: ModularOptionListProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(40),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy cane', label: 'Candy cane' },
        { value: 'Sugar bomb', label: 'Sugar bomb' },
        { value: 'Dr. Pepper', label: 'Dr. Pepper' },
      ],
    },
  ];
  const onChange: ModularOptionListProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return <ModularOptionList groups={groups} onChange={onChange} texts={defaultTexts} id="hds-select-component" />;
};

export const Multiselect = () => {
  const [onChangeSelections, setOnChangeSelections] = useState<Option[]>([]);

  const onChange: ModularOptionListProps['onChange'] = useCallback((selectedOptions, lastClickedOption, data) => {
    setOnChangeSelections(selectedOptions);
    return requireOneSelection(selectedOptions, lastClickedOption, data);
  }, []);

  const [props] = useState<Partial<ModularOptionListProps>>({
    multiSelect: true,
    id: 'hds-select-component',
    texts: defaultTextsForMultiSelect,
    options: getOptionLabels(20),
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '420px' }}>
      <label id="onchange-label" htmlFor="onchange">
        onChange triggered values
      </label>
      <input
        type="text"
        id="onchange"
        aria-labelledby="onchange-label"
        readOnly
        value={onChangeSelections.map((option) => option.label).join(', ')}
      />
      <ModularOptionList {...props} onChange={onChange} />
    </div>
  );
};

export const MultiselectWithGroups = () => {
  const groups: ModularOptionListProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4, 5),
    },
  ];

  const onChange: ModularOptionListProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return (
    <ModularOptionList
      groups={groups}
      onChange={onChange}
      multiSelect
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const WithIcons = () => {
  const groups: ModularOptionListProps['groups'] = [
    {
      label: 'Users',
      options: [
        { value: 'user1', label: 'John Doe', iconStart: <IconUser aria-hidden /> },
        { value: 'user2', label: 'Jane Smith', iconStart: <IconUser aria-hidden /> },
        { value: 'user3', label: 'Bob Johnson', iconStart: <IconUser aria-hidden /> },
      ],
    },
    {
      label: 'Documents',
      options: [
        { value: 'doc1', label: 'Report.pdf', iconStart: <IconDocument aria-hidden /> },
        { value: 'doc2', label: 'Presentation.pptx', iconStart: <IconDocument aria-hidden /> },
      ],
    },
  ];
  const onChange: ModularOptionListProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return <ModularOptionList groups={groups} onChange={onChange} texts={defaultTexts} id="hds-select-component" />;
};
