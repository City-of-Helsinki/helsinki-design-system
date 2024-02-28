export type MockedWindowLocationActions = {
  restore: () => void;
  reset: () => void;
  getCalls: () => string[];
  getCallParameters: (index?: number) => URLSearchParams;
  setUrl: (url: string) => void;
};
export default function mockWindowLocation(): MockedWindowLocationActions {
  const globalWin = global as unknown as Window;
  let oldWindowLocation: Location | undefined = globalWin.location;

  const unload = () =>
    setTimeout(() => {
      // @ts-ignore
      console.log('UNLOAD');
      window.dispatchEvent(new Event('unload'));
    }, 20);
  const tracker = jest.fn(() => {
    // @ts-ignore
    console.log('TRACKER');
    unload();
  });
  let urlObject = new URL('https://default.domain.com');
  const location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      hostname: {
        get: () => urlObject.hostname,
      },
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
    return tracker.mock.calls as unknown as string[];
  };

  return {
    restore: () => {
      if (oldWindowLocation) {
        globalWin.location = oldWindowLocation;
      }
      oldWindowLocation = undefined;
    },
    setUrl: (url: string) => {
      urlObject = new URL(url);
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
