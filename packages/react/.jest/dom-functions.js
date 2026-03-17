Object.defineProperties(window.HTMLElement.prototype, {
  scrollIntoView: {
    configurable: true,
    enumerable: true,
    get() {
      return () => {};
    },
  },
});

// jest-environment-jsdom replaces globalThis.crypto with jsdom's incomplete version
// that lacks subtle. Provide a realm-safe wrapper around Node's webcrypto.
const { webcrypto } = require('crypto');
const origSubtle = webcrypto.subtle;
const origDigest = origSubtle.digest.bind(origSubtle);
Object.defineProperty(globalThis, 'crypto', {
  value: {
    ...webcrypto,
    subtle: {
      ...origSubtle,
      digest: (algorithm, data) => origDigest(algorithm, new Uint8Array(data)),
    },
    getRandomValues: webcrypto.getRandomValues.bind(webcrypto),
    randomUUID: webcrypto.randomUUID.bind(webcrypto),
  },
  writable: true,
  configurable: true,
});
