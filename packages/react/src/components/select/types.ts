import { ReactElement, ReactNode, RefObject } from 'react';

import { AllElementPropsWithoutRef } from '../../utils/elementTypings';
import { DataHandlers } from '../dataProvider/DataContext';
import { EventId } from './events';

export type Option = {
  value: string;
  label: string;
  selected: boolean;
  isGroupLabel: boolean;
  visible: boolean;
  disabled: boolean;
};
export type OptionInProps = Partial<Option>;
export type Group = { options: Option[] };
export type SearchResult = Pick<SelectProps, 'groups' | 'options'>;
export type FilterFunction = (option: Option, filterStr: string) => boolean;
export type SearchFunction = (
  searchValue: string,
  selectedOptions: Option[],
  data: SelectData,
) => Promise<SearchResult>;
export type GroupInProps = {
  label: string;
  options: (OptionInProps | string)[];
};

export type AcceptedNativeDivProps = Omit<
  AllElementPropsWithoutRef<'div'>,
  'onChange' | 'onFocus' | 'onBlur' | 'id' | 'tabIndex' | 'children'
>;

export type SelectProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  children?: P | P[];
  disabled?: boolean;
  filter?: FilterFunction;
  groups?: Array<GroupInProps> | SelectData['groups'];
  icon?: ReactNode;
  id?: string;
  invalid?: boolean;
  multiSelect?: boolean;
  noTags?: boolean;
  onBlur?: () => void;
  onChange: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: SelectData,
  ) => Partial<Pick<SelectProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onFocus?: () => void;
  onSearch?: SearchFunction;
  open?: boolean;
  options?: (OptionInProps | string)[];
  required?: boolean;
  texts?: Partial<Texts> | TextProvider;
  theme?: SelectCustomTheme;
  value?: string | string[] | Option[] | OptionInProps[];
  virtualize?: boolean;
  visibleOptions?: number;
};

export type SelectData = Required<
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
  >
> & {
  groups: Array<Group>;
  filterFunction?: FilterFunction;
  onSearch?: SearchFunction;
  onFocus?: SelectProps['onFocus'];
  onBlur?: SelectProps['onBlur'];
};

export type SelectMetaData = Pick<SelectProps, 'icon'> & {
  refs: {
    button: RefObject<HTMLButtonElement>;
    listContainer: RefObject<HTMLDivElement>;
    list: RefObject<HTMLUListElement>;
    tagList: RefObject<HTMLDivElement>;
    showAllButton: RefObject<HTMLButtonElement>;
    searchOrFilterInput: RefObject<HTMLInputElement>;
    selectionsAndListsContainer: RefObject<HTMLDivElement>;
    container: RefObject<HTMLDivElement>;
  };
  filter: string;
  search: string;
  isSearching: boolean;
  hasSearchError: boolean;
  hasListInput: boolean;
  lastClickedOption: Option | undefined;
  lastToggleCommand: number;
  selectedOptions: Option[];
  cancelCurrentSearch: (() => void) | undefined;
  focusTarget: Extract<KnownElementType, 'list' | 'button' | 'container' | 'searchOrFilterInput' | 'tag'> | undefined;
  activeDescendant: string | undefined;
  listInputType?: Extract<EventId, 'filter' | 'search'>;
  textContent?: TextInterpolationContent;
  elementIds: {
    button: string;
    label: string;
    searchOrFilterInputLabel: string;
    list: string;
    container: string;
    tagList: string;
    searchOrFilterInput: string;
    showAllButton: string;
    clearAllButton: string;
    clearButton: string;
    selectionsAndListsContainer: string;
  };
  textProvider: TextProvider;
  getOptionId: (option: Option) => string;
  showAllTags: boolean;
  screenReaderNotifications: ScreenReaderNotification[];
  themes?: Record<ThemeTarget, undefined | string>;
};

export type DivElementProps = AllElementPropsWithoutRef<'div'>;
export type ButtonElementProps = AllElementPropsWithoutRef<'button'>;
export type UlElementProps = AllElementPropsWithoutRef<'ul'>;
export type LiElementProps = AllElementPropsWithoutRef<'li'>;

export type SelectDataHandlers = DataHandlers<SelectData, SelectMetaData>;
export type KnownElementType = keyof SelectMetaData['elementIds'] | 'listItem' | 'listGroupLabel' | 'tag';

export type TextKey =
  | 'label'
  | 'placeholder'
  | 'error'
  | 'assistive'
  | 'selectedOptionsCount'
  | 'selectedOptionsLabel'
  | 'noSelectedOptions'
  | 'clearButtonAriaLabel'
  | 'dropdownButtonAriaLabel'
  | 'multiSelectGroupAriaLabel'
  | 'tagRemoved'
  | 'tagRemoveSelectionAriaLabel'
  | 'tagsClearAllButton'
  | 'tagsClearAllButtonAriaLabel'
  | 'tagsShowAllButton'
  | 'tagsShowLessButton'
  | 'tagsShowAllButtonAriaLabel'
  | 'tagsShowLessButtonAriaLabel'
  | 'tagsPartiallyHidden'
  | 'filterLabel'
  | 'filterPlaceholder'
  | 'filterClearButtonAriaLabel'
  | 'filteredWithoutResultsInfo'
  | 'filterWithAnotherTerm'
  | 'filterResults'
  | 'searchLabel'
  | 'searchPlaceholder'
  | 'searchClearButtonAriaLabel'
  | 'searchedWithoutResultsInfo'
  | 'searchWithAnotherTerm'
  | 'searchingForOptions'
  | 'searchErrorTitle'
  | 'searchErrorText'
  | 'searching'
  | 'searchResults'
  | 'ariaLabelForListWhenRoleIsDialog';

export type TextInterpolationKeys = 'selectionCount' | 'value' | 'numberIndicator' | 'label';

export type TextInterpolationContent = Record<TextInterpolationKeys, string | number>;
export type TextProvider = (key: TextKey, contents: TextInterpolationContent) => string;
export type SupportedLanguage = 'fi' | 'sv' | 'en';
export type Texts = Record<TextKey, string> & { language?: SupportedLanguage };

export type ScreenReaderNotification = {
  type: string;
  content: string;
  showTime: number;
  delay: number;
  addTime: number;
};

export type ThemeTarget = 'root' | 'checkbox' | 'textInput' | 'tag' | 'showAllButton' | 'clearAllButton';

export type SelectCustomTheme = {
  '--dropdown-background-default'?: string;
  '--dropdown-background-disabled'?: string;
  '--dropdown-border-color-default'?: string;
  '--dropdown-border-color-hover'?: string;
  '--dropdown-border-color-hover-invalid'?: string;
  '--dropdown-border-color-focus'?: string;
  '--dropdown-border-color-invalid'?: string;
  '--dropdown-border-color-disabled'?: string;
  '--dropdown-color-default'?: string;
  '--dropdown-color-disabled'?: string;
  '--dropdown-icon-color'?: string;
  '--focus-outline-color'?: string;
  '--assistive-color'?: string;
  '--helper-color-default'?: string;
  '--helper-color-invalid'?: string;
  '--helper-icon-color-invalid'?: string;
  '--helper-background-color-invalid'?: string;
  '--menu-divider-color'?: string;
  '--menu-item-background-default'?: string;
  '--menu-item-background-hover'?: string;
  '--menu-item-background-selected'?: string;
  '--menu-item-background-selected-hover'?: string;
  '--menu-item-background-disabled'?: string;
  '--menu-item-color-default'?: string;
  '--menu-item-color-hover'?: string;
  '--menu-item-color-selected'?: string;
  '--menu-item-color-selected-hover'?: string;
  '--menu-item-color-disabled'?: string;
  '--menu-item-icon-color-selected'?: string;
  '--menu-item-icon-color-disabled'?: string;
  '--placeholder-color'?: string;

  // for checkbox
  '--checkbox-background-unselected'?: string;
  '--checkbox-background-selected'?: string;
  '--checkbox-background-hover'?: string;
  '--checkbox-background-disabled'?: string;
  '--checkbox-border-color-selected'?: string;
  '--checkbox-border-color-selected-hover'?: string;
  '--checkbox-border-color-selected-focus'?: string;
  '--checkbox-border-color-unselected'?: string;
  '--checkbox-border-color-unselected-hover'?: string;
  '--checkbox-border-color-unselected-focus'?: string;
  '--checkbox-border-color-disabled'?: string;
  '--checkbox-icon-color-unselected'?: string;
  '--checkbox-icon-color-selected'?: string;
  '--checkbox-icon-color-disabled'?: string;
  '--checkbox-label-color'?: string;
  '--checkbox-label-color-disabled'?: string;

  // for text input
  '--text-input-icon-color'?: string;
  '--text-input-background'?: string;
  '--text-input-border-color'?: string;
  '--text-input-border-color-hover'?: string;
  '--text-input-border-color-focus'?: string;
  '--text-input-color'?: string;
  '--text-input-placeholder-color'?: string;

  // for tags
  '--tag-background-color-hover'?: string;
  '--tag-background-color'?: string;
  '--tag-border-color-action'?: string;
  '--tag-color'?: string;
  '--tag-outline-color-focus'?: string;

  // show all / show less button
  '--show-button-background-color-hover'?: string;
  '--show-button-background-color'?: string;
  '--show-button-border-color'?: string;
  '--show-button-border-color-hover'?: string;
  '--show-button-border-color-focus'?: string;
  '--show-button-border-color-hover-focus'?: string;
  '--show-button-color'?: string;
  '--show-button-color-hover'?: string;
  '--show-button-color-focus'?: string;
  '--show-button-color-hover-focus'?: string;

  // clear all
  '--clear-button-background-color-hover'?: string;
  '--clear-button-background-color'?: string;
  '--clear-button-border-color'?: string;
  '--clear-button-border-color-hover'?: string;
  '--clear-button-border-color-focus'?: string;
  '--clear-button-border-color-hover-focus'?: string;
  '--clear-button-color'?: string;
  '--clear-button-color-hover'?: string;
  '--clear-button-color-focus'?: string;
  '--clear-button-color-hover-focus'?: string;
};
