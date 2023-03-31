import React, { FC, MouseEventHandler } from 'react';

import { Button } from '../button';
import classNames from '../../utils/classNames';
import 'hds-core';
import styles from './StepByStep.module.scss';
import { Link } from '../link';

type StepLinkType = {
  href: string;
  onClick?: MouseEventHandler;
  children: React.ReactNode;
};

type StepButtonType = {
  href?: string;
  onClick?: MouseEventHandler;
  children: React.ReactNode;
};

type StepType = {
  title: string;
  description?: JSX.Element | string;
  links?: Array<StepLinkType>;
  buttons?: Array<StepButtonType>;
};

type StepByStepPropsType = {
  /**
   * Additional class names to apply to the status label
   */
  className?: string;

  /**
   * Title text for the step by step component.
   */
  title?: string;

  /**
   * Help text for the step by stemp component. Displayed under the `title` property.
   */
  helpText?: string;

  /**
   * Steps for the step by step component.
   */
  steps: Array<StepType>;

  /**
   * Boolean indicating whether the steps are numbered.
   */
  numberedList?: boolean;

  /**
   * Header level for the main heading. The steps' headers get a level of headerLevel+1
   */
  headerLevel?: number;
};

const getButtonOrLinkRenderer = (Tag) => ({ children, ...props }) => (
  <p>
    <Tag {...props}>{children}</Tag>
  </p>
);

const renderLink = getButtonOrLinkRenderer(Link);
const renderButton = getButtonOrLinkRenderer(Button);

const StepComponent = ({
  title,
  description,
  buttons = [],
  links = [],
  headerLevel,
}: StepType & { headerLevel: number }) => {
  const titleComponent = title && React.createElement(`h${headerLevel}`, { className: styles.stepItem__title }, title);

  return (
    <li className={styles.stepItem}>
      {titleComponent}
      <div className={styles.stepItem__description}>
        {description && <p>{description}</p>}
        {buttons.map(renderButton)}
        {links.map(renderLink)}
      </div>
    </li>
  );
};

export const StepByStep: FC<StepByStepPropsType> = ({
  className,
  title,
  helpText,
  steps = [],
  numberedList = false,
  headerLevel = 2,
}) => {
  const wrapperClassName = classNames(styles.container, className);
  const titleComponent = title && React.createElement(`h${headerLevel}`, { className: styles.title }, title);

  return (
    <div className={wrapperClassName}>
      <header className={styles.header}>
        {titleComponent}
        <p className={styles.description}>{helpText}</p>
      </header>
      {React.createElement(
        numberedList ? 'ol' : 'ul',
        { className: styles.stepsContainer },
        steps.map((step) => <StepComponent {...step} headerLevel={headerLevel + 1} />),
      )}
    </div>
  );
};
