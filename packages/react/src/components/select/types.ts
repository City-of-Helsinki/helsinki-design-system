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

export type GroupInProps = {
  label: string;
  options: (OptionInProps | string)[];
};

export type SelectProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  options?: (OptionInProps | string)[];
  open?: boolean;
  groups?: Array<GroupInProps> | SelectData['groups'];
  onChange: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: SelectData,
  ) => Partial<SelectProps> | void | undefined;
  children?: P | P[];
  required?: boolean;
  invalid?: boolean;
  id?: string;
  icon?: ReactNode;
  disabled?: boolean;
  noTags?: boolean;
  texts?: Partial<Texts> | TextProvider;
  multiSelect?: boolean;
  visibleOptions?: number;
  virtualize?: boolean;
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
};

export type SelectMetaData = Pick<SelectProps, 'icon'> & {
  refs: {
    listContainer: RefObject<HTMLDivElement>;
    list: RefObject<HTMLUListElement>;
    selectContainer: RefObject<HTMLDivElement>;
    selectionButton: RefObject<HTMLButtonElement>;
    tagList: RefObject<HTMLDivElement>;
    showAllButton: RefObject<HTMLButtonElement>;
  };
  lastClickedOption: Option | undefined;
  lastToggleCommand: number;
  selectedOptions: Option[];
  textContent?: TextInterpolationContent;
  elementIds: {
    button: string;
    label: string;
    list: string;
    container: string;
    tagList: string;
    showAllButton: string;
    clearAllButton: string;
    clearButton: string;
    arrowButton: string;
    selectionsAndListsContainer: string;
  };
  textProvider: TextProvider;
  getOptionId: (option: Option) => string;
  showAllTags: boolean;
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
  | 'selectedOptionsCount'
  | 'selectedOptionsLabel'
  | 'noSelectedOptions'
  | 'clearButtonAriaLabel'
  | 'dropdownButtonAriaLabel'
  | 'multiSelectGroupAriaLabel'
  | 'tagsClearAllButton'
  | 'tagsClearAllButtonAriaLabel'
  | 'tagsShowAllButton'
  | 'tagsShowLessButton'
  | 'tagsShowAllButtonAriaLabel'
  | 'tagsShowLessButtonAriaLabel'
  | 'tagRemoveSelectionAriaLabel';

export type TextInterpolationKeys = 'selectionCount' | 'optionLabel';

export type TextInterpolationContent = Record<TextInterpolationKeys, string | number>;
export type TextProvider = (key: TextKey, contents: TextInterpolationContent) => string;
export type SupportedLanguage = 'fi' | 'sv' | 'en';
export type Texts = Record<TextKey, string> & { language?: SupportedLanguage };
