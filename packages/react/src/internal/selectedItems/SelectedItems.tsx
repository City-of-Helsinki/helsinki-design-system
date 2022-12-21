import React, { useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import uniqueId from 'lodash.uniqueid';
import { ResizeObserver } from '@juggle/resize-observer';

import styles from './SelectedItems.module.scss';
import { Tag } from '../../components/tag';
import classNames from '../../utils/classNames';
import { IconCrossCircle } from '../../icons';

type SelectedItemsProps<OptionType> = {
  /**
   * The index of the item that should be active and focused
   */
  activeIndex: number;
  /**
   * Additional class names to apply to the root element
   */
  className?: string;
  /**
   * Flag for whether the clear selections button should be displayed
   */
  clearable?: boolean;
  /**
   * The aria-label for the clear button
   */
  clearButtonAriaLabel?: string;
  /**
   * Dropdown ID
   */
  dropdownId: string;
  /**
   * Downshift selected item getter function
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getSelectedItemProps: any;
  /**
   * Flag for whether selected items that horizontally don't fit the container should be hidden
   */
  hideItems: boolean;
  /**
   * Callback function fired when the clear button is pressed.
   */
  onClear: () => void;
  /**
   * Callback function fired when the when an item is removed
   */
  onRemove: (selectedItem: OptionType) => void;
  /**
   * Sets the data item field that represents the item label
   */
  optionLabelField: string;
  /**
   * The aria-label for the remove button
   */
  removeButtonAriaLabel: string;
  /**
   * Selected items
   */
  selectedItems: OptionType[];
  /**
   * Selected items container ref
   */
  selectedItemsContainerRef: React.MutableRefObject<HTMLDivElement>;
  /**
   * Label for selected items that is only visible to screen readers. Can be used to to give screen reader users additional information about the selected item
   */
  selectedItemSrLabel?: string;
  /**
   * Downshift setActiveIndex function
   */
  setActiveIndex: (index: number) => void;
  /**
   * Whether the dropdown toggle button is hidden
   */
  toggleButtonHidden?: boolean;
};

/**
 * Replaces a token in the given string with a value
 * @param string  The string with the token that should be replaced
 * @param value   The value to replace the token with
 */
const replaceTokenWithValue = (string: string, value: string): string | undefined => string?.replace('{value}', value);

/**
 * Returns the horizontal spacing of an element
 * @param element   Element to get the spacing for
 * @param property  The type of spacing, margin or padding
 */
const getHorizontalSpacing = (element: Element, property: string): number => {
  if (!element) return 0;

  const longhandProperties = [`${property}-left`, `${property}-right`];
  const computedStyles = window.getComputedStyle(element);

  return (
    longhandProperties
      // get property values and remove 'px' from them
      .map((item) => computedStyles.getPropertyValue(item).replace('px', ''))
      // convert values to numbers and add them together
      .reduce((spacing, value) => spacing + parseInt(value, 10), 0)
  );
};

/**
 * Handles the hiding / showing of the selected items
 * @param childSpacing
 * @param containerEl
 * @param containerSpacing
 * @param hiddenCountEl
 * @param hideItems
 * @param setHiddenCount
 */
const handleItemHiding = (
  childSpacing: number,
  containerEl: HTMLDivElement,
  containerSpacing: number,
  hiddenCountEl: HTMLSpanElement,
  hideItems: boolean,
  setHiddenCount: React.Dispatch<React.SetStateAction<number>>,
): void => {
  const visibleItems: HTMLDivElement[] = [];
  const hiddenItems: HTMLDivElement[] = [];

  if (containerEl && hiddenCountEl) {
    // filter out the item count indicator from the container child nodes
    const childNodes = [...containerEl.childNodes].filter(
      (node: HTMLDivElement | HTMLSpanElement) => node.tagName === 'DIV',
    ) as HTMLDivElement[];
    containerEl.classList.remove(styles.truncateFirstChild);
    // width of the hidden item count indicator
    const hiddenCountWidth = hiddenCountEl.offsetWidth + childSpacing;
    // available container width
    const containerWidth = containerEl.offsetWidth - hiddenCountWidth - containerSpacing;
    // loop through all selected items and add their width together.
    // items whose combined width is less than that of the container element should be visible.
    // items that don't fit inside the container on one row should be hidden.
    [...childNodes].reduce((combinedChildWidth: number, child: HTMLDivElement) => {
      const childWidth = child.offsetWidth + childSpacing;
      combinedChildWidth + childWidth < containerWidth ? visibleItems.push(child) : hiddenItems.push(child);
      return combinedChildWidth + childWidth;
    }, 0);

    if (hideItems) {
      // if first item is too wide to show, no items are shown.
      // Fix is to show first item anyway, but add a css class to container, which will trucate first child's text
      if (!visibleItems.length && hiddenItems.length) {
        visibleItems.push(hiddenItems.shift());
        containerEl.classList.add(styles.truncateFirstChild);
      }
      // remove 'hidden' class from visible child nodes
      visibleItems.forEach((item) => item.classList.remove(styles.hidden));
      // add 'hidden' class to child nodes that should be hidden
      hiddenItems.forEach((item) => item.classList.add(styles.hidden));
      setHiddenCount(hiddenItems.length);
    } else {
      // remove 'hidden' class from child nodes
      [...childNodes].forEach((item) => item.classList.remove(styles.hidden));
    }
  }
};

type ClearButtonProps = {
  onClear: () => void;
  clearButtonAriaLabel: string;
  toggleButtonHidden?: boolean;
  onFocus?: () => void;
};

export const ClearButton = ({ toggleButtonHidden, onClear, clearButtonAriaLabel, onFocus }: ClearButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.clearButton, toggleButtonHidden && styles.noToggle)}
      onClick={onClear}
      aria-label={clearButtonAriaLabel}
      onFocus={onFocus && onFocus}
    >
      <IconCrossCircle />
    </button>
  );
};

export const SelectedItems = <OptionType,>({
  activeIndex,
  className,
  clearable = true,
  clearButtonAriaLabel,
  dropdownId,
  getSelectedItemProps,
  hideItems = false,
  onClear,
  onRemove,
  optionLabelField,
  removeButtonAriaLabel,
  selectedItems,
  selectedItemsContainerRef,
  selectedItemSrLabel,
  setActiveIndex,
  toggleButtonHidden = false,
}: SelectedItemsProps<OptionType>) => {
  const [ref, { width, height }] = useMeasure({ debounce: 0, scroll: false, polyfill: ResizeObserver });
  const [hiddenCount, setHiddenCount] = useState(0);
  const hiddenItemsCountRef = useRef<HTMLSpanElement>();
  const hiddenCountEl = hiddenItemsCountRef.current;
  const containerEl = selectedItemsContainerRef.current;

  const [containerSpacing, childSpacing] = useMemo(() => {
    if (!containerEl) return [0, 0];
    const childNodes = containerEl.childNodes || [];
    const container = getHorizontalSpacing(containerEl, 'padding');
    const child = getHorizontalSpacing(childNodes[0] as HTMLDivElement, 'margin');
    return [container, child];
  }, [containerEl]);

  useEffect(
    () => handleItemHiding(childSpacing, containerEl, containerSpacing, hiddenCountEl, hideItems, setHiddenCount),
    [
      childSpacing,
      containerEl,
      containerSpacing,
      height,
      hiddenCountEl,
      hideItems,
      selectedItems,
      setHiddenCount,
      width,
    ],
  );

  return (
    <>
      <div
        ref={mergeRefs<HTMLDivElement>([ref, selectedItemsContainerRef])}
        className={classNames(
          styles.selectedItems,
          hideItems && styles.itemsHidden,
          toggleButtonHidden && styles.noToggle,
          className,
        )}
      >
        {selectedItems.map((_selectedItem, index) => {
          const selectedItemLabel = _selectedItem[optionLabelField];
          const tagId = uniqueId('hds-tag-');

          return (
            <Tag
              key={selectedItemLabel}
              className={styles.tag}
              id={tagId}
              labelProps={{ 'aria-labelledby': `${dropdownId}-label ${tagId}-label` }}
              labelClassName={styles.tagLabel}
              role="button"
              deleteButtonAriaLabel={replaceTokenWithValue(removeButtonAriaLabel, selectedItemLabel)}
              // remove delete button from focus order
              deleteButtonProps={{
                tabIndex: -1,
              }}
              onDelete={(e) => {
                e.stopPropagation();
                onRemove(_selectedItem);
              }}
              srOnlyLabel={replaceTokenWithValue(selectedItemSrLabel, selectedItemLabel)}
              {...getSelectedItemProps({
                selectedItem: _selectedItem,
                index,
                onKeyDown: (event) => {
                  // some browsers navigate back when Backspace is pressed
                  if (event.key === 'Backspace') event.preventDefault();
                  // Add support to remove an item with an enter or a space keypress
                  else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onRemove(_selectedItem);
                  }
                },
                onFocus: () => setActiveIndex(index),
              })}
            >
              {selectedItemLabel}
            </Tag>
          );
        })}
        <span
          ref={hiddenItemsCountRef}
          className={classNames(styles.hiddenItemsCount, (!hideItems || hiddenCount === 0) && styles.hidden)}
        >
          +{hiddenCount}
        </span>
      </div>
      {/* CLEAR BUTTON */}
      {clearable && (
        <ClearButton
          toggleButtonHidden={toggleButtonHidden}
          onClear={onClear}
          clearButtonAriaLabel={clearButtonAriaLabel}
          onFocus={() => {
            // manually set the tabindex of the first selected item to "0",
            // when the clear button is focused, and the activeIndex is -1.
            // otherwise shift+tabbing back to the selected items won't work as they all have a tabindex value of -1
            if (activeIndex === -1) {
              (containerEl?.childNodes[0] as HTMLDivElement).setAttribute('tabindex', '0');
            }
          }}
        />
      )}
    </>
  );
};
