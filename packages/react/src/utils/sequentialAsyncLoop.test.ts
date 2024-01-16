import to from 'await-to-js';
import fetchMock, { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock';

import { sequentialAsyncLoop } from './sequentialAsyncLoop';
import { getMockCalls } from './testHelpers';

type Obj = Record<string, unknown>;
type Result = Array<unknown> | Obj | string | number;

describe('sequentialAsyncLoop runs array of async functions sequentially', () => {
  const tracker = jest.fn();
  // Creates an async function which appends a value to an array, object or string.
  // It also calls the tracker function so calls can be tracked.
  const createAsyncFunc = (trackedValue: unknown, propName?: string) => {
    return (current: Result) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (Array.isArray(current)) {
            current.push(trackedValue);
          } else if (typeof current === 'object') {
            // eslint-disable-next-line no-param-reassign
            current[propName as string] = trackedValue;
          } else {
            // eslint-disable-next-line no-param-reassign
            (current as string) += trackedValue;
          }
          tracker(trackedValue);
          resolve(current);
        }, 20);
      }) as Promise<Result>;
    };
  };
  // Maps first argument of all calls of the tracker
  const getCallOrder = () => {
    return getMockCalls(tracker).map((...args) => args[0][0]);
  };
  // Creates a function that runs native fetch and appends the result to an object
  // It also calls the tracker function so calls can be tracked.
  const createRequestAndHandler = (key: string, value: string) => async (result: Result) => {
    const fetchResult = await fetch(`http://domain.com?value=${value}`);
    const response = await fetchResult.text();
    tracker(key, value);
    return Promise.resolve({
      ...(result as Obj),
      [key]: response,
    });
  };

  const mockFetch = () =>
    fetchMock.doMock(async (req) => {
      const value = req.url.split('?value=')[1];
      return value === 'error' ? Promise.reject(new Response('Error', { status: 401 })) : Promise.resolve(value);
    });
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeAll(() => {
    enableFetchMocks();
  });
  afterAll(() => {
    disableFetchMocks();
  });
  describe('All functions are called in correct order', () => {
    it('A new value is pushed to the given array', async () => {
      const nums = [1, 2, 3, 4];
      const funcs = nums.map((num) => createAsyncFunc(num));
      const result = await sequentialAsyncLoop<Result>([], funcs);
      expect(result).toEqual(nums);
      expect(getCallOrder()).toEqual(nums);
    });
    it('A new value is appended to the given object', async () => {
      const initialObject = { initialValue: 'initial' };
      const values = ['value1', 2, false, true, { extra: 'value' }];
      const keys = ['key1', 'key2', 'key3', 'key4'];
      const funcs = values.map((value, i) => createAsyncFunc(value, keys[i]));
      const result = await sequentialAsyncLoop<Result>(initialObject, funcs);
      const expectedResult = values.reduce((res, value, i) => {
        return {
          ...res,
          [keys[i]]: value,
        };
      }, initialObject);
      expect(result).toEqual(expectedResult);
      expect(getCallOrder()).toEqual(values);
    });
    it('requests are made in given order', async () => {
      mockFetch();
      const values = ['value1', 'value2', '', 'newValue2'];
      // #3 is same as #2 on purpose
      const keys = ['key1', 'key2', 'key3', 'key2'];
      const funcs = values.map((value, i) => createRequestAndHandler(keys[i], value));

      const initialObject = { initialValue: 'initial' };
      const result = (await sequentialAsyncLoop<Result>(initialObject, funcs)) as Obj;
      const expectedResult = values.reduce((res, value, i) => {
        return {
          ...res,
          [keys[i]]: value,
        };
      }, initialObject);
      expect(result).toEqual(expectedResult);
      // Check that key#2 did get value of #3
      expect(Reflect.get(result, 'key2')).toBe(values[3]);
      expect(getCallOrder()).toEqual(keys);
    });
  });
  describe('When an error is encountered', () => {
    it('functions are not called after the error was thrown', async () => {
      const errorMessage = 'An error occured';
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const funcs = nums.map((num) => createAsyncFunc(num));
      funcs[2] = () => {
        tracker(errorMessage);
        throw new Error(errorMessage);
      };
      const [err] = await to(sequentialAsyncLoop<Result>([], funcs));
      expect(err && err.message).toEqual(errorMessage);
      expect(tracker).toHaveBeenCalledTimes(3);
    });
    it('Failed fetch error can be returned', async () => {
      mockFetch();
      const values = ['value1', 'value2', 'error', 'value3'];
      const keys = ['key1', 'key2', 'key3', 'key4'];
      const funcs = values.map((value, i) => createRequestAndHandler(keys[i], value));
      const [err] = await to(sequentialAsyncLoop<Result>({}, funcs));
      expect((err as unknown as Response).status).toEqual(401);
      expect(tracker).toHaveBeenCalledTimes(2);
    });
  });
});
