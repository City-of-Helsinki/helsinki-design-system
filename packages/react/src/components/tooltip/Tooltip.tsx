import React, { useState } from 'react';
import { Transition } from 'react-spring/renderprops.cjs';

import classNames from '../../utils/classNames';
import { IconInfoCircle, IconQuestionCircle, IconCross } from '../../icons';
import styles from './Tooltip.module.css';

export type TooltipProps = React.PropsWithChildren<{
  labelText: string;
  openButtonLabelText: string;
  closeButtonLabelText: string;
  alternative?: boolean;
}>;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  labelText,
  closeButtonLabelText,
  openButtonLabelText,
  alternative = false,
}: TooltipProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        title={isOpen ? closeButtonLabelText : openButtonLabelText}
        aria-label={isOpen ? closeButtonLabelText : openButtonLabelText}
        className={styles.buttonTooltip}
        onClick={() => setOpen(!isOpen)}
      >
        <span aria-hidden="true">
          <IconQuestionCircle className={styles.iconTooltip} />
        </span>
      </button>
      <TooltipTransition open={isOpen}>
        <div className={classNames(styles.tooltip, alternative && styles.alternative)}>
          <div className={styles.label}>
            <span aria-hidden="true">
              <IconInfoCircle className={styles.iconInfo} />
            </span>
            <button
              className={classNames(styles.buttonClose, alternative && styles.alternative)}
              type="button"
              title={closeButtonLabelText}
              aria-label={closeButtonLabelText}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">
                <IconCross className={styles.iconClose} />
              </span>
            </button>
            <span className={styles.labelText}>{labelText}</span>
          </div>
          <div className={styles.tooltipBody}>{children}</div>
        </div>
      </TooltipTransition>
    </div>
  );
};

type TooltipTransitionProps = React.PropsWithChildren<{ open: boolean }>;

const TooltipTransition = ({ children, open }: TooltipTransitionProps) => (
  <Transition
    config={{ tension: 300, friction: 30 }}
    items={open}
    from={{ height: 0 }}
    enter={{ height: 'auto' }}
    leave={{ height: 0 }}
  >
    {(show) => show && ((props) => <div style={{ ...props, ...{ overflowY: 'hidden' } }}>{children}</div>)}
  </Transition>
);

export default Tooltip;
