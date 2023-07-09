import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { useFocusTrapper } from '../useFocusTrapper';

const getElementPositionStorage = jest.fn();
const getRelatedTargetPositionStorage = jest.fn();
const onFocusListener = jest.fn();

const TestElement = () => {
  const {
    refForFirstTrapper,
    refForLastTrapper,
    disableElements,
    enableElements,
    getElementPosition,
    getRelatedTargetPosition,
    setFocus,
  } = useFocusTrapper({
    onFocus: (position, relatedTargetPosition) => {
      onFocusListener(position, relatedTargetPosition);
      const nextFocusedElementTestID = position === 'first' ? 'button' : 'input';
      screen.getByTestId(nextFocusedElementTestID).focus();
    },
  });
  return (
    <div>
      <nav>
        <button
          type="button"
          data-testid="disable-button"
          onClick={() => {
            disableElements();
          }}
        >
          Disable
        </button>
        <button
          type="button"
          data-testid="enable-button"
          onClick={() => {
            enableElements();
          }}
        >
          Disable
        </button>
        <button
          type="button"
          data-testid="set-focus-first-button"
          onClick={() => {
            setFocus('first');
          }}
        >
          setFocus to first
        </button>
        <button
          type="button"
          data-testid="set-focus-last-button"
          onClick={() => {
            setFocus('last');
          }}
        >
          setFocus to last
        </button>
        <button
          type="button"
          data-testid="get-positions-button"
          onClick={() => {
            getElementPositionStorage('first', getElementPosition(screen.getByTestId('first-trapper')));
            getElementPositionStorage('last', getElementPosition(screen.getByTestId('last-trapper')));
          }}
        >
          Get element positions
        </button>
        <button
          type="button"
          data-testid="get-related-positions-button"
          onClick={() => {
            getRelatedTargetPositionStorage('first', getRelatedTargetPosition(screen.getByTestId('first-trapper')));
            getRelatedTargetPositionStorage('last', getRelatedTargetPosition(screen.getByTestId('last-trapper')));
          }}
        >
          Get related positions
        </button>
      </nav>
      <div>
        <button type="button" data-testid="first-trapper" ref={refForFirstTrapper}>
          First trapper
        </button>
        <button type="button" data-testid="button">
          Not a trapper
        </button>
        <input type="text" data-testid="input" />
        <button type="button" data-testid="last-trapper" ref={refForLastTrapper}>
          Last trapper
        </button>
      </div>
    </div>
  );
};

const renderElement = () => render(<TestElement />);

const getElement = (testId: string) => {
  return screen.queryByTestId(testId) as HTMLElement;
};

// the hook uses the createFocusTrapper which has tests for all features
// callback and refs are mainly tests here and also exposed trapper functions
describe('useFocusTrapper', () => {
  beforeEach(cleanup);
  it('Assigns two tracking elements, first and last. The onFocus callback is called when either trackers receives focus.', async () => {
    renderElement();
    const firstTrapper = getElement('first-trapper');
    const lastTrapper = getElement('last-trapper');
    firstTrapper.focus();
    expect(onFocusListener).toBeCalledTimes(1);
    lastTrapper.focus();
    expect(onFocusListener).toBeCalledTimes(2);
  });
  it('The onFocus listener in this test moves the focus automatically forward to input or button.', async () => {
    renderElement();
    const firstTrapper = getElement('first-trapper');
    const lastTrapper = getElement('last-trapper');
    firstTrapper.focus();
    expect(onFocusListener).toHaveBeenLastCalledWith('first', 'unknown');
    expect(document.activeElement === getElement('button')).toBeTruthy();
    lastTrapper.focus();
    expect(onFocusListener).toHaveBeenLastCalledWith('last', 'inside');
    expect(document.activeElement === getElement('input')).toBeTruthy();
  });
  it('disableElements() and enableElements() work ', async () => {
    renderElement();
    fireEvent.click(getElement('disable-button'));
    expect(getElement('first-trapper').getAttribute('disabled')).toBe('true');
    fireEvent.click(getElement('enable-button'));
    expect(getElement('first-trapper').getAttribute('disabled')).toBe(null);
  });
  it('getElementPosition() works', async () => {
    renderElement();
    fireEvent.click(getElement('get-positions-button'));
    expect(getElementPositionStorage.mock.calls).toEqual([
      ['first', 'first'],
      ['last', 'last'],
    ]);
  });
  it('getRelatedTargetPosition() works ', async () => {
    renderElement();
    fireEvent.click(getElement('get-related-positions-button'));
    expect(getRelatedTargetPositionStorage.mock.calls).toEqual([
      ['first', 'first'],
      ['last', 'last'],
    ]);
  });
  it('setFocus() works ', async () => {
    renderElement();
    fireEvent.click(getElement('set-focus-first-button'));
    expect(document.activeElement === getElement('button')).toBeTruthy();
    fireEvent.click(getElement('set-focus-last-button'));
    expect(document.activeElement === getElement('input')).toBeTruthy();
  });
});
