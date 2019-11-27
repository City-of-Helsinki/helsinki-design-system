import React from 'react';
import { Transition } from 'react-spring/renderprops.cjs';

import styles from './TextInputTooltip.module.css';
import IconInfo from '../../icons/IconInfo';

export type TextInputTooltipProps = React.PropsWithChildren<{
  open: boolean;
  labelText: string;
  alternative?: boolean;
}>;

export default ({ children, open, labelText, alternative = false }: TextInputTooltipProps) => (
  <TooltipTransition open={open}>
    <div className={[styles.tooltip, alternative && styles.alternative].filter(e => e).join(' ')}>
      <div className={styles.label}>
        <IconInfo className={styles.iconInfo} />
        <span className={styles.labelText}>{labelText}</span>
      </div>
      <div className={styles.bodyText}>{children}</div>
    </div>
  </TooltipTransition>
);

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
