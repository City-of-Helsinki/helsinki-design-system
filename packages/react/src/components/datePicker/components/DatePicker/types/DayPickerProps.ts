/* eslint-disable import/no-cycle */
import React from 'react';

import { DayMatcher } from './Modifiers';
import { DayPickerElements } from './DayPickerElements';

/**
 * An object defining the CSS class names for each [DayPicker
 * element](./enumerations#daypickerelements).
 */
export type DayPickerClassNames = {
  [name in DayPickerElements]?: string;
};
/**
 * An object defining the inline style for each [DayPicker
 * element](./enumerations#daypickerelements).
 */
export type DayPickerStyles = {
  [name in DayPickerElements]?: React.CSSProperties;
};

/**
 * Event handler when a day is clicked.
 */
export type DayClickEventHandler = (day: Date, e: React.MouseEvent) => void;

/**
 * Event handler when the month is changed.
 */
export type MonthChangeEventHandler = (month: Date, e: React.MouseEvent) => void;

/**
 * The props used by the [[DayPicker]] component.
 */
export interface DayPickerProps {
  /**
   * CSS class to add to the root element.
   */
  className?: string;
  confirmDate?: boolean;
  /**
   * Style to apply to the root element.
   */
  style?: React.CSSProperties;
  /**
   * The initial month to show in the calendar.
   */
  initialMonth?: Date;
  /**
   * Allow navigation after (and including) the specified month.
   *
   * @see toMonth
   */
  fromMonth?: Date;
  /**
   * Allow navigation before (and including) the specified month.
   *
   * @see fromMonth
   */
  toMonth?: Date;
  /**
   * The rendered month. Implement [[onMonthChange]] to enable months
   * navigation.
   */
  month?: Date;
  /**
   * Apply the `selected` modifiers to the matching days.
   */
  selected?: DayMatcher;
  /**
   * Language of the user interface
   */
  language?: 'en' | 'fi' | 'sv';
  selectButtonLabel: string;
  closeButtonLabel: string;
  /**
   * Event handler when the user clicks on a day.
   */
  onDaySelect?: DayClickEventHandler;
  /**
   * Event handler when the month changes.
   */
  onMonthChange?: MonthChangeEventHandler;
  /**
   * Event handler when the next month button is clicked.
   */
  onNextClick?: MonthChangeEventHandler;
  /**
   * Event handler when the previous month button is clicked.
   */
  onPrevClick?: MonthChangeEventHandler;
  /**
   * Event handler for the close button
   */
  onCloseButtonClick: React.MouseEventHandler;
}
