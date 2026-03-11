import { ReactElement, ReactNode, RefObject } from 'react';

import { AllElementPropsWithoutRef } from '../../../utils/elementTypings';
import { DataHandlers } from '../../dataProvider/DataContext';
import { EventId } from './events';
import { Tooltip, TooltipProps } from '../../tooltip/Tooltip';
import {
  ModularOptionListProps,
  ModularOptionListData,
  Option,
  OptionInProps,
  GroupInProps,
  ModularOptionListMetaData,
  TextKey as ModularOptionListTextKey,
  TextsWithNumberedVariations as ModularOptionListTextsWithNumberedVariations,
  ModularOptionListCustomTheme,
  KnownElementType as ModularOptionListKnownElementType,
  SupportedLanguage,
  ThemeTarget as ModularOptionListThemeTarget,
} from '../modularOptionList/types';

export type FilterFunction = (option: Option, filterStr: string) => boolean;
export type SearchResult = Pick<ModularOptionListProps, 'groups' | 'options'>;
export type SearchFunction = (
  searchValue: string,
  selectedOptions: Option[],
  data: ModularOptionListData,
) => Promise<SearchResult>;

// Re-export commonly used types from ModularOptionList
export type { Option, OptionInProps, Group, GroupInProps, ScreenReaderNotification } from '../modularOptionList/types';

export type SelectProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  children?: P | P[];
  clearable?: boolean;
  disabled?: boolean;
  filter?: FilterFunction;
  groups?: Array<GroupInProps> | ModularOptionListData['groups'];
  icon?: ReactNode;
  id?: string;
  invalid?: boolean;
  multiSelect?: boolean;
  noTags?: boolean;
  onBlur?: () => void;
  onClose?: (
    selectedOptions: Option[],
    clickedOption: undefined,
    data: ModularOptionListData,
  ) => Partial<Pick<SelectProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onChange?: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: ModularOptionListData,
  ) => Partial<Pick<SelectProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onFocus?: () => void;
  onSearch?: SearchFunction;
  open?: boolean;
  options?: (OptionInProps | string)[];
  required?: boolean;
  texts?: Partial<Texts> | TextProvider;
  theme?: SelectCustomTheme;
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
  value?: string | string[] | Option[] | OptionInProps[];
  virtualize?: boolean;
  visibleOptions?: number;
};

export type SelectData = ModularOptionListData &
  Required<
    Pick<
      SelectProps,
      | 'open'
      | 'required'
      | 'invalid'
      | 'onChange'
      | 'disabled'
      | 'multiSelect'
      | 'noTags'
      | 'visibleOptions'
      | 'virtualize'
      | 'clearable'
    >
  > & {
    initialOpenValue?: boolean;
    filterFunction?: FilterFunction;
    onSearch?: SearchFunction;
    onClose?: SelectProps['onClose'];
  };

export type SelectMetaData = Pick<SelectProps, 'icon'> &
  ModularOptionListMetaData & {
    refs: ModularOptionListMetaData['refs'] & {
      button: RefObject<HTMLButtonElement>;
      listContainer: RefObject<HTMLDivElement>;
      tagList: RefObject<HTMLDivElement>;
      showAllButton: RefObject<HTMLButtonElement>;
      searchOrFilterInput: RefObject<HTMLInputElement>;
      selectionsAndListsContainer: RefObject<HTMLDivElement>;
      container: RefObject<HTMLDivElement>;
      searchInput: RefObject<HTMLInputElement>;
    };
    elementIds: ModularOptionListMetaData['elementIds'] & {
      button: string;
      label: string;
      searchOrFilterInputLabel: string;
      container: string;
      tagList: string;
      searchOrFilterInput: string;
      showAllButton: string;
      clearAllButton: string;
      clearButton: string;
      selectionsAndListsContainer: string;
      searchInput: string;
    };
    textProvider: TextProvider;
    search: string;
    isSearching: boolean;
    hasSearchError: boolean;
    hasListInput: boolean;
    listInputType?: Extract<EventId, 'filter' | 'search'>;
    cancelCurrentSearch: (() => void) | undefined;
    focusTarget: Extract<KnownElementType, 'list' | 'button' | 'container' | 'searchOrFilterInput' | 'tag'> | undefined;

    filter: string;
    showAllTags: boolean;
    themes?: Record<ThemeTarget, undefined | string>;
    tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
  };

export type ButtonElementProps = AllElementPropsWithoutRef<'button'>;

export type SelectDataHandlers = DataHandlers<SelectData, SelectMetaData>;

export type KnownElementType = ModularOptionListKnownElementType | keyof SelectMetaData['elementIds'] | 'tag';

export type TextKey =
  | ModularOptionListTextKey
  | 'clearButtonAriaLabel_multiple'
  | 'clearButtonAriaLabel_one'
  | 'dropdownButtonAriaLabel'
  | 'filterClearButtonAriaLabel'
  | 'filteredWithoutResultsInfo'
  | 'filterLabel'
  | 'filterPlaceholder'
  | 'filterResults'
  | 'filterResultsCount_multiple'
  | 'filterResultsCount_one'
  | 'filterWithAnotherTerm'
  | 'placeholder'
  | 'searchClearButtonAriaLabel'
  | 'searchedWithoutResultsInfo'
  | 'searchErrorText'
  | 'searchErrorTitle'
  | 'searching'
  | 'searchLabel'
  | 'searchPlaceholder'
  | 'searchWithAnotherTerm'
  | 'searchResults_multiple'
  | 'searchResults_one'
  | 'tagRemoved'
  | 'tagRemoveSelectionAriaLabel'
  | 'tagsClearAllButton'
  | 'tagsClearAllButtonAriaLabel_multiple'
  | 'tagsClearAllButtonAriaLabel_one'
  | 'tagsPartiallyHidden'
  | 'tagsRemaining_multiple'
  | 'tagsRemaining_one'
  | 'tagsShowAllButton'
  | 'tagsShowAllButtonAriaLabel'
  | 'tagsShowLessButton'
  | 'tagsShowLessButtonAriaLabel';

export type TextsWithNumberedVariations =
  | ModularOptionListTextsWithNumberedVariations
  | 'clearButtonAriaLabel'
  | 'filterResultsCount'
  | 'searchResults'
  | 'tagsClearAllButtonAriaLabel'
  | 'tagsRemaining';

export type TextInterpolationKeys = 'selectionCount' | 'value' | 'numberIndicator' | 'label';

export type TextInterpolationContent = Record<TextInterpolationKeys, string | number>;
export type TextProvider = (key: TextKey, contents: TextInterpolationContent) => string;
export type Texts = Record<TextKey, string> & { language?: SupportedLanguage };

export type ThemeTarget = ModularOptionListThemeTarget | 'textInput' | 'tag' | 'showAllButton' | 'clearAllButton';

export type SelectCustomTheme = ModularOptionListCustomTheme & {
  '--clear-all-background-color'?: string;
  '--clear-all-background-color-focus'?: string;
  '--clear-all-background-color-hover'?: string;
  '--clear-all-background-color-active'?: string;
  '--clear-all-background-color-disabled'?: string;
  '--clear-all-border-color'?: string;
  '--clear-all-border-color-focus'?: string;
  '--clear-all-border-color-hover'?: string;
  '--clear-all-border-color-active'?: string;
  '--clear-all-border-color-disabled'?: string;
  '--clear-all-color'?: string;
  '--clear-all-color-hover'?: string;
  '--clear-all-color-focus'?: string;
  '--clear-all-color-active'?: string;
  '--clear-all-color-disabled'?: string;
  '--clear-all-outline-color-focus'?: string;
  '--dropdown-background-default'?: string;
  '--dropdown-background-disabled'?: string;
  '--dropdown-border-color-default'?: string;
  '--dropdown-border-color-hover'?: string;
  '--dropdown-border-color-hover-invalid'?: string;
  '--dropdown-border-color-focus'?: string;
  '--dropdown-border-color-invalid'?: string;
  '--dropdown-color-default'?: string;
  '--dropdown-color-disabled'?: string;
  '--dropdown-icon-color'?: string;
  '--placeholder-color'?: string;
  '--show-all-background-color'?: string;
  '--show-all-background-color-focus'?: string;
  '--show-all-background-color-hover'?: string;
  '--show-all-background-color-active'?: string;
  '--show-all-background-color-disabled'?: string;
  '--show-all-border-color'?: string;
  '--show-all-border-color-focus'?: string;
  '--show-all-border-color-hover'?: string;
  '--show-all-border-color-active'?: string;
  '--show-all-border-color-disabled'?: string;
  '--show-all-color'?: string;
  '--show-all-color-hover'?: string;
  '--show-all-color-focus'?: string;
  '--show-all-color-active'?: string;
  '--show-all-color-disabled'?: string;
  '--show-all-outline-color-focus'?: string;
  '--tag-background-color'?: string;
  '--tag-background-color-focus'?: string;
  '--tag-background-color-hover'?: string;
  '--tag-background-color-active'?: string;
  '--tag-border-color'?: string;
  '--tag-border-color-focus'?: string;
  '--tag-border-color-hover'?: string;
  '--tag-border-color-active'?: string;
  '--tag-color'?: string;
  '--tag-color-focus'?: string;
  '--tag-color-hover'?: string;
  '--tag-color-active'?: string;
  '--tag-outline-color'?: string;
  '--text-icon-color'?: string;
  '--text-input-background-default'?: string;
  '--text-input-border-color-default'?: string;
  '--text-input-border-color-hover'?: string;
  '--text-input-border-color-focus'?: string;
  '--text-input-color-default'?: string;
  '--text-color-focus-outline'?: string;
  '--text-input-placeholder-color'?: string;
  '--text-label-color-default'?: string;
};
