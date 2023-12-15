import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBarItem, HeaderActionBarItemProps } from './HeaderActionBarItem';

const clickHandler = jest.fn();

const defaultLabel = 'button label';
const fakeIconTestId = 'fake-icon-test-id';
const defaultIcon = <span data-testid={fakeIconTestId} />;
const activeStateLabel = 'close label';
const activeStateIconTestId = 'close-icon-test-id';
const activeStateIcon = <span data-testid={activeStateIconTestId} />;
const ariaControlsId = 'aria-controls-id';
const ariaLabel = 'aria label';

const defaultProps: HeaderActionBarItemProps = {
  onClick: clickHandler,
  label: defaultLabel,
  icon: defaultIcon,
  'aria-expanded': false,
  'aria-label': ariaLabel,
  'aria-controls': ariaControlsId,
  labelOnRight: false,
  fixedRightPosition: false,
  isActive: false,
};

const activeStateProps: Pick<HeaderActionBarItemProps, 'activeStateIcon' | 'activeStateLabel'> = {
  activeStateLabel,
  activeStateIcon,
};

const RenderTestScenario = (props?: Partial<HeaderActionBarItemProps> & JSX.IntrinsicElements['button']) => {
  const ref = useRef<HTMLButtonElement>(null);
  const combinedProps = { ...defaultProps, ...props };
  return <HeaderActionBarItem {...combinedProps} ref={ref} data-testid="button" />;
};

describe('HeaderActionBarItem spec', () => {
  it('renders the component correctly and adds all classNames from props', () => {
    const { asFragment } = render(
      <RenderTestScenario labelOnRight fixedRightPosition className="extra-class" {...activeStateProps} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<RenderTestScenario />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Label and icon are set', async () => {
    const { getByText, getAllByTestId } = render(<RenderTestScenario />);
    expect(() => getByText(defaultLabel)).not.toThrow();
    expect(() => getAllByTestId(fakeIconTestId)).not.toThrow();
  });
  it('Aria attributes are set', async () => {
    const { getByTestId } = render(<RenderTestScenario aria-expanded />);
    const button = getByTestId('button') as HTMLElement;
    expect(button.getAttribute('aria-label')).toBe(ariaLabel);
    expect(button.getAttribute('aria-controls')).toBe(ariaControlsId);
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });
  it('ActiveState content is rendered when "isActive" is true and "activeStateLabel" or "activeStateIcon" are passed', async () => {
    const { getByText, getAllByTestId } = render(<RenderTestScenario isActive {...activeStateProps} />);
    expect(() => getByText(defaultLabel)).not.toThrow();
    expect(() => getAllByTestId(fakeIconTestId)).not.toThrow();
    expect(() => getByText(activeStateLabel)).not.toThrow();
    expect(() => getAllByTestId(activeStateIconTestId)).not.toThrow();
  });
  it('ActiveState content is also rendered when isActive is false and "activeStateLabel" or "activeStateIcon" are passed', async () => {
    const { getByText, getAllByTestId } = render(<RenderTestScenario {...activeStateProps} />);
    expect(() => getByText(defaultLabel)).not.toThrow();
    expect(() => getAllByTestId(fakeIconTestId)).not.toThrow();
    expect(() => getByText(activeStateLabel)).not.toThrow();
    expect(() => getAllByTestId(activeStateIconTestId)).not.toThrow();
  });
  it('ActiveState content is not rendered even if isActive is true, but neither "activeStateLabel" or "activeStateIcon" are passed', async () => {
    const { getByText, getAllByTestId } = render(<RenderTestScenario isActive />);
    expect(() => getByText(defaultLabel)).not.toThrow();
    expect(() => getAllByTestId(fakeIconTestId)).not.toThrow();
    expect(() => getByText(activeStateLabel)).toThrow();
    expect(() => getAllByTestId(activeStateIconTestId)).toThrow();
  });
});
