import { ReactElement, ReactNode, RefObject } from 'react';

import { AllElementPropsWithoutRef } from '../../utils/elementTypings';
import { DataHandlers } from '../dataProvider/DataContext';
import { EventId } from './events';
import { Tooltip, TooltipProps } from '../tooltip/Tooltip';

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
  clearable?: boolean;
  disabled?: boolean;
  filter?: FilterFunction;
  groups?: Array<GroupInProps> | SelectData['groups'];
  icon?: ReactNode;
  id?: string;
  invalid?: boolean;
  multiSelect?: boolean;
  noTags?: boolean;
  onBlur?: () => void;
  onClose?: (
    selectedOptions: Option[],
    clickedOption: undefined,
    data: SelectData,
  ) => Partial<Pick<SelectProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onChange?: (
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
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
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
    | 'clearable'
  >
> & {
  groups: Array<Group>;
  filterFunction?: FilterFunction;
  onSearch?: SearchFunction;
  onFocus?: SelectProps['onFocus'];
  onBlur?: SelectProps['onBlur'];
  onClose?: SelectProps['onClose'];
  initialOpenValue?: boolean;
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
  tooltip?: ReactElement<TooltipProps, typeof Tooltip>;
};

export type DivElementProps = AllElementPropsWithoutRef<'div'>;
export type ButtonElementProps = AllElementPropsWithoutRef<'button'>;
export type UlElementProps = AllElementPropsWithoutRef<'ul'>;
export type LiElementProps = AllElementPropsWithoutRef<'li'>;

export type SelectDataHandlers = DataHandlers<SelectData, SelectMetaData>;
export type KnownElementType = keyof SelectMetaData['elementIds'] | 'listItem' | 'listGroupLabel' | 'tag';

export type TextKey =
  | 'assistive'
  | 'choiceCount_one'
  | 'choiceCount_multiple'
  | 'clearButtonAriaLabel_multiple'
  | 'clearButtonAriaLabel_one'
  | 'dropdownButtonAriaLabel'
  | 'error'
  | 'filterClearButtonAriaLabel'
  | 'filteredWithoutResultsInfo'
  | 'filterLabel'
  | 'filterPlaceholder'
  | 'filterResults'
  | 'filterResultsCount_multiple'
  | 'filterResultsCount_one'
  | 'filterWithAnotherTerm'
  | 'label'
  | 'multiSelectGroupAriaLabel'
  | 'noSelectedOptions'
  | 'placeholder'
  | 'required'
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
  | 'selectedOptionsCount_multiple'
  | 'selectedOptionsCount_one'
  | 'selectedOptionsCount_zero'
  | 'selectedOptionsCount_and'
  | 'selectedOptionsCount_otherOptions'
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
  | 'choiceCount'
  | 'clearButtonAriaLabel'
  | 'filterResultsCount'
  | 'searchResults'
  | 'selectedOptionsCount'
  | 'tagsClearAllButtonAriaLabel'
  | 'tagsRemaining';

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
  '--assistive-color'?: string;
  '--checkbox-background-default'?: string;
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
  '--error-text-color'?: string;
  '--error-icon-color'?: string;
  '--error-background-color'?: string;
  '--error-border-color'?: string;
  '--focus-outline-color'?: string;
  '--icon-color'?: string;
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
  '--menu-divider-color'?: string;
  '--menu-item-background-color-default'?: string;
  '--menu-item-background-color-hover'?: string;
  '--menu-item-background-color-selected'?: string;
  '--menu-item-background-color-selected-hover'?: string;
  '--menu-item-background-color-disabled'?: string;
  '--menu-item-background-color-disabled-hover'?: string;
  '--menu-item-color-default'?: string;
  '--menu-item-color-hover'?: string;
  '--menu-item-color-selected'?: string;
  '--menu-item-color-selected-hover'?: string;
  '--menu-item-color-disabled'?: string;
  '--menu-item-icon-color-selected'?: string;
  '--menu-item-icon-color-disabled'?: string;
  '--menu-item-border-color-focus'?: string;
  '--menu-item-group-label-background-default'?: string;
  '--menu-item-group-label-background-disabled'?: string;
  '--menu-item-group-label-background-disabled-hover'?: string;
  '--menu-item-group-label-color-disabled'?: string;
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
