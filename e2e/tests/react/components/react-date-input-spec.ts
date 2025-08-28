import { test, expect, Page } from '@playwright/test';
import {
  scanAccessibility,
  createScreenshotFileName,
  getComponentStorybookUrls,
  gotoStorybookUrlByName,
  initCustomArgsIntegration,
  setComponentPropsAndRender,
  waitFor,
} from '../../../utils/playwright.util';
import { createDateInputHelpers } from '../../../utils/dateInput.component.util';
import { getAllElementAttributes, isLocatorFocused } from '../../../utils/element.util';
import { createTimeControls } from '../../../utils/mock.time.util';
import { getCommonElementTestProps, getAttributeMisMatches } from '../../../../packages/react/src/utils/testHelpers';
import { DateInputProps } from '../../../../packages/react/src';

const componentName = 'dateinput';
const storybook = 'react';

const storyWithDefault = 'Default';
const storyWithoutConfirmation = 'Without confirmation';
const storyForPlayWright = 'Play Wright Only';
const storyWithExternalClearButton = 'With external clear value button';
const storyWithMinAndMax = 'With Min And Max Date';
const storyWithDisabledDates = 'With disabled dates';
const storyWithCustomStyles = 'With custom day styles';
const storyWithCustomDateFormat = 'With custom date format';

const selector = '#date';

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  const commonTestDate = { day: 17, month: 12, year: 2024 };
  const setCommonTestDate = (page: Page) => {
    createTimeControls(page, commonTestDate);
  };

  test('Take snapshots of all DateInput stories', async ({ page, hasTouch }) => {
    setCommonTestDate(page);
    const componentUrls = await getComponentStorybookUrls(page, componentName, storybook);
    if (componentUrls.length === 0) {
      throw new Error('No componentUrls found for');
    }
    for (const componentUrl of componentUrls) {
      await page.goto(componentUrl);
      const inputUtil = createDateInputHelpers(page, selector);
      const element = inputUtil.getInputLocator();

      const containerCount = await element.count();
      if (containerCount === 1) {
        const clip = await inputUtil.getBoundingBox();
        const screenshotName = `${storybook}-${componentUrl.split('/').pop()}-${hasTouch ? 'mobile' : 'desktop'}`;
        await scanAccessibility(page, element);
        await expect(page).toHaveScreenshot(`${screenshotName}.png`, { clip, fullPage: true });

        const hasButton = await inputUtil.getButtonLocator().isVisible();
        if (hasButton) {
          //open the dialog
          await inputUtil.openDialog();
          const clipOpen = await inputUtil.getBoundingBox();
          await scanAccessibility(page, element);
          await expect(page).toHaveScreenshot(`${screenshotName}-open.png`, { clip: clipOpen, fullPage: true });
        }
      }
    }
  });
  test('Dialog is opened and closed. Focus stays in the button.', async ({ page, hasTouch }, testInfo) => {
    setCommonTestDate(page);
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);

    const inputUtil = createDateInputHelpers(page, selector);
    const isOpen = await inputUtil.isDialogOpen();
    expect(isOpen).toBeFalsy();
    await inputUtil.openDialog();

    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'open');
    const clip = await inputUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    await waitFor(() => {
      return isLocatorFocused(inputUtil.getButtonLocator());
    });
  });
  test('Select day with keyboard', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    createTimeControls(page, { day: 10, month: 12, year: 2024 });
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.selectDayWithKeyboard(12, 12, 2024);
    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'day 12 selected');
    const clip = await inputUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
    await inputUtil.clickSelectButton();
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('12.12.2024');
  });
  test('Select day with mouse', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    createTimeControls(page, { day: 10, month: 12, year: 2024 });
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.selectDayWithMouse(13);
    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'day 13 selected');
    const clip = await inputUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
    await inputUtil.clickSelectButton();
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('13.12.2024');
  });
  test('Does not set the input value when close button is pressed', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.setSelectedDateString({ month: 2, day: 2, year: 2024 });
    await inputUtil.selectDayWithMouse(13);
    await inputUtil.getCloseButtonLocator().click();
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('02.02.2024');
  });
  test('Does not set the input value when clicked outside the modal', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.setSelectedDateString({ month: 2, day: 2, year: 2024 });
    await inputUtil.selectDayWithMouse(13);
    await inputUtil.getInputLocator().click();

    await waitFor(async () => {
      return (await inputUtil.isDialogOpen()) === false;
    });
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('02.02.2024');
  });
  test('Select day with mouse when disableConfirmation is true closes the dialog when date is selected', async ({
    page,
    hasTouch,
  }, testInfo) => {
    if (hasTouch) {
      return;
    }
    createTimeControls(page, { day: 10, month: 12, year: 2024 });
    await gotoStorybookUrlByName(page, storyWithoutConfirmation, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    await inputUtil.clickDay(2, 12, 2024, true);
    await waitFor(() => {
      return isLocatorFocused(inputUtil.getButtonLocator());
    });
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('2.12.2024');
  });
  test('Month and year selects have correct values which change when user input changes', async ({
    page,
    hasTouch,
  }, testInfo) => {
    if (hasTouch) {
      return;
    }
    const startDate = { day: 10, month: 2, year: 2015 };
    createTimeControls(page, startDate);
    await gotoStorybookUrlByName(page, storyWithoutConfirmation, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    const currentTime = await inputUtil.getDropdownValues();
    expect(currentTime.month).toBe(String(startDate.month));
    expect(currentTime.year).toBe(String(startDate.year));
    await inputUtil.closeDialog();
    const newDate = { day: 10, month: 5, year: 2015 };
    await inputUtil.setSelectedDateString(newDate);
    await inputUtil.openDialog();
    const newTime = await inputUtil.getDropdownValues();
    expect(newTime.month).toBe(String(newDate.month));
    expect(newTime.year).toBe(String(newDate.year));
  });
  test('Given input value is selected', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    const startDate = { day: 10, month: 2, year: 2015 };
    createTimeControls(page, startDate);
    await gotoStorybookUrlByName(page, storyWithoutConfirmation, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    const newDate = { day: 10, month: 5, year: 2015 };
    await inputUtil.setSelectedDateString(newDate);
    await inputUtil.openDialog();
    await inputUtil.isDateSelected(newDate);
  });
  test('Current date is indicated', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    const currentDate = { day: 12, month: 12, year: 2012 };
    createTimeControls(page, currentDate);
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    const { dayNumber, fullMonthAndDayNumber } = await inputUtil.getCurrentDateDescription();
    expect(dayNumber).toBe('12');
    expect(fullMonthAndDayNumber).toBe('December 12');
  });
  test('Setting invalid date as the input value resets the selected date in calendar', async ({
    page,
    hasTouch,
  }, testInfo) => {
    if (hasTouch) {
      return;
    }
    const currentDate = { day: 12, month: 12, year: 2012 };
    createTimeControls(page, currentDate);
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    await inputUtil.clickDay(10, 12, 2012);
    const selectedButton = await inputUtil.getSelectedDateLocator().count();
    expect(selectedButton).toBe(1);
    await inputUtil.clickSelectButton();
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('10.12.2012');
    await inputUtil.getInputLocator().fill('');
    await inputUtil.getInputLocator().fill('abc');
    await inputUtil.openDialog();
    const selectedButton2 = await inputUtil.getSelectedDateLocator().count();
    expect(selectedButton2).toBe(0);
  });
  test('Should be able to clear the value with external button', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    setCommonTestDate(page);
    await gotoStorybookUrlByName(page, storyWithExternalClearButton, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.setSelectedDateString({ month: 2, day: 2 });
    const value = await inputUtil.getSelectedDateString();
    expect(value).toBe('02.02.2025');
    await page.getByTestId('external-clear-button').click();
    await waitFor(async () => {
      return (await inputUtil.getSelectedDateString()) === '';
    });
    await inputUtil.openDialog();
    const selectedButton2 = await inputUtil.getSelectedDateLocator().count();
    expect(selectedButton2).toBe(0);
  });
  test('When min and max dates are set, keyboard moves focus to the first enabled date.', async ({
    page,
    hasTouch,
  }, testInfo) => {
    if (hasTouch) {
      return;
    }
    // the min and max are set in the story
    // minDate.setDate(4);
    // maxDate = addMonths(new Date(), 4);
    // setting current date to 1, to makes sure 1..3 are not selectable
    const currentDate = { day: 1, month: 12, year: 2012 };
    createTimeControls(page, currentDate);
    await gotoStorybookUrlByName(page, storyWithMinAndMax, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    // not using openDialogAndMoveFocusToFirstEnabledDay()
    // because the "<" is disabled and tabbing works differently.

    await inputUtil.openDialog();
    await inputUtil.getButtonLocator().focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitFor(() => {
      return isLocatorFocused(page.locator(inputUtil.getDateButtonSelector(4, currentDate.month, currentDate.year)));
    });
    await page.keyboard.press('ArrowRight');
    await waitFor(() => {
      return isLocatorFocused(page.locator(inputUtil.getDateButtonSelector(5, currentDate.month, currentDate.year)));
    });
  });
  test('Max date limits how far calendar can be browsed', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    // the min and max are set in the story
    // minDate.setDate(4);
    // maxDate = addMonths(new Date(), 4);
    const currentDate = { day: 1, month: 12, year: 2012 };
    createTimeControls(page, currentDate);
    await gotoStorybookUrlByName(page, storyWithMinAndMax, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    const prevArrow = inputUtil.getMonthArrowLocator('prev');
    await expect(prevArrow).toBeDisabled();
    await inputUtil.changeMonthWithArrows('next');
    await expect(prevArrow).not.toBeDisabled();
    await inputUtil.changeMonthWithArrows('next');
    await inputUtil.changeMonthWithArrows('next');
    await inputUtil.changeMonthWithArrows('next');
    await expect(inputUtil.getMonthArrowLocator('next')).toBeDisabled();
  });
  test('Should skip weekend dates with keyboard navigation when weekend dates are disabled', async ({
    page,
    hasTouch,
  }, testInfo) => {
    if (hasTouch) {
      return;
    }
    // the min and max are set in the story
    // minDate.setDate(4);
    // maxDate = addMonths(new Date(), 4);
    setCommonTestDate(page);
    await gotoStorybookUrlByName(page, storyWithDisabledDates, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    const saturdays = await inputUtil.getAllDayNumberLocators(6).all();

    await Promise.all(
      saturdays.map((td) => {
        // disabled = there is a span instead of button
        return expect(td.locator('button')).toHaveCount(0);
      }),
    );

    const sundays = await inputUtil.getAllDayNumberLocators(0).all();
    await Promise.all(
      sundays.map((td) => {
        return expect(td.locator('button')).toHaveCount(0);
      }),
    );
    const fridayThe6th = inputUtil.getDateButtonLocator(6, 12, 2024);
    const mondayThe9th = inputUtil.getDateButtonLocator(9, 12, 2024);
    await fridayThe6th.focus();
    await page.keyboard.press('ArrowRight');
    await waitFor(() => {
      return isLocatorFocused(mondayThe9th);
    });
    await page.keyboard.press('ArrowLeft');
    await waitFor(() => {
      return isLocatorFocused(fridayThe6th);
    });
  });
  test('Should return custom class for specific days', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }
    // specialDates are in the story
    //  day === 3 || day === 4 || day === 17 || day === 19 || day === 23 || day === 24;

    const specialDays = [3, 4, 17, 19, 23, 24];
    const littleSpaceLeftDate = {
      elementId: 'little-space-left',
      label: 'Only a few free timeslots available',
      relatedClassName: 'little-space-left',
    };
    const dateNow = { day: 12, month: 11, year: 2021 };
    createTimeControls(page, dateNow);
    await gotoStorybookUrlByName(page, storyWithCustomStyles, componentName, storybook);
    const inputUtil = createDateInputHelpers(page, selector);
    await inputUtil.openDialog();
    for (const day of specialDays) {
      const selector = inputUtil
        .getDateButtonSelector(day, dateNow.month, dateNow.year)
        .replace('button[', `button.${littleSpaceLeftDate.relatedClassName}[`);
      const btn = page.locator(selector);
      await expect(btn).toHaveCount(1);
      expect(await btn.getAttribute('aria-describedby')).toBe(littleSpaceLeftDate.elementId);
    }
    await expect(page.locator(`#${littleSpaceLeftDate.elementId}`)).toHaveCount(1);
  });
  test('Native html props are passed to the element', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // no need to test in mobile
      return;
    }
    await initCustomArgsIntegration(page);
    await gotoStorybookUrlByName(page, storyForPlayWright, componentName, storybook);
    const inputProps =
      getCommonElementTestProps<
        'input',
        { defaultValue: string; value: string; onChange: DateInputProps['onChange']; id: string }
      >('input');
    // className and style props are applied to a wrapper element and not testable
    const inputElementProps = {
      ...inputProps,
      style: undefined,
      className: undefined,
    } as unknown as React.HTMLAttributes<HTMLInputElement>;
    await setComponentPropsAndRender(inputProps, page);
    const inputUtil = createDateInputHelpers(page, `#${inputProps.id}`);
    const attributes = await getAllElementAttributes(inputUtil.getInputLocator());
    expect(
      getAttributeMisMatches(
        (key) => (typeof attributes[key] !== 'undefined' ? attributes[key] : null),
        inputElementProps,
      ),
    ).toHaveLength(0);
    const wrapperAttributes = await getAllElementAttributes(inputUtil.getContainerLocator().locator('> div'));
    expect(
      getAttributeMisMatches((key) => (typeof wrapperAttributes[key] !== 'undefined' ? wrapperAttributes[key] : null), {
        style: inputProps.style,
        className: inputProps.className,
      }),
    ).toHaveLength(0);
  });
  test('renders the component with Finnish language', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // no need to test in mobile
      return;
    }
    await initCustomArgsIntegration(page);
    await gotoStorybookUrlByName(page, storyForPlayWright, componentName, storybook);
    const langProps: Partial<DateInputProps> = {
      language: 'fi',
    };
    await setComponentPropsAndRender(langProps, page);
    const inputUtil = createDateInputHelpers(page, selector);
    expect(page.getByLabel('Valitse päivämäärä')).toHaveCount(1);
    expect(await inputUtil.getContainerLocator().getAttribute('lang')).toBe(langProps.language);
  });
  test('renders the component with Swedish language', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // no need to test in mobile
      return;
    }
    await initCustomArgsIntegration(page);
    await gotoStorybookUrlByName(page, storyForPlayWright, componentName, storybook);
    const langProps: Partial<DateInputProps> = {
      language: 'sv',
    };
    await setComponentPropsAndRender(langProps, page);
    const inputUtil = createDateInputHelpers(page, selector);
    expect(page.getByLabel('Välj datum')).toHaveCount(1);
    expect(await inputUtil.getContainerLocator().getAttribute('lang')).toBe(langProps.language);
  });
  test('has correct date selected when defaultValue is provided', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // no need to test in mobile
      return;
    }
    await initCustomArgsIntegration(page);
    await gotoStorybookUrlByName(page, storyForPlayWright, componentName, storybook);
    const date = { day: '10', month: '2', year: '2022' };
    const props: Partial<DateInputProps> = {
      defaultValue: `${date.day}.${date.month}.${date.year}`,
    };
    await setComponentPropsAndRender(props, page);
    const inputUtil = createDateInputHelpers(page, selector);
    expect(await inputUtil.getSelectedDateString()).toBe(props.defaultValue);
    await inputUtil.openDialog();
    expect(await inputUtil.getDropdownValues()).toMatchObject({ year: date.year, month: date.month });
    expect(await inputUtil.isDateSelected(date)).toBeTruthy();
  });
  test('has correct date selected when value is provided', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // no need to test in mobile
      return;
    }
    await initCustomArgsIntegration(page);
    await gotoStorybookUrlByName(page, storyForPlayWright, componentName, storybook);
    const date = { day: '10', month: '2', year: '2022' };
    const props: Partial<DateInputProps> = {
      value: `${date.day}.${date.month}.${date.year}`,
    };
    await setComponentPropsAndRender(props, page);
    const inputUtil = createDateInputHelpers(page, selector);
    expect(await inputUtil.getSelectedDateString()).toBe(props.value);
    await inputUtil.openDialog();
    expect(await inputUtil.getDropdownValues()).toMatchObject({ year: date.year, month: date.month });
    expect(await inputUtil.isDateSelected(date)).toBeTruthy();
  });
  test('Should handle custom date format', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }

    await gotoStorybookUrlByName(page, storyWithCustomDateFormat, componentName, storybook);
    const input = page.locator('input[id="WithCustomDateFormat"]').first();
    // 1st fill with wrong format
    await input.fill('2024/12/12');
    // now unfocus the input
    await input.blur();
    // now check that the input is invalid
    const hasAriaInvalid = await input.evaluate((el) => el.getAttribute('aria-invalid') === 'true');
    expect(hasAriaInvalid).toBe(true);
    // then fill with correct separator but still wrong format
    await input.fill('12-12-2024');
    await input.blur();
    // and still invalid anymore
    const hasAriaInvalidStill = await input.evaluate((el) => el.getAttribute('aria-invalid') === 'true');
    expect(hasAriaInvalidStill).toBe(true);
    // then all correctly
    await input.fill('2024-12-12');
    await input.blur();
    // and finally not aria-invalid
    const hasAriaInvalidFinally = await input.evaluate((el) => el.getAttribute('aria-invalid') === 'true');
    expect(hasAriaInvalidFinally).toBe(false);
  });
});
