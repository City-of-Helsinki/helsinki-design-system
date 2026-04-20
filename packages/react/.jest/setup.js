import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

// Increase asyncUtilTimeout for @testing-library/dom v8+.
// In v8, waitFor's timeout uses the faked setTimeout, so advancing fake timers
// inside callbacks also advances the timeout. A higher value prevents premature
// timeouts in tests that call jest.advanceTimersByTime inside waitFor callbacks.
import { configure } from '@testing-library/dom';

configure({ asyncUtilTimeout: 300000 });
