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
  children?: P | P[];
  multiSelect?: boolean;
};

export type SelectData = Required<Pick<SelectProps, 'label' | 'open' | 'multiSelect'>> & {
  groups: Array<Group>;
  assistiveText?: string;
  label?: string;
  error?: string;
};
