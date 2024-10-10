import { Locator, Page } from '@playwright/test';
// list of keys https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
export const createKeyboardHelpers = (page: Page) => {
  return {
    tab: () => {
      return page.keyboard.press('Tab');
    },
    space: () => {
      return page.keyboard.press(' ');
    },
    enter: () => {
      return page.keyboard.press('Enter');
    },
    down: () => {
      return page.keyboard.press('ArrowDown');
    },
    up: () => {
      return page.keyboard.press('ArrowUp');
    },
    left: () => {
      return page.keyboard.press('ArrowLeft');
    },
    right: () => {
      return page.keyboard.press('ArrowRight');
    },
    esc: () => {
      return page.keyboard.press('Escape');
    },
    home: () => {
      return page.keyboard.press('Home');
    },
    end: () => {
      return page.keyboard.press('End');
    },
    // In most cases, you should use locator.fill() instead.
    // See fillElement() below
    type: (value: string) => {
      return page.keyboard.type(value);
    },
    // Dispatches only input event, does not emit the keydown, keyup or keypress events.
    inputEvent: (value: string) => {
      return page.keyboard.insertText(value);
    },
    fillElement: async (element: Locator, value: string) => {
      return element.fill(value);
    },
    typeOneByOne: async (element: Locator, value: string, delay?: number) => {
      return element.pressSequentially(value, { delay });
    },
  };
};
