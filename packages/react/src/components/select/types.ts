import { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';

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

export type SelectProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  options?: (OptionInProps | string)[];
  open?: boolean;
  label?: string;
  groups?: Array<{
    label: string;
    options: (OptionInProps | string)[];
  }>;
  onChange: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: SelectData,
  ) => Partial<SelectProps> | void | undefined;
  children?: P | P[];
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
};

export type SelectData = Required<Pick<SelectProps, 'open' | 'placeholder' | 'onChange'>> & {
  groups: Array<Group>;
  label?: string;
};

export type SelectMetaData = Pick<SelectProps, 'icon'> & {
  refs: {
    listContainer: RefObject<HTMLDivElement>;
    list: RefObject<HTMLUListElement>;
    selectContainer: RefObject<HTMLDivElement>;
    selectionButton: RefObject<HTMLButtonElement>;
  };
  lastClickedOption: Option | undefined;
  lastToggleCommand: number;
  elementIds: {
    button: string;
    label: string;
    list: string;
    container: string;
    clearButton: string;
    arrowButton: string;
    selectionsAndListsContainer: string;
  };
};

export type DivElementProps = HTMLAttributes<HTMLDivElement>;
export type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type UlElementProps = HTMLAttributes<HTMLUListElement>;
export type LiElementProps = HTMLAttributes<HTMLLIElement>;

export type SelectDataHandlers = DataHandlers<SelectData, SelectMetaData>;
