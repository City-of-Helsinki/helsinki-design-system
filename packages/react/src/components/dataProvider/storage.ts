/**
 *
 *  Simple storage for getting/setting data.
 *  Data is not mutated, a new object is always created.
 *
 * */

export type StorageData = Record<string, unknown>;
export type Storage<D = StorageData> = {
  set: (newData: D) => D;
  get: () => D;
};

export function createStorage(initialData: StorageData): Storage {
  let data = { ...initialData };
  const setter: Storage['set'] = (newData) => {
    data = {
      ...data,
      ...newData,
    };
    return data;
  };
  const getter: Storage['get'] = () => {
    return data;
  };
  return {
    get: getter,
    set: setter,
  };
}
