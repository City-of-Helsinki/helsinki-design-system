import { Locator, Page } from '@playwright/test';
import { combineBoundingBoxes, isLocatorFocused } from './element.util';
import { getDateAsArray, InputDateFormatWithMonthIndexOne } from './mock.time.util';
import { getDummyBoundingBox, getLocatorParentLocator, waitFor } from './playwright.util';

export function createDateInputHelpers(page: Page, selector: string) {
  const buttonElementSelector = '> div > button';
  const dialogSelector = '*[role="dialog"]';
  const closeButtonSelector = 'button[data-testid="closeButton"]';
  const selectButtonSelector = 'button[data-testid="selectButton"]';
  const monthListSelector = 'select[aria-label="Month"]';
  const yearListSelector = 'select[aria-label="Year"]';
  const currentDayCellSelector = 'td[aria-current="date"]';
  const selectedDateSelector = 'button[aria-pressed="true"]';

  const getInputLocator = (): Locator => {
    return page.locator(selector);
  };

  const getInputWrapperLocator = (inputLocator?: Locator): Locator => {
    return getLocatorParentLocator(inputLocator || getInputLocator());
  };

  const getButtonLocator = (inputLocator?: Locator): Locator => {
    return getInputWrapperLocator(inputLocator).locator(buttonElementSelector);
  };

  const getDialogLocator = (inputLocator?: Locator): Locator => {
    return getInputWrapperLocator(inputLocator).locator(dialogSelector);
  };

  const getCloseButtonLocator = (inputLocator?: Locator): Locator => {
    return getDialogLocator(inputLocator).locator(closeButtonSelector);
  };

  const getSelectButtonLocator = (inputLocator?: Locator): Locator => {
    return getDialogLocator(inputLocator).locator(selectButtonSelector);
  };

  const getSelectedDateLocator = (inputLocator?: Locator): Locator => {
    return getDialogLocator(inputLocator).locator(selectedDateSelector);
  };

  const getContainerLocator = (inputLocator?: Locator): Locator => {
    return getLocatorParentLocator(getLocatorParentLocator(getInputWrapperLocator(inputLocator)));
  };

  const getMonthListLocator = (inputLocator?: Locator): Locator => {
    return getContainerLocator().locator(monthListSelector);
  };

  const getYearListLocator = (inputLocator?: Locator): Locator => {
    return getContainerLocator().locator(yearListSelector);
  };

  const getMonthArrowSelector = (dir: 'prev' | 'next', inputLocator?: Locator): string => {
    return `button[aria-label="${dir === 'next' ? 'Next month' : 'Previous month'}"]`;
  };

  const getMonthArrowLocator = (dir: 'prev' | 'next', inputLocator?: Locator): Locator => {
    return getDialogLocator(inputLocator).locator(getMonthArrowSelector(dir));
  };

  const isDialogOpen = async (): Promise<boolean> => {
    const dialog = getDialogLocator();
    return await dialog.isVisible();
  };

  const openDialog = async () => {
    const isAlreadyOpen = await isDialogOpen();
    if (isAlreadyOpen) {
      return;
    }
    const button = getButtonLocator();
    await button.click();
    await waitFor(() => {
      return isDialogOpen();
    });
  };

  const closeDialog = async () => {
    const isAlreadyClosed = (await isDialogOpen()) === false;
    if (isAlreadyClosed) {
      return;
    }
    const button = getButtonLocator();
    await button.click();
    await waitFor(async () => {
      return (await isDialogOpen()) === false;
    });
  };

  const getBoundingBox = async (spacing = 10) => {
    const container = getContainerLocator();
    if ((await container.count()) > 1) {
      return getDummyBoundingBox();
    }
    const dialog = getDialogLocator();
    const dialogExists = await dialog.isVisible();
    const box = await combineBoundingBoxes(dialogExists ? [container, dialog] : [container]);

    box.x -= spacing;
    box.y -= spacing;
    box.height += spacing;
    box.width += spacing;

    return box;
  };

  const getPossibleDate = async (day: number, month?: number, year?: number) => {
    const selectedMonthAndYear = await getDropdownValues();
    return {
      day,
      month: month || Number(selectedMonthAndYear.month),
      year: year || Number(selectedMonthAndYear.year),
    };
  };

  const getDateButtonSelector = (dayNumber: number, month: number, year: number) => {
    const [day, strMonth, strYear] = getDateAsArray({ day: dayNumber, month, year });
    return `button[data-date="${strYear}-${strMonth}-${day}"]`;
  };

  const getDateButtonLocator = (dayNumber: number, month: number, year: number) => {
    const selector = getDateButtonSelector(dayNumber, month, year);
    return getDialogLocator().locator(selector);
  };

  const isDateButtonSelected = async (locator: Locator) => {
    return locator.evaluate((el) => {
      return el.getAttribute('aria-pressed') === 'true';
    });
  };

  const isDateSelected = async (givenDate: InputDateFormatWithMonthIndexOne) => {
    const selectedMonthAndYear = await getDropdownValues();
    const [day, month, year] = getDateAsArray(givenDate);
    // month maybe "02" or "2", so using Number
    if (Number(selectedMonthAndYear.month) !== Number(month)) {
      return false;
    }
    if (selectedMonthAndYear.year !== year) {
      return false;
    }
    const buttonLocator = getDateButtonSelector(Number(day), Number(month), Number(year));
    return isDateButtonSelected(page.locator(buttonLocator));
  };

  const clickDay = async (dayNumber: number, month: number, year: number, hasDisableConfirmation = false) => {
    const buttonLocator = page.locator(getDateButtonSelector(dayNumber, month, year));
    await buttonLocator.click();
    await waitFor(async () => {
      if (!hasDisableConfirmation) {
        return isDateButtonSelected(buttonLocator);
      } else {
        return (await isDialogOpen()) === false;
      }
    });
  };

  const clickSelectButton = async () => {
    const buttonLocator = getSelectButtonLocator();
    await buttonLocator.click();
    await waitFor(async () => {
      return (await isDialogOpen()) === false;
    });
  };

  const openDialogAndMoveFocusToFirstEnabledDay = async (month: number, year: number) => {
    await closeDialog();
    await getInputLocator().focus();
    await page.keyboard.press('Tab');
    await waitFor(async () => {
      return isLocatorFocused(getButtonLocator());
    });
    await page.keyboard.press('Space');
    await waitFor(async () => {
      return isDialogOpen();
    });
    // move from button to the first day of the current month
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitFor(async () => {
      return isLocatorFocused(page.locator(getDateButtonSelector(1, month, year)));
    });
  };
  const moveFocusFromDayOneToGivenDay = async (dayNumber: number, month: number, year: number) => {
    const moveBy = dayNumber - 1;
    // move from day "1" to the target
    const navigation = [...new Array(moveBy)].map((item, index) => async () => {
      await page.keyboard.press('ArrowRight');
      await waitFor(async () => {
        return isLocatorFocused(page.locator(getDateButtonSelector(index + 2, month, year)));
      });
    });
    for (const pressFn of navigation) { 
      await pressFn();
    }
    await page.keyboard.press('Space');
    await waitFor(async () => {
      return isDateButtonSelected(page.locator(getDateButtonSelector(dayNumber, month, year)));
    });
  };

  const selectDayWithKeyboard = async (dayNumber: number, month: number, year: number, closeDialogAfterSelection = false) => {
    await openDialogAndMoveFocusToFirstEnabledDay(month, year);
    await moveFocusFromDayOneToGivenDay(dayNumber, month, year);
    if (closeDialogAfterSelection) {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitFor(async () => {
        return (await isDialogOpen()) === false;
      });
    }
  };

  const selectDayWithMouse = async (dayNumber: number, month?: number, year?: number, closeDialogAfterSelection = false) => {
    await openDialog();
    const dt = await getPossibleDate(dayNumber, month, year);
    await clickDay(dt.day, dt.month, dt.year);
    await waitFor(async () => {
      return isDateButtonSelected(page.locator(getDateButtonSelector(dt.day, dt.month, dt.year)));
    });
    if (closeDialogAfterSelection) {
      await closeDialog();
    }
  };

  const getSelectedDateString = () => {
    const input = getInputLocator();
    return input.getAttribute('value');
  };

  const setSelectedDateString = async (givenDate: InputDateFormatWithMonthIndexOne | string) => {
    const inputValue = typeof givenDate === 'string' ? givenDate : getDateAsArray(givenDate).join('.');
    const input = getInputLocator();
    await input.fill('');
    input.fill(inputValue);
    await waitFor(async () => {
      return (await getSelectedDateString()) === inputValue;
    });
  };

  // note: month is changed to be 1..12
  const getDropdownValues = async () => {
    const zeroBasedMonth = await getMonthListLocator().inputValue();
    const year = await getYearListLocator().inputValue();
    const month = String(Number(zeroBasedMonth) + 1);
    return { month, year };
  };

  const getCurrentDateDescription = async () => {
    const currentDates = await getDialogLocator().locator(currentDayCellSelector).locator('span').all();
    const dayNumber = await currentDates[0].innerHTML();
    const fullMonthAndDayNumber = await currentDates[1].innerHTML();
    return { dayNumber, fullMonthAndDayNumber };
  };

  const changeMonthWithArrows = async (dir: 'prev' | 'next') => {
    const button = getMonthArrowLocator(dir);
    const current = await getDropdownValues();
    await button.click();
    await waitFor(async () => {
      const newValues = await getDropdownValues();
      return current.month !== newValues.month || current.year !== newValues.year;
    });
    return getDropdownValues();
  };

  const getAllDayNumberLocators = (dayNum: number) => {
    // sunday = 0, sat = 6
    const daysInTable = [7, 1, 2, 3, 4, 5, 6];
    const nthChild = daysInTable[dayNum];
    const selector = `tbody tr td:nth-child(${nthChild})`;
    return getDialogLocator().locator(selector);
  };

  return {
    getContainerLocator,
    getInputLocator,
    getButtonLocator,
    getDialogLocator,
    getCloseButtonLocator,
    isDialogOpen,
    openDialog,
    closeDialog,
    getBoundingBox,
    isDateButtonSelected,
    clickDay,
    selectDayWithKeyboard,
    getSelectedDateString,
    clickSelectButton,
    selectDayWithMouse,
    getMonthListLocator,
    getYearListLocator,
    getDropdownValues,
    setSelectedDateString,
    isDateSelected,
    getCurrentDateDescription,
    getSelectedDateLocator,
    getDateButtonSelector,
    openDialogAndMoveFocusToFirstEnabledDay,
    getMonthArrowLocator,
    changeMonthWithArrows,
    getAllDayNumberLocators,
    getDateButtonLocator,
    getInputWrapperLocator,
  };
}
