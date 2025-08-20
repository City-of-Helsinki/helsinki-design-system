import React from 'react';

import styles from '../Select.module.scss';
import { SelectCustomTheme, SelectDataHandlers } from '../types';
import { DivElementProps } from '../../modularOptionList/types';
import { useFocusHandling } from '../hooks/useFocusHandling';
import { useSelectDataHandlers } from '../hooks/useSelectDataHandlers';
import classNames from '../../../../utils/classNames';
import { useKeyboard } from '../hooks/useKeyboard';
import { useCustomThemes } from '../hooks/useCustomThemes';

function createContainerProps(props: DivElementProps, { getMetaData }: SelectDataHandlers): DivElementProps {
  const { elementIds, themes } = getMetaData();
  const rootThemeClass = themes.root;
  const checkboxThemeClass = themes.checkbox;
  const tagThemeClass = themes.tag;
  const inputThemeClass = themes.textInput;
  const showAllThemeClass = themes.showAllButton;
  const clearAllThemeClass = themes.clearAllButton;
  return {
    ...props,
    id: elementIds.container,
    className: classNames(
      props.className,
      styles.wrapper,
      styles.root,
      rootThemeClass,
      checkboxThemeClass,
      tagThemeClass,
      inputThemeClass,
      showAllThemeClass,
      clearAllThemeClass,
    ),
  };
}

export const Container = (props: Partial<DivElementProps> & { theme?: SelectCustomTheme }) => {
  const { theme, ...restProps } = props;
  useCustomThemes(theme);
  const dataHandlers = useSelectDataHandlers();
  const trackingProps = useFocusHandling();
  const keyTrackingProps = useKeyboard();
  const { children, ...rest } = createContainerProps(restProps, dataHandlers);
  return (
    <div {...rest} {...trackingProps} {...keyTrackingProps}>
      {children}
    </div>
  );
};
