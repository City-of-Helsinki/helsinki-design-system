export function getMockCalls(func: jest.Mock | jest.SpyInstance) {
  return func.mock ? func.mock.calls : [];
}

export function getAllMockCallArgs(func: jest.Mock | jest.SpyInstance) {
  const calls = getMockCalls(func);
  return calls.map((mockArgs) => mockArgs);
}

export function getMockCallArgs(func: jest.Mock | jest.SpyInstance, index = 0) {
  const calls = getMockCalls(func);
  return calls[index];
}

export function getLastMockCallArgs(func: jest.Mock | jest.SpyInstance) {
  const calls = getMockCalls(func);
  return getMockCallArgs(func, calls.length - 1);
}

export function filterMockCallArgs(func: jest.Mock | jest.SpyInstance, filter: (...args: unknown[]) => boolean) {
  const calls = getMockCalls(func);
  return calls.filter((call) => {
    return filter(...call);
  });
}

export function hasListenerBeenCalled(listener: jest.Mock) {
  return listener && getMockCalls(listener).length > 0;
}
