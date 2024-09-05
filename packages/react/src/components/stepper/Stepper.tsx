import React, { createRef, useEffect, useRef, useState } from 'react';

import '../../styles/base.module.css';
import styles from './Stepper.module.scss';
import { Step, StepState } from './Step';
import classNames from '../../utils/classNames';
import { IconAngleLeft, IconAngleRight } from '../../icons';
import { useTheme } from '../../hooks/useTheme';
import { IconSize } from '../../icons/Icon.interface';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

type Language = 'en' | 'fi' | 'sv' | string;

export interface StepperCustomTheme {
  /**
   * A custom background color for stepper
   */
  '--hds-stepper-background-color'?: string;
  /**
   * A custom color for stepper
   */
  '--hds-stepper-color'?: string;
  /**
   * A custom width for step
   */
  '--hds-step-width'?: string;
  /**
   * A custom color for selected step label
   */
  '--hds-selected-step-label-color'?: string;
  /**
   * A custom color for not selected step label
   */
  '--hds-not-selected-step-label-color'?: string;
  /**
   * A custom color for step circle background
   */
  '--hds-step-background-color'?: string;
  /**
   * A custom color for step circle content
   */
  '--hds-step-content-color'?: string;
  /**
   * A custom color for stepper focus borders
   */
  '--hds-stepper-focus-border-color'?: string;
}

type Steps = {
  /**
   * The state of the step
   */
  state: StepState;
  /**
   * The label of the step
   */
  label: string;
}[];

export type StepperProps = AllElementPropsWithoutRef<'div'> & {
  /**
   * A custom className passed to stepper
   */
  className?: string;
  /**
   * A custom class name for step heading
   */
  headingClassName?: string;
  /**
   * The language of the stepper
   */
  language?: Language;
  /**
   * A callback function for custom action on step click
   */
  onStepClick?: (event: React.MouseEvent<HTMLButtonElement>, stepIndex: number) => void;
  /**
   * A function for rendering a custom aria-label for step's state
   */
  renderCustomStateAriaLabel?: (stepIndex: number, state: StepState) => string;
  /**
   * A function for rendering a custom step count label
   */
  renderCustomStepCountLabel?: (stepIndex: number, totalNumberOfSteps: number) => string;
  /**
   * A function for rendering a custom step heading
   */
  renderCustomStepHeading?: (stepIndex: number, totalNumberOfSteps: number, label: string) => string;
  /**
   * The index of the selected step. Used to set the aria-current="step" attribute to the active step
   */
  selectedStep?: number;
  /**
   * Boolean indicating small variant usage
   */
  small?: boolean;
  /**
   * A boolean indicating step heading variant usage
   */
  stepHeading?: boolean;
  /**
   * Step heading aria level
   */
  stepHeadingAriaLevel?: number;
  /**
   * The steps of the stepper
   */
  steps: Steps;
  /**
   * Custom theme
   */
  theme?: StepperCustomTheme; // Custom theme styles
};
const getStepHeading = (language: Language, stepIndex: number, totalNumberOfSteps: number, label: string) => {
  return {
    en: `Step ${stepIndex + 1}/${totalNumberOfSteps}: ${label}`,
    fi: `Vaihe ${stepIndex + 1}/${totalNumberOfSteps}: ${label}`,
    sv: `Steg ${stepIndex + 1}/${totalNumberOfSteps}: ${label}`,
  }[language];
};

export const Stepper = ({
  className,
  language = 'fi',
  selectedStep,
  small = false,
  renderCustomStepCountLabel,
  renderCustomStateAriaLabel,
  onStepClick,
  stepHeading,
  stepHeadingAriaLevel = 2,
  headingClassName,
  'data-testid': dataTestId,
  renderCustomStepHeading,
  steps,
  theme,
  ...rest
}: StepperProps) => {
  const stepsTotal = steps.length;
  const initialRender = useRef(true);
  const stepHeadingRef = useRef(null);
  const stepperRef = useRef(null);
  const stepRefs = useRef([]);
  const arrLength = steps.length;
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const customThemeClass = useTheme<StepperCustomTheme>(styles.stepperContainer, theme);

  if (stepRefs.current.length !== arrLength) {
    // add or remove refs
    stepRefs.current = Array(arrLength)
      .fill(0)
      .map((_, index) => stepRefs.current[index] || createRef());
  }

  useEffect(() => {
    if (!initialRender.current) {
      if (stepHeadingRef.current) {
        stepHeadingRef.current.focus();
      }

      const hdsStepWidth = stepperRef.current.scrollWidth / stepsTotal;

      stepperRef.current.scrollLeft =
        hdsStepWidth * (selectedStep + 1) - hdsStepWidth / 2.0 - stepperRef.current.parentNode.clientWidth / 2.0;
    }

    initialRender.current = false;

    if (stepperRef.current.scrollLeft > 5) {
      setShowPreviousButton(true);
    } else {
      setShowPreviousButton(false);
    }

    if (
      stepperRef.current.scrollWidth - (stepperRef.current.parentNode.clientWidth + stepperRef.current.scrollLeft) >
      5
    ) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [selectedStep]);

  return (
    <div
      {...rest}
      lang={language}
      className={classNames(styles.stepperContainer, customThemeClass)}
      data-testid={dataTestId}
    >
      {showPreviousButton && (
        <div className={classNames(styles.scrollButton, styles.scrollButtonPrevious)} aria-hidden="true">
          {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            onClick={() => {
              const amountToScroll = stepperRef.current.scrollWidth / stepsTotal;
              stepperRef.current.scrollLeft -= amountToScroll;
            }}
            tabIndex={-1}
          >
            <IconAngleLeft size={IconSize.Medium} />
          </button>
        </div>
      )}
      {showNextButton && (
        <div className={classNames(styles.scrollButton, styles.scrollButtonNext)} aria-hidden="true">
          {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            onClick={() => {
              const amountToScroll = stepperRef.current.scrollWidth / stepsTotal;
              stepperRef.current.scrollLeft += amountToScroll;
            }}
            tabIndex={-1}
          >
            <IconAngleRight size={IconSize.Medium} />
          </button>
        </div>
      )}
      <div
        onScroll={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (e.target.scrollLeft && e.target.scrollLeft > 5) {
            setShowPreviousButton(true);
          } else {
            setShowPreviousButton(false);
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (e.target.scrollWidth - (e.target.parentNode.clientWidth + e.target.scrollLeft) > 5) {
            setShowNextButton(true);
          } else {
            setShowNextButton(false);
          }
        }}
        ref={stepperRef}
        className={classNames(className, styles.stepper, small && styles.small)}
      >
        <div
          className={styles.line}
          aria-hidden
          style={{
            width: `max( calc(100% - var(--hds-step-width)), calc(${stepsTotal} * var(--hds-step-width) - var(--hds-step-width) ))`,
          }}
        >
          {steps.map((step, index) => {
            if (index === steps.length - 1) {
              return null;
            }
            return (
              <div
                key={`${step.label}-${index}`} // eslint-disable-line react/no-array-index-key
                style={{ width: `calc( 100% / ${stepsTotal - 1})` }}
                className={steps[index + 1].state === StepState.disabled ? styles.disabledLine : styles.enabledLine}
              />
            );
          })}
        </div>
        {steps.map((step, index) => {
          return (
            <Step
              ref={stepRefs.current[index]}
              key={`${index}-${step.label}`} // eslint-disable-line react/no-array-index-key
              label={step.label}
              language={language}
              index={index}
              small={small}
              stepsTotal={stepsTotal}
              selected={selectedStep === index}
              state={step.state}
              onStepClick={(event, stepIndex) => {
                if (stepIndex === selectedStep && stepHeading) {
                  stepHeadingRef.current.focus();
                }
                onStepClick(event, stepIndex);
              }}
              renderCustomStepCountLabel={renderCustomStepCountLabel}
              renderCustomStateAriaLabel={renderCustomStateAriaLabel}
              data-testid={dataTestId ? `${dataTestId}-step-${index}` : undefined}
            />
          );
        })}
      </div>
      {stepHeading && (
        <div
          tabIndex={-1}
          ref={stepHeadingRef}
          role="heading"
          aria-level={stepHeadingAriaLevel}
          className={classNames(styles.heading, headingClassName)}
        >
          {renderCustomStepHeading
            ? renderCustomStepHeading(selectedStep, stepsTotal, steps[selectedStep].label)
            : getStepHeading(language, selectedStep, stepsTotal, steps[selectedStep].label)}
        </div>
      )}
    </div>
  );
};
