import React, { useEffect } from 'react';

import { IconCheck, IconError, IconPlaybackPause } from '../../icons';
// import core base styles
import 'hds-core';
import styles from './Stepper.module.scss';
import classNames from '../../utils/classNames';

export type StepProps = React.ComponentPropsWithoutRef<'button'> & {
  label: string;
  language?: Language;
  number: number;
  selected?: boolean;
  small?: boolean;
  state: 'available' | 'filled' | 'disabled' | 'attention' | 'paused';
  stepsTotal: number;
  attentionIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  renderCustomStepCountLabel?: (step, totalNumberOfSteps) => string;
  renderCustomStateAriaLabel?: (state) => string;
  customSelectedAriaLabel?: string;
  onStepClick?: (event, number: number) => void;
  dataTestId?: string;
};

type Language = 'en' | 'fi' | 'sv' | string;

const getStepCountLabel = (language: Language, step: number, totalNumberOfSteps: number) => {
  return {
    en: `Step ${step}/${totalNumberOfSteps}.`,
    fi: `Vaihe ${step}/${totalNumberOfSteps}.`,
    sv: `Steg ${step}/${totalNumberOfSteps}.`,
  }[language];
};

const states = {
  available: {
    fi: 'Valittavissa.',
    en: 'Available.',
    sv: 'Valbara.',
  },
  filled: {
    fi: 'Täytetty.',
    en: 'Filled.',
    sv: 'Fylld.',
  },
  disabled: {
    fi: 'Ei käytettävissä.',
    en: 'Disabled.',
    sv: 'Inaktiverad.',
  },
  attention: {
    fi: 'Vaatii huomiota.',
    en: 'Needs attention.',
    sv: 'Behöver uppmärksamhet.',
  },
  paused: {
    fi: 'Pysäytetty.',
    en: 'Paused.',
    sv: 'Pausad.',
  },
};

const getStepState = (language: Language, state: StepProps['state']) => {
  return states[state][language];
};

export const Step = React.forwardRef<HTMLButtonElement, StepProps>(
  (
    {
      label,
      language = 'fi',
      number,
      renderCustomStepCountLabel,
      small = false,
      state,
      selected,
      stepsTotal,
      renderCustomStateAriaLabel,
      customSelectedAriaLabel,
      onStepClick,
      dataTestId,
      ...rest
    }: StepProps,
    ref?: React.RefObject<HTMLButtonElement>,
  ) => {
    useEffect(() => {
      if (selected) {
        // scroll button into view
        ref.current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }, [selected]);

    const composeAriaLabel = () => {
      const stepCountLabel = renderCustomStepCountLabel
        ? renderCustomStepCountLabel(number, stepsTotal)
        : getStepCountLabel(language, number, stepsTotal);

      const selectedAriaLabel =
        customSelectedAriaLabel ||
        {
          fi: 'Valittu.',
          en: 'Selected.',
          sv: 'Valt.',
        }[language];

      let stateAriaLabel = renderCustomStateAriaLabel
        ? renderCustomStateAriaLabel(state)
        : getStepState(language, state);

      if (selected && state === 'available') {
        stateAriaLabel = '';
      }

      let labelWithPeriod = label;

      if (labelWithPeriod.slice(-1) !== '.') {
        labelWithPeriod += '.';
      }

      return [labelWithPeriod, stepCountLabel, selected && selectedAriaLabel, stateAriaLabel]
        .filter((lbl) => lbl)
        .join(' ');
    };

    return (
      <div className={styles.stepContainer}>
        <button
          ref={ref}
          tabIndex={selected ? -1 : 0}
          type="button"
          disabled={state === 'disabled'}
          className={classNames(styles.step, selected && styles.selected, state === 'disabled' && styles.disabled)}
          aria-current={selected ? 'step' : false}
          aria-label={composeAriaLabel()}
          onClick={(e) => onStepClick(e, number)}
          data-testid={dataTestId}
          {...rest}
        >
          <div className={styles.circleContainer}>
            {state === 'filled' ? (
              <div className={styles.filledContainer}>
                <IconCheck className={styles.filledIcon} />
              </div>
            ) : (
              <div className={classNames(styles.circle)}>
                {state === 'attention' && <IconError size="xs" />}
                {state === 'paused' && <IconPlaybackPause size="xs" />}
                {(state === 'available' || state === 'disabled') && <span className={styles.number}>{number}</span>}
              </div>
            )}
          </div>
          {!small && <p className={styles.label}>{label}</p>}
        </button>
      </div>
    );
  },
);
