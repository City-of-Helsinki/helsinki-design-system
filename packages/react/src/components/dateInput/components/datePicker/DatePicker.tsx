import React, { useMemo, useState, useRef, useEffect } from 'react';
import addDays from 'date-fns/addDays';
import endOfDay from 'date-fns/endOfDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import startOfDay from 'date-fns/startOfDay';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import startOfMonth from 'date-fns/startOfMonth';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import english from 'date-fns/locale/en-GB';
import finnish from 'date-fns/locale/fi';
import swedish from 'date-fns/locale/sv';
import { Modifier, usePopper } from 'react-popper';

import { defaultProps } from './defaults/defaultProps';
import { DatePickerContext } from '../../context/DatePickerContext';
import { DayPickerProps } from './types';
import { MonthTable } from '../monthTable';
import { Button } from '../../../button';
import { IconCheck, IconCross } from '../../../../icons';
import styles from './DatePicker.module.scss';
import classNames from '../../../../utils/classNames';
import { scrollIntoViewIfNeeded } from '../../../../utils/scrollIntoViewIfNeeded';

const keyCode = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

export const DatePicker = (providedProps: DayPickerProps) => {
  const {
    initialMonth = new Date(),
    onMonthChange,
    onDaySelect,
    language,
    minDate,
    maxDate,
    onCloseButtonClick,
    selected,
    disableConfirmation,
    selectButtonLabel,
    closeButtonLabel,
    isDateDisabledBy,
    open,
    inputRef,
    toggleButton,
  } = {
    ...defaultProps,
    ...providedProps,
  };

  /**
   * Datepicker container ref
   */
  const datepickerRef = useRef<HTMLDivElement>();

  const pickerWrapperRef = useRef<HTMLDivElement>();
  /**
   * Current month
   */
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selected || initialMonth));

  /**
   * Currently focused date
   */
  const [focusedDate, setFocusedDate] = useState<Date>(null);

  /**
   * Currently selected date
   */
  const [selectedDate, setSelectedDate] = useState<Date>(selected || null);

  const [isPopperReady, setIsPopperReady] = useState<boolean>(false);

  /**
   * Update the selected date from props
   */
  useEffect(() => {
    if (
      selected &&
      isValid(selected) &&
      isAfter(endOfDay(selected), startOfDay(minDate)) &&
      isBefore(startOfDay(selected), endOfDay(maxDate))
    ) {
      setSelectedDate(selected);
      setCurrentMonth(startOfMonth(selected));
    } else {
      setSelectedDate(null);
      setCurrentMonth(startOfMonth(initialMonth));
    }
  }, [selected, maxDate, minDate, initialMonth]);

  /**
   * Focus the selected date button
   */
  useEffect(() => {
    if (focusedDate) {
      const dateEl = datepickerRef.current.querySelector(`button[data-date='${format(focusedDate, 'yyyy-MM-dd')}']`);
      if (dateEl) {
        (dateEl as HTMLButtonElement).focus();
      }
    }
  }, [focusedDate]);

  /**
   * Close datepicker when clicked outside
   */
  useEffect(() => {
    const handleClickOutsideWrapper = (event: MouseEvent) => {
      if (open === true) {
        const isOutside = pickerWrapperRef.current && !pickerWrapperRef.current.contains(event.target as Node);
        const isToggleButton =
          toggleButton && (toggleButton === event.target || toggleButton.contains(event.target as Node));
        if (isOutside && !isToggleButton) {
          const focusToggleButton = document.activeElement === null || document.activeElement.tagName === 'BODY';
          onCloseButtonClick(focusToggleButton);
        }
      }
    };
    window.addEventListener('click', handleClickOutsideWrapper);
    return () => {
      window.removeEventListener('click', handleClickOutsideWrapper);
    };
  });

  /**
   * Handle tab inside date picker
   */
  useEffect(() => {
    const pickerModalElement = pickerWrapperRef.current;
    const tabbleEventHandler = (event: KeyboardEvent) => {
      // Skip if pressed key was not tab
      const isTab = event.key === 'Tab' || event.keyCode === 9;
      if (!isTab) {
        return;
      }
      // Get all focusable elements inside the modal
      const focusableElements = pickerModalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      // Check if shift key is pressed
      if (event.shiftKey) {
        // If currently focused element is the first element, move focus the last one
        if (document.activeElement === firstFocusableElement) {
          (lastFocusableElement as HTMLElement).focus();
          event.preventDefault();
        }
      }
      // If shift is not pressed and currently focused element is the last element,
      // move focust the first one
      else if (document.activeElement === lastFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
        event.preventDefault();
      }
    };
    if (pickerModalElement) {
      pickerModalElement.addEventListener('keydown', tabbleEventHandler);
    }
    return () => {
      if (pickerModalElement) {
        pickerModalElement.removeEventListener('keydown', tabbleEventHandler);
      }
    };
  }, []);

  /**
   * Focus the first focusable element inside the datepicker
   * when opened.
   */
  useEffect(() => {
    let scrollTimeout;
    if (open === true && pickerWrapperRef.current) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const firstFocusableElement = pickerWrapperRef.current.querySelector(focusableElements);
      if (firstFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
      }
      scrollTimeout = setTimeout(() => {
        scrollIntoViewIfNeeded(pickerWrapperRef.current);
      }, 30);
    }
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [open]);

  /**
   * Handle month change and call onMonthChange callback if provided
   * @param nextMonth The next month
   * @param event The mouse event
   */
  const handleMonthChange = (nextMonth: Date, event: React.MouseEvent) => {
    setCurrentMonth(nextMonth);
    if (typeof onMonthChange === 'function') {
      onMonthChange(nextMonth, event);
    }
  };

  const findNextAvailableDate = (days: number, nextDate: Date) => {
    const nextDateToTry = addDays(nextDate, days);
    if (isDateDisabledBy(nextDateToTry)) {
      return findNextAvailableDate(days, nextDateToTry);
    }
    return nextDateToTry;
  };

  /**
   * Add/subtract from focused date
   * @param days
   */
  const addToFocusedDate = (days: number) => {
    if (focusedDate !== null) {
      const nextDate = addDays(focusedDate, days);
      const nextAvailableDay =
        isDateDisabledBy && isDateDisabledBy(nextDate) ? findNextAvailableDate(days, nextDate) : nextDate;
      const isAfterMinDate = isAfter(endOfDay(nextAvailableDay), startOfDay(minDate));
      const isBeforeMaxDate = isBefore(startOfDay(nextAvailableDay), endOfDay(maxDate));

      if (isAfterMinDate && isBeforeMaxDate) {
        setCurrentMonth(startOfMonth(nextAvailableDay));
        setFocusedDate(nextAvailableDay);
      }
    }
  };

  /**
   * Handle single date click
   */
  const handleDayClick = (date: Date, e: React.MouseEvent) => {
    setSelectedDate(date);
    if (onDaySelect && disableConfirmation) {
      onDaySelect(date, e);
    }
  };

  /**
   * Handle confirm button click
   */
  const handleConfirmClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onDaySelect) {
      onDaySelect(selectedDate, event);
    }
  };

  /**
   * Handle the keyboard navigation
   * @param event
   */
  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let handled = true;

    switch (event.keyCode) {
      case keyCode.RIGHT:
        addToFocusedDate(1);
        break;
      case keyCode.LEFT:
        addToFocusedDate(-1);
        break;
      case keyCode.UP:
        addToFocusedDate(-7);
        break;
      case keyCode.DOWN:
        addToFocusedDate(7);
        break;
      case keyCode.SPACE:
        handleDayClick(focusedDate, null);
        break;
      default:
        handled = false;
        break;
    }

    if (handled === true) {
      event.preventDefault();
    }
  };

  const getLocaleByLanguage = (lang: 'en' | 'fi' | 'sv') => {
    return { en: english, fi: finnish, sv: swedish }[lang];
  };

  const currentMonthDates: Date[] = [...Array(getDaysInMonth(currentMonth)).keys()].map((_, index) =>
    addDays(currentMonth, index),
  );

  const currentMonthDatesWithoutDisabled: Date[] = isDateDisabledBy
    ? currentMonthDates.filter((date) => !isDateDisabledBy(date))
    : currentMonthDates;

  const currentMonthAvailableDates: Date[] = currentMonthDatesWithoutDisabled.filter(
    (date) => isAfter(endOfDay(date), startOfDay(minDate)) && isBefore(startOfDay(date), endOfDay(maxDate)),
  );

  const currentMonthAvailableDays: number[] = currentMonthAvailableDates.map((date) => date.getDate());

  // We need to wait for the popper to count the position before we show the datepicker. The initial position might be off and repositioning causes the picker to move after the user opens it.
  const beforePopperWrite: Partial<Modifier<string, object>> = useMemo(
    () => ({
      name: 'beforePopperWrite',
      enabled: true,
      phase: 'beforeWrite',
      fn: () => {
        if (!isPopperReady) {
          setIsPopperReady(true);
        }
      },
    }),
    [],
  );

  // Initialize Popper.js
  const { styles: datePickerPopperStyles, attributes: datePickerPopperAttributes } = usePopper(
    inputRef.current,
    pickerWrapperRef.current,
    {
      placement: 'bottom-end',
      modifiers: [
        beforePopperWrite,
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
        {
          name: 'flip',
          options: {
            rootBoundary: 'document',
            fallbackPlacements: ['bottom-start', 'top-end'],
          },
        },
      ],
    },
  );

  return (
    <div
      ref={pickerWrapperRef}
      className={classNames(styles.pickerWrapper, isPopperReady && styles.isVisible)}
      role="dialog"
      aria-modal="true"
      aria-hidden={open ? undefined : true}
      style={datePickerPopperStyles.popper}
      {...datePickerPopperAttributes.popper}
    >
      <DatePickerContext.Provider
        value={{
          datepickerRef,
          minDate,
          maxDate,
          currentMonth,
          currentMonthAvailableDays,
          focusedDate,
          selectedDate,
          locale: getLocaleByLanguage(language),
          language,
          isDateDisabledBy,
          setCurrentMonth,
          setFocusedDate,
          setSelectedDate,
          onDayClick: handleDayClick,
          handleKeyboardNavigation,
          handleMonthChange,
        }}
      >
        <div className={styles['hds-datepicker']} ref={datepickerRef}>
          <MonthTable month={currentMonth} />
          <div className={styles['hds-datepicker__bottom-buttons']}>
            {!disableConfirmation && (
              <Button
                disabled={!selectedDate}
                size="small"
                variant="secondary"
                iconLeft={<IconCheck aria-hidden />}
                onClick={handleConfirmClick}
                data-testid="selectButton"
              >
                {selectButtonLabel}
              </Button>
            )}
            <Button
              size="small"
              variant="supplementary"
              iconLeft={<IconCross aria-hidden />}
              onClick={() => onCloseButtonClick()}
              data-testid="closeButton"
            >
              {closeButtonLabel}
            </Button>
          </div>
        </div>
      </DatePickerContext.Provider>
    </div>
  );
};
