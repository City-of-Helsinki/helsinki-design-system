import { getMockCalls } from '../../../utils/testHelpers';

export function createMockTestUtil() {
  const mockMap = new Map<string, jest.SpyInstance | jest.Mock>();
  const addSpy = (target: unknown, name: string) => {
    if (mockMap.has(name)) {
      throw new Error(`${name} already exists in mockMap`);
    }
    mockMap.set(name, jest.spyOn(target as Record<string, never>, name));
  };
  const getListener = (name: string) => {
    return mockMap.get(name);
  };
  const getCalls = (name: string) => {
    const listener = getListener(name);
    if (!listener) {
      return [];
    }
    return getMockCalls(listener);
  };
  const clear = () => {
    mockMap.forEach((listener) => {
      listener.mockClear();
    });
  };
  const reset = () => {
    clear();
    mockMap.clear();
  };
  return {
    getListener,
    getCalls,
    addSpy,
    clear,
    reset,
  };
}
