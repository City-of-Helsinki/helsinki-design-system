import { DefaultGroupElementProps, PropSetter } from '.';
import { sleep } from '../../../utils/testHelpers';
import { createController } from './controller';

describe(`controller`, () => {
  const initialData = { key: 'value' };
  const metaData = { meta: 'value' };
  const elementProps = { id: 'element-id', class: 'style' };
  const mockedProps = { prop: 'value', key: 'key', ref: { current: {} } };
  const defaultId = 'id';
  const onChange = jest.fn();
  const reRenderer = jest.fn();
  const propSetter = jest.fn().mockReturnValue(mockedProps);
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe(`getData() `, () => {
    it(`returns initial data until updated`, () => {
      const controller = createController({ initialData, reRenderer, propSetter, onChange });
      expect(controller.getData()).toMatchObject(initialData);
    });
  });
  describe(`getProps() `, () => {
    it(`calls the passed propSetter with id and original props passed to the element.`, () => {
      const controller = createController({ initialData, reRenderer, propSetter, onChange });
      expect(controller.getProps({ id: defaultId, elementProps })).toBe(mockedProps);
      expect(propSetter).toHaveBeenCalledWith({ id: defaultId, controller, key: '', elementProps });
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(reRenderer).toHaveBeenCalledTimes(0);
    });
  });
  describe(`triggerChange() `, () => {
    it(`calls the onChange-function with id, payload and controller instance`, () => {
      const controller = createController({ initialData, reRenderer, propSetter, onChange });
      const payload = { value: 'value' };
      controller.triggerChange({ id: defaultId, payload });
      expect(onChange).toHaveBeenCalledWith({ id: defaultId, payload, controller });
      expect(propSetter).toHaveBeenCalledTimes(0);
      expect(reRenderer).toHaveBeenCalledTimes(0);
    });
  });
  describe(`updateData() updates stored data and calls reRender(). Original data is not mutated.`, () => {
    const multiData = {
      key1: 'key1',
      key2: ['key2'],
      key3: {
        key: '3',
      },
      someKey: null,
      someOtherKey: 'hello',
    };
    const clone = JSON.parse(JSON.stringify(multiData));
    it(`updates only given part of data`, () => {
      const controller = createController({ initialData: multiData, metaData, reRenderer, propSetter, onChange });
      const newKey1 = 'newKey1';
      expect(controller.getData()).toMatchObject(multiData);
      controller.updateData({ data: { key1: newKey1 } });
      expect(controller.getData()).toMatchObject({ ...multiData, key1: newKey1 });

      const newKey2 = ['newKey2'];
      controller.updateData({ data: { key2: newKey2 } });
      expect(controller.getData()).toMatchObject({ ...multiData, key1: newKey1, key2: newKey2 });

      const newKey3 = undefined;
      controller.updateData({ data: { key3: newKey3 } });
      expect(controller.getData()).toMatchObject({ ...multiData, key1: newKey1, key2: newKey2, key3: newKey3 });

      expect(onChange).toHaveBeenCalledTimes(0);
      expect(propSetter).toHaveBeenCalledTimes(0);
      expect(reRenderer).toHaveBeenCalledTimes(3);
      expect(multiData).toMatchObject(clone);
      expect(controller.getMetaData()).toMatchObject(metaData);
    });
    it(`the third argument (updateKeys) resets stored keys for given ids which forces component to re-mount.`, async () => {
      const propSetterWithoutKeys: PropSetter = () => {
        return { prop: 'values' } as DefaultGroupElementProps;
      };
      const controller = createController({
        initialData: multiData,
        reRenderer,
        propSetter: propSetterWithoutKeys,
        onChange,
      });
      expect(controller.getProps({ id: 'key1', elementProps: {} }).key).toBe('key1');

      controller.updateData({ data: { key1: 'anyvValue' }, updateKeys: ['key1'] });
      const newProps = [
        controller.getProps({ id: 'key1', elementProps: {} }),
        controller.getProps({ id: 'key2', elementProps: {} }),
        controller.getProps({ id: 'key3', elementProps: {} }),
      ];
      expect(newProps[0].key).not.toBe('key1');
      expect(newProps[1].key).toBe('key2');
      expect(newProps[2].key).toBe('key3');

      // New keys are timestamped.
      // Sleep a while to make sure timestamp changes on fast machines
      await sleep(20);

      controller.updateData({ data: { key1: 'anyvValue' }, updateKeys: ['key1', 'key2'] });
      const updatedProps = [
        controller.getProps({ id: 'key1', elementProps: {} }),
        controller.getProps({ id: 'key2', elementProps: {} }),
        controller.getProps({ id: 'key3', elementProps: {} }),
      ];
      expect(updatedProps[0].key).not.toBe(newProps[0].key);
      expect(updatedProps[1].key).not.toBe(newProps[1].key);
      expect(updatedProps[2].key).toBe(newProps[2].key);

      await sleep(20);

      controller.updateData({ data: { key1: 'value' }, updateKeys: ['key3'] });
      const lastProps = [
        controller.getProps({ id: 'key1', elementProps: {} }),
        controller.getProps({ id: 'key2', elementProps: {} }),
        controller.getProps({ id: 'key3', elementProps: {} }),
      ];
      expect(lastProps[0].key).toBe(updatedProps[0].key);
      expect(lastProps[1].key).toBe(updatedProps[1].key);
      expect(lastProps[2].key).not.toBe(updatedProps[2].key);

      await sleep(20);
    });
  });
  describe(`getMetaData() `, () => {
    it(`returns initial metadata until updated`, () => {
      const controller = createController({ initialData, reRenderer, propSetter, onChange, metaData });
      expect(controller.getMetaData()).toMatchObject(metaData);
    });
  });
  describe(`updateMetaData() updates only metadata and does not call reRender(). Original data is not mutated.`, () => {
    const newMetaData = {
      metaProp: { foo: 'bar' },
      deepObj: {
        deepValue: 1,
      },
    };
    const clone = JSON.parse(JSON.stringify(newMetaData));
    it(`updates only given part of data`, () => {
      const controller = createController({ initialData, metaData: newMetaData, reRenderer, propSetter, onChange });
      expect(controller.getMetaData()).toMatchObject(newMetaData);

      controller.updateMetaData({ deepObj: 2 });
      expect(controller.getMetaData()).toMatchObject({ ...newMetaData, deepObj: 2 });
      controller.updateMetaData({ metaProp: null });
      expect(controller.getMetaData()).toMatchObject({ deepObj: 2, metaProp: null });

      expect(onChange).toHaveBeenCalledTimes(0);
      expect(propSetter).toHaveBeenCalledTimes(0);
      expect(reRenderer).toHaveBeenCalledTimes(0);
      expect(newMetaData).toMatchObject(clone);
      expect(controller.getData()).toMatchObject(initialData);
    });
  });
});
