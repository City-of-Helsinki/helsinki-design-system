/* eslint-disable import/no-cycle */
import Locale from 'date-fns/locale';
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
   * Label used for the previous month button in [[Navigation]]. Set it to
   * empty string to hide the button.
   */
  prevMonthLabel?: string;
  /**
   * Label used for the next month button in [[Navigation]]. Set it to empty
   * string to hide the button.
   */
  nextMonthLabel?: string;
  /**
   * Apply the `selected` modifiers to the matching days.
   */
  selected?: DayMatcher;
  /**
   * A locale object to localize
   * the user interface.
   */
  locale?: Locale;
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
