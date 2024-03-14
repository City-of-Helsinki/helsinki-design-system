import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Select } from './Select';
import { IconLocation } from '../../icons';

describe('<Select />', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  describe('spec', () => {
    const Wrapped = () => {
      return <Select options={options} label="Label" placeholder="Choose one" icon={<IconLocation />} />;
    };
    it('renders the component', () => {
      const { asFragment } = render(<Wrapped />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<Wrapped />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe('List is opened', () => {
    const selectId = 'select-component';
    const getMainButtonElementId = () => `${selectId}-main-button`;
    const getListElementId = () => `${selectId}-list`;

    const renderWithHelpers = () => {
      const result = render(
        <Select options={options} label="Label" placeholder="Choose one" icon={<IconLocation />} id={selectId} />,
      );

      const getElementById = (id: string) => {
        return result.container.querySelector(`#${id}`) as HTMLElement;
      };

      const clickButton = (id: string) => {
        const el = getElementById(id);
        fireEvent.click(el);
      };

      const getListItemLabels = () => {
        const list = getElementById(getListElementId());
        return Array.from(list.querySelectorAll('li')).map((node) => node.innerHTML);
      };

      const isListOpen = (): boolean => {
        const toggler = getElementById(getMainButtonElementId()) as HTMLElement;
        const list = getElementById(getListElementId());
        return String(toggler.getAttribute('aria-expanded')) === 'true' && !!list;
      };

      const openList = async () => {
        clickButton(getMainButtonElementId());
        await waitFor(() => {
          expect(isListOpen()).toBeTruthy();
        });
      };

      return {
        ...result,
        openList,
        isListOpen,
        getListItemLabels,
      };
    };
    it('list opens via button click', async () => {
      const { openList, getListItemLabels } = renderWithHelpers();
      await openList();
      const listItems = getListItemLabels();
      options.forEach((label, i) => {
        expect(listItems[i]).toBe(label);
      });
    });
  });
});
