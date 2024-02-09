import React, { ReactNode } from 'react';

import { TextInput } from '../textInput/TextInput';
import { Button } from '../button/Button';
import {
  ChangeHandlerProps,
  Controller,
  GroupChild,
  GroupChildFunction,
  GroupProps,
  HTMLElementAttributesWithChildren,
} from './utils';
import { Group, RenderWithController } from './Group';
import { createOnClickListener, createInputOnChangeListener } from './utils/propSetterHelpers';
import { IconArrowDown, IconArrowUp } from '../../icons';
import { ForwardController } from './utils/forwardController';

export default {
  component: Group,
  title: 'Components/Group',
};

export const Example = () => {
  const pickData = (id: keyof typeof props.initialData, controller: Controller) => {
    const data = controller.getData() as typeof props.initialData;
    return data[id];
  };
  const props: GroupProps<{ value: string }> = {
    initialData: { text: 'initial text', reverse: 'reverse', otherProp: 'hello world' },
    onChange: (change: ChangeHandlerProps) => {
      const { controller, id, payload } = change;
      controller.updateData({ data: { [id]: String(payload && payload.value) || '' } });
    },
    propSetter: (propSetterProps) => {
      const { id, controller } = propSetterProps;

      return id === 'reverse'
        ? {
            value: String(pickData('text', controller) || '')
              .split('')
              .reverse()
              .join(''),
          }
        : {
            ...createInputOnChangeListener(propSetterProps),
            value: String(pickData(id, controller)) || '',
          };
    },
  };

  const JoinedValues: GroupChildFunction = ({ controller }: { controller: Controller }) => {
    const allProps = Object.values(controller.getData() as Record<string, string>).join('+');
    return <p>All data joined: {allProps}</p>;
  };

  return (
    <Group {...props}>
      <TextInput id="text" key="text" label="Input" />
      <TextInput label="Reversed input:" disabled id="reverse" data-hds-group-id="reverse" key="rev" />
      {({ controller }) => {
        return <JoinedValues controller={controller} />;
      }}
    </Group>
  );
};

Example.parameters = {
  loki: { skip: true },
};

export const NumericStepper = () => {
  const pickData = (id: keyof typeof props.initialData, controller: Controller) => {
    const data = controller.getData() as typeof props.initialData;
    return data[id];
  };
  const props: GroupProps<HTMLElementAttributesWithChildren & { value?: string }> = {
    initialData: { value: 1, max: 500, min: -5, error: '' },

    onChange: (change: ChangeHandlerProps) => {
      const { controller, payload, id, type } = change;
      const { value, min, max } = controller.getData() as { value: string; min: number; max: number; error: string };
      const resolveNewValue = () => {
        if (type !== 'click') {
          return parseInt(String((payload && payload.value) || '0'), 10);
        }
        const diff = id === 'increment' ? 1 : -1;
        return parseInt(value, 10) + diff;
      };
      const resolveErrorMessage = (newValue) => {
        if (newValue > max) {
          return `Max is ${max}`;
        }
        if (newValue < min) {
          return `Min is ${min}`;
        }
        return ``;
      };
      const newValue = resolveNewValue();

      controller.updateData({
        data: {
          error: resolveErrorMessage(newValue),
          value: Math.max(Math.min(newValue, max), min),
        },
        updateKeys: [],
      });
    },

    propSetter: (propSetterProps) => {
      const { id, controller, elementProps } = propSetterProps;
      if (id === 'value') {
        return {
          ...createInputOnChangeListener(propSetterProps),
          value: String(pickData(id, controller)) || '',
        };
      }
      if (id === 'error') {
        return { children: (pickData(id, controller) || '') as ReactNode };
      }
      return {
        ...elementProps,
        ...createOnClickListener(propSetterProps),
      };
    },
  };

  const Error: GroupChild = ({ children }) => {
    return <p>{children}</p>;
  };
  return (
    <Group {...props}>
      <TextInput id="value" />
      <Button id="decrement">-</Button>
      <Button id="increment">+</Button>
      <Error id="error" />
    </Group>
  );
};

NumericStepper.parameters = {
  loki: { skip: true },
};

export const Accordion = () => {
  const props: GroupProps = {
    initialData: { open: false, title: 'Accordion title' },

    onChange: (change: ChangeHandlerProps) => {
      const { controller, payload, type, id } = change;
      if (type === 'toggle-open') {
        controller.updateData({ data: { open: payload && payload.value } });
      }
      if (id === 'inner-close-button') {
        controller.updateData({ data: { open: false } });
      }
    },

    propSetter: (propSetterProps) => {
      const { id } = propSetterProps;
      if (id === 'title' || id === 'inner-close-button') {
        return createOnClickListener(propSetterProps);
      }
      return {};
    },
  };

  const Title = ForwardController((titleProps, forwardedController) => {
    const data = forwardedController.getData() as Record<string, unknown>;
    const title = data[titleProps.id as string] as string;
    const onClick = () => {
      forwardedController.triggerChange({ id: 'title-button', type: 'toggle-open', payload: { value: !data.open } });
    };
    const Icon = data.open ? IconArrowUp : IconArrowDown;
    return (
      <div>
        <Button variant="supplementary" iconRight={<Icon />} onClick={onClick}>
          {title}
        </Button>
      </div>
    );
  });

  const ToggledContent = ForwardController((titleProps, forwardedController) => {
    const data = forwardedController.getData() as Record<string, unknown>;
    const isOpen = !!data.open as boolean;
    if (!isOpen) {
      return null;
    }
    return (
      <div>
        {titleProps.children}
        <RenderWithController controller={forwardedController}>
          <Button variant="secondary" id="inner-close-button">
            Close
          </Button>
        </RenderWithController>
      </div>
    );
  });

  return (
    <Group {...props}>
      <Title id="title" />
      <ToggledContent>
        <p>Content</p>
      </ToggledContent>
    </Group>
  );
};

Accordion.parameters = {
  loki: { skip: true },
};
