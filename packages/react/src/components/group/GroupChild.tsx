import React, { ElementType, HTMLAttributes, FC } from 'react';

interface ComponentProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  groupId?: string;
  renderOnlyWithChildren?: boolean;
}

const TagWithChildCheck: FC<ComponentProps> = ({ as: Tag = 'div', ...otherProps }) => {
  // The groupId prop should not leak to the element of React warns about it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { renderOnlyWithChildren, ...rest } = otherProps;
  if (renderOnlyWithChildren && !rest.children) {
    return null;
  }
  return <Tag {...rest} />;
};

const GroupChild: FC<ComponentProps> = (props) => {
  // The groupId prop should not leak to the element of React warns about it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { groupId, ...rest } = props;
  return <TagWithChildCheck {...rest} />;
};

/*
RenderGroupChildren((props, controller, childRenderer) => {
  const { children, ...attr } = props;
  return <div {...attr}>{childRenderer(children, controller)}</div>;
});


const createGroupChild = (tagName: React.ElementType<HTMLElement> = 'div') => {
  return <GroupChild as={tagName} />;
};
*/

export default GroupChild;
