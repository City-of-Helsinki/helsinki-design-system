import React, { useState } from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';

import { useModalPlaceHolder } from './useModalPlaceHolder';
import { clickElement } from './test.util';

const testIds = {
  observer: 'ObserverElement',
  observed: 'ObservedElement',
  addButton: 'AddButton',
  removeAllButton: 'RemoveAllButton',
  placeHolder: 'html-cookie-consent-placeholder',
  existingPlaceHolder: 'existing-placeholder',
  updateButton: 'updateButton',
};

const placeHolderId = 'HdsCookieConsentModalPlaceholder';

const currentRect: DOMRect = {
  width: 0,
  height: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};

const heightIncrement = 20;

jest.spyOn(window.HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(currentRect);

const mockBoundingClientRectHeight = (newHeight: number) => {
  currentRect.height = newHeight;
};

const renderElements = (renderProps: { containerExists?: boolean } = {}): RenderResult => {
  const PlaceHolder = () => {
    return <div id={placeHolderId} data-testid={testIds.existingPlaceHolder} />;
  };

  const ObservedComponent = (props: { listener: React.Ref<HTMLElement> }) => {
    const { listener } = props;
    const [elementList, updateElementCount] = useState<number[]>([]);
    const onClick = () => {
      updateElementCount((list) => {
        mockBoundingClientRectHeight((list.length + 1) * heightIncrement);
        return [...list, list.length];
      });
    };

    return (
      <div data-testid={testIds.observed} ref={listener as React.Ref<HTMLDivElement>}>
        <div>
          {elementList.map((number) => {
            return (
              <div data-testid={`list-item-${number}`} key={number}>
                Item {number}
              </div>
            );
          })}
        </div>
        <button data-testid={testIds.addButton} type="button" onClick={onClick}>
          Add an element
        </button>
      </div>
    );
  };

  const ObserverComponent = () => {
    const [isOpen, setIsOpen] = useState(true);
    const onClick = () => {
      setIsOpen(false);
    };
    const elementRef = useModalPlaceHolder();
    if (!isOpen) {
      return null;
    }
    return (
      <div data-testid={testIds.observer}>
        <ObservedComponent listener={elementRef} />
        <button data-testid={testIds.removeAllButton} type="button" onClick={onClick}>
          Render null, please.
        </button>
      </div>
    );
  };

  const result = render(
    <span>
      <ObserverComponent />
      {renderProps.containerExists && <PlaceHolder />}
      <div>Last element until placeholder is added.</div>
    </span>,
  );

  return result;
};

const getElementHeightInStyle = (element: HTMLElement): number => {
  return parseInt(window.getComputedStyle(element).height, 10);
};

const getHeightDiff = (source: HTMLElement, placeHolder: HTMLElement): number => {
  const sourceHeight = source.getBoundingClientRect().height;
  const placeHolderHeight = getElementHeightInStyle(placeHolder);
  return sourceHeight - placeHolderHeight;
};

beforeEach(() => {
  mockBoundingClientRectHeight(0);
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('useModalPlaceHolder ', () => {
  describe('creates a placeholder element', () => {
    it('and matches its height to the observed element height every time element change is detected', async () => {
      const result = renderElements();
      expect(() => result.getByTestId(testIds.observer)).not.toThrow();
      const observed = result.getByTestId(testIds.observed);
      const placeHolder = result.getByTestId(testIds.placeHolder);
      clickElement(result, testIds.addButton);
      await waitFor(() => {
        result.getByTestId('list-item-0');
      });
      expect(getHeightDiff(observed, placeHolder)).toBe(0);
      clickElement(result, testIds.addButton);
      await waitFor(() => {
        result.getByTestId('list-item-1');
      });
      expect(getHeightDiff(observed, placeHolder)).toBe(0);
      expect(getElementHeightInStyle(placeHolder)).toBe(heightIncrement * 2);
    });
    it('created element is added as the last element in dom', async () => {
      const result = renderElements();
      expect(() => result.getByTestId(testIds.observer)).not.toThrow();
      const placeHolder = result.getByTestId(testIds.placeHolder);
      expect(placeHolder).toBe(result.baseElement.lastChild);
    });
  });
  describe('does not create the placeholder if it exists', () => {
    it('but the placeholder height is matched with observed element', async () => {
      const result = renderElements({ containerExists: true });
      const placeHolder = result.getByTestId(testIds.existingPlaceHolder);
      const observed = result.getByTestId(testIds.observed);
      clickElement(result, testIds.addButton);
      clickElement(result, testIds.addButton);
      clickElement(result, testIds.addButton);
      await waitFor(() => {
        result.getByTestId('list-item-2');
      });
      expect(getHeightDiff(observed, placeHolder)).toBe(0);
      expect(getElementHeightInStyle(placeHolder)).toBe(heightIncrement * 3);
    });
  });
  describe('placeholder is removed on unmount', () => {
    it('the existing element is removed', async () => {
      const result = renderElements();
      expect(() => result.getByTestId(testIds.placeHolder)).not.toThrow();
      clickElement(result, testIds.removeAllButton);
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.observer)).toThrow();
        expect(() => result.getByTestId(testIds.placeHolder)).toThrow();
      });
    });
    it('the created element is removed', async () => {
      const result = renderElements({ containerExists: true });
      expect(() => result.getByTestId(testIds.existingPlaceHolder)).not.toThrow();
      clickElement(result, testIds.removeAllButton);
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.observer)).toThrow();
        expect(() => result.getByTestId(testIds.existingPlaceHolder)).toThrow();
      });
    });
  });
});
