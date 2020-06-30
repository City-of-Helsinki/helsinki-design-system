import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  KeyboardEvent,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
} from 'react';
import { useSelect } from 'downshift';
import { useTransition, animated, UseTransitionProps } from 'react-spring';

import styles from './NavigationDropdown.module.css';
import classNames from '../../../utils/classNames';
import { IconAngleDown } from '../../../icons';
import NavigationContext from '../NavigationContext';

const DROPDOWN_TRANSITION: UseTransitionProps = {
  from: { transform: 'translate3d(0, -2px, 0)', opacity: 0.75 },
  enter: { transform: 'translate3d(0, 10px, 0)', opacity: 1 },
  config: {
    friction: 30,
    tension: 300,
  },
};

type NavigationDropdownProps = PropsWithChildren<{
  /**
   * If `true`, the dropdown will be marked as active
   */
  active?: boolean;
  /**
   * If `true`, the dropdown will be animated when opened
   */
  animateOpen?: boolean;
  /**
   * Used to label the toggle button and the menu
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply to the dropdown
   */
  className?: string;
  /**
   * Icon to display in the dropdown
   */
  icon?: ReactNode;
  /**
   * Dropdown id
   */
  id?: string;
  /**
   * The label for the dropdown
   */
  label?: string | ReactNode;
}>;

/**
 * Handles dropdown item selection
 * @param event
 * @param highlightedIndex
 */
const handleSelect = (event: KeyboardEvent<HTMLElement>, highlightedIndex: number): void => {
  // we need to programmatically click the selected item component
  if (event.key === 'Enter' || event.key === 'Space') {
    // menu child nodes
    const { childNodes } = event.target as HTMLUListElement;
    // get the selected option based on highlightedIndex
    const selectedOption = (childNodes.item(highlightedIndex) as HTMLLIElement)?.firstChild as HTMLElement;
    // eslint-disable-next-line no-unused-expressions
    selectedOption?.click();
  }
};

const NavigationDropdown: FC<NavigationDropdownProps> = ({
  active,
  animateOpen = true,
  ariaLabel = '',
  children,
  className,
  icon = null,
  id,
  label = '',
}) => {
  const { isMobile } = useContext(NavigationContext);
  const toggleButtonRef = useRef(null);
  // add class name to every option, so that they can be styled
  const childrenWithClassName = Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, { className: `${styles.option} option` }) : child,
  );

  const focusToggleButton = () => {
    console.log('NavDD focusToggleButton');
    return toggleButtonRef.current?.focus();
  };

  // init select
  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    reset,
  } = useSelect<ReactNode>({
    // todo: remove
    // isOpen: true,
    id,
    items: childrenWithClassName || [],
    onSelectedItemChange: () => {
      console.log('NavDD onSelectedItemChange');
      reset();
      focusToggleButton();
    },
  });

  // menu transition
  const transitionProps = animateOpen && !isMobile ? DROPDOWN_TRANSITION : {};
  const menuTransition = useTransition(isOpen, transitionProps);

  return (
    <div
      className={classNames(
        `${styles.navigationDropdown} navigationDropdown`,
        isOpen && styles.open,
        isMobile && styles.mobile,
        className,
      )}
    >
      <label
        {...getLabelProps({
          className: styles.srLabel,
        })}
      >
        {ariaLabel}
      </label>
      {/* WRAPPER */}
      <div className={`${styles.wrapper} dropdownWrapper`}>
        <button
          type="button"
          {...getToggleButtonProps({
            ...(active && { 'aria-current': 'page' }),
            className: classNames(`${styles.dropdownButton} dropdownButton`, styles.placeholder),
            ref: toggleButtonRef,
            refKey: 'ref',
          })}
        >
          {icon}
          <span className={`${styles.label} dropdownButtonLabel`}>{label}</span>
          <IconAngleDown className={`${styles.angleIcon} dropdownAngleIcon`} />
        </button>
      </div>
      {/* MENU */}
      {menuTransition((values, open) => (
        <animated.ul
          style={values}
          {...getMenuProps({
            className: `${styles.menu} menu`,
            onKeyDown: (event) => {
              console.log('event', event);
              handleSelect(event, highlightedIndex);
            },
          })}
        >
          {open &&
            childrenWithClassName.map((item, index) => (
              <li
                {...getItemProps({
                  key: `item-${index}`,
                  index,
                  item,
                  className: classNames(
                    `${styles.menuItem} menuItem`,
                    highlightedIndex === index && `${styles.highlighted} highlighted`,
                  ),
                })}
              >
                {item}
              </li>
            ))}
        </animated.ul>
      ))}
    </div>
  );
};

export default NavigationDropdown;
