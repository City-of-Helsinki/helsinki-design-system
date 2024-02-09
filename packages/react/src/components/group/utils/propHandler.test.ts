import { Controller, HTMLElementAttributesWithChildren, PropSetter } from '.';
import { createPropHandler } from './propHandler';

describe(`propHandler handles component props, keys and refs`, () => {
  let nextKey: string | undefined;
  let nextRef: { current: string } | undefined;
  let currentProps: Record<string, unknown> = {};
  const fakeController = ({} as unknown) as Controller;
  const defaultProps = {
    id: 'primary_id',
    controller: fakeController,
    elementProps: { attributeY: 'value' } as HTMLElementAttributesWithChildren,
  };
  const secondaryProps = {
    id: 'second_id',
    controller: fakeController,
    elementProps: { attributeX: 'value' } as HTMLElementAttributesWithChildren,
  };
  const propSetterTracker = jest.fn();
  const propSetter: PropSetter = ({ id, controller, elementProps }) => {
    propSetterTracker(id, controller, elementProps);
    const props: Record<string, unknown> = { id, controller, elementProps, ...currentProps };
    if (nextKey) {
      props.key = nextKey;
    }
    if (nextRef) {
      props.ref = nextRef;
    }
    return props;
  };
  const createRef = (id: string) => {
    return { current: `ref_for_${id}` };
  };
  afterEach(() => {
    jest.clearAllMocks();
    nextKey = undefined;
    nextRef = undefined;
    currentProps = {};
  });
  describe(`getProps`, () => {
    it(`Calls the given propSetter with controller, given id and props passed to the component.`, () => {
      const propHandler = createPropHandler(propSetter);
      propHandler.getProps(defaultProps);
      expect(propSetterTracker).toHaveBeenCalledTimes(1);
      expect(propSetterTracker).toHaveBeenCalledWith(defaultProps.id, fakeController, defaultProps.elementProps);
      propHandler.getProps({ ...defaultProps, id: secondaryProps.id });
      expect(propSetterTracker).toHaveBeenCalledTimes(2);
      expect(propSetterTracker).toHaveBeenCalledWith(secondaryProps.id, fakeController, defaultProps.elementProps);
      propHandler.getProps({ ...defaultProps, id: 'id3' });
      expect(propSetterTracker).toHaveBeenCalledTimes(3);
      expect(propSetterTracker).toHaveBeenCalledWith('id3', fakeController, defaultProps.elementProps);
    });
    it(`Returns all given props`, () => {
      const propHandler = createPropHandler(propSetter);
      currentProps = { ariaLabel: 'label', class: 'class' };
      nextKey = 'newKey';
      nextRef = createRef('any');
      expect(propHandler.getProps(defaultProps)).toMatchObject({
        ...defaultProps,
        ...currentProps,
        key: nextKey,
        ref: nextRef,
      });
    });
    it(`A key is always added to the props. It is the given id by default`, () => {
      const propHandler = createPropHandler(propSetter);
      expect(propHandler.getProps(defaultProps).key).toBe(defaultProps.id);
      expect(propHandler.getProps({ ...defaultProps, id: secondaryProps.id }).key).toBe(secondaryProps.id);
    });
    it(`If the propSetter returns a key, then it is used as a key for that single time.`, () => {
      const propHandler = createPropHandler(propSetter);
      nextKey = 'testKey';
      expect(propHandler.getProps(defaultProps)).toMatchObject({
        ...defaultProps,
        key: nextKey,
      });
      nextKey = undefined;
      expect(propHandler.getProps(defaultProps)).toMatchObject({
        ...defaultProps,
        key: defaultProps.id,
      });
    });
  });
  describe(`updateKey`, () => {
    it(`Updates a key by id, so the component is re-rendered when group updates. New key is the id with a timestamp`, () => {
      const propHandler = createPropHandler(propSetter);
      propHandler.getProps(defaultProps);
      const firstProps = propHandler.getProps(defaultProps);
      expect(firstProps.key).toBe(defaultProps.id);
      propHandler.updateKey(defaultProps.id);
      const secondProps = propHandler.getProps(defaultProps);
      expect(secondProps.key).not.toBe(defaultProps.id);
      expect(secondProps.key?.startsWith(`${defaultProps.id}_`)).toBeTruthy();
    });
    it(`Once given, the given key is used until updated again unless propSetter returns another one.`, () => {
      const propHandler = createPropHandler(propSetter);
      propHandler.updateKey(defaultProps.id);
      const { key } = propHandler.getProps(defaultProps);
      expect(key).not.toBe(defaultProps.id);
      expect(propHandler.getProps(defaultProps).key).toBe(key);
      nextKey = 'key2';
      expect(propHandler.getProps(defaultProps).key).toBe(nextKey);
      nextKey = undefined;
      expect(propHandler.getProps(defaultProps).key).toBe(key);
    });
  });
});
