import { createStorage } from './storage';

describe(`storage`, () => {
  type ResultObject = typeof data & typeof newValues & typeof partialNewValues;
  const data = {
    strProp: 'prop',
    dataProp: {
      hello: 'there',
    },
    numProp: 1,
    objProp: {
      childProp: {
        value: '1',
      },
    },
    arrProp: [{ prop: 'arrProp' }],
  };
  const newValues = {
    strProp: 'newprop',
    numProp: -1,
    newValuesProp: {
      foo: 'bar',
    },
    objProp: {
      newChildProp: {
        newValue: '1',
      },
    },
    arrProp: [{ newProp: 'newArrProp' }],
    arrProp2: [{ newProp: 'newArrProp2' }],
  };
  const partialNewValues = {
    objProp: {
      newObjProp: {
        newValue: '100',
      },
    },
    arrProp: [{ newProp: 'partialArrProp' }],
    arrProp2: [{ newProp: 'partialArrProp2' }],
    arrProp3: [{ newProp: 'partialProp3' }],
  };
  it(`stores initial data as a shallow copy. Get() returns data.`, async () => {
    const storage = createStorage(data);
    expect(storage.get()).toMatchObject(data);
    expect(storage.get()).not.toBe(data);
    expect((storage.get() as ResultObject).objProp).toBe(data.objProp);
  });
  it(`get() returns given data[id]`, async () => {
    const storage = createStorage(data);
    expect(storage.get()).toMatchObject(data);
  });
  it(`set(data) updates data by merging old and new`, async () => {
    const storage = createStorage(data);
    const originalData = storage.get();
    storage.set(newValues);
    expect(storage.get()).not.toBe(originalData);
    expect(storage.get()).toMatchObject({ ...data, ...newValues });

    storage.set(partialNewValues);
    const current = storage.get() as ResultObject;
    expect(current).toMatchObject({ ...data, ...newValues, ...partialNewValues });
    // original data props still exist
    expect(current.dataProp).toMatchObject(data.dataProp);
    expect(current.newValuesProp).toMatchObject(newValues.newValuesProp);

    // merge affects all matching props
    expect(current.objProp).toMatchObject(partialNewValues.objProp);

    expect(current.objProp.newObjProp).toBe(partialNewValues.objProp.newObjProp);

    // overwritten objects lose props
    expect(current.objProp.newChildProp).toBeUndefined();
    expect(current.arrProp).toMatchObject(partialNewValues.arrProp);
    expect(current.arrProp2).toMatchObject(partialNewValues.arrProp2);
    expect(current.arrProp3).toMatchObject(partialNewValues.arrProp3);
  });
  it(`updating does not affect original data`, async () => {
    const source = {
      a: {
        b: {
          c: 'c',
        },
      },
      aa: { bb: 'bb' },
    };
    const clone = JSON.parse(JSON.stringify(source));
    const storage = createStorage(data);
    storage.set({ a: { b: { c: null } } });
    expect(source).toMatchObject(clone);
    storage.set({ a: null });
    storage.set({ aa: null });
    expect(source).toMatchObject(clone);
  });
});
