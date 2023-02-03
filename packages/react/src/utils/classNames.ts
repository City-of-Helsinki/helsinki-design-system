const hasOwn = {}.hasOwnProperty;

const parseObject = (obj) => {
  if (obj.toString !== Object.prototype.toString && !obj.toString.toString().includes('[native code]')) {
    return obj.toString();
  }

  return Object.keys(obj)
    .filter((key) => hasOwn.call(obj, key) && !!obj[key])
    .join(' ');
};

function parseClassName(arg) {
  if (!arg) return null;
  const argType = typeof arg;

  if (argType === 'string') {
    return arg;
  }

  if (argType === 'number') {
    return arg;
  }

  if (Array.isArray(arg)) {
    if (arg.length)
      return arg
        .map((entry) => parseClassName(entry))
        .filter(Boolean)
        .join(' ');
    return null;
  }

  if (argType === 'object') {
    return parseObject(arg);
  }

  return null;
}

export default (...args) => args.map(parseClassName).filter(Boolean).join(' ');
