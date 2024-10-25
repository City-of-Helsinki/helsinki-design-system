/**
 * This file mocks the Cache Storage API used by the service worker.
 * https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
 */
class MockCacheStorage {
  constructor() {
    this.store = new Map();
  }

  async match(request) {
    const key = typeof request === 'string' ? request : request.url;
    return this.store.get(key);
  }

  async put(request, response) {
    const key = typeof request === 'string' ? request : request.url;
    this.store.set(key, response);
  }

  async delete(request) {
    const key = typeof request === 'string' ? request : request.url;
    return this.store.delete(key);
  }
}

const cacheStorage = new Map();

/**
 * Create a mock CacheStorage object that can be used in tests.
 */
const caches = {
  async open(cacheName) {
    if (!cacheStorage.has(cacheName)) {
      cacheStorage.set(cacheName, new MockCacheStorage());
    }
    return cacheStorage.get(cacheName);
  },

  async delete(cacheName) {
    return cacheStorage.delete(cacheName);
  },

  async keys() {
    return Array.from(cacheStorage.keys());
  }
};

global.caches = caches;
