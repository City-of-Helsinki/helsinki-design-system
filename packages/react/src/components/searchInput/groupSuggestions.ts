/**
 * Groups array by given callback function
 */
export function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

/**
 * Creates option groups for DropDown
 */
export const createOptionGroups = (groupedOptions: Record<string, any>): any[] => {
  const keys = Object.keys(groupedOptions);
  return keys.map((key: string) => {
    return {
      label: key,
      options: groupedOptions[key],
    };
  });
};

/**
 * Creates option groups for SearchInput
 */
export const createSsuggestionGroups = (options: any[]): any[] => {
  if (options?.length > 0 && options[0]?.groupLabel) {
    const groupedOptions = groupBy(options, (item: any) => {
      return item.groupLabel;
    });
    return createOptionGroups(groupedOptions);
  }
  return [];
};
