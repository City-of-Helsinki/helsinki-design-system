import React, { createRef, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Stepper.module.scss';
import { State, Step, StepProps } from './Step';
import classNames from '../../utils/classNames';
import { IconAngleLeft, IconAngleRight } from '../../icons';
import { useTheme } from '../../hooks/useTheme';

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

export type StepperProps = React.ComponentPropsWithoutRef<'button'> & {
  /**
   * A custom className passed to stepper
   */
  className?: string;
  /**
   * Data test id of stepper
   */
  dataTestId?: string;
  /**
   * A custom class name for step heading
   */
  headingClassName?: string;
  /**
   * The labels of the steps
   */
  labels: string[];
  /**
   * The language of the stepper
   */
  language?: Language;
  /**
   * A callback function for custom action on step click
   */
  onStepClick?: (event, number: number) => void;
  /**
   * A function for rendering a custom aria label for step's state
   */
  renderCustomStateAriaLabel?: (step, state) => string;
  /**
   * A function for rendering a custom step count label
   */
  renderCustomStepCountLabel?: (step, totalNumberOfSteps) => string;
  /**
   * A function for rendering a custom step heading
   */
  renderCustomStepHeading?: (step, totalNumberOfSteps, label) => string;
  /**
   * The selected step number. Counting starts from 1
   */
  selectedStep: number;
  /**
   * Boolean indicating small variant usage
   */
  small?: boolean;
  /**
   * The states of the steps
   */
  states: StepProps['state'][];
  /**
   * A boolean indicating step heading variant usage
   */
  stepHeading?: boolean;
  /**
   * Step heading aria level
   */
  stepHeadingAriaLevel?: number;
  /**
   * The total number of steps
   */
  stepsTotal: number;
  /**
   * Custom theme
   */
  theme?: StepperCustomTheme; // Custom theme styles
};

const getStepHeading = (language: Language, step: number, totalNumberOfSteps: number, label: string) => {
  return {
    en: `Step ${step}/${totalNumberOfSteps}: ${label}`,
    fi: `Vaihe ${step}/${totalNumberOfSteps}: ${label}`,
    sv: `Steg ${step}/${totalNumberOfSteps}: ${label}`,
  }[language];
};

export const Stepper = ({
  className,
  labels,
  states,
  language = 'fi',
  selectedStep,
  small = false,
  stepsTotal,
  renderCustomStepCountLabel,
  renderCustomStateAriaLabel,
  onStepClick,
  stepHeading,
  stepHeadingAriaLevel = 2,
  headingClassName,
  dataTestId = 'hds-stepper',
  renderCustomStepHeading,
  theme,
}: StepperProps) => {
  const stepHeadingRef = useRef(null);
  const stepperRef = useRef(null);
  const stepRefs = useRef([]);
  const arrLength = labels.length;
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
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }

    stepRefs.current[selectedStep - 1].current.scrollIntoView({ behavior: 'smooth', inline: 'center' });

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
    <div lang={language} className={classNames(styles.stepperContainer, customThemeClass)} data-testid={dataTestId}>
      {showPreviousButton && (
        <div className={classNames(styles.scrollButton, styles.scrollButtonPrevious)} aria-hidden="true">
          <button
            type="button"
            onClick={() => {
              const amountToScroll = stepperRef.current.scrollWidth / stepsTotal;
              stepperRef.current.scrollLeft -= amountToScroll;
            }}
            tabIndex={-1}
          >
            <IconAngleLeft size="m" />
          </button>
        </div>
      )}
      {showNextButton && (
        <div className={classNames(styles.scrollButton, styles.scrollButtonNext)} aria-hidden="true">
          <button
            type="button"
            onClick={() => {
              const amountToScroll = stepperRef.current.scrollWidth / stepsTotal;
              stepperRef.current.scrollLeft += amountToScroll;
            }}
            tabIndex={-1}
          >
            <IconAngleRight size="m" />
          </button>
        </div>
      )}
      <div
        onScroll={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          if (e.target.scrollLeft && e.target.scrollLeft > 5) {
            setShowPreviousButton(true);
          } else {
            setShowPreviousButton(false);
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
          {labels.map((label, index) => {
            if (index === labels.length - 1) {
              return null;
            }
            return (
              <div
                key={`${label}-${index}`} // eslint-disable-line react/no-array-index-key
                style={{ width: `calc( 100% / ${stepsTotal - 1})` }}
                className={states[index + 1] === State.disabled ? styles.disabledLine : styles.enabledLine}
              />
            );
          })}
        </div>
        {labels.map((label, index) => {
          return (
            <Step
              ref={stepRefs.current[index]}
              key={`${index}-${label}`} // eslint-disable-line react/no-array-index-key
              label={label}
              language={language}
              number={index + 1}
              small={small}
              stepsTotal={stepsTotal}
              selected={selectedStep === index + 1}
              state={states[index]}
              onStepClick={(event, number) => onStepClick(event, number)}
              renderCustomStepCountLabel={renderCustomStepCountLabel}
              renderCustomStateAriaLabel={renderCustomStateAriaLabel}
              dataTestId={`${dataTestId}-step-${index}`}
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
            ? renderCustomStepHeading(selectedStep, stepsTotal, labels[selectedStep - 1])
            : getStepHeading(language, selectedStep, stepsTotal, labels[selectedStep - 1])}
        </div>
      )}
    </div>
  );
};
