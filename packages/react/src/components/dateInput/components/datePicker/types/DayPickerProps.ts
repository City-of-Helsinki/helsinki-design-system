/* eslint-disable import/no-cycle */
import React from 'react';

/**
 * Event handler when a day is clicked.
 */
export type DayClickEventHandler = (day: Date, e: React.MouseEvent) => void;

/**
 * Event handler when the month is changed.
 */
export type MonthChangeEventHandler = (month: Date, e: React.MouseEvent) => void;

/**
 * Props for legend item.
 * @param {{ elementId: string, label: string, relatedClassName: string, selected: boolean }}
 */
export type LegendItem = {
  elementId?: string;
  label: string;
  relatedClassName?: string;
  selected?: boolean;
};

/**
 * The props used by the [[DayPicker]] component.
 */
export interface DayPickerProps {
  /**
   * Unique element id.
   */
  id?: string;
  /**
   * CSS class to add to the root element.
   */
  className?: string;
  /**
   * Select the date from date picker without confirmation button.
   */
  disableConfirmation?: boolean;
  /**
   * Style to apply to the root element.
   */
  style?: React.CSSProperties;
  /**
   * The initial month to show in the calendar.
   */
  initialMonth?: Date;
  /**
   * Allow navigation after (and including) the specified date.
   */
  minDate?: Date;
  /**
   * Allow navigation before (and including) the specified date.
   */
  maxDate?: Date;
  /**
   * The rendered month. Implement [[onMonthChange]] to enable months
   * navigation.
   */
  month?: Date;
  /**
   * Date currently selected
   */
  selected?: Date;
  /**
   * Language of the user interface
   */
  language?: 'en' | 'fi' | 'sv';
  /**
   * Label for the select button.
   */
  selectButtonLabel: string;
  /**
   * Label for the close button.
   */
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
  onCloseButtonClick: (focus?: boolean | undefined) => void;
  /**
   * Disables date(s) in datepicker calendar based on conditional function
   */
  isDateDisabledBy?: (Date) => boolean;
  /**
   * Boolean value for showing the DatePicker
   */
  open?: boolean;
  /**
   * Reference object to DateInput
   */
  inputRef?: React.MutableRefObject<HTMLDivElement>;
  /**
   * Calendar toggle button
   */
  toggleButton?: HTMLButtonElement | null;
  /**
   * Function to set class names for dates.
   */
  setDateClassName?: (date: Date) => string | undefined;
  /**
   * Legend items for datepicker
   * @param {{ key: string, label: string }} LegendItem
   */
  legend?: LegendItem[];
  /**
   * Function to set aria-describedby for dates.
   */
  setDateAriaDescribedBy?: (date: Date) => string | undefined;
}
