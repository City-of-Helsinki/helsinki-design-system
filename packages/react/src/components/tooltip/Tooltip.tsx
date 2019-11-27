import React, { useState } from 'react';
import { Transition } from 'react-spring/renderprops.cjs';

import IconInfo from '../../icons/IconInfo';
import IconTooltip from '../../icons/IconTooltip';
import styles from './Tooltip.module.css';
import IconClose from '../../icons/IconClose';

export type TooltipProps = React.PropsWithChildren<{
  labelText: string;
  alternative?: boolean;
}>;

export default ({ children, labelText, alternative = false }: TooltipProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={styles.buttonTooltip} onClick={() => setOpen(!isOpen)}>
        <IconTooltip className={styles.iconTooltip} />
      </button>
      <TooltipTransition open={isOpen}>
        <div className={[styles.tooltip, alternative && styles.alternative].filter(e => e).join(' ')}>
          <div className={styles.label}>
            <IconInfo className={styles.iconInfo} />
            <button
              className={[styles.buttonClose, alternative && styles.alternative].filter(e => e).join(' ')}
              type="button"
              onClick={() => setOpen(false)}
            >
              <IconClose className={styles.iconClose} />
            </button>
            <span className={styles.labelText}>{labelText}</span>
          </div>
          <div className={styles.tooltipBody}>{children}</div>
        </div>
      </TooltipTransition>
    </>
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
    {show => show && (props => <div style={{ ...props, ...{ overflowY: 'hidden' } }}>{children}</div>)}
  </Transition>
);
