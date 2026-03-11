import { waitFor } from '@testing-library/react';

import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../testUtil';
import { ScreenReaderNotification } from '../types';
import { createScreenReaderNotification } from '../../shared/utils/screenReader';
import { ScreenReaderNotifications } from './ScreenReaderNotifications';

jest.mock('./Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<ScreenReaderNotifications />', () => {
  beforeAll(() => {
    testUtilBeforeAll(ScreenReaderNotifications);
  });
  afterAll(() => {
    testUtilAfterAll();
  });

  const getTestProps = (): Parameters<typeof initTests>[0] => {
    return {
      renderComponentOnly: false,
    };
  };
  const initTestSuite = () => {
    const { getScreenReaderNotifications, triggerMetaDataChange, triggerDataChange } = initTests(getTestProps());
    return {
      updateAndWait: async (notifications: ScreenReaderNotification[]) => {
        await triggerMetaDataChange({
          screenReaderNotifications: notifications,
        });
        // metadata does not trigger a re-render
        await triggerDataChange({});
      },
      getScreenReaderNotifications,
      triggerMetaDataChange,
    };
  };
  it('Component is always rendered', async () => {
    const { getScreenReaderNotifications } = initTestSuite();
    expect(getScreenReaderNotifications()).not.toBeNull();
  });
  it('Notifications are rendered', async () => {
    const { getScreenReaderNotifications, updateAndWait } = initTestSuite();
    await updateAndWait([
      createScreenReaderNotification('test', 'content'),
      createScreenReaderNotification('test2', 'content2'),
      createScreenReaderNotification('test3', 'content3'),
    ]);
    expect(getScreenReaderNotifications()).toHaveLength(3);
  });
  it('Old notifications are not rendered', async () => {
    const { getScreenReaderNotifications, triggerMetaDataChange } = initTestSuite();
    const oldNotification = createScreenReaderNotification('test', 'content');
    oldNotification.showTime = Date.now() - 10 * 1000;
    // Only update metadata; skip triggerDataChange to avoid "Time not updated" (empty data may not re-render UpdateChecker)
    await triggerMetaDataChange({ screenReaderNotifications: [oldNotification] });
    expect(getScreenReaderNotifications()).toHaveLength(0);
  });
  it('Delayed notifications are rendered after the delay', async () => {
    const { getScreenReaderNotifications, triggerMetaDataChange } = initTestSuite();
    const delayedNotification = createScreenReaderNotification('test', 'content');
    // Use a delay long enough that we reliably see 0 before the delay, and longer than
    // the hook's setInterval(tick, 200) so the notification appears after one tick.
    delayedNotification.delay = 300;
    // Only update metadata; skip triggerDataChange so we avoid "Time not updated" (empty data
    // may not cause a re-render of UpdateChecker). Metadata update already triggers context re-render.
    await triggerMetaDataChange({ screenReaderNotifications: [delayedNotification] });
    expect(getScreenReaderNotifications()).toHaveLength(0);
    // Wait for delay (300ms) + hook's setInterval(tick, 200) to run; waitFor wraps in act() so the
    // interval-driven state update does not trigger an act warning
    await waitFor(
      () => {
        expect(getScreenReaderNotifications()).toHaveLength(1);
      },
      { timeout: 2000 },
    );
  });
});
