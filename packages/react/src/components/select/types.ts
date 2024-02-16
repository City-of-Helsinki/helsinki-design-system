import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  RefObject,
} from 'react';

export type Option = { value: string; label: string; selected?: boolean; isGroupLabel?: boolean; visible?: boolean };
export type Group = { options: Required<Option>[] };
export type SearchResult = Pick<SelectProps, 'groups' | 'options'>;
export type SearchFunction = (searchValue: string, selectedValues: string[], data: SelectData) => Promise<SearchResult>;

export type SelectProps<P = unknown> = {
  options?: (Option | string)[];
  open?: boolean;
  label: string;
  groups?: Array<{
    label: string;
    options: (Option | string)[];
  }>;
  onChange: (selectedValues: string[], data: SelectData) => Partial<SelectData> | void | undefined;
  onSearch?: SearchFunction;
  children?: P | P[];
  multiSelect?: boolean;
  showFiltering?: boolean;
  showSearch?: boolean;
  required?: boolean;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
  assistiveText?: string;
};

export type SelectData = Required<
  Pick<
    SelectProps,
    'label' | 'open' | 'multiSelect' | 'showFiltering' | 'showSearch' | 'placeholder' | 'required' | 'assistiveText'
  >
> & {
  groups: Array<Group>;
  assistiveText?: string;
  label?: string;
  error?: string;
};

export type SelectMetaData = Pick<SelectProps, 'icon'> & {
  listContainerRef: RefObject<HTMLDivElement>;
  tagListRef: RefObject<HTMLDivElement>;
  showAllButtonRef: RefObject<HTMLButtonElement>;
  selectionButtonRef: RefObject<HTMLButtonElement>;
  searchUpdate: number;
  selectionUpdate: number;
  filter: string;
  search: string;
  isSearching: boolean;
  cancelCurrentSearch: (() => void) | undefined;
  showAllTags: boolean;
  elementIds: {
    button: string;
    label: string;
    container: string;
    tagList: string;
  };
};

export type DivElementProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, never>;
export type LabelElementProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, never>;
export type ButtonElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, never>;
export type InputElementProps = DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, never>;
export type UlElementProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, never>;
export type LiElementProps = DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, never>;
export type PropSetterElementTypes = ButtonElementProps | DivElementProps | UlElementProps | LabelElementProps;
