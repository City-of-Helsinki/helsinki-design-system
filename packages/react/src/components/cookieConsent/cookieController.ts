import cookie, { CookieSerializeOptions } from 'cookie';

function getAll() {
  return cookie.parse(document.cookie);
}

function get(name: string): string | undefined {
  const cookies = getAll();
  return cookies[name];
}

function set(name: string, value: string, options?: CookieSerializeOptions) {
  document.cookie = cookie.serialize(name, value, options);
}

export default {
  getAll,
  get,
  set,
};
