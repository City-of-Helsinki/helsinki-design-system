import { Page } from '@playwright/test';

export type InputDateFormatWithMonthIndexOne =
  | Date
  | { day?: number | string; month?: number | string; year?: number | string };

/**
 * Note: call most of these before page.goto is called.
 */
export const createTimeControls = async (page: Page, date?: InputDateFormatWithMonthIndexOne) => {
  if (date) {
    await page.clock.install({ time: dateFromProps(date) });
  }
  return {
    /**
     *  Pauses the time at a specific time.
     * @param time
     */
    pauseAt: async (time: string | number | Date) => {
      await page.clock.pauseAt(time);
    },
    /**
     *  Resumes the time.
     */
    resume: async () => {
      await page.clock.resume();
    },
    /**
     *  Runs the time for a specific duration.
     *  * @param ticks Milliseconds or string formats: "08" for eight seconds, "01:00" for one minute and "02:34:10" for two hours, 34 minutes and ten seconds.
     *  * @param triggerTimersMultipleTimes if true advancing 2000 will trigger setInterval(fn, 1000) two times
     */
    advanceTimersByTime: async (ticks: string | number, triggerTimersMultipleTimes = true) => {
      if (triggerTimersMultipleTimes) {
        await page.clock.runFor(ticks);
      } else {
        await page.clock.fastForward(ticks);
      }
    },
  };
};

export const setTime = async (page: Page, date: Date) => {
  // Sets the fixed time for Date.now() and new Date().
  await page.clock.setFixedTime(date);
};

/**
 *
 * @param givenDate Month range is 1..12!
 * @returns
 */
export const dateFromProps = (givenDate?: InputDateFormatWithMonthIndexOne) => {
  if (!givenDate) {
    return new Date();
  }
  if (givenDate instanceof Date) {
    return givenDate;
  }

  const dateAsNumbers = {
    day: givenDate.day ? Number(givenDate.day) : undefined,
    month: givenDate.month ? Number(givenDate.month) : undefined,
    year: givenDate.year ? Number(givenDate.year) : undefined,
  };

  const d = new Date();
  const year = dateAsNumbers.year || d.getFullYear();
  const month = dateAsNumbers.month ? dateAsNumbers.month - 1 : d.getMonth();
  const day = dateAsNumbers.day || d.getDay();
  return new Date(year, month, day);
};

export const getDateAsArray = (givenDate?: InputDateFormatWithMonthIndexOne) => {
  const date = dateFromProps(givenDate);
  const zeroFillNumbers = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };
  return [zeroFillNumbers(date.getDate()), zeroFillNumbers(date.getMonth() + 1), String(date.getFullYear())];
};
