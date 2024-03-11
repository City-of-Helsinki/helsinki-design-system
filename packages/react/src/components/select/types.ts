import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from 'react';

import { DataHandlers } from '../dataProvider/DataContext';

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
export type SearchFunction = (searchValue: string, selectedValues: string[], data: SelectData) => Promise<SearchResult>;

export type SelectProps<P = unknown> = {
  options?: (OptionInProps | string)[];
  open?: boolean;
  label: string;
  groups?: Array<{
    label: string;
    options: (OptionInProps | string)[];
  }>;
  onChange: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: SelectData,
  ) => Partial<SelectProps> | void | undefined;
  onSearch?: SearchFunction;
  onFocus?: () => void;
  onBlur?: () => void;
  children?: P | P[];
  multiSelect?: boolean;
  showFiltering?: boolean;
  showSearch?: boolean;
  required?: boolean;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
  assistiveText?: string;
  error?: string;
  virtualize?: boolean;
  disabled?: boolean;
  noTags?: boolean;
};

export type SelectData = Required<
  Pick<
    SelectProps,
    | 'label'
    | 'open'
    | 'multiSelect'
    | 'showFiltering'
    | 'showSearch'
    | 'placeholder'
    | 'required'
    | 'assistiveText'
    | 'virtualize'
    | 'onChange'
    | 'error'
    | 'disabled'
    | 'noTags'
  >
> & {
  groups: Array<Group>;
  assistiveText?: string;
  label?: string;
  error?: string;
  onSearch?: SearchFunction;
  onFocus?: SelectProps['onFocus'];
  onBlur?: SelectProps['onBlur'];
};

export type SelectMetaData = Pick<SelectProps, 'icon'> & {
  refs: {
    listContainer: RefObject<HTMLDivElement>;
    list: RefObject<HTMLUListElement>;
    selectContainer: RefObject<HTMLDivElement>;
    tagList: RefObject<HTMLDivElement>;
    showAllButton: RefObject<HTMLButtonElement>;
    selectionButton: RefObject<HTMLButtonElement>;
    searchOrFilterInput: RefObject<HTMLInputElement>;
  };
  searchUpdate: number;
  selectionUpdate: number;
  filter: string;
  search: string;
  isSearching: boolean;
  lastClickedOption: Option | undefined;
  lastToggleCommand: number;
  cancelCurrentSearch: (() => void) | undefined;
  showAllTags: boolean;
  focusTarget: 'list' | 'button' | 'container' | 'searchOrFilterInput' | undefined;
  elementIds: {
    button: string;
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
  };
};

export type DivElementProps = HTMLAttributes<HTMLDivElement>;
export type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type UlElementProps = HTMLAttributes<HTMLUListElement>;
export type LiElementProps = HTMLAttributes<HTMLLIElement>;

export type SelectDataHandlers = DataHandlers<SelectData, SelectMetaData>;
export type KnownElementType = keyof SelectMetaData['elementIds'] | 'listItem' | 'listGroupLabel' | 'tag';
