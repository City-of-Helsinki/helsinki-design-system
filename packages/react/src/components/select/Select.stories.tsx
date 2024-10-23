import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { action } from '@storybook/addon-actions';

import {
  SelectProps,
  Texts,
  Option,
  TextProvider,
  Select,
  useSelectStorage,
  SupportedLanguage,
  defaultTexts as defaultUITexts,
  defaultFilter,
  getNewSelections,
  iterateAndCopyGroup,
  updateSelectedOptionsInGroups,
} from './index';
import { IconBell, IconCogwheels, IconLocation, IconMoneyBag } from '../../icons';
import { Button } from '../button/Button';
import { getOptionLabels, getOptions, getLargeBatchOfUniqueValues } from './batch.options';
import { OptionInProps } from './types';
import { Tag, TagSize } from '../tag/Tag';

export default {
  component: Select,
  title: 'Components/Select',
};

const createRandomGroupsForSearch = (search: string) => {
  if (search === 'none') {
    return { groups: [] };
  }
  const groups: SelectProps['groups'] = [
    {
      label: 'Random items',
      options: getOptions(),
    },
    {
      label: 'Common items',
      options: [
        {
          value: `${search}`,
          label: `Searched for ${search}`,
        },
        {
          value: `match`,
          label: `Same option everytime`,
        },
      ],
    },
  ];
  return { groups };
};

const WrapperWithButtonStyles = (props: PropsWithChildren<unknown>) => {
  return (
    <div>
      <style>
        {`
      .buttons{
        margin-top: var(--spacing-s);
      }
      .buttons > *{
        margin: 0 var(--spacing-s) var(--spacing-s) 0;
      }
  `}
      </style>
      {props.children}
    </div>
  );
};

const onSearch: SelectProps['onSearch'] = async (searchValue) => {
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  if (searchValue === 'error') {
    return Promise.reject(new Error('Simulated error'));
  }
  return Promise.resolve(searchValue ? createRandomGroupsForSearch(searchValue) : {});
};

const genericOnChangeCallback: SelectProps['onChange'] = () => {
  action('onChange');
};

const requireOneSelection: SelectProps['onChange'] = (selectedOptions) => {
  const hasSelections = selectedOptions.length > 0;

  return {
    invalid: !hasSelections,
    texts: {
      error: hasSelections ? '' : 'A selection is required',
    },
  };
};

const defaultTexts: Partial<Texts> = {
  label: 'Label',
  placeholder: 'Choose one',
  selectedOptionsLabel: 'Selected options',
  error: 'Wrong choice!',
  language: 'en',
};

const defaultTextsForMultiSelect: Partial<Texts> = {
  ...defaultTexts,
  label: 'Select multiple fruits or vegetables',
  placeholder: 'Choose many',
};

/**
 *
 * Visual Playwright tests depend on these stories. Changing option labels or other props may brake the tests.
 *
 */

export const Singleselect = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    return requireOneSelection(...args);
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const SingleselectWithGroups = () => {
  const groups: SelectProps['groups'] = [
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
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      icon={<IconLocation />}
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const OptionsAsHtml = () => {
  return (
    <Select onChange={genericOnChangeCallback} texts={defaultTexts} id="hds-select-component">
      <optgroup label="Group 1">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="opt3">Option 3</option>
        <option value="opt4">Option 4</option>
      </optgroup>
    </Select>
  );
};

export const WithControls = () => {
  const [lang, setLang] = useState<SupportedLanguage>('fi');
  const addLang = (value: string, language?: string) => {
    const withoutLang = value.split('(')[0];
    return `${withoutLang} (${language || lang})`;
  };
  const createOptionWithLanguage = (value: string) => {
    const labelAndValue = addLang(value);
    return { label: labelAndValue, value };
  };

  const [optionGroups, updateOptionGroups] = useState<SelectProps['groups']>([
    {
      label: addLang('Healthy choices'),
      options: getOptionLabels(4).map(createOptionWithLanguage),
    },
    {
      label: addLang('More healthy choices'),
      options: getOptionLabels(4, 5).map(createOptionWithLanguage),
    },
  ]);

  const onChange: SelectProps['onChange'] = (selectedOptions) => {
    updateOptionGroups(updateSelectedOptionsInGroups(optionGroups, selectedOptions));
  };

  const [props, updateProps] = useState<SelectProps>({
    onChange,
    disabled: false,
    multiSelect: true,
    open: false,
    invalid: false,
    id: 'hds-select-component',
  });

  const texts: Partial<Texts> = {
    language: lang,
    label: `Label (${lang})`,
    placeholder: `Placeholder (${lang})`,
    error: `Invalid selections! (${lang})`,
  };

  const icons: Record<SupportedLanguage, React.ReactNode> = {
    en: <IconBell />,
    fi: <IconCogwheels />,
    sv: <IconMoneyBag />,
  };

  const changeLang = (newLang: SupportedLanguage) => {
    setLang(newLang);
    if (!optionGroups) {
      return;
    }
    updateOptionGroups(
      optionGroups.map((group) => {
        return {
          label: addLang(group.label, newLang),
          options: group.options.map((opt: OptionInProps | string) => {
            if (!opt) {
              return '';
            }
            if (typeof opt === 'string') {
              return addLang(opt, newLang);
            }
            return {
              ...opt,
              label: addLang(opt.label || '', newLang),
            };
          }),
        };
      }),
    );
  };
  const setFinnish = () => {
    changeLang('fi');
  };
  const setEnglish = () => {
    changeLang('en');
  };
  const setSwedish = () => {
    changeLang('sv');
  };

  const resetSelections = () => {
    updateOptionGroups(updateSelectedOptionsInGroups(optionGroups, []));
  };

  const toggleDisable = () => {
    const { disabled } = props;
    updateProps({ ...props, disabled: !disabled });
  };

  const toggleMenu = () => {
    const { open } = props;
    updateProps({ ...props, open: !open });
  };

  const toggleInvalid = () => {
    const { invalid } = props;
    updateProps({ ...props, invalid: !invalid });
  };

  const toggleRequired = () => {
    const { required } = props;
    updateProps({ ...props, required: !required });
  };

  return (
    <WrapperWithButtonStyles>
      <Select {...props} groups={optionGroups} texts={texts} icon={icons[lang]} />
      <div className="buttons">
        <Button onClick={resetSelections}>Reset selections</Button>
        <Button onClick={toggleDisable}>Disable/enable component</Button>
        <Button onClick={toggleMenu}>Open/Close list</Button>
        <Button onClick={toggleInvalid}>Set valid/invalid</Button>
        <Button onClick={toggleRequired}>Toggle required</Button>
      </div>
      <div className="buttons">
        <Button onClick={setFinnish} disabled={lang === 'fi'}>
          Finnish
        </Button>
        <Button onClick={setEnglish} disabled={lang === 'en'}>
          English
        </Button>
        <Button onClick={setSwedish} disabled={lang === 'sv'}>
          Swedish
        </Button>
      </div>
    </WrapperWithButtonStyles>
  );
};

export const WithValidationAndForcedSelection = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(3),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'invalid1', label: 'Candy cane' },
        { value: 'invalid2', label: 'Sugar bomb' },
        { value: 'invalid3', label: 'Dr. Pepper' },
      ],
    },
  ];

  const texts = { ...defaultTexts, label: 'Pick a healthy choice', error: '' };

  const onChange: SelectProps['onChange'] = (selectedOptions) => {
    const hasSelections = selectedOptions.length > 0;
    const hasErrorSelection = !!selectedOptions.find((option) => option.value.includes('invalid'));
    const getErrorText = () => {
      if (hasErrorSelection) {
        return 'Please make a good choice';
      }
      if (!hasSelections) {
        return 'A selection is required!';
      }
      return '';
    };
    const error = getErrorText();
    return {
      invalid: !!error,
      texts: {
        assistive: error ? '' : 'Excellent choice!',
        error,
      },
    };
  };

  return <Select groups={groups} onChange={onChange} texts={texts} required id="hds-select-component" />;
};

export const WithFilter = () => {
  const options = getOptionLabels(20);
  return (
    <Select
      options={options}
      onChange={genericOnChangeCallback}
      icon={<IconLocation />}
      filter={defaultFilter}
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const WithSearch = () => {
  const options = getOptionLabels(20);
  return (
    <>
      <Select
        options={options}
        onChange={genericOnChangeCallback}
        icon={<IconLocation />}
        onSearch={onSearch}
        texts={defaultTexts}
        id="hds-select-component"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </>
  );
};

export const Multiselect = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    return requireOneSelection(...args);
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      multiSelect
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroups = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4, 5),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroupsAndFilter = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(10),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(10, 10),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      filter={defaultFilter}
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroupsAndSearch = () => {
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <div>
      <Select
        onChange={onChange}
        multiSelect
        onSearch={onSearch}
        icon={<IconLocation />}
        texts={defaultTextsForMultiSelect}
        id="hds-select-component"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </div>
  );
};

export const MultiselectWithCustomTags = () => {
  const [selections, updateSelections] = useState<Option[]>([]);
  const CustomOptionList = ({ options }: { options: Option[] }) => {
    if (!options.length) {
      return <p>No options selected</p>;
    }
    return (
      <>
        <h3>Selected options:</h3>
        {options.map((option) => {
          return (
            <Tag key={option.value} size={TagSize.Large}>
              {option.label}
            </Tag>
          );
        })}
      </>
    );
  };

  const storage = useSelectStorage({
    groups: [
      {
        label: 'Healthy choices',
        options: getOptionLabels(4),
      },
      {
        label: 'More healthy choices',
        options: getOptionLabels(4, 5),
      },
    ],
    onChange: (selectedOptions) => {
      updateSelections(selectedOptions);
    },
    multiSelect: true,
    filter: defaultFilter,
    disabled: false,
    open: false,
    invalid: false,
    texts: defaultTextsForMultiSelect,
    id: 'hds-select-component',
    noTags: true,
  });

  return (
    <WrapperWithButtonStyles>
      <Select {...storage.getProps()} />
      <div className="buttons">
        <CustomOptionList options={selections} />
      </div>
    </WrapperWithButtonStyles>
  );
};

export const VirtualizedMultiselectWithGroups = () => {
  const groups = [
    {
      label: 'Healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
    {
      label: 'More healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      virtualize
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};
export const VirtualizedSingleselectWithGroups = () => {
  const groups = [
    {
      label: 'Healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
    {
      label: 'More healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      virtualize
      icon={<IconLocation />}
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const VirtualizationMultiselectWithoutGroups = () => {
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      options={getLargeBatchOfUniqueValues(2000)}
      onChange={onChange}
      virtualize
      multiSelect
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const VirtualizedSingleselectWithoutGroups = () => {
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      options={getLargeBatchOfUniqueValues(2000)}
      onChange={onChange}
      virtualize
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const FocusListenerExample = () => {
  const [isFocused, setIsFocused] = useState(false);

  const setIsFocusedInHook = useCallback(
    (focusValue: boolean) => {
      setIsFocused(focusValue);
    },
    [setIsFocused],
  );

  // need to memoize all or re-rendering will lose selections
  const memoizedProps = useMemo(() => {
    const changeTracking: { selectedOptions: Option[] } = {
      selectedOptions: [],
    };

    const onChange: SelectProps['onChange'] = (selectedOptions) => {
      changeTracking.selectedOptions = selectedOptions;
    };

    const options = getLargeBatchOfUniqueValues(100);

    return {
      texts: defaultTexts,
      onChange,
      changeTracking,
      options,
    };
  }, []);

  const onFocus: SelectProps['onFocus'] = useCallback(async () => {
    memoizedProps.texts.error = '';
    setIsFocusedInHook(true);
  }, []);

  const onBlur: SelectProps['onBlur'] = useCallback(async () => {
    if (!memoizedProps.changeTracking.selectedOptions.length) {
      memoizedProps.texts.error = 'Select something';
    }
    setIsFocusedInHook(false);
  }, []);

  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    genericOnChangeCallback(...args);
  }, []);

  return (
    <>
      <style>
        {`
          .focused,
          .blurred {
            padding: var(--spacing-s);
          }

          .focused {
            background-color: var(--color-tram-medium-light);
          }

          .blurred {
            background-color: var(--color-black-10);
          }

          .indicators {
            display: flex;
            flex-direction: column;
            margin:  var(--spacing-s); 0;

            .indicator {
              padding-left:  var(--spacing-s);
              position: relative;
            }

            .indicator:before {
              background: #defcde;
              content: ' ';
              display: block;
              height: 10px;
              left: 0;
              position: absolute;
              top: 5px;
              width: 10px;
            }

            .indicator.blurIndicator:before {
              background: #ececec;
            }
          }

        `}
      </style>
      <div className={isFocused ? 'focused' : 'blurred'}>
        <Select
          options={memoizedProps.options}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          multiSelect
          icon={<IconLocation />}
          texts={defaultTextsForMultiSelect}
          id="hds-select-component"
        />
      </div>
      <div className="indicators">
        <div className="indicator">Focused</div>
        <div className="indicator blurIndicator">Blurred</div>
      </div>
      <Button>This is just a focus target</Button>
    </>
  );
};

export const WithStorageControls = () => {
  const [lang, setLang] = useState<SupportedLanguage>('fi');
  const addLang = (value: string, language?: string) => {
    const withoutLang = value.split('(')[0];
    return `${withoutLang} (${language || lang})`;
  };

  const initialGroups = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4, 5),
    },
  ];

  const getTexts = (language: SupportedLanguage): Partial<Texts> => {
    return {
      language,
      label: `Controlled select (${language})`,
      placeholder: `Placeholder (${language})`,
    };
  };

  const storage = useSelectStorage({
    groups: initialGroups,
    onChange: genericOnChangeCallback,
    multiSelect: true,
    filter: defaultFilter,
    disabled: false,
    open: false,
    invalid: false,
    texts: getTexts(lang),
    id: 'hds-select-component',
  });

  const changeLang = (newLang: SupportedLanguage) => {
    setLang(newLang);
    storage.updateAllOptions((option) => {
      return {
        ...option,
        label: addLang(option.label, newLang),
        selected: option.selected,
      };
    });
    storage.updateTexts(getTexts(newLang));
    /// render is not really needed here because setLang() will re-render anyway.
    storage.render();
  };

  const setFinnish = () => {
    changeLang('fi');
  };
  const setEnglish = () => {
    changeLang('en');
  };
  const setSwedish = () => {
    changeLang('sv');
  };

  const resetSelections = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        selected: false,
        disabled: false,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const invertSelections = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        selected: !option.selected,
        disabled: false,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const selectAll = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        selected: true,
        disabled: false,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const toggleGroupDisable = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        disabled: !option.disabled,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const toggleDisable = () => {
    const current = storage.getProps().disabled;
    storage.setDisabled(!current);
    storage.render();
  };

  const toggleInvalid = () => {
    const current = storage.getProps().invalid;
    storage.setInvalid(!current);
    storage.render();
  };

  const showError = () => {
    storage.setError(`There is an error!`);
    storage.render();
  };

  const clearError = () => {
    storage.setError(false);
    storage.render();
  };

  return (
    <WrapperWithButtonStyles>
      <Select {...storage.getProps()} multiSelect filter={defaultFilter} />
      <div className="buttons">
        <Button onClick={resetSelections}>Reset selections</Button>
        <Button onClick={invertSelections}>Invert selections</Button>
        <Button onClick={selectAll}>Select all</Button>
      </div>
      <div className="buttons">
        <Button onClick={toggleDisable}>Disable/enable component</Button>
        <Button onClick={toggleGroupDisable}>Disable/enable options</Button>
      </div>
      <div className="buttons">
        <Button onClick={toggleInvalid}>Set valid/invalid</Button>
        <Button onClick={showError}>Set error</Button>
        <Button onClick={clearError}>Clear error</Button>
      </div>
      <div className="buttons">
        <Button onClick={setFinnish} disabled={lang === 'fi'}>
          Finnish
        </Button>
        <Button onClick={setEnglish} disabled={lang === 'en'}>
          English
        </Button>
        <Button onClick={setSwedish} disabled={lang === 'sv'}>
          Swedish
        </Button>
      </div>
    </WrapperWithButtonStyles>
  );
};

export const WithMinMax = () => {
  const requiredCount = 1;
  const maxCount = 3;

  const memoizedOnChange = useMemo(() => {
    const changeTracking: { hasSelectedSomething: boolean; previousSelections: Option[] } = {
      hasSelectedSomething: false,
      previousSelections: [],
    };

    const onChange: SelectProps['onChange'] = (selectedValues, lastClickedOption, data) => {
      if (!changeTracking.hasSelectedSomething && selectedValues.length > 0) {
        changeTracking.hasSelectedSomething = true;
      }
      const getAllowedSelections = (allSelections: Option[]) => {
        const overflow = allSelections.length - maxCount;

        if (overflow > 0) {
          const selections = [
            ...changeTracking.previousSelections,
            ...getNewSelections(changeTracking.previousSelections, allSelections),
          ];
          const allowed = selections.slice(0, maxCount);
          return allowed;
        }
        return allSelections;
      };
      const filteredSelections = getAllowedSelections(selectedValues).map((option) => option.value);
      const maxReached = filteredSelections.length >= maxCount;

      const newGroups = iterateAndCopyGroup(data.groups, (option) => {
        const isSelected = option.isGroupLabel ? option.selected : filteredSelections.includes(option.value);
        return {
          ...option,
          selected: isSelected,
          disabled: maxReached ? !isSelected : false,
        };
      });
      changeTracking.previousSelections = selectedValues;

      return {
        groups: newGroups,
      };
    };

    return {
      onChange,
    };
  }, []);

  const textsAsFunction: TextProvider = (key, { selectionCount }) => {
    const texts: Partial<Texts> = {
      label: 'Select 1-3 fruits or vegetables',
      placeholder: 'Choose 1-3 options',
    };

    const textFromObj = texts[key];
    if (textFromObj) {
      return textFromObj;
    }
    if (key === 'assistive') {
      const selectedCount = selectionCount as number;
      return selectedCount >= requiredCount
        ? `Required number of selections done!`
        : `Please select ${requiredCount - selectedCount} more items. Up to ${maxCount} items.`;
    }

    return defaultUITexts.en[key];
  };

  const storage = useSelectStorage({
    groups: [
      {
        label: 'Healthy choices',
        options: getOptionLabels(6).map((option) => {
          return { label: option, value: option, disabled: false };
        }),
      },
      {
        label: 'More healthy choices',
        options: getOptionLabels(6, 10).map((option) => {
          return { label: option, value: option, disabled: false };
        }),
      },
    ],
    multiSelect: true,
    id: 'hds-select-component',
    texts: textsAsFunction,
    ...memoizedOnChange,
  });

  return <Select {...storage.getProps()} />;
};

export const VeryLongLabels = () => {
  const options = getOptionLabels(10).map((label, index) => {
    return label + ` ${label.toLowerCase()} `.repeat(10).substring(0, 30 + index * 5);
  });
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    // track changes here
    return genericOnChangeCallback(...args);
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      multiSelect
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const PreselectedValue = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((...args) => {
    return requireOneSelection(...args);
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      texts={defaultTexts}
      id="hds-select-component"
      value={options[0]}
    />
  );
};
export const KeepOneSelection = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, clickedOption, data) => {
    if (selectedOptions.length > 0) {
      return {
        invalid: false,
      };
    }
    return {
      groups: iterateAndCopyGroup(data.groups, (option) => {
        if (option.value === clickedOption.value) {
          return { ...option, selected: true };
        }
        return option;
      }),
    };
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      invalid
      texts={{ ...defaultTexts, error: 'Select one option' }}
      id="hds-select-component"
    />
  );
};

export const WithCustomTheme = (args: SelectProps) => {
  const options = getOptionLabels(20);
  return (
    <Select
      {...args}
      multiSelect
      options={options}
      filter={defaultFilter}
      onChange={genericOnChangeCallback}
      texts={{ ...defaultTexts, assistive: 'Change component parameters in Story!' }}
      id="hds-select-component"
      value={options.slice(3, 10)}
      icon={<IconLocation />}
    />
  );
};
WithCustomTheme.args = {
  theme: {
    '--icon-color': 'var(--color-white)',
    '--assistive-color': 'var(--color-bus)',
    '--placeholder-color': 'var(--color-black-30)',
    '--dropdown-background-default': 'var(--color-black)',
    '--dropdown-background-disabled': 'var(--color-black-20)',
    '--dropdown-border-color-default': 'var(--color-bus-dark)',
    '--dropdown-border-color-hover': 'var(--color-error)',
    '--dropdown-border-color-hover-invalid': 'var(--color-error)',
    '--dropdown-border-color-focus': 'var(--color-bus)',
    '--dropdown-border-color-invalid': 'var(--color-error)',
    '--dropdown-color-default': 'var(--color-white)',
    '--dropdown-color-disabled': 'var(--color-black-20)',
    '--dropdown-icon-color': 'var(--color-white)',
    '--focus-outline-color': 'var(--color-black)',
    '--helper-color-default': 'var(--color-black-10)',
    '--helper-color-invalid': 'var(--color-black)',
    '--menu-divider-color': 'var(--color-white)',
    '--menu-item-background-default': 'var(--color-black)',
    '--menu-item-background-hover': 'var(--color-white)',
    '--menu-item-background-selected': 'var(--color-white)',
    '--menu-item-background-selected-hover': 'var(--color-bus-light)',
    '--menu-item-background-disabled': 'var(--color-black-20)',
    '--menu-item-color-default': 'var(--color-black-10)',
    '--menu-item-color-hover': 'var(--color-black)',
    '--menu-item-color-selected': 'var(--color-black-90)',
    '--menu-item-color-selected-hover': 'var(--color-white)',
    '--menu-item-color-disabled': 'var(--color-black-60)',
    '--menu-item-icon-color-selected': 'var(--color-white)',
    '--menu-item-icon-color-disabled': 'var(--color-black-60)',
    '--checkbox-background-unselected-override': 'var(--color-tram-light)',
    '--checkbox-background-selected': 'var(--color-tram)',
    '--checkbox-background-hover': 'var(--color-tram-dark)',
    '--checkbox-background-disabled': 'var(--color-black-20)',
    '--checkbox-border-color-selected': 'var(--color-bus)',
    '--checkbox-border-color-selected-hover': 'var(--color-bus-dark)',
    '--checkbox-border-color-selected-focus': 'var(--color-black)',
    '--checkbox-border-color-unselected': 'var(--color-black-20)',
    '--checkbox-border-color-unselected-hover': 'var(--color-black-50)',
    '--checkbox-border-color-unselected-focus': 'var(--color-black-90)',
    '--checkbox-border-color-disabled': 'var(--color-black-20)',
    '--checkbox-icon-color-unselected': 'transparent',
    '--checkbox-icon-color-selected': 'var(--color-black)',
    '--checkbox-icon-color-disabled': 'var(--color-white)',
    '--text-icon-color': 'var(--color-white)',
    '--text-input-background-default': 'var(--color-black)',
    '--text-input-border-color-default': 'var(--color-error)',
    '--text-input-border-color-hover': 'var(--color-error-light)',
    '--text-input-border-color-focus': 'var(--color-error)',
    '--text-input-color-default': 'var(--color-white)',
    '--text-color-focus-outline': 'var(--color-error)',
    '--text-input-placeholder-color': 'var(--color-black-30)',
    '--text-label-color-default': 'var(--color-white)',
    '--tag-background-color-hover': 'var(--color-bus-light)',
    '--tag-background-color': 'var(--color-bus-dark)',
    '--tag-border-color-action': 'var(--color-white)',
    '--tag-color': 'var(--color-black-10)',
    '--tag-outline-color-focus': 'var(--color-focus-outline)',
    '--show-all-background-color-hover': 'var(--color-tram)',
    '--show-all-background-color': 'var(--color-bus-light)',
    '--show-all-border-color': 'var(--color-error)',
    '--show-all-border-color-hover': 'var(--color-error)',
    '--show-all-border-color-focus': 'var(--color-error)',
    '--show-all-border-color-hover-focus': 'var(--color-error)',
    '--show-all-color': 'var(--color-error)',
    '--show-all-color-hover': 'var(--color-error)',
    '--show-all-color-focus': 'var(--color-error)',
    '--show-all-color-hover-focus': 'var(--color-error)',
    '--clear-all-background-color-hover': 'var(--color-bus)',
    '--clear-all-background-color': 'var(--color-white)',
    '--clear-all-border-color': 'var(--color-error)',
    '--clear-all-border-color-hover': 'var(--color-error)',
    '--clear-all-border-color-focus': 'var(--color-error)',
    '--clear-all-border-color-hover-focus': 'var(--color-error)',
    '--clear-all-color': 'var(--color-error)',
    '--clear-all-color-hover': 'var(--color-error)',
    '--clear-all-color-focus': 'var(--color-error)',
    '--clear-all-color-hover-focus': 'var(--color-error)',
  },
};
