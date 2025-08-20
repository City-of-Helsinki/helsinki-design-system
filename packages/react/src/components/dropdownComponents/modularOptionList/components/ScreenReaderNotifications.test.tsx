import { waitFor } from '@testing-library/react';

import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../testUtil';
import { ScreenReaderNotification } from '../types';
import { createScreenReaderNotification } from '../utils';
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
    const { getScreenReaderNotifications, updateAndWait } = initTestSuite();
    const oldNotification = createScreenReaderNotification('test', 'content');
    oldNotification.showTime = Date.now() - 10 * 1000;
    await updateAndWait([oldNotification]);
    expect(getScreenReaderNotifications()).toHaveLength(0);
  });
  it('Delayed notifications are rendered after the delay', async () => {
    const { getScreenReaderNotifications, updateAndWait } = initTestSuite();
    const delayedNotification = createScreenReaderNotification('test', 'content');
    delayedNotification.delay = 100;
    await updateAndWait([delayedNotification]);
    expect(getScreenReaderNotifications()).toHaveLength(0);
    await waitFor(() => {
      expect(getScreenReaderNotifications()).toHaveLength(1);
    });
  });
});
