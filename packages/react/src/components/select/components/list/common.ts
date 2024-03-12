import { ChangeTrigger } from '../../../dataProvider/DataContext';
import { Option, SelectMetaData } from '../../types';

export type SelectItemProps = {
  option: Option;
  trigger: ChangeTrigger;
  getOptionId: SelectMetaData['getOptionId'];
};

// export const multiSelectElementSelectorFromListRoot = 'div[role=checkbox]';

export const isMultiSelectElement = (element: HTMLElement) => {
  return (element.nodeName === 'DIV' || element.nodeName === 'LI') && element.getAttribute('role') === 'checkbox';
};

// export const singleSelectElementSelectorFromListRoot = 'li[role=option]';

export const isSingleSelectElement = (element: HTMLElement) => {
  return element.nodeName === 'LI' && element.getAttribute('role') === 'option';
};
