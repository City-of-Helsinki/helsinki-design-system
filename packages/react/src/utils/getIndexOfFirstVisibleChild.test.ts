/* eslint-disable camelcase */
import { flatten } from 'lodash';
import type { Writable } from 'type-fest';

import { getIndexOfFirstVisibleChild } from './getIndexOfFirstVisibleChild';
import { assignNewFakeElementChildren, createDomRect, createFakeElement, getRect } from './test-utils';

describe('getIndexOfFirstVisibleChild returns index of the last child that fits inside parents bounding box', () => {
  // note about rect naming:
  // "0x3_5x10" mean rect top left is at (0,3) and right bottom at (5,10)

  const defaultRowHeight = 10;
  const defaultColumnWidth = 10;

  /**
   * Creates a grid like structure of fake HTML elements
   */
  const createElementGrid = (rows: number, cols: number, spacingX = 0, spacingY = 0) => {
    const grid: HTMLElement[][] = [];
    for (let y = 0; y < rows; y += 1) {
      const column: HTMLElement[] = [];
      for (let xx = 0; xx < cols; xx += 1) {
        column.push(
          createFakeElement({
            width: defaultColumnWidth,
            height: defaultRowHeight,
            top: y * (defaultRowHeight + spacingY),
            left: xx * (defaultColumnWidth + spacingX),
          }),
        );
      }
      grid[y] = column;
    }
    return grid;
  };

  // A row of children expanding from top left 0,0 to right, bottom 50,10
  // size can be checked with createBoundingBoxToContainGivenBoxes(flatten(standardChildRow)));
  const gridOfFiveChildrenInRow_0x0_50x10 = createElementGrid(1, 5);

  const rect_98x18_100x20 = createDomRect({
    left: 98,
    top: 18,
    width: 2,
    height: 2,
  });
  const rect_80x10_82x12 = createDomRect({
    left: 80,
    top: 10,
    width: 2,
    height: 2,
  });
  const rect_0x0_100x10 = createDomRect({
    left: 0,
    top: 0,
    width: 100,
    height: 10,
  });
  const rect_10x10_20x100 = createDomRect({
    left: 10,
    top: 10,
    width: 10,
    height: 90,
  });
  const rect_12x12_20x20 = createDomRect({
    left: 12,
    top: 12,
    width: 8,
    height: 8,
  });
  const rect_30x0_50x20 = createDomRect({
    left: 30,
    top: 0,
    width: 20,
    height: 20,
  });
  const rect_35x0_45x10 = createDomRect({
    left: 35,
    top: 0,
    width: 10,
    height: 10,
  });

  const rect_0x0_50x50 = createDomRect({
    left: 0,
    top: 0,
    width: 50,
    height: 50,
  });
  const rect_0x0_100x100 = createDomRect({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  });

  const createFakeElementAndChildrenFromRects = (elementRect: DOMRect, childRects?: DOMRect[]) => {
    return createFakeElement(elementRect, childRects ? childRects.map((r) => createFakeElement(r)) : undefined);
  };

  const createDefaultElement = (childRects?: DOMRect[]) => {
    return createFakeElementAndChildrenFromRects(rect_0x0_50x50, childRects);
  };

  const createBoundingBoxToContainGivenRects = (rectsOrChildren: (HTMLElement | DOMRect)[]): Writable<DOMRect> => {
    const base = createDomRect({
      left: 0,
      top: 0,
      width: 1,
      height: 1,
    });
    rectsOrChildren.forEach((rectOrChild) => {
      const rect = getRect(rectOrChild);
      base.left = Math.min(base.left, rect.left);
      base.right = Math.max(base.right, rect.right);
      base.top = Math.min(base.top, rect.top);
      base.bottom = Math.max(base.bottom, rect.bottom);
    });
    base.width = Math.abs(base.right - base.left);
    base.height = Math.abs(base.bottom - base.top);
    return base;
  };

  const copyAndAdjustBoundingClientRect = (base: DOMRect, increment: Partial<DOMRect>): DOMRect => {
    const copy = { ...base };
    copy.left += increment.left || 0;
    copy.right += increment.right || 0;
    copy.top += increment.top || 0;
    copy.bottom += increment.bottom || 0;

    copy.width = Math.abs(copy.right - copy.left);
    copy.height = Math.abs(copy.bottom - copy.top);
    return copy;
  };

  const createElementWithOverflowingChild = (parentRect: DOMRect, increment: Partial<DOMRect>) => {
    const parent = createFakeElement(parentRect);
    const childRect = copyAndAdjustBoundingClientRect(parent.getBoundingClientRect(), increment);
    assignNewFakeElementChildren(parent, [childRect]);
    return parent;
  };

  describe("returns the index of the last child element that fully fits parent's boundingClientRect. By default all rect points are checked.", () => {
    it("When the parent's rect gets smaller from right side, child index decreases accordingly.", () => {
      const oneRowOf5Children = flatten(gridOfFiveChildrenInRow_0x0_50x10) as HTMLElement[];
      const rectToFit5Children = createBoundingBoxToContainGivenRects(oneRowOf5Children);
      const rectToFit0Children = createDomRect({ top: 0, left: 0, width: 9, height: 9 });
      const lastIndex = oneRowOf5Children.length - 1;
      oneRowOf5Children.forEach((d, index) => {
        const smallerRect = copyAndAdjustBoundingClientRect(rectToFit5Children, {
          right: -defaultColumnWidth * index,
        });
        expect(getIndexOfFirstVisibleChild(createFakeElement(smallerRect, oneRowOf5Children))).toBe(lastIndex - index);
      });

      expect(getIndexOfFirstVisibleChild(createFakeElement(rectToFit0Children, oneRowOf5Children))).toBe(-1);
    });
    it('Moving parent rect to the left does not change first found index, because last child is checked first.', () => {
      const oneRowOf5Children = flatten(gridOfFiveChildrenInRow_0x0_50x10) as HTMLElement[];
      const rectToFit5Children = createBoundingBoxToContainGivenRects(oneRowOf5Children);
      const rectToFit0Children = createDomRect({
        top: 0,
        left: rectToFit5Children.right + 1,
        width: defaultColumnWidth,
        height: defaultRowHeight,
      });
      const lastIndex = oneRowOf5Children.length - 1;
      oneRowOf5Children.forEach((d, index) => {
        const smallerRect = copyAndAdjustBoundingClientRect(rectToFit5Children, {
          left: -defaultColumnWidth * index,
        });
        expect(getIndexOfFirstVisibleChild(createFakeElement(smallerRect, oneRowOf5Children))).toBe(lastIndex);
      });

      expect(getIndexOfFirstVisibleChild(createFakeElement(rectToFit0Children, oneRowOf5Children))).toBe(-1);
    });
    it("When parent's rect changes size or position, child index changes.", () => {
      const gridRows = 3;
      const gridColumns = 3;
      const gridOfNineChildren_0x0_30x30 = createElementGrid(gridRows, gridColumns);
      const flatGridOfNineChildren_0x0_30x30 = flatten(gridOfNineChildren_0x0_30x30);
      const rectToFitAllChildren = createBoundingBoxToContainGivenRects(flatGridOfNineChildren_0x0_30x30);
      const rectToFitOneChild = createDomRect({
        width: defaultColumnWidth,
        height: defaultRowHeight,
      });

      // removes size of the bottom row from the rect on each iteration
      for (let y = 0; y < gridRows; y += 1) {
        const smallerRowRect = copyAndAdjustBoundingClientRect(rectToFitAllChildren, {
          bottom: -defaultRowHeight * y,
        });
        // visible index it always in column #2 (index 8,5,2)
        expect(getIndexOfFirstVisibleChild(createFakeElement(smallerRowRect, flatGridOfNineChildren_0x0_30x30))).toBe(
          gridRows * gridColumns - y * gridColumns - 1,
        );
      }
      // removes the size the right column from the rect on each iteration
      for (let xx = 0; xx < gridColumns; xx += 1) {
        const smallerColumnRect = copyAndAdjustBoundingClientRect(rectToFitAllChildren, {
          right: -defaultColumnWidth * xx,
        });
        // last indexes are always on the bottom row (index 8,7,6)
        expect(
          getIndexOfFirstVisibleChild(createFakeElement(smallerColumnRect, flatGridOfNineChildren_0x0_30x30)),
        ).toBe(gridRows * gridColumns - xx - 1);
      }

      // moves 10x10 rect one grid cell by one and grows another 10x10 rect by 10x10 on each iteration
      // at the end the moved react is at index 3,3 and the growing rect size is 30x30
      for (let y = 0; y < gridRows; y += 1) {
        for (let xx = 0; xx < gridColumns; xx += 1) {
          // moves the rect one grid pos at a time left->right, top->bottom
          const shiftedSingleElementRect = copyAndAdjustBoundingClientRect(rectToFitOneChild, {
            left: defaultColumnWidth * xx,
            right: defaultColumnWidth * xx,
            top: defaultRowHeight * y,
            bottom: defaultRowHeight * y,
          });
          expect(
            getIndexOfFirstVisibleChild(createFakeElement(shiftedSingleElementRect, flatGridOfNineChildren_0x0_30x30)),
          ).toBe(xx + y * gridColumns);
          // grows the grid rect one row and column at the time
          const growingGridRect = copyAndAdjustBoundingClientRect(rectToFitOneChild, {
            bottom: defaultRowHeight * y,
            right: defaultColumnWidth * xx,
          });
          // matches the shiftedSingleElementRect as their max right and bottom matches
          expect(
            getIndexOfFirstVisibleChild(createFakeElement(growingGridRect, flatGridOfNineChildren_0x0_30x30)),
          ).toBe(xx + y * gridColumns);
        }
      }
    });
    it('Element index matters more than position as elements are traversed in reverse order', () => {
      const createParentWith100x100Rect = (childArray: DOMRect[]) => {
        return createFakeElementAndChildrenFromRects(rect_0x0_100x100, childArray);
      };
      const childRowWithAlternatingSizes = [
        rect_0x0_100x10,
        rect_10x10_20x100,
        rect_12x12_20x20,
        rect_30x0_50x20,
        rect_35x0_45x10,
        rect_80x10_82x12,
        rect_98x18_100x20,
      ];
      // all items fit the parent, so last index is always returned
      const lastIndex = childRowWithAlternatingSizes.length - 1;
      // copy and move array items so that each is the first and last at least once
      childRowWithAlternatingSizes.forEach((e, index) => {
        const copy = [...childRowWithAlternatingSizes];
        copy.unshift(copy.splice(index, 1)[0]);
        expect(getIndexOfFirstVisibleChild(createParentWith100x100Rect(copy))).toBe(lastIndex);
        expect(getIndexOfFirstVisibleChild(createParentWith100x100Rect(copy.reverse()))).toBe(lastIndex);
      });
    });
  });

  describe('Second parameter (horizontal / vertical) affects tested rect', () => {
    const gridRows = 3;
    const gridColumns = 3;
    const gridOfNineChildren_0x0_30x30 = createElementGrid(gridRows, gridColumns);
    const flatGridOfNineChildren_0x0_30x30 = flatten(gridOfNineChildren_0x0_30x30);
    const rectToFitAllChildren = createBoundingBoxToContainGivenRects(flatGridOfNineChildren_0x0_30x30);

    it("When 'horizontal' is passed, only left/right points of the bounding rect are checked", () => {
      // removes the bottom row from rect on each iteration
      for (let y = 0; y < gridRows; y += 1) {
        const smallerRowRect = copyAndAdjustBoundingClientRect(rectToFitAllChildren, {
          bottom: -defaultRowHeight * y,
        });
        const element = createFakeElement(smallerRowRect, flatGridOfNineChildren_0x0_30x30);
        const verticalAndBothIndex = gridRows * gridColumns - y * gridColumns - 1;
        const maxIndex = gridRows * gridColumns - 1;
        // only "visible" items matter, so index is last visible bottom right as height changes
        expect(getIndexOfFirstVisibleChild(element)).toBe(verticalAndBothIndex);
        expect(getIndexOfFirstVisibleChild(element, 'vertical')).toBe(verticalAndBothIndex);
        // only x-coordinates matter, so index is always the last bottom right
        expect(getIndexOfFirstVisibleChild(element, 'horizontal')).toBe(maxIndex);
      }
    });
    it("When 'vertical' is passed, only top/bottom points of the bounding rect are checked", () => {
      // removes the right column on each iteration.
      for (let xx = 0; xx < gridColumns; xx += 1) {
        const smallerColumnRect = copyAndAdjustBoundingClientRect(rectToFitAllChildren, {
          right: -defaultColumnWidth * xx,
        });
        const element = createFakeElement(smallerColumnRect, flatGridOfNineChildren_0x0_30x30);
        const horizontalAndBothIndex = gridRows * gridColumns - xx - 1;
        const maxIndex = gridRows * gridColumns - 1;
        // only "visible" items matter, so index is last visible bottom right as width changes
        expect(getIndexOfFirstVisibleChild(element)).toBe(horizontalAndBothIndex);
        expect(getIndexOfFirstVisibleChild(element, 'horizontal')).toBe(horizontalAndBothIndex);
        // only y-coordinates matter, so index is always the last bottom right
        expect(getIndexOfFirstVisibleChild(element, 'vertical')).toBe(maxIndex);
      }
    });
  });
  describe('returns -1', () => {
    it('When given element has no children', () => {
      expect(getIndexOfFirstVisibleChild(createDefaultElement())).toBe(-1);
    });
    it('None of the children fits the element', () => {
      expect(getIndexOfFirstVisibleChild(createElementWithOverflowingChild(rect_0x0_50x50, { top: -1 }))).toBe(-1);
      expect(getIndexOfFirstVisibleChild(createElementWithOverflowingChild(rect_0x0_50x50, { left: -1 }))).toBe(-1);
      expect(
        getIndexOfFirstVisibleChild(createElementWithOverflowingChild(rect_0x0_50x50, { top: -1, left: -1 })),
      ).toBe(-1);
      expect(getIndexOfFirstVisibleChild(createElementWithOverflowingChild(rect_0x0_50x50, { right: 1 }))).toBe(-1);
      expect(getIndexOfFirstVisibleChild(createElementWithOverflowingChild(rect_0x0_50x50, { bottom: 1 }))).toBe(-1);
      expect(
        getIndexOfFirstVisibleChild(createElementWithOverflowingChild(rect_0x0_50x50, { bottom: 1, right: 1 })),
      ).toBe(-1);
    });
  });
});
