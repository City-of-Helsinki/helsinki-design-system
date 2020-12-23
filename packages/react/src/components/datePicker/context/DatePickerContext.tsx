import Locale from 'date-fns/locale';
import React from 'react';

export type DatePickerContextType = {
  datepickerRef: React.MutableRefObject<HTMLDivElement>;
  currentMonth: Date;
  fromMonth?: Date;
  toMonth?: Date;
  focusedDate: Date | null;
  selectedDate: Date | null;
  locale: Locale;
  nextMonthLabel: string;
  prevMonthLabel: string;

  setCurrentMonth: (Date) => void;
  setFocusedDate: (date: Date | null) => void;
  setSelectedDate: (date: Date | null) => void;
  onDayClick?: (date: Date, e: React.MouseEvent) => void;
  handleKeyboardNavigation: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleMonthChange: (NextMonth: Date, event?: React.MouseEvent) => void;
};

export const DatePickerContext = React.createContext<DatePickerContextType>(null);
