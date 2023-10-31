type RecordObject = Record<string | symbol | number, unknown>;

export function partiallyCompareObjects(
  sourceToMatch: unknown,
  targetToCheckFrom: unknown,
  options?: { compareSourcePrototype?: boolean },
): boolean {
  if (!sourceToMatch || !targetToCheckFrom) {
    return false;
  }
  if (typeof sourceToMatch !== typeof targetToCheckFrom) {
    return false;
  }
  if (typeof sourceToMatch !== 'object') {
    return false;
  }
  if (options && options.compareSourcePrototype) {
    const sourceProto = Reflect.getPrototypeOf(sourceToMatch);
    const targetProto = Reflect.getPrototypeOf(targetToCheckFrom as RecordObject);
    if (Object.keys(sourceProto).length) {
      if (!partiallyCompareObjects(sourceProto, targetProto, options)) {
        return false;
      }
    }
  }
  const keys = Object.keys(sourceToMatch);
  if (keys.length === 0) {
    return true;
  }

  return (
    keys.findIndex((key) => {
      // note returned booleans a reversed because findIndex is used and trying to find differences
      const sourceValue = sourceToMatch[key];
      const sourceType = typeof sourceValue;
      const targetValue = targetToCheckFrom[key];
      const targetType = typeof targetValue;
      if (sourceType !== targetType) {
        return true;
      }
      if (sourceType === 'number' && Number.isNaN(sourceValue)) {
        return !Number.isNaN(targetValue);
      }
      if (sourceValue && sourceType === 'object') {
        return !partiallyCompareObjects(sourceValue, targetValue, options);
      }
      return sourceValue !== targetValue;
    }) === -1
  );
}
