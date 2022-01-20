import React, { useEffect, useRef } from 'react';

// import core base styles
import 'hds-core';
import styles from './Stepper.module.scss';
import { Step, StepProps } from './Step';
import classNames from '../../utils/classNames';

type Language = 'en' | 'fi' | 'sv' | string;

export type StepperProps = React.ComponentPropsWithoutRef<'button'> & {
  labels: string[];
  states: StepProps['state'][];
  language?: Language;
  selectedStep: number;
  small?: boolean;
  stepsTotal: number;
  attentionIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  renderCustomStepCountLabel?: (step, totalNumberOfSteps) => string;
  renderCustomStateAriaLabel?: (state) => string;
  customSelectedAriaLabel?: string;
  onStepClick?: (event, number: number) => void;
  stepHeading?: boolean;
  headingClassName?: string;
  stepHeadingAriaLevel?: number;
  renderCustomStepHeading?: (step, totalNumberOfSteps, label) => string;
};

const getStepHeading = (language: Language, step: number, totalNumberOfSteps: number, label: string) => {
  return {
    en: `Step ${step}/${totalNumberOfSteps}: ${label}`,
    fi: `Vaihe ${step}/${totalNumberOfSteps}: ${label}`,
    sv: `Steg ${step}/${totalNumberOfSteps}: ${label}`,
  }[language];
};

export const Stepper = ({
  labels,
  states,
  language = 'fi',
  selectedStep,
  small = false,
  stepsTotal,
  attentionIcon,
  pauseIcon,
  renderCustomStepCountLabel,
  renderCustomStateAriaLabel,
  customSelectedAriaLabel,
  onStepClick,
  stepHeading,
  stepHeadingAriaLevel = 2,
  headingClassName,
}: StepperProps) => {
  const stepHeadingRef = useRef(null);

  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [selectedStep]);

  return (
    <>
      <div className={classNames(styles.stepper, small && styles.small)}>
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
                className={states[index + 1] === 'disabled' ? styles.disabledLine : styles.enabledLine}
              />
            );
          })}
        </div>
        {labels.map((label, index) => {
          return (
            <Step
              key={`${index}-${label}`} // eslint-disable-line react/no-array-index-key
              label={label}
              language={language}
              number={index + 1}
              small={small}
              stepsTotal={stepsTotal}
              selected={selectedStep === index + 1}
              state={states[index]}
              onStepClick={(event, number) => onStepClick(event, number)}
              attentionIcon={attentionIcon}
              pauseIcon={pauseIcon}
              renderCustomStepCountLabel={renderCustomStepCountLabel}
              renderCustomStateAriaLabel={renderCustomStateAriaLabel}
              customSelectedAriaLabel={customSelectedAriaLabel}
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
          {getStepHeading(language, selectedStep, stepsTotal, labels[selectedStep - 1])}
        </div>
      )}
    </>
  );
};
