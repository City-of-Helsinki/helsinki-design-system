export type MockedWindowLocationActions = {
  setUrl: (url: string) => void;
  restore: () => void;
};
export default function mockWindowLocation(): MockedWindowLocationActions {
  const globalWin = (global as unknown) as Window;
  let oldWindowLocation: Location | undefined = globalWin.location;
  let urlObject = new URL('https://default.domain.com');
  const location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      hostname: {
        get: () => urlObject.hostname,
      },
    },
  );
  Reflect.deleteProperty(globalWin, 'location');
  Reflect.defineProperty(globalWin, 'location', {
    configurable: true,
    value: location,
    writable: true,
  });

  return {
    setUrl: (url: string) => {
      urlObject = new URL(url);
    },
    restore: () => {
      if (oldWindowLocation) {
        globalWin.location = oldWindowLocation;
      }
      oldWindowLocation = undefined;
    },
  };
}
