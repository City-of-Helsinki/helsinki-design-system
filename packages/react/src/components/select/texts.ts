import { TextKey, Option } from './types';

export function getText(id: TextKey, selectedOptions?: Option[]) {
  switch (id) {
    case 'assistive':
      return '';
    case 'buttonAriaLabel':
      return selectedOptions && selectedOptions.length ? 'has selected options' : '0 options';
    default:
      return `${id}?`;
  }
}
