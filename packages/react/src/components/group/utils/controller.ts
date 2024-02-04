import { Controller, ControllerProps } from '.';
import { createPropHandler } from './propHandler';
import { createStorage, StorageData } from './storage';

/**
 *
 * Controller for all Group's data and events.
 *
 */

export function createController({
  reRenderer,
  propSetter,
  initialData,
  onChange,
  metaData,
}: ControllerProps): Controller {
  const storage = createStorage(initialData);
  const meta = createStorage(metaData || {});
  const propHandler = createPropHandler(propSetter);
  return {
    getProps(props) {
      return propHandler.getProps({ ...props, controller: this });
    },
    getData() {
      return storage.get();
    },
    updateData({ data, updateKeys }) {
      const updatedData = storage.set(data);
      if (updateKeys && updateKeys.length) {
        updateKeys.forEach((id) => {
          propHandler.updateKey(id);
        });
      }
      reRenderer();
      return updatedData;
    },
    triggerChange(props) {
      return onChange({ ...props, controller: this });
    },
    getMetaData() {
      return meta.get() as StorageData;
    },
    updateMetaData(newData: StorageData) {
      return meta.set(newData);
    },
  };
}
