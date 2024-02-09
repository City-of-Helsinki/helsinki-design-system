import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  RefObject,
} from 'react';

import { GroupProps } from '../group/utils';

export type Option = { value: string; label: string; selected?: boolean; isGroupLabel?: boolean; visible?: boolean };
export type Group = { options: Required<Option>[] };

export type SelectProps<P = unknown> = {
  options?: (Option | string)[];
  open?: boolean;
  label: string;
  groups?: Array<{
    label: string;
    options: (Option | string)[];
  }>;
  onChange: (selectedValues: string[], data: SelectData) => Partial<SelectData> | void | undefined;
  onSearch?: (
    searchValue: string,
    selectedValues: string[],
    data: SelectData,
  ) => Promise<Pick<SelectProps, 'groups' | 'options'>>;
  children?: P | P[];
  multiSelect?: boolean;
  showFiltering?: boolean;
  showSearch?: boolean;
  required?: boolean;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
};

export type SelectData = Required<
  Pick<SelectProps, 'label' | 'open' | 'multiSelect' | 'showFiltering' | 'showSearch' | 'placeholder' | 'required'>
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
  currentSearchPromise: Promise<unknown> | undefined;
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
export type SelectGroupProps = GroupProps<PropSetterElementTypes>;

export const groupIds = {
  selectedOptions: 'selectedOptions',
  listItem: 'listItem',
  listGroup: 'listGroup',
  tag: 'tag',
  filter: 'filter',
  search: 'search',
  container: 'container',
  label: 'label',
  selectionsAndLists: 'selectionsAndLists',
  listAndInputContainer: 'listAndInputContainer',
  list: 'list',
  searchAndFilterInfo: 'searchAndFilterInfo',
  error: 'error',
  assistiveText: 'assistiveText',
  arrowButton: 'arrowButton',
  clearButton: 'clearButton',
  tagList: 'tagList',
  showAllButton: 'showAllButton',
  clearAllButton: 'clearAllButton',
};

export const eventTypes = {
  click: 'click',
  outSideclick: 'outsideClick',
  change: 'change',
};

export const groupIdEvents = {
  selectedOptionsClick: `${groupIds.selectedOptions}_${eventTypes.click}`,
  listItemClick: `${groupIds.listItem}_${eventTypes.click}`,
  clearClick: `${groupIds.clearButton}_${eventTypes.click}`,
  clearAllClick: `${groupIds.clearAllButton}_${eventTypes.click}`,
  showAllClick: `${groupIds.showAllButton}_${eventTypes.click}`,
  arrowClick: `${groupIds.arrowButton}_${eventTypes.click}`,
  tagClick: `${groupIds.tag}_${eventTypes.click}`,
  listGroupClick: `${groupIds.listGroup}_${eventTypes.click}`,
  filterChange: `${groupIds.filter}_${eventTypes.change}`,
  searchChange: `${groupIds.search}_${eventTypes.change}`,
};
