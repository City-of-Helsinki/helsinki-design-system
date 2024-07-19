import { ElementType, HTMLAttributes, HTMLProps } from 'react';

import { CommonHTMLAttributes } from './commonHTMLAttributes';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from './elementTypings';

export function getMockCalls(func: jest.Mock | jest.SpyInstance) {
  return func.mock ? func.mock.calls : [];
}

export function getAllMockCallArgs(func: jest.Mock | jest.SpyInstance) {
  const calls = getMockCalls(func);
  return calls.map((mockArgs) => mockArgs);
}

export function getMockCallArgs(func: jest.Mock | jest.SpyInstance, index = 0) {
  const calls = getMockCalls(func);
  return calls[index];
}

export function getLastMockCallArgs(func: jest.Mock | jest.SpyInstance) {
  const calls = getMockCalls(func);
  return getMockCallArgs(func, calls.length - 1);
}

export function filterMockCallArgs(func: jest.Mock | jest.SpyInstance, filter: (...args: unknown[]) => boolean) {
  const calls = getMockCalls(func);
  return calls.filter((call) => {
    return filter(...call);
  });
}

export function hasListenerBeenCalled(listener: jest.Mock) {
  return listener && getMockCalls(listener).length > 0;
}

export function getElementAttributesMisMatches<T = HTMLElement>(
  elem: HTMLElement,
  expectedAttributes: HTMLAttributes<T>,
) {
  const mismatches: string[] = [];
  const removeNonStyleChars = /[^(0-9a-z: )]/gi;
  Object.entries(expectedAttributes).forEach(([key, value]) => {
    const valueType = typeof value;
    const attributeValue = elem.getAttribute(key);
    if (valueType === 'undefined') {
      return;
    }
    if (valueType === 'boolean') {
      // <input required=""> matches required:true
      const attributeValueAsBoolean = attributeValue === '' || !!attributeValue;
      if (attributeValueAsBoolean !== value) {
        mismatches.push(`Attribute "${key}" value "${attributeValue}" mismatches expected value  ${value}.`);
      }
    } else if (key === 'className') {
      if (!String(elem.getAttribute('class')).includes(value)) {
        mismatches.push(
          `Attribute "class" does not include "${value}". Attribute has value "${elem.getAttribute('class')}".`,
        );
      }
    } else {
      const expectedValue =
        key !== 'style'
          ? String(value)
          : `${JSON.stringify(value).replace(removeNonStyleChars, '').replace(':', ': ')};`;

      if (expectedValue !== attributeValue) {
        mismatches.push(`Attribute "${key}" value "${attributeValue}" mismatches expected value  ${expectedValue}.`);
      }
    }
  });
  return mismatches;
}

export function getCommonElementTestProps<T extends ElementType = 'div', C = unknown>(
  elem: HTMLElement['nodeName'],
  extraTestAttributes?: AllElementPropsWithoutRef<T>,
): MergeAndOverrideProps<AllElementPropsWithoutRef<T>, C> {
  const nativeProps: {
    all: HTMLAttributes<HTMLElement> & CommonHTMLAttributes;
    div: HTMLAttributes<HTMLDivElement>;
    // HTMLAttributes<HTMLInput> does not work properly.
    input: HTMLProps<'input'>;
  } = {
    all: {
      'data-testid': 'testId',
      'data-hds-prop': 'hdsProp',
      style: { padding: '100px' },
      className: 'test-class-name',
      id: 'element-id',
      'aria-label': 'aria-label',
      'aria-describedby': 'aria-describedby',
      tabIndex: 100,
    },
    div: {},
    input: {
      maxLength: 10,
      pattern: '[A-Za-z]{3}',
      required: true,
    },
  };
  return { ...nativeProps.all, ...nativeProps[elem.toLowerCase()], ...extraTestAttributes };
}
