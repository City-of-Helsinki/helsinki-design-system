import { ChangeTrigger } from '../../../dataProvider/DataContext';
import { Option, SelectMetaData } from '../../types';

export type SelectItemProps = {
  option: Option;
  trigger: ChangeTrigger;
  getOptionId: SelectMetaData['getOptionId'];
};

export const multiSelectElementSelector = 'div[role=checkbox],li[role=checkbox]';

export const isMultiSelectElement = (element: HTMLElement) => {
  return (element.nodeName === 'DIV' || element.nodeName === 'LI') && element.getAttribute('role') === 'checkbox';
};

export const singleSelectElementSelector = 'li';

// NOTE: multiselect with no groups or input has the same element!
export const isSingleSelectElement = (element: HTMLElement) => {
  return element.nodeName === 'LI' && element.getAttribute('role') === 'option';
};

export const groupLabelSelectors = 'div[role=checkbox],li[role=checkbox]';

export const createGroupLabelSelector = (elementId?: string) => {
  const scope = elementId ? `#${elementId}` : ':scope';
  return `${scope} > ul > li[role="presentation"], ${scope} > div[role="group"] > div[role="checkbox"]:first-child`;
};
