import React from 'react';

import '../../styles/base.module.css';
import styles from './Stepper.module.scss';
import { IconCheck, IconError, IconPlaybackPause } from '../../icons';
import classNames from '../../utils/classNames';
import { IconSize } from '../../icons/Icon.interface';

export enum StepState {
  available,
  completed,
  disabled,
  attention,
  paused,
}

export type StepProps = {
  /**
   * The label of the step
   */
  label: string;
  /**
   * The language of the step
   */
  language?: Language;
  /**
   * The index of the step
   */
  index: number;
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
   * A boolean indicating whether step is in selected state
   */
  selected?: boolean;
  /**
   * A boolean indicating whether small variant is used
   */
  small?: boolean;
  /**
   * The state of the step
   */
  state: StepState;
  /**
   * The total number of steps
   */
  stepsTotal: number;
} & React.ComponentPropsWithoutRef<'button'>;

type Language = 'en' | 'fi' | 'sv' | string;

const getStepCountLabel = (language: Language, stepIndex: number, totalNumberOfSteps: number) => {
  return {
    en: `Step ${stepIndex + 1}/${totalNumberOfSteps}.`,
    fi: `Vaihe ${stepIndex + 1}/${totalNumberOfSteps}.`,
    sv: `Steg ${stepIndex + 1}/${totalNumberOfSteps}.`,
  }[language];
};

const states = {
  available: {
    fi: 'Valittavissa.',
    en: 'Available.',
    sv: 'Valbar.',
  },
  completed: {
    fi: 'Valmis.',
    en: 'Completed.',
    sv: 'Komplett.',
  },
  attention: {
    fi: 'Vaatii huomiota.',
    en: 'Needs attention.',
    sv: 'Behöver uppmärksamhet.',
  },
  paused: {
    fi: 'Keskeytetty.',
    en: 'Paused.',
    sv: 'Pausad.',
  },
};

const getStepState = (language: Language, state: StepProps['state']) => {
  if (state === StepState.disabled) {
    // Button has disabled attribute, which is enough for a11y
    return '';
  }
  return states[StepState[state]][language];
};

export const Step = React.forwardRef<HTMLButtonElement, StepProps>(
  (
    {
      label,
      language = 'fi',
      index,
      renderCustomStepCountLabel,
      small = false,
      state,
      selected,
      stepsTotal,
      renderCustomStateAriaLabel,
      onStepClick,
      ...rest
    }: StepProps,
    ref?: React.RefObject<HTMLButtonElement>,
  ) => {
    const composeAriaLabel = () => {
      const stepCountLabel = renderCustomStepCountLabel
        ? renderCustomStepCountLabel(index, stepsTotal)
        : getStepCountLabel(language, index, stepsTotal);

      let stateAriaLabel = renderCustomStateAriaLabel
        ? renderCustomStateAriaLabel(index, state)
        : getStepState(language, state);

      if (selected && state === StepState.available) {
        stateAriaLabel = '';
      }

      let labelWithPeriod = label;

      if (labelWithPeriod.slice(-1) !== '.') {
        labelWithPeriod += '.';
      }

      return [labelWithPeriod, stepCountLabel, stateAriaLabel].filter((lbl) => lbl).join(' ');
    };

    return (
      <div className={styles.stepContainer}>
        <button
          ref={ref}
          type="button"
          disabled={state === StepState.disabled}
          className={classNames(
            styles.step,
            selected && styles.selected,
            state === StepState.disabled && styles.disabled,
          )}
          aria-current={selected ? 'step' : false}
          aria-label={composeAriaLabel()}
          onClick={(e) => onStepClick && onStepClick(e, index)}
          {...rest}
        >
          <div className={styles.circleContainer}>
            {state === StepState.completed && !selected ? (
              <div className={styles.completedContainer}>
                <IconCheck className={styles.completedIcon} />
              </div>
            ) : (
              <div className={classNames(styles.circle)}>
                {state === StepState.attention && <IconError size={IconSize.ExtraSmall} />}
                {state === StepState.paused && <IconPlaybackPause size={IconSize.ExtraSmall} />}
                {(state === StepState.available ||
                  state === StepState.disabled ||
                  (state === StepState.completed && selected)) && <span className={styles.number}>{index + 1}</span>}
              </div>
            )}
          </div>
          {!small && <p className={styles.label}>{label}</p>}
        </button>
      </div>
    );
  },
);
