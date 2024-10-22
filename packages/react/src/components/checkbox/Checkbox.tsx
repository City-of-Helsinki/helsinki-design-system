import React, { useEffect, useRef } from 'react';

import '../../styles/base.module.css';
import styles from './Checkbox.module.scss';
import classNames from '../../utils/classNames';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';
import { Tooltip } from '../tooltip';
import composeAriaDescribedBy from '../../utils/composeAriaDescribedBy';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

export type CheckboxProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'input'>,
  {
    /**
     * If `true`, the component is checked
     */
    checked?: boolean;
    /**
     * Additional class names to apply to the checkbox
     */
    className?: string;
    /**
     * If `true`, the checkbox will be disabled
     */
    disabled?: boolean;
    /**
     * The error text content that will be shown below the checkbox
     */
    errorText?: string;
    /**
     * The helper text content that will be shown below the checkbox
     */
    helperText?: string;
    /**
     * The id of the input element
     */
    id: string;
    /**
     * Boolean indicating indeterminate status of the checkbox
     */
    indeterminate?: boolean;
    /**
     * The label for the checkbox
     */
    label?: string | React.ReactNode;
    /**
     * Callback fired when the state is changed
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Override or extend the styles applied to the component
     */
    style?: React.CSSProperties;
    /**
     * The value of the component
     */
    value?: string;
    /**
     * Tooltip text for the checkbox
     */
    tooltipText?: string;
    /**
     * Aria-label text for the tooltip
     */
    tooltipLabel?: string;
    /**
     * Aria-label text for the tooltip trigger button
     */
    tooltipButtonLabel?: string;
  }
>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      className,
      disabled = false,
      errorText,
      helperText,
      id,
      indeterminate,
      label,
      onChange = () => null,
      style,
      value,
      tooltipText,
      tooltipLabel,
      tooltipButtonLabel,
      ...rest
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (ref) {
        /**
         * Merge props.ref to the internal ref. This is needed because we need the ref ourself and cannot rely on
         * component user to provide it.
         */
        mergeRefWithInternalRef(ref, inputRef);
      }
      inputRef.current.indeterminate = indeterminate;
    }, [inputRef, ref, indeterminate]);

    if (label && typeof label !== 'string' && typeof label !== 'number') {
      // eslint-disable-next-line no-console
      console.warn(
        'Using ReactElement as a label is against good usability and accessibility practices. Please prefer plain strings.',
      );
    }

    const ariaDescribedBy = composeAriaDescribedBy(id, helperText, errorText, undefined, undefined);
    return (
      <div className={classNames(styles.checkbox, className)} style={style}>
        <input
          ref={inputRef}
          id={id}
          className={classNames(styles.input)}
          onChange={onChange}
          value={value}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          aria-describedby={ariaDescribedBy}
          {...rest}
        />
        <label htmlFor={id} className={classNames(styles.label, !label ? styles.noLabel : '')}>
          {label}
        </label>
        {tooltipText && (
          <Tooltip className={styles.tooltipButton} buttonLabel={tooltipButtonLabel} tooltipLabel={tooltipLabel}>
            {tooltipText}
          </Tooltip>
        )}
        {errorText && (
          <div className={styles.errorText} id={`${id}-error`}>
            {errorText}
          </div>
        )}
        {helperText && (
          <div className={styles.helperText} id={`${id}-helper`}>
            {helperText}
          </div>
        )}
      </div>
    );
  },
);
