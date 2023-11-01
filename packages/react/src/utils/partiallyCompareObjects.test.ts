import { partiallyCompareObjects } from './partiallyCompareObjects';

describe("partiallyCompareObjects compares only object's key values", () => {
  const falsyValues = [null, undefined, 0, false];
  const truthyValues = [{}, 1, 'string', true, () => undefined, Symbol('a'), new Error('Ups'), NaN];
  const allValues = [...falsyValues, ...truthyValues];
  const objectWithAllValues = allValues.reduce<Record<string, unknown>>((target, value, index) => {
    if (!target) {
      return {};
    }
    // eslint-disable-next-line no-param-reassign
    target[`value${index}`] = value;
    return target;
  }, {});
  describe('returns true, when all source key/value pairs match target key/value pairs', () => {
    it('With all types of values', async () => {
      expect(partiallyCompareObjects({ key: NaN }, { key: NaN })).toBeTruthy();
      allValues.forEach((val) => {
        const symbolKey = Symbol('key');
        const source = { key: val, [symbolKey]: symbolKey };
        const target = { key: val, [symbolKey]: symbolKey };
        expect(partiallyCompareObjects(source, target)).toBeTruthy();
      });
      allValues.reduce((source, value, index) => {
        if (!source) {
          return {};
        }
        // eslint-disable-next-line no-param-reassign
        source[`value${index}`] = value;
        expect(partiallyCompareObjects(source, objectWithAllValues)).toBeTruthy();
        return source;
      }, {});
    });
    it('Also when keys are missing and value is undefined', async () => {
      expect(partiallyCompareObjects({ a: undefined, b: undefined }, {})).toBeTruthy();
    });
    it('With extra keys in target', async () => {
      allValues.forEach((val) => {
        const source = { key: val };
        const targetA = { key: val, a: val };
        const targetAB = { key: val, a: val, b: {} };
        expect(partiallyCompareObjects(source, targetA)).toBeTruthy();
        expect(partiallyCompareObjects(source, targetAB)).toBeTruthy();
      });
    });
    it('With deep objects', async () => {
      allValues.forEach((val) => {
        const level1 = { ...objectWithAllValues };
        const level0 = { ...objectWithAllValues, level1 };
        const target = { key: val, level0, level1, extra: { key: val } };
        const flatSource = { key: val };
        const level0Source = { level0 };
        const level1Source = { level1 };
        const allLevelsSource = { key: val, level0, level1, extra: { key: val } };
        expect(partiallyCompareObjects(flatSource, target)).toBeTruthy();
        expect(partiallyCompareObjects(level0Source, target)).toBeTruthy();
        expect(partiallyCompareObjects(level1Source, target)).toBeTruthy();
        expect(partiallyCompareObjects(allLevelsSource, target)).toBeTruthy();
      });
    });
  });
  describe('returns false, when all source key/value pairs does not match target key/value pairs', () => {
    it('With all other values', async () => {
      allValues.forEach((sourceValue) => {
        const source = { key: sourceValue };
        allValues.forEach((targetValue) => {
          // don't compare same values here
          if (sourceValue === targetValue) {
            return;
          }
          // Empty object would match another empty object and Error object
          if (typeof sourceValue === 'object' && sourceValue && Object.keys(sourceValue).length === 0) {
            return;
          }
          const target = { key: targetValue };
          // NaN === NaN is considered to be true, so skip it and compare to a number
          if (
            typeof sourceValue === 'number' &&
            typeof targetValue === 'number' &&
            Number.isNaN(sourceValue) &&
            Number.isNaN(targetValue)
          ) {
            expect(partiallyCompareObjects(source, { key: 1 })).toBeFalsy();
            return;
          }
          expect(partiallyCompareObjects(source, target)).toBeFalsy();
        });
      });
    });
    it('With extra keys in source', async () => {
      allValues.forEach((val) => {
        // undefined makes false positives when keys are absent
        if (val === undefined) {
          return;
        }
        const target = { key: val };
        const sourceA = { key: val, a: val };
        const sourceAB = { key: val, a: val, b: {} };
        expect(partiallyCompareObjects(sourceA, target)).toBeFalsy();
        expect(partiallyCompareObjects(sourceAB, target)).toBeFalsy();
      });
    });
    it('With deep objects', async () => {
      allValues.forEach((val) => {
        // undefined makes false positives when keys are absent
        if (val === undefined) {
          return;
        }
        const level1 = { ...objectWithAllValues };
        const level0 = { ...objectWithAllValues, level1 };
        const target = { key: val, level0, level1, extra: { key: val } };
        const flatSource = { key: val, wrongKey: val };
        const level0Source = { key: val, level0: { ...level0, wrong: val } };
        const level1Source = { key: val, level0, level1: { ...level1, wrong: val } };
        const allLevelsSource = { key: val, level0, level1, extra: { key: val }, wrong: val };
        expect(partiallyCompareObjects(flatSource, target)).toBeFalsy();
        expect(partiallyCompareObjects(level0Source, target)).toBeFalsy();
        expect(partiallyCompareObjects(level1Source, target)).toBeFalsy();
        expect(partiallyCompareObjects(allLevelsSource, target)).toBeFalsy();
      });
    });
  });
  describe('Comparing prototypes', () => {
    const enumerable = { enumerable: true };
    const errorLikeProto = { message: 'hello' };
    const errorLikeProperties = { message: { value: 'hello', ...enumerable } };
    const deepProtoA = { shallow: true, deep: { value: 'a' } };
    const deepProtoB = { shallow: true, deep: { value: 'b' } };

    const errorLikeObjectWithoutKeys = Object.create(errorLikeProto);
    const errorLikeObjectWithDifferentProto = Object.create({ foo: 'bar' }, errorLikeProperties);
    const deepObjectAWithErrorMatchingKeys = Object.create(deepProtoA, errorLikeProperties);
    const deepObjectBWithErrorMatchingKeys = Object.create(deepProtoB, errorLikeProperties);

    const deepObjectAWithDifferentMessage = Object.create(deepProtoA, {
      message: { value: 'deepObjectA', ...enumerable },
    });
    const deepObjectBWithDifferentMessage = Object.create(deepProtoB, {
      message: { value: 'deepObjectB', ...enumerable },
    });

    const deepObjectBWithMessageFromA = Object.create(deepProtoB, { message: { value: 'deepObjectA', ...enumerable } });
    const errorWithHello = new Error('hello');

    const optionsForProtoCheck = { compareSourcePrototype: true };
    it('If source has only prototype keys, it will match any object as Object.keys(source).length === 0', async () => {
      expect(partiallyCompareObjects(errorLikeObjectWithoutKeys, Object.create(deepProtoB))).toBeTruthy();
      expect(partiallyCompareObjects(Object.create(deepProtoA), Object.create(deepProtoB))).toBeTruthy();
      expect(partiallyCompareObjects(errorLikeObjectWithoutKeys, deepObjectBWithErrorMatchingKeys)).toBeTruthy();
    });
    it('Same proto does not result to a match', async () => {
      expect(partiallyCompareObjects(deepObjectAWithErrorMatchingKeys, deepObjectAWithDifferentMessage)).toBeFalsy();
      expect(partiallyCompareObjects(deepObjectBWithErrorMatchingKeys, deepObjectBWithDifferentMessage)).toBeFalsy();
    });
    it('If options.compareSourcePrototype is false, objects with matching non-proto keys will match', async () => {
      expect(partiallyCompareObjects(errorLikeObjectWithDifferentProto, errorWithHello)).toBeTruthy();
      expect(partiallyCompareObjects(deepObjectAWithErrorMatchingKeys, errorWithHello)).toBeTruthy();
      expect(partiallyCompareObjects(deepObjectBWithErrorMatchingKeys, errorWithHello)).toBeTruthy();
      expect(partiallyCompareObjects(deepObjectAWithErrorMatchingKeys, deepObjectBWithErrorMatchingKeys)).toBeTruthy();
      expect(partiallyCompareObjects(deepObjectAWithDifferentMessage, deepObjectBWithMessageFromA)).toBeTruthy();
    });
    it('If options.compareSourcePrototype is true, prototype keys are checked too', async () => {
      expect(
        partiallyCompareObjects(errorLikeObjectWithoutKeys, deepObjectBWithErrorMatchingKeys, optionsForProtoCheck),
      ).toBeFalsy();
      expect(
        partiallyCompareObjects(
          deepObjectAWithErrorMatchingKeys,
          deepObjectBWithErrorMatchingKeys,
          optionsForProtoCheck,
        ),
      ).toBeFalsy();
      expect(
        partiallyCompareObjects(deepObjectAWithDifferentMessage, deepObjectBWithMessageFromA, optionsForProtoCheck),
      ).toBeFalsy();
      expect(
        partiallyCompareObjects(errorLikeObjectWithDifferentProto, errorWithHello, optionsForProtoCheck),
      ).toBeFalsy();
    });
  });
});
