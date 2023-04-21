import React, { FC } from 'react';

// import base styles
import '../../styles/base.css';

import { Button, ButtonProps } from '../button';
import classNames from '../../utils/classNames';
import { Link, LinkProps } from '../link';
import styles from './StepByStep.module.scss';

type StepType = {
  /**
   * List of native button objects for the step.
   */
  buttons?: Array<ButtonProps>;
  /**
   * Step description.
   */
  description?: JSX.Element | string;
  /**
   * List of native link objects for the step.
   */
  links?: Array<LinkProps>;
  /**
   * Step title.
   */
  title: string;
};

type StepByStepPropsType = {
  /**
   * Additional class names to apply to the container element.
   */
  className?: string;

  /**
   * Class name for the main heading.
   */
  headerClassName?: string;

  /**
   * Header level for the main heading.
   * @default 2
   */
  headerLevel?: number;

  /**
   * Help text for the step by step component. Displayed under the `title` property.
   */
  helpText?: string;

  /**
   * Boolean indicating whether the steps are numbered.
   */
  numberedList?: boolean;

  /**
   * Steps for the step by step component.
   */
  steps: Array<StepType>;

  /**
   * Title text for the step by step component.
   */
  title?: string;
};

const getButtonOrLinkRenderer = (Tag) => ({ children, ...props }) => (
  <p>
    <Tag {...props}>{children}</Tag>
  </p>
);

const renderLink = getButtonOrLinkRenderer(Link);
const renderButton = getButtonOrLinkRenderer(Button);

const StepComponent = ({ title, description, buttons = [], links = [] }: StepType) => {
  return (
    <li className={styles.stepItem}>
      <p className={styles.stepItemTitle}>{title}</p>
      <div>
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
  headerClassName,
  headerLevel = 2,
}) => {
  const wrapperClassName = classNames(styles.container, className);
  const titleComponent =
    title && React.createElement(`h${headerLevel}`, { className: classNames(styles.title, headerClassName) }, title);

  return (
    <div className={wrapperClassName}>
      <div>
        {titleComponent}
        <p className={styles.description}>{helpText}</p>
      </div>
      {React.createElement(
        numberedList ? 'ol' : 'ul',
        { className: styles.stepsContainer },
        steps.map((step) => <StepComponent {...step} />),
      )}
    </div>
  );
};
