import Locale from 'date-fns/locale';
import React from 'react';

export type DatePickerContextType = {
  datepickerRef: React.MutableRefObject<HTMLDivElement>;
  currentMonth: Date;
  minDate: Date;
  maxDate: Date;
  focusedDate: Date | null;
  selectedDate: Date | null;
  locale: Locale;
  language: 'en' | 'fi' | 'sv';

  setCurrentMonth: (Date) => void;
  setFocusedDate: (date: Date | null) => void;
  setSelectedDate: (date: Date | null) => void;
  onDayClick?: (date: Date, e: React.MouseEvent) => void;
  handleKeyboardNavigation: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleMonthChange: (NextMonth: Date, event?: React.MouseEvent) => void;
};

export const DatePickerContext = React.createContext<DatePickerContextType>(null);
