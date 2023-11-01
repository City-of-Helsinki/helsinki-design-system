export type MockedWindowLocationActions = {
  restore: () => void;
  reset: () => void;
  getCalls: () => string[];
  getCallParameters: (index?: number) => URLSearchParams;
};
export default function mockWindowLocation(): MockedWindowLocationActions {
  const globalWin = (global as unknown) as Window;
  let oldWindowLocation: Location | undefined = globalWin.location;

  const unload = () => setTimeout(() => window.dispatchEvent(new Event('unload')), 20);
  const tracker = jest.fn(unload);
  const location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        enumerable: true,
        value: tracker,
      },
      replace: {
        enumerable: true,
        value: tracker,
      },
    },
  );
  Reflect.deleteProperty(globalWin, 'location');
  Reflect.defineProperty(globalWin, 'location', {
    configurable: true,
    value: location,
    writable: true,
  });

  const getCalls = () => {
    return (tracker.mock.calls as unknown) as string[];
  };

  return {
    restore: () => {
      if (oldWindowLocation) {
        globalWin.location = oldWindowLocation;
      }
      oldWindowLocation = undefined;
    },
    reset: () => {
      tracker.mockClear();
    },
    getCalls,
    getCallParameters: (index = -1) => {
      const calls = getCalls();
      const arrIndex = index > -1 ? index : calls.length - 1;
      const call = calls[arrIndex];
      const args = call && (call[0] as string);
      if (!args) {
        return new URLSearchParams('');
      }
      return new URLSearchParams(args.substring(args.indexOf('?')));
    },
  };
}
