import React, { useEffect, useRef, useState } from 'react';
import { Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';

// import core base styles
import 'hds-core';
import styles from './Tooltip.module.scss';
import { IconQuestionCircle } from '../../icons/ui/IconQuestionCircle';
import classNames from '../../utils/classNames';

type TooltipProps = React.PropsWithChildren<{
  /**
   * Boolean indicating whether tooltip has box shadow or not.
   */
  boxShadow?: boolean;
  /**
   * The placement of the tooltip.
   */
  placement?: Placement;
  /**
   * Use the small tooltip variant.
   */
  small?: boolean;
  /**
   * Aria-label text for the tooltip trigger button.
   */
  buttonLabel?: string;
  /**
   * Aria-label text for the tooltip.
   */
  tooltipLabel?: string;
  /**
   * Additional wrapper class names.
   */
  className?: string;
  /**
   * Additional button class names.
   */
  buttonClassName?: string;
  /**
   * Additional tooltip class names.
   */
  tooltipClassName?: string;
}>;

export const Tooltip = ({
  boxShadow = false,
  children,
  placement = 'auto',
  small = false,
  buttonLabel = 'Tooltip',
  tooltipLabel = 'Tooltip',
  className,
  buttonClassName,
  tooltipClassName,
}: TooltipProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [arrowRef, setArrowRef] = useState(null); // The ref for the arrow must be a callback ref

  // Initialize Popper.js
  const { styles: popperStyles, attributes: popperAttributes, forceUpdate: updatePopper } = usePopper(
    buttonRef.current,
    tooltipRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowRef,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    },
  );

  // Calculate popper dimensions after tooltip is opened
  useEffect(() => {
    if (updatePopper !== null && isTooltipOpen === true) {
      updatePopper();
    }
  }, [isTooltipOpen, updatePopper]);

  // Toggle tooltip on button click
  const onButtonClick = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  // Handle additional event listeners
  useEffect(() => {
    // Close with ESC key
    const handleEscKey = (event: KeyboardEvent) => {
      const key = event.key || event.keyCode;
      if (isTooltipOpen && (key === 'Escape' || key === 'Esc' || key === 27)) {
        setIsTooltipOpen(false);
      }
    };
    // Clicks outside the component
    const handleOutsideClick = (event: Event) => {
      const target = event.target as Node;
      if (isTooltipOpen && !buttonRef.current.contains(target) && !tooltipRef.current.contains(target)) {
        setIsTooltipOpen(false);
      }
    };
    document.addEventListener('keyup', handleEscKey);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('keyup', handleEscKey);
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div className={classNames(styles.root, className)}>
      <button
        ref={buttonRef}
        type="button"
        className={classNames(styles.button, buttonClassName)}
        title={buttonLabel}
        aria-label={buttonLabel}
        aria-expanded={isTooltipOpen}
        onClick={onButtonClick}
      >
        <span aria-hidden="true">
          <IconQuestionCircle />
        </span>
      </button>
      {isTooltipOpen && (
        <section
          aria-label={tooltipLabel}
          ref={tooltipRef}
          className={classNames(styles.tooltip, small && styles.small, boxShadow && styles.boxShadow, tooltipClassName)}
          style={popperStyles.popper}
          {...popperAttributes.popper}
        >
          {children}
          <div ref={setArrowRef} className={styles.arrow} style={popperStyles.arrow} {...popperAttributes.arrow} />
        </section>
      )}
    </div>
  );
};
