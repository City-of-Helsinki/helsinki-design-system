import { ChangeEvent } from '../../../dataProvider/DataContext';

/**
 * Minimum time in milliseconds between user interactions to prevent rapid toggling
 */
export const MIN_USER_INTERACTION_TIME_IN_MS = 200;

/**
 * Creates a function that checks if an event should trigger a close action
 * @param closeTriggerEventIdentifiers - Array of event IDs or types that should trigger close
 * @returns Function that checks if an event should trigger close
 */
export function createIsCloseTriggerEvent(closeTriggerEventIdentifiers: string[]) {
  return (event: ChangeEvent): boolean => {
    return (
      closeTriggerEventIdentifiers.includes(event.type || '') || closeTriggerEventIdentifiers.includes(event.id || '')
    );
  };
}
