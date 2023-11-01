import { User, UserManager } from 'oidc-client-ts';

export function createRenewalTrackingPromise(userManager: UserManager): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    let done = false;
    const loadListener = (user: User) => {
      if (done) {
        return;
      }
      done = true;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      removeListeners();
      resolve(user);
    };
    const errorListener = () => {
      if (done) {
        return;
      }
      done = true;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      removeListeners();
      reject(new Error('Renewal failed'));
    };
    const removeListeners = () => {
      userManager.events.removeUserLoaded(loadListener);
      userManager.events.removeSilentRenewError(errorListener);
      userManager.events.removeUserUnloaded(errorListener);
    };
    userManager.events.addUserLoaded(loadListener);
    userManager.events.addSilentRenewError(errorListener);
    userManager.events.addUserUnloaded(errorListener);
  });
}
