import { ReactElement, ReactNode, RefObject } from 'react';

import { AllElementPropsWithoutRef } from '../../../utils/elementTypings';
import { DataHandlers } from '../../dataProvider/DataContext';

export type Option = {
  value: string;
  label: string;
  selected: boolean;
  isGroupLabel: boolean;
  visible: boolean;
  disabled: boolean;
  iconStart?: ReactNode;
};
export type OptionInProps = Partial<Option>;
export type Group = { options: Option[] };
export type GroupInProps = {
  label: string;
  options: (OptionInProps | string)[];
};

export type AcceptedNativeDivProps = Omit<
  AllElementPropsWithoutRef<'div'>,
  'onChange' | 'onFocus' | 'onBlur' | 'id' | 'tabIndex' | 'children'
>;

export type ModularOptionListProps<P = ReactElement<HTMLOptGroupElement | HTMLOptionElement> | undefined> = {
  children?: P | P[];
  disabled?: boolean;
  groups?: Array<GroupInProps> | ModularOptionListData['groups'];
  id?: string;
  invalid?: boolean;
  multiSelect?: boolean;
  onBlur?: () => void;
  onChange?: (
    selectedOptions: Option[],
    clickedOption: Option,
    data: ModularOptionListData,
  ) => Partial<Pick<ModularOptionListProps, 'groups' | 'options' | 'invalid' | 'texts'>> | void;
  onFocus?: () => void;
  options?: (OptionInProps | string)[];
  texts?: Partial<Texts> | TextProvider;
  theme?: ModularOptionListCustomTheme;
  value?: string | string[] | Option[] | OptionInProps[];
  virtualize?: boolean;
  visibleOptions?: number;
};

export type ModularOptionListData = Required<
  Pick<ModularOptionListProps, 'invalid' | 'onChange' | 'disabled' | 'multiSelect' | 'visibleOptions' | 'virtualize'>
> & {
  groups: Array<Group>;
  onFocus?: ModularOptionListProps['onFocus'];
  onBlur?: ModularOptionListProps['onBlur'];
};

export type ModularOptionListMetaData = {
  refs: {
    list: RefObject<HTMLUListElement>;
  };
  lastClickedOption: Option | undefined;
  lastToggleCommand: number;
  selectedOptions: Option[];

  activeDescendant: string | undefined;
  textContent?: TextInterpolationContent;
  elementIds: {
    list: string;
  };
  textProvider: TextProvider;
  getOptionId: (option: Option) => string;
  screenReaderNotifications: ScreenReaderNotification[];
  themes?: Record<ThemeTarget, undefined | string>;
};

export type DivElementProps = AllElementPropsWithoutRef<'div'>;
export type UlElementProps = AllElementPropsWithoutRef<'ul'>;
export type LiElementProps = AllElementPropsWithoutRef<'li'>;

export type ModularOptionListDataHandlers = DataHandlers<ModularOptionListData, ModularOptionListMetaData>;
export type KnownElementType = keyof ModularOptionListMetaData['elementIds'] | 'listItem' | 'listGroupLabel';

export type TextKey =
  | 'assistive'
  | 'choiceCount_one'
  | 'choiceCount_multiple'
  | 'error'
  | 'label'
  | 'multiSelectGroupAriaLabel'
  | 'noSelectedOptions'
  | 'required'
  | 'selectedOptionsCount_multiple'
  | 'selectedOptionsCount_one'
  | 'selectedOptionsCount_zero'
  | 'selectedOptionsCount_and'
  | 'selectedOptionsCount_otherOptions';

export type TextsWithNumberedVariations = 'choiceCount' | 'selectedOptionsCount';

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

export type ThemeTarget = 'root' | 'checkbox';

export type ModularOptionListCustomTheme = {
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
  '--focus-outline-color'?: string;
  '--icon-color'?: string;
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
};
