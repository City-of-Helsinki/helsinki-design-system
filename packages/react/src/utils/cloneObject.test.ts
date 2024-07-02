import { cloneObject, cloneWithJSONConversion } from './cloneObject';

describe('cloneObject helpers', () => {
  describe('cloneWithIterator()', () => {
    it('Clones an object', async () => {
      const source = { a: 1, b: undefined, deep: { value: 1, deepest: 'very deep' } };
      const jsonClone = cloneWithJSONConversion(source);
      const result = cloneObject(source);
      expect(result).toEqual(source);
      expect(result).toEqual(jsonClone);
      // modifying clone does not alter source
      Reflect.set(result, 'b', 2);
      Reflect.set(result.deep, 'value', 2);
      Reflect.set(result.deep, 'deepest', 'cloned deep');
      expect(source).toEqual(jsonClone);
    });
    it('Clones object with "entries()"', async () => {
      const source = new Headers();
      source.set('key1', 'value1');
      source.set('key2', 'value2');
      const expectedResult = { key1: 'value1', key2: 'value2' };
      const result = cloneObject(source);
      expect(result).toEqual(expectedResult);
    });
  });
});
