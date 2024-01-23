import { PropSetter, PropHandler } from '.';

/**
 *
 * propHandler calls the propSetter and also handles component.key and component.ref
 * Refs are stored so they can be fetched from anywhere with controller access.
 * Keys are used for remounting components when needed. It key changes, the component is remounted.
 *
 */

export function createPropHandler(propSetter: PropSetter): PropHandler {
  const elementKeys = new Map<string, string>();
  return {
    getProps: ({ id, controller, elementProps }) => {
      const storedKey = elementKeys.get(id);
      const props = propSetter({ id, controller, key: storedKey || '', elementProps }) || {};
      if (!props.key) {
        props.key = storedKey || id;
      }
      // Setting group/controller specific props to undefined will override the props given to the React component in JSX.
      // React.cloneElement always passes JSX props, so this will prevent them from being set to the element.
      Reflect.set(props, 'data-hds-group-id', undefined);
      return props;
    },
    updateKey: (id) => {
      elementKeys.set(id, `${id}_${Date.now()}`);
    },
  };
}
