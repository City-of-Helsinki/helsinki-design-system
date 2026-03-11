import { ScreenReaderNotification } from '../../modularOptionList/types';

// Generic interface for data handlers that manage screen reader notifications
export interface ScreenReaderNotificationHandlers {
  getMetaData(): {
    screenReaderNotifications: ScreenReaderNotification[];
  };
  updateMetaData(update: { screenReaderNotifications: ScreenReaderNotification[] }): void;
}

/**
 * Creates a screen reader notification object with timing information
 * @param type - The type/category of the notification
 * @param content - The text content to be announced
 * @param delay - Optional delay before announcing (default: 0)
 * @returns ScreenReaderNotification object
 */
export function createScreenReaderNotification(type: string, content: string, delay = 0): ScreenReaderNotification {
  return {
    type,
    content,
    delay,
    showTime: 0,
    addTime: Date.now(),
  };
}

/**
 * Adds a new screen reader notification or updates existing one of the same type
 * @param notification - The notification to add or update
 * @param dataHandlers - Object with getMetaData and updateMetaData methods
 * @returns true if notification was added (new), false if updated (existing)
 */
export function addOrUpdateScreenReaderNotificationByType(
  notification: ScreenReaderNotification,
  dataHandlers: ScreenReaderNotificationHandlers,
): boolean {
  const { screenReaderNotifications } = dataHandlers.getMetaData();
  const indexOfSameType = screenReaderNotifications.findIndex((n) => n.type === notification.type);
  if (indexOfSameType > -1) {
    const updatedList = [...screenReaderNotifications];
    const prev = updatedList[indexOfSameType];
    if (prev.content === notification.content) {
      return false;
    }
    updatedList[indexOfSameType] = notification;
    dataHandlers.updateMetaData({ screenReaderNotifications: updatedList });
    return false;
  }
  const updatedList = [...screenReaderNotifications, notification];
  dataHandlers.updateMetaData({ screenReaderNotifications: updatedList });
  return true;
}

/**
 * Removes screen reader notification(s) matching the given criteria
 * @param target - Partial notification to match against (type and/or content)
 * @param dataHandlers - Object with getMetaData and updateMetaData methods
 * @returns true if a notification was removed, false otherwise
 */
export function removeScreenReaderNotification(
  target: Partial<ScreenReaderNotification>,
  dataHandlers: ScreenReaderNotificationHandlers,
): boolean {
  const { screenReaderNotifications } = dataHandlers.getMetaData();
  const indexOfMatch = screenReaderNotifications.findIndex((n) => {
    const hasTypeMatch = !target.type || n.type === target.type;
    const hasContentMatch = !target.content || n.content === target.content;
    return hasTypeMatch && hasContentMatch;
  });
  if (indexOfMatch > -1) {
    screenReaderNotifications.splice(indexOfMatch, 1);
    dataHandlers.updateMetaData({ screenReaderNotifications });
    return true;
  }
  return false;
}
