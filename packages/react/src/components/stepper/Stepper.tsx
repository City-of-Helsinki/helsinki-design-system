import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Stepper.module.scss';
import { Step, StepProps } from './Step';
import { IconAngleLeft } from '../../icons';
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
}: StepperProps) => {
  return (
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
  );
};
