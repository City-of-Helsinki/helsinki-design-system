import { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';

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

export type SelectProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  options?: (OptionInProps | string)[];
  open?: boolean;
  label?: string;
  groups?:
    | Array<{
        label: string;
        options: (OptionInProps | string)[];
      }>
    | SelectData['groups'];
  onChange: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: SelectData,
  ) => Partial<SelectProps> | void | undefined;
  onSearch?: SearchFunction;
  filter?: FilterFunction;
  onFocus?: () => void;
  onBlur?: () => void;
  children?: P | P[];
  multiSelect?: boolean;
  required?: boolean;
  invalid?: boolean;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
  assistiveText?: string;
  error?: string;
  virtualize?: boolean;
  disabled?: boolean;
  noTags?: boolean;
  ariaLabel?: string;
  visibleOptions?: number;
  texts?: Partial<Texts> | TextProvider;
};

export type SelectData = Required<
  Pick<
    SelectProps,
    | 'open'
    | 'multiSelect'
    | 'placeholder'
    | 'required'
    | 'invalid'
    | 'assistiveText'
    | 'virtualize'
    | 'onChange'
    | 'disabled'
    | 'noTags'
    | 'visibleOptions'
  >
> & {
  groups: Array<Group>;
  assistiveText?: string;
  label?: string;
  error?: string;
  ariaLabel?: string;
  onSearch?: SearchFunction;
  filterFunction?: FilterFunction;
  onFocus?: SelectProps['onFocus'];
  onBlur?: SelectProps['onBlur'];
};

export type SelectMetaData = Pick<SelectProps, 'icon'> & {
  refs: {
    listContainer: RefObject<HTMLDivElement>;
    list: RefObject<HTMLUListElement>;
    container: RefObject<HTMLDivElement>;
    tagList: RefObject<HTMLDivElement>;
    showAllButton: RefObject<HTMLButtonElement>;
    dropdownButton: RefObject<HTMLButtonElement>;
    searchOrFilterInput: RefObject<HTMLInputElement>;
  };
  didSearchChange: boolean;
  didSelectionsChange: boolean;
  filter: string;
  search: string;
  isSearching: boolean;
  lastClickedOption: Option | undefined;
  lastToggleCommand: number;
  cancelCurrentSearch: (() => void) | undefined;
  showAllTags: boolean;
  focusTarget:
    | Extract<KnownElementType, 'list' | 'dropdownButton' | 'container' | 'searchOrFilterInput' | 'tag'>
    | undefined;
  activeDescendant: string | undefined;
  selectedOptions: Option[];
  listInputType?: Extract<EventId, 'filter' | 'search'>;
  elementIds: {
    dropdownButton: string;
    label: string;
    searchOrFilterInputLabel: string;
    list: string;
    container: string;
    tagList: string;
    clearButton: string;
    arrowButton: string;
    searchOrFilterInput: string;
    showAllButton: string;
    clearAllButton: string;
    choicesCount: string;
  };
  getOptionId: (option: Option) => string;
  textProvider: TextProvider;
  screenReaderNotifications: ScreenReaderNotification[];
};

export type DivElementProps = HTMLAttributes<HTMLDivElement>;
export type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type UlElementProps = HTMLAttributes<HTMLUListElement>;
export type LiElementProps = HTMLAttributes<HTMLLIElement>;

export type SelectDataHandlers = DataHandlers<SelectData, SelectMetaData>;
export type KnownElementType = keyof SelectMetaData['elementIds'] | 'listItem' | 'listGroupLabel' | 'tag';

export type TextKey =
  | 'label'
  | 'placeholder'
  | 'error'
  | 'assistive'
  | 'dropdownButtonAriaLabel'
  | 'tagsClearAllButton'
  | 'tagsShowAllButton'
  | 'deleteTagButton'
  | 'searchPlaceholder'
  | 'filterPlaceholder'
  | 'searchAriaLabel'
  | 'filterAriaLabel'
  | 'searchClearButtonAriaLabel'
  | 'filterClearButtonAriaLabel'
  | 'searchButtonAriaLabel'
  | 'filterButtonAriaLabel'
  | 'searching'
  | 'noSearchResultsInfo'
  | 'noFilteredResultsInfo'
  | 'searchWithAnotherTerm'
  | 'filterWithAnotherTerm'
  | 'buttonClearAllAriaLabel';

export type TextProvider = (key: TextKey, selectedOptions: Option[]) => string | undefined;
export type Texts = Record<TextKey, string>;
export type ScreenReaderNotification = {
  type: string;
  content: string;
  showTime: number;
  delay: number;
  addTime: number;
};
