import 'jest-axe/extend-expect';
import '@testing-library/jest-dom/extend-expect';

// Fix @testing-library/dom's waitFor with fake timers in Jest 29.
// jest-environment-jsdom 29 does not provide setImmediate, so @testing-library/dom
// falls back to a polyfill that uses the faked setTimeout, causing deadlocks.
// Patch the helper to use Node's real setImmediate.
// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const dtlHelpers = require('@testing-library/dom/dist/helpers');
// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
dtlHelpers.setImmediate = require('timers').setImmediate;
