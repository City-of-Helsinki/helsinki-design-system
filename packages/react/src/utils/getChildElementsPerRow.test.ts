/* eslint-disable camelcase */

import { flatten } from 'lodash';

import { createFakeElement, createElementGrid } from './test-utils';
import { getChildElementsPerRow } from './getChildElementsPerRow';

describe("getChildElementsPerRow returns array of container's child elements per row", () => {
  const assignSiblingRefs = (grid: HTMLElement[][]) => {
    const getNextSibling = (rowIndex: number, elementIndex: number) => {
      const isLast = elementIndex === grid[rowIndex].length - 1;
      if (!isLast) {
        return grid[rowIndex][elementIndex + 1];
      }
      if (rowIndex === grid.length - 1) {
        return undefined;
      }
      return grid[rowIndex + 1][0];
    };
    grid.forEach((row, rowIndex) => {
      row.forEach((element, elementIndex) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        element.nextElementSibling = getNextSibling(rowIndex, elementIndex);
      });
    });
    return grid;
  };

  const gridOfFiveChildrenInFiveRows = assignSiblingRefs(createElementGrid(5, 5));
  const allChildren = flatten(gridOfFiveChildrenInFiveRows);
  const container = createFakeElement({}, allChildren);

  describe('All elements are returned row per row', () => {
    it('A new row is defined, when x-coords decrease and y-coords increase when traversing child elements', () => {
      expect(getChildElementsPerRow(container)).toMatchObject(gridOfFiveChildrenInFiveRows);
    });
    it('An element without children is processed', () => {
      const childlessContainer = createFakeElement({});
      expect(getChildElementsPerRow(childlessContainer)).toMatchObject([]);
    });
  });
  describe('Second argument (maxRows) can be used for skipping unnecessary checks', () => {
    it('The process stops when given number of rows are found', () => {
      expect(getChildElementsPerRow(container, 1)).toMatchObject([gridOfFiveChildrenInFiveRows[0]]);
      expect(getChildElementsPerRow(container, 2)).toMatchObject([
        gridOfFiveChildrenInFiveRows[0],
        gridOfFiveChildrenInFiveRows[1],
      ]);
      expect(getChildElementsPerRow(container, 1000)).toMatchObject(gridOfFiveChildrenInFiveRows);
    });
  });
});
