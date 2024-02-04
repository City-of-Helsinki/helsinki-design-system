import React, { MouseEventHandler, RefObject } from 'react';

import GroupChild from '../group/GroupChild';
import { TextInput } from '../textInput/TextInput';
import { Notification } from '../notification/Notification';
import { DefaultGroupElementProps } from '../group/utils';
import { RenderGroupChildren } from '../group/utils/renderChildrenAsGroupChildren';
import { IconSearch } from '../../icons';

export function AssistiveText(props: DefaultGroupElementProps) {
  return <GroupChild {...props} renderOnlyWithChildren />;
}

export function Error(props: DefaultGroupElementProps) {
  return <GroupChild {...props} renderOnlyWithChildren as={(elProps) => <Notification type="error" {...elProps} />} />;
}

export function FilterInput(props: DefaultGroupElementProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, onButtonClick, ...rest } = props;
  return (
    <TextInput
      id="ccc"
      buttonAriaLabel="Search for ...inputValue"
      buttonIcon={<IconSearch />}
      clearButtonAriaLabel="Clear search"
      label="Filter options"
      onButtonClick={onButtonClick as MouseEventHandler<HTMLButtonElement>}
      key="keepme"
      {...rest}
    />
  );
}

/*
export function Filter(props: DefaultGroupElementProps) {
  return <GroupChild key="f" {...props} as={(elProps) => <FilterInput key="fc" {...elProps} />} />;
}
*/
export const ListAndInputContainer = RenderGroupChildren((props, controller, childRenderer) => {
  const ref = controller.getMetaData().listContainerRef as RefObject<HTMLDivElement>;
  const { children, ...attr } = props;
  return (
    <div {...attr} ref={ref}>
      {childRenderer(children, controller)}
    </div>
  );
});
