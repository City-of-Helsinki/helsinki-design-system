import {
  ElementType,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  HTMLProps,
  ImgHTMLAttributes,
} from 'react';

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

export function getAttributeMisMatches<T = HTMLElement>(
  getter: (key: string) => string | null,
  expectedAttributes: HTMLAttributes<T>,
) {
  const mismatches: string[] = [];
  const removeNonStyleChars = /[^(0-9a-z: )]/gi;
  Object.entries(expectedAttributes).forEach(([key, value]) => {
    const valueType = typeof value;
    // lowerCase conversion is mainly for tabIndex -> tabindex
    const attributeValue = getter(key) || getter(key.toLowerCase());
    if (valueType === 'undefined') {
      return;
    }
    if (valueType === 'boolean') {
      // <input required=""> matches required:true
      const attributeValueAsBoolean = attributeValue === 'false' ? false : attributeValue === '' || !!attributeValue;
      if (attributeValueAsBoolean !== value) {
        mismatches.push(`Attribute "${key}" value '${attributeValue}' mismatches expected value '${value}'`);
      }
    } else if (key === 'className') {
      if (!String(getter('class')).includes(value)) {
        mismatches.push(`Attribute "class" does not include '${value}'. Attribute has value '${getter('class')}'.`);
      }
    } else {
      const expectedValue =
        key !== 'style'
          ? String(value)
          : `${JSON.stringify(value).replace(removeNonStyleChars, '').replace(':', ': ')};`;

      if (expectedValue !== attributeValue) {
        mismatches.push(`Attribute "${key}" value '${attributeValue}' mismatches expected value '${expectedValue}'`);
      }
    }
  });
  return mismatches;
}

export function getElementAttributesMisMatches<T = HTMLElement>(
  elem: HTMLElement,
  expectedAttributes: HTMLAttributes<T>,
) {
  return getAttributeMisMatches((key) => elem.getAttribute(key), expectedAttributes);
}

export function getCommonElementTestProps<T extends ElementType = 'div', C = unknown>(
  elem: HTMLElement['nodeName'],
  extraTestAttributes?: AllElementPropsWithoutRef<T>,
): MergeAndOverrideProps<AllElementPropsWithoutRef<T>, C> {
  const nativeProps: {
    all: HTMLAttributes<HTMLElement> & CommonHTMLAttributes;
    div: HTMLAttributes<HTMLDivElement>;
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    // HTMLAttributes<HTMLInput> does not work properly.
    input: HTMLProps<'input'>;
    textarea: HTMLProps<'textarea'>;
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    img: ImgHTMLAttributes<HTMLImageElement>;
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
    textarea: {
      maxLength: 500,
      required: true,
    },
    a: {
      href: 'href',
      target: '_blank',
      rel: 'rel',
    },
    button: {
      type: 'button',
      name: 'buttonName',
    },
    img: {
      height: 100,
      width: 100,
      loading: 'lazy',
      useMap: '#mapName',
    },
  };
  return { ...nativeProps.all, ...nativeProps[elem.toLowerCase()], ...extraTestAttributes };
}
