import userEvent from '@testing-library/user-event';

import { FocusTrapperProps, createFocusTrapper } from '../createFocusTrapper';

describe('createFocusTrapper', () => {
  const ids = {
    preOuterInput: 'pre-outer-input',
    preOuterDiv: 'pre-outer-div',
    firstTrapper: 'first-trapper',
    lastTrapper: 'last-trapper',
    innerButton: 'inner-button',
    innerDiv: 'inner-div',
    innerInput: 'inner-input',
    postOuterInput: 'post-outer-input',
    distantInput: 'distant-input',
  };

  const untrackedElementIds = Object.keys(ids)
    .filter((k) => k !== 'lastTrapper' && k !== 'firstTrapper')
    .map((id) => ids[id]);
  const innerElements = untrackedElementIds.filter((k) => k.includes('inner'));
  const outerElements = untrackedElementIds.filter((k) => k.includes('outer'));

  function createDOM() {
    const div = document.createElement('div');
    div.innerHTML = `
    <input type="text" id="${ids.distantInput}" />
    <div>
      <input type="text" id="${ids.preOuterInput}" />
      <div tabindex="0" id="${ids.preOuterDiv}">Focusable div</div>
      <button id="${ids.firstTrapper}">First trapper</button>
      <div>
      <button id="${ids.innerButton}">Inner button</button>
      <input type="text" id="${ids.innerInput}" />
      <div tabindex="0" id="${ids.innerDiv}">Focusable div</div>
      </div>
      <button id="${ids.lastTrapper}">Last trapper</button>
      <input type="text" id="${ids.postOuterInput}" />
    </div>
    `;
    document.body.appendChild(div);
    return div;
  }

  afterEach(() => {
    jest.resetAllMocks();
  });

  let dom: HTMLDivElement;
  let trapper: ReturnType<typeof createFocusTrapper>;
  const getElement = (id: string) => dom.querySelector(`#${id}`) as HTMLElement;
  const setFocus = (id: string) => {
    const element = getElement(id);
    element.focus();
    return element;
  };
  const focusListener = jest.fn();

  const initTests = (testProps?: { setElements?: boolean } & FocusTrapperProps) => {
    const { setElements = true, onFocus, ...rest } = testProps || {};
    if (dom) {
      document.body.removeChild(dom);
    }
    dom = createDOM();
    const props: FocusTrapperProps = { ...rest };
    if (setElements) {
      props.firstTrapperElement = getElement('first-trapper');
      props.lastTrapperElement = getElement('last-trapper');
    }
    props.onFocus = (type, relatedTargetPosition) => {
      focusListener(type, relatedTargetPosition);
      if (onFocus) {
        onFocus(type, relatedTargetPosition);
      }
    };
    trapper = createFocusTrapper(props);
  };

  const pressTab = (shift = false) => {
    userEvent.tab({ shift });
  };

  const checkTrappers = (disabled: boolean) => {
    const firstTrapper = getElement(ids.firstTrapper);
    const lastTrapper = getElement(ids.lastTrapper);
    expect(firstTrapper.getAttribute('disabled')).toBe(disabled ? 'true' : null);
    expect(lastTrapper.getAttribute('disabled')).toBe(disabled ? 'true' : null);
    if (disabled) {
      expect(firstTrapper.getAttribute('tabindex')).toBe('-1');
      expect(lastTrapper.getAttribute('tabindex')).toBe('-1');
    } else {
      expect(firstTrapper.getAttribute('tabindex')).not.toBe('-1');
      expect(lastTrapper.getAttribute('tabindex')).not.toBe('-1');
    }
  };

  describe('When created', () => {
    it('Callback is not called.', () => {
      initTests();
      expect(focusListener).toHaveBeenCalledTimes(0);
      expect(document.activeElement).toBe(document.body);
    });
    it('getElementPosition() returns position of the given element', () => {
      initTests();
      expect(trapper.getElementPosition(getElement(ids.firstTrapper))).toBe('first');
      expect(trapper.getElementPosition(getElement(ids.lastTrapper))).toBe('last');
    });
  });

  describe('When non-trapper element is focused', () => {
    it('Nothing is changed. getElementPosition() returns undefined', async () => {
      initTests();
      untrackedElementIds.forEach((id) => {
        const focused = setFocus(id);
        expect(focusListener).toHaveBeenCalledTimes(0);
        expect(document.activeElement).toBe(focused);
        expect(trapper.getElementPosition(focused)).toBeUndefined();
      });
    });
  });
  describe('When trapper element is focused', () => {
    it('The onFocus callback is called with focused element position and related target position', async () => {
      initTests();
      const firstTrapper = setFocus(ids.firstTrapper);
      expect(focusListener).toHaveBeenCalledTimes(1);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'unknown');
      expect(document.activeElement).toBe(firstTrapper);

      const lastTrapper = setFocus(ids.lastTrapper);
      expect(focusListener).toHaveBeenCalledTimes(2);
      expect(focusListener).toHaveBeenLastCalledWith('last', 'first');
      expect(document.activeElement).toBe(lastTrapper);
    });
    it('Second argument in the onFocus() call tells where focus came from related to the trapper elements', async () => {
      initTests();
      setFocus(outerElements[0]);
      setFocus(ids.firstTrapper);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'outside');
      setFocus(innerElements[0]);
      setFocus(ids.firstTrapper);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'inside');
      setFocus(ids.lastTrapper);
      expect(focusListener).toHaveBeenLastCalledWith('last', 'first');
      setFocus(ids.firstTrapper);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'last');
    });
  });
  describe(`getRelatedTargetPosition() can be called manually with any element. 
            Related target position tells where given element is positioned in the dom related to the first trapper element
            Only first trapper element's parent's children are checked. 
          `, () => {
    it("If given element is 'further' away than that, 'outside' is returned", async () => {
      initTests();
      expect(trapper.getRelatedTargetPosition(getElement(ids.distantInput))).toBe('outside');
      expect(trapper.getRelatedTargetPosition(document.body)).toBe('outside');
    });
    it("If given element is located between first and last trapper, 'inside' is returned", async () => {
      initTests();
      innerElements.forEach((id) => {
        expect(trapper.getRelatedTargetPosition(getElement(id))).toBe('inside');
      });
    });
    it("Tracking elements return 'first' or 'last' ", async () => {
      initTests();
      expect(trapper.getRelatedTargetPosition(getElement(ids.firstTrapper))).toBe('first');
      expect(trapper.getRelatedTargetPosition(getElement(ids.lastTrapper))).toBe('last');
    });
  });
  describe(`If props.trapIn is "true", focus moves from first to last and vice versa. onFocus is called only once.`, () => {
    it('When focus moves from between trappers to the last trapper, focus is moved to the first trapper', async () => {
      initTests({ trapIn: true });
      const innerButton = setFocus(ids.innerButton);
      expect(document.activeElement).toBe(innerButton);
      setFocus(ids.lastTrapper);
      expect(document.activeElement).toBe(getElement(ids.firstTrapper));
      expect(focusListener).toHaveBeenCalledTimes(1);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'inside');
    });
    it('When focus moves from between trappers to the first trapper, focus is moved to the last trapper', async () => {
      initTests({ trapIn: true });
      const innerButton = setFocus(ids.innerButton);
      expect(document.activeElement).toBe(innerButton);
      setFocus(ids.firstTrapper);
      expect(document.activeElement).toBe(getElement(ids.lastTrapper));
      expect(focusListener).toHaveBeenCalledTimes(1);
      expect(focusListener).toHaveBeenLastCalledWith('last', 'inside');
    });
    it('When focus moves from outside to the first trapper, focus is not moved', async () => {
      initTests({ trapIn: true });
      const preOuterDiv = setFocus(ids.preOuterDiv);
      expect(document.activeElement).toBe(preOuterDiv);
      const firstTrapper = setFocus(ids.firstTrapper);
      expect(document.activeElement).toBe(firstTrapper);
      expect(focusListener).toHaveBeenCalledTimes(1);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'outside');
    });
    it('When focus moves from outside to the last trapper, focus is not moved', async () => {
      initTests({ trapIn: true });
      const postOuterInput = setFocus(ids.postOuterInput);
      expect(document.activeElement).toBe(postOuterInput);
      const lastTrapper = setFocus(ids.lastTrapper);
      expect(document.activeElement).toBe(lastTrapper);
      expect(focusListener).toHaveBeenCalledTimes(1);
      expect(focusListener).toHaveBeenLastCalledWith('last', 'outside');
    });
    it('When focus moves from last to first trapper or vice versa, focus is not moved', async () => {
      initTests({ trapIn: true });
      const firstTrapper = setFocus(ids.firstTrapper);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'unknown');
      expect(document.activeElement).toBe(firstTrapper);
      const lastTrapper = setFocus(ids.lastTrapper);
      expect(document.activeElement).toBe(lastTrapper);
      expect(focusListener).toHaveBeenCalledTimes(2);
      expect(focusListener).toHaveBeenLastCalledWith('last', 'first');
      setFocus(ids.firstTrapper);
      expect(document.activeElement).toBe(firstTrapper);
      expect(focusListener).toHaveBeenCalledTimes(3);
      expect(focusListener).toHaveBeenLastCalledWith('first', 'last');
    });
  });
  describe(`Trappers can be disabled and enabled.`, () => {
    it('If "trapIn" is not "true", trappers should be disabled when focus is within. Then they do not interfere with natural focus order.', async () => {
      initTests();
      const firstTrapper = getElement(ids.firstTrapper);
      const lastTrapper = getElement(ids.lastTrapper);
      const innerButton = getElement(ids.innerButton);
      const postOuterInput = getElement(ids.postOuterInput);
      const preOuterDiv = setFocus(ids.preOuterDiv);
      pressTab();
      expect(document.activeElement).toBe(firstTrapper);
      expect(focusListener).toHaveBeenCalledTimes(1);
      pressTab();
      expect(document.activeElement).toBe(innerButton);
      trapper.disableElements();
      checkTrappers(true);
      pressTab(true);
      expect(document.activeElement).toBe(preOuterDiv);
      pressTab();
      expect(document.activeElement).toBe(innerButton);
      // move to past the last trapper
      pressTab();
      pressTab();
      pressTab();
      expect(document.activeElement).toBe(postOuterInput);
      trapper.enableElements();
      checkTrappers(false);
      pressTab(true);
      expect(document.activeElement).toBe(lastTrapper);
      expect(focusListener).toHaveBeenCalledTimes(2);
      // move to  the first trapper
      pressTab(true);
      pressTab(true);
      pressTab(true);
      pressTab(true);
      expect(document.activeElement).toBe(firstTrapper);
      expect(focusListener).toHaveBeenCalledTimes(3);
    });
  });
  describe(`setFocusTo() moves focus to given element`, () => {
    it('Argument can be "first" or "last"', async () => {
      initTests();
      trapper.setFocusTo('first');
      expect(document.activeElement).toBe(getElement(ids.firstTrapper));
      expect(focusListener).toHaveBeenCalledTimes(1);
      trapper.setFocusTo('last');
      expect(document.activeElement).toBe(getElement(ids.lastTrapper));
      expect(focusListener).toHaveBeenCalledTimes(2);
    });
  });
  describe(`Elements can be set later`, () => {
    it('When elements are not set, functions do not throw', async () => {
      initTests({ setElements: false });
      expect(() => {
        trapper.setFocusTo('first');
        trapper.setFocusTo('last');
        trapper.disableElements();
        checkTrappers(false);
        trapper.enableElements();
        expect(trapper.getElementPosition(getElement(ids.firstTrapper))).toBeUndefined();
        expect(trapper.getElementPosition(getElement(ids.lastTrapper))).toBeUndefined();
        expect(trapper.getRelatedTargetPosition(getElement(ids.firstTrapper))).toBe('unknown');
        expect(trapper.getRelatedTargetPosition(getElement(ids.firstTrapper))).toBe('unknown');
        expect(focusListener).toHaveBeenCalledTimes(0);
      }).not.toThrow();
    });
    it('When elements are set, they work normally', async () => {
      initTests({ setElements: false });
      trapper.registerTrappingElement('first', getElement(ids.firstTrapper));
      trapper.registerTrappingElement('last', getElement(ids.lastTrapper));
      trapper.setFocusTo('first');
      expect(focusListener).toHaveBeenCalledTimes(1);
      expect(trapper.getElementPosition(getElement(ids.lastTrapper))).toBe('last');
      expect(trapper.getRelatedTargetPosition(getElement(ids.innerButton))).toBe('inside');
      expect(trapper.getRelatedTargetPosition(getElement(ids.preOuterDiv))).toBe('outside');
    });
  });
  describe(`Dispose()`, () => {
    it('Removes listeners and unregisters elements', async () => {
      initTests();
      trapper.dispose();
      setFocus(ids.firstTrapper);
      setFocus(ids.lastTrapper);
      expect(focusListener).toHaveBeenCalledTimes(0);
      trapper.disableElements();
      checkTrappers(false);
      trapper.enableElements();
      checkTrappers(false);
      setFocus(ids.preOuterDiv);
      pressTab();
      expect(document.activeElement).toBe(getElement(ids.firstTrapper));
      setFocus(ids.lastTrapper);
      expect(focusListener).toHaveBeenCalledTimes(0);
    });
  });
});
