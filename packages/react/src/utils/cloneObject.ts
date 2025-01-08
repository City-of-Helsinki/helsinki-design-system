import { isObject, cloneDeep, clone as _clone } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IterableObject = Record<any, any> &
  InstanceType<typeof Object> & { entries?(): IterableIterator<[string, string]> };

/**
 * Shallow clones objects, Headers, etc.
 * @internal
 */

export function shallowClone(source: IterableObject): IterableObject {
  if (!isObject(source)) {
    return {};
  }
  return _clone(source);
}

/**
 * Deep clones an object, but drops out values that are functions, undefined, instances.
 * Useful for example in tests where jest cannot compare objects with functions
 * @internal
 */

export function cloneWithJSONConversion(source: unknown): IterableObject {
  if (!isObject(source)) {
    return {};
  }
  return JSON.parse(JSON.stringify(source));
}

/**
 * Deep clones source
 * @internal
 */

export function deepClone(source: unknown): IterableObject {
  if (!isObject(source)) {
    return {};
  }
  return cloneDeep(source);
}

function getObjectAsKeyValuePairs(source: IterableObject) {
  if (!isObject(source)) {
    return [];
  }
  const filterDangerousKeys = ([key]: [string, unknown]) => {
    if (!key) {
      return false;
    }
    if (typeof key === 'string') {
      // avoid prototype pollution
      return key !== 'prototype' && key.startsWith('__') === false;
    }
    return true;
  };
  const entriesArray = typeof source.entries !== 'function' ? Object.entries(source) : Array.from(source.entries());
  return entriesArray.filter(filterDangerousKeys);
}

function copyIterableObject(source: IterableObject): IterableObject {
  // @ts-ignore is for  Object.fromEntries
  return Object.fromEntries(getObjectAsKeyValuePairs(source)) as IterableObject;
}

/**
 * Helper for copying any object, or converting to an object, anything that has "entries()" property. Like Headers.
 * Deep clones by default.
 * @param source IterableObject any object
 * @param iterator (obj: IterableObject, key: string, value: unknown) => unknown, any non-undefined value is set as obj[key]=value.
 * @param deep If true (default), the source is checked for nested objects
 * @internal
 */

export function cloneWithIterator(
  source: IterableObject,
  iterator: (obj: IterableObject, key: string, value: unknown) => unknown,
  deep = true,
): IterableObject {
  const clone = copyIterableObject(source);
  Object.entries(clone).forEach(([key, value]) => {
    const handledValue = iterator(clone, key, value);
    const newValue = handledValue !== undefined ? handledValue : value;
    if (deep && isObject(newValue)) {
      clone[key] = cloneWithIterator(value, iterator, deep);
    } else if (newValue !== value) {
      clone[key] = value;
    }
  });
  return clone;
}

/**
 *
 * Uses cloneIterableObject(), but adds an iterator that returns obj value.
 * @see cloneWithIterator
 * @param source IterableObject any object
 * @param deep If true (default), the source is checked for nested objects
 * @internal
 */

export function cloneObject(source: IterableObject, deep = true): IterableObject {
  if (!deep) {
    return copyIterableObject(source);
  }
  return cloneWithIterator(source, (obj, k, v) => v, deep);
}
