import { defaultFilter } from '../../../index';
import { Option } from './types';

const createOption = (label: string): Option => ({
  value: label,
  label,
  selected: false,
  isGroupLabel: false,
  visible: true,
  disabled: false,
});

describe('Select public exports', () => {
  it('defaultFilter is exported from the package entry and matches labels case-insensitively', () => {
    expect(typeof defaultFilter).toBe('function');
    expect(defaultFilter(createOption('Helsinki'), 'hel')).toBe(true);
    expect(defaultFilter(createOption('Helsinki'), 'SINK')).toBe(true);
    expect(defaultFilter(createOption('Espoo'), 'hel')).toBe(false);
  });
});
