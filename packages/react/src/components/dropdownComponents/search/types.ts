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

export type SearchResult = Pick<ModularOptionListProps, 'groups' | 'options'>;
export type SearchFunction = (
  searchValue: string,
  selectedOptions: Option[],
  data: ModularOptionListData,
) => Promise<SearchResult>;

// Re-export commonly used types from ModularOptionList
export type { Option, OptionInProps, Group, GroupInProps, ScreenReaderNotification } from '../modularOptionList/types';

export type SearchProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  children?: P | P[];
  clearable?: boolean;
  disabled?: boolean;
  groups?: Array<GroupInProps> | ModularOptionListData['groups'];
  icon?: ReactNode;
  id?: string;
  invalid?: boolean;
  multiSelect?: boolean;
  onBlur?: () => void;
  onClose?: (
    selectedOptions: Option[],
    clickedOption: undefined,
    data: ModularOptionListData,
  ) => Partial<Pick<SearchProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onChange?: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: ModularOptionListData,
  ) => Partial<Pick<SearchProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onFocus?: () => void;
  onSearch?: SearchFunction;
  open?: boolean;
  options?: (OptionInProps | string)[];
  required?: boolean;
  texts?: Partial<Texts> | TextProvider;
  theme?: SearchCustomTheme;
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
  value?: string | string[] | Option[] | OptionInProps[];
  virtualize?: boolean;
  visibleOptions?: number;
  placeholder?: string;
};

export type SearchData = ModularOptionListData &
  Required<
    Pick<
      SearchProps,
      | 'open'
      | 'required'
      | 'invalid'
      | 'onChange'
      | 'disabled'
      | 'multiSelect'
      | 'visibleOptions'
      | 'virtualize'
      | 'clearable'
    >
  > & {
    initialOpenValue?: boolean;
    onSearch?: SearchFunction;
    onClose?: SearchProps['onClose'];
    placeholder?: string;
  };

export type SearchMetaData = Pick<SearchProps, 'icon'> &
  ModularOptionListMetaData & {
    refs: ModularOptionListMetaData['refs'] & {
      searchInput: RefObject<HTMLInputElement>;
      listContainer: RefObject<HTMLDivElement>;
      searchContainer: RefObject<HTMLDivElement>;
      container: RefObject<HTMLDivElement>;
    };
    elementIds: ModularOptionListMetaData['elementIds'] & {
      searchInput: string;
      label: string;
      searchInputLabel: string;
      container: string;
      searchContainer: string;
      clearButton: string;
    };
    textProvider: TextProvider;
    search: string;
    isSearching: boolean;
    hasSearchError: boolean;
    hasSearchInput: boolean;
    cancelCurrentSearch: (() => void) | undefined;
    focusTarget: Extract<KnownElementType, 'list' | 'searchInput' | 'container'> | undefined;
    themes?: Record<ThemeTarget, undefined | string>;
    tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
  };

export type SearchDataHandlers = DataHandlers<SearchData, SearchMetaData>;

export type KnownElementType = ModularOptionListKnownElementType | keyof SearchMetaData['elementIds'];

export type TextKey =
  | ModularOptionListTextKey
  | 'clearButtonAriaLabel_multiple'
  | 'clearButtonAriaLabel_one'
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
  | 'searchResults_one';

export type TextsWithNumberedVariations =
  | ModularOptionListTextsWithNumberedVariations
  | 'clearButtonAriaLabel'
  | 'searchResults';

export type TextInterpolationKeys = 'selectionCount' | 'value' | 'numberIndicator' | 'label';

export type TextInterpolationContent = Record<TextInterpolationKeys, string | number>;
export type TextProvider = (key: TextKey, contents: TextInterpolationContent) => string;
export type Texts = Record<TextKey, string> & { language?: SupportedLanguage };

export type ThemeTarget = 'root' | 'checkbox' | 'textInput' | 'clearButton';

export type SearchCustomTheme = ModularOptionListCustomTheme & {
  '--search-background-default'?: string;
  '--search-background-disabled'?: string;
  '--search-border-color-default'?: string;
  '--search-border-color-hover'?: string;
  '--search-border-color-hover-invalid'?: string;
  '--search-border-color-focus'?: string;
  '--search-border-color-invalid'?: string;
  '--search-color-default'?: string;
  '--search-color-disabled'?: string;
  '--search-icon-color'?: string;
  '--placeholder-color'?: string;
  '--clear-button-background-color'?: string;
  '--clear-button-background-color-focus'?: string;
  '--clear-button-background-color-hover'?: string;
  '--clear-button-background-color-active'?: string;
  '--clear-button-background-color-disabled'?: string;
  '--clear-button-border-color'?: string;
  '--clear-button-border-color-focus'?: string;
  '--clear-button-border-color-hover'?: string;
  '--clear-button-border-color-active'?: string;
  '--clear-button-border-color-disabled'?: string;
  '--clear-button-color'?: string;
  '--clear-button-color-hover'?: string;
  '--clear-button-color-focus'?: string;
  '--clear-button-color-active'?: string;
  '--clear-button-color-disabled'?: string;
  '--clear-button-outline-color-focus'?: string;
  '--text-input-background-default'?: string;
  '--text-input-border-color-default'?: string;
  '--text-input-border-color-hover'?: string;
  '--text-input-border-color-focus'?: string;
  '--text-input-color-default'?: string;
  '--text-color-focus-outline'?: string;
  '--text-input-placeholder-color'?: string;
  '--text-label-color-default'?: string;
};
