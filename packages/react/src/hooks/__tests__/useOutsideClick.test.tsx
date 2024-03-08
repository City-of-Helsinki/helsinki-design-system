import React, { PropsWithChildren, useRef, useState } from 'react';
import { act, cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import useOutsideClick from '../useOutsideClick';
import { getMockCalls } from '../../utils/testHelpers';

describe('useOutsideClick', () => {
  const defaultInnerWidth = global.innerWidth;
  afterAll(() => {
    cleanup();
    global.innerWidth = defaultInnerWidth;
  });

  const tracker = jest.fn();

  const getCallsByListener = () => {
    return getMockCalls(tracker).reduce(
      (current, listenerId) => {
        if (current[listenerId] === undefined) {
          // eslint-disable-next-line no-param-reassign
          current[listenerId] = 1;
        } else {
          // eslint-disable-next-line no-param-reassign
          current[listenerId] += 1;
        }
        return current;
      },
      {} as Record<string, number>,
    );
  };

  const Section = (props: PropsWithChildren<unknown>) => {
    return <section id="body">{props.children}</section>;
  };
  const OuterElement = (props: PropsWithChildren<unknown>) => {
    return <div id="outer">{props.children}</div>;
  };
  const SiblingElement = ({ id }: { id: string }) => {
    return <span id={id} />;
  };
  const ElementWithHook = ({ id }: { id: string }) => {
    const callback = () => {
      tracker(id);
    };
    const ref = useRef<HTMLSpanElement>(null);
    const props = useOutsideClick({ callback, ref });
    return (
      <span id={id} ref={ref} {...props}>
        <button type="button" id={`${id}Button`} onClick={jest.fn()}>
          Click
        </button>
      </span>
    );
  };

  const App = () => {
    const [renderListeners, updateRenderListeners] = useState(true);
    return (
      <Section>
        <OuterElement>
          <SiblingElement id="sibling1" />
          {renderListeners && <ElementWithHook id="listener1" />}
          <SiblingElement id="sibling2" />
          {renderListeners && <ElementWithHook id="listener2" />}
        </OuterElement>
        {renderListeners && <ElementWithHook id="listener3" />}
        <button type="button" id="button" onClick={() => updateRenderListeners((v) => !v)}>
          Render/unrender listeners
        </button>
      </Section>
    );
  };
  const renderScenario = () => {
    return render(<App />);
  };

  const getElementById = (result: RenderResult, id: string) => {
    return result.container.querySelector(`#${id}`) as HTMLElement;
  };

  const toggleListeners = async (result: RenderResult) => {
    const hasListeners = !!getElementById(result, 'listener1');
    const button = getElementById(result, 'button');
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(!!getElementById(result, 'listener1')).not.toBe(hasListeners);
    });
  };

  const elementIds = [
    'body',
    'outer',
    'sibling1',
    'sibling2',
    'listener1',
    'listener2',
    'listener3',
    'listener1Button',
    'listener2Button',
    'listener3Button',
  ];
  const getElements = (result: RenderResult) => {
    return elementIds.reduce(
      (current, id) => {
        // eslint-disable-next-line no-param-reassign
        current[id] = getElementById(result, id);
        return current;
      },
      {} as Record<string, HTMLElement>,
    );
  };

  afterEach(() => {
    tracker.mockReset();
  });

  it('useOutsideClick reacts to clicks outside the element', () => {
    const result = renderScenario();
    const elements = getElements(result);
    // click outside elements
    fireEvent.click(elements.body);
    expect(getCallsByListener()).toMatchObject({ listener1: 1, listener2: 1, listener3: 1 });
    fireEvent.click(elements.outer);
    expect(getCallsByListener()).toMatchObject({ listener1: 2, listener2: 2, listener3: 2 });
    fireEvent.click(elements.sibling1);
    expect(getCallsByListener()).toMatchObject({ listener1: 3, listener2: 3, listener3: 3 });
    fireEvent.click(elements.sibling2);
    expect(getCallsByListener()).toMatchObject({ listener1: 4, listener2: 4, listener3: 4 });
    // click listeners
    fireEvent.click(elements.listener1);
    expect(getCallsByListener()).toMatchObject({ listener1: 4, listener2: 5, listener3: 5 });
    fireEvent.click(elements.listener2);
    expect(getCallsByListener()).toMatchObject({ listener1: 5, listener2: 5, listener3: 6 });
    fireEvent.click(elements.listener3);
    expect(getCallsByListener()).toMatchObject({ listener1: 6, listener2: 6, listener3: 6 });
    // click listener children
    fireEvent.click(elements.listener1Button);
    expect(getCallsByListener()).toMatchObject({ listener1: 6, listener2: 7, listener3: 7 });
    fireEvent.click(elements.listener2Button);
    expect(getCallsByListener()).toMatchObject({ listener1: 7, listener2: 7, listener3: 8 });
    fireEvent.click(elements.listener3Button);
    expect(getCallsByListener()).toMatchObject({ listener1: 8, listener2: 8, listener3: 8 });
  });
  it('window listeners are removed when component is unmounted', async () => {
    const result = renderScenario();
    const elements = getElements(result);
    // note: listeners are toggled with a click, which is registered as an outside click
    await toggleListeners(result);
    expect(getCallsByListener()).toMatchObject({ listener1: 1, listener2: 1, listener3: 1 });
    fireEvent.click(elements.body);
    expect(getCallsByListener()).toMatchObject({ listener1: 1, listener2: 1, listener3: 1 });
    await toggleListeners(result);
    fireEvent.click(elements.body);
    expect(getCallsByListener()).toMatchObject({ listener1: 2, listener2: 2, listener3: 2 });
  });
});
