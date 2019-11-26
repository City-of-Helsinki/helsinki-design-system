import React from 'react';
import { Transition } from 'react-spring/renderprops';

import Notification from '../notification/Notification';

export type TextInputTooltipProps = React.PropsWithChildren<{
  open: boolean;
  labelText: string;
  onClickClose: () => void;
  alternative?: boolean;
}>;

export default ({ children, open, labelText, onClickClose, alternative = false }: TextInputTooltipProps) => (
  <Transition
    config={{ tension: 300, friction: 30 }}
    items={open}
    from={{ height: 0 }}
    enter={{ height: 'auto' }}
    leave={{ height: 0 }}
  >
    {show =>
      show &&
      (props => (
        <div style={{ ...props, ...{ overflowY: 'hidden' } }}>
          <Notification alternative={alternative} labelText={labelText} onClickClose={() => onClickClose()}>
            {children}
          </Notification>
        </div>
      ))
    }
  </Transition>
);
