import React from 'react';

import styles from '../Search.module.scss';
import { SearchCustomTheme, SearchDataHandlers } from '../types';
import { DivElementProps } from '../../modularOptionList/types';
import { useFocusHandling } from '../hooks/useFocusHandling';
import { useSearchDataHandlers } from '../hooks/useSearchDataHandlers';
import classNames from '../../../../utils/classNames';
import { useKeyboard } from '../hooks/useKeyboard';
import { useCustomThemes } from '../hooks/useCustomThemes';

function createContainerProps(props: DivElementProps, { getMetaData }: SearchDataHandlers): DivElementProps {
  const { elementIds, themes } = getMetaData();
  const rootThemeClass = themes?.root;
  const checkboxThemeClass = themes?.checkbox;
  const textInputThemeClass = themes?.textInput;
  const clearButtonThemeClass = themes?.clearButton;
  return {
    ...props,
    id: elementIds.container,
    className: classNames(
      props.className,
      styles.wrapper,
      styles.root,
      rootThemeClass,
      checkboxThemeClass,
      textInputThemeClass,
      clearButtonThemeClass,
    ),
  };
}

export const Container = (props: Partial<DivElementProps> & { theme?: SearchCustomTheme }) => {
  const { theme, ...restProps } = props;
  useCustomThemes(theme || {});
  const dataHandlers = useSearchDataHandlers();
  const trackingProps = useFocusHandling();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { clearVirtualFocus, ...keyTrackingProps } = useKeyboard();
  const { children, ...rest } = createContainerProps(restProps as DivElementProps, dataHandlers);
  return (
    <div {...rest} {...trackingProps} {...keyTrackingProps}>
      {children}
    </div>
  );
};
