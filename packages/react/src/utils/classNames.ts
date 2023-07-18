type ClassNameArgumentType = string | number | Record<string, string | number | boolean | object>;
type ClassNameArgType = ClassNameArgumentType | ClassNameArgumentType[];

const hasOwn = {}.hasOwnProperty;

const parseObject = (obj, styles = null) => {
  if (obj.toString !== Object.prototype.toString && !obj.toString.toString().includes('[native code]')) {
    return obj.toString();
  }

  const iterable = { ...obj };
  if (styles) {
    Object.keys(styles)
      .filter((key) => !!obj[key])
      .forEach((key) => {
        iterable[styles[key]] = true;
      });
  }

  return Object.keys(iterable)
    .filter((key) => hasOwn.call(iterable, key) && !!iterable[key])
    .join(' ');
};

function parseClassName(arg: ClassNameArgType) {
  const argType = typeof arg;

  if (!arg) return null;
  if (argType === 'string') return arg;
  if (argType === 'number') return arg;
  if (Array.isArray(arg)) {
    if (arg.length)
      return arg
        .map((entry) => parseClassName(entry))
        .filter(Boolean)
        .join(' ');
    return null;
  }
  if (argType === 'object') return parseObject(arg, this);
  return null;
}

/**
 * Generate a class name string for given arguments. Accepts an array of strings or objects
 * from which a space delimited string is generated as follows:
 * - Falsy values are filtered out.
 * - Strings are appended to the resulting string as given.
 * - For objects, every key with a truthy value is appended to the resulting string.
 * @returns string A space delimited string parsed from the given arguments.
 */
export default (...args: Array<ClassNameArgumentType>) => args.map(parseClassName).filter(Boolean).join(' ');

/**
 * Generate a classNames function that is bound to a set of class names imported from a css file.
 * Whenever an object is passed to the returned bound classNames function the css file's class names are
 * included in parsed object as keys and tested against object's values for the same
 * @param styles A css class name object.
 * @returns A classNames function bound to the given css class name object.
 */
export const styleBoundClassNames = (styles: Record<string, unknown>) => {
  const boundClassNames = parseClassName.bind(styles);
  return (...args) => args.map(boundClassNames).filter(Boolean).join(' ');
};
