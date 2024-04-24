import { fireEvent, waitFor } from '@testing-library/dom';

import { TestClass } from './testClass';

describe('testClass', () => {
  const targetId = 'host';

  const getTargetElement = () => {
    return document.getElementById(targetId) as HTMLElement;
  };

  const getTargetShadowRoot = () => {
    return getTargetElement().shadowRoot as ShadowRoot;
  };

  beforeEach(() => {
    const el = getTargetElement();
    if (el) {
      el.remove();
    }
  });

  const getUidFromElement = (instance: TestClass) => {
    const el = getTargetShadowRoot().getElementById(instance.ids.uidSpan);
    if (!el) {
      return '';
    }
    return el.innerHTML.split('##')[1];
  };

  const getClickCountFromElement = (instance: TestClass) => {
    const el = getTargetShadowRoot().getElementById(instance.ids.clickCountSpan);
    if (!el) {
      return -1;
    }
    return Number(el.innerHTML.split('##')[1]);
  };

  const getClickButtonElement = (instance: TestClass) => {
    return getTargetShadowRoot().getElementById(instance.ids.clickButton) as HTMLButtonElement;
  };

  const clickButton = (instance: TestClass) => {
    const el = getClickButtonElement(instance);
    fireEvent.click(el);
  };

  const clickButtonAndWaitForUpdate = async (instance: TestClass) => {
    const currentCount = getClickCountFromElement(instance);
    clickButton(instance);
    return waitFor(() => {
      expect(getClickCountFromElement(instance)).toBe(currentCount + 1);
    });
  };

  it('adds element to shadowRoot', () => {
    const instance = new TestClass();
    const initialUid = instance.uid;
    expect(initialUid).toBeDefined();
    expect(getUidFromElement(instance)).toBe(initialUid);
    expect(getClickCountFromElement(instance)).toBe(0);
    expect(getClickCountFromElement(instance)).toBe(instance.clickCount);
    expect(getClickButtonElement(instance)).not.toBeNull();
  });
  it('registers button clicks and updates', async () => {
    const instance = new TestClass();
    const initialUid = instance.uid;
    await clickButtonAndWaitForUpdate(instance);
    expect(getClickCountFromElement(instance)).toBe(1);
    expect(getClickCountFromElement(instance)).toBe(instance.clickCount);
    expect(getUidFromElement(instance)).toBe(instance.uid);
    expect(getUidFromElement(instance)).toBe(initialUid);
  });
});
