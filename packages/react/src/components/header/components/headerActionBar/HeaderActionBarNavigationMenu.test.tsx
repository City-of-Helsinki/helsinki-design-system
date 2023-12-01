import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { getActiveElement } from '../../../cookieConsent/test.util';
import { Header } from '../../Header';
// eslint-disable-next-line jest/no-mocks-import
import mockWindowLocation from '../../../login/__mocks__/mockWindowLocation';

jest.mock('../../../../hooks/useMediaQuery', () => ({
  ...(jest.requireActual('../../../../hooks/useMediaQuery') as Record<string, unknown>),
  useMediaQueryLessThan: () => {
    // if this returns true, mobile menu is rendered.
    return true;
  },
}));

type MenuItem = {
  id: string;
  submenus?: MenuItem[];
};

type TestTools = RenderResult & {
  openMobileMenu: () => Promise<void>;
  closeMobileMenu: () => Promise<void>;
  findVisibleSectionLinksByMenuIds: (menuIds: string[]) => Promise<HTMLElement[]>;
  getNavSections: () => ReturnType<HTMLElement['querySelectorAll']>;
  getActiveLink: () => HTMLAnchorElement;
  getPreviousLink: () => HTMLAnchorElement | null;
  selectMenuItem: (menuItem: MenuItem) => Promise<HTMLElement[]>;
  verifyActiveItem: (menuItem: MenuItem | string) => boolean;
  verifyPreviousItem: (menuItem: MenuItem | string | null) => boolean;
  triggerAnimationEnd: (focusedItem: MenuItem | string) => Promise<void>;
  getFocusedElement: () => Element | null;
  navigateTo: (menuItem: MenuItem) => Promise<void>;
  navigateBack: (waitForParentItem: MenuItem | string) => Promise<void>;
};

const mockedWindowControls = mockWindowLocation();

const onClickTracker = jest.fn();

const onClickHandler = (e: React.MouseEvent) => {
  e.preventDefault();
  onClickTracker(e);
};

const frontPageLabel = 'frontPageLabel';
const titleHref = 'https://domain.fi';

const menus: MenuItem[] = [
  {
    id: '0',
    submenus: [
      {
        id: '0_0',
        submenus: [{ id: '0_0_0' }, { id: '0_0_1' }],
      },
      {
        id: '0_1',
      },
      {
        id: '0_2',
        submenus: [{ id: '0_2_0' }, { id: '0_2_1' }, { id: '0_2_2' }],
      },
    ],
  },
  {
    id: '1',
    submenus: [
      {
        id: '1_0',
        submenus: [{ id: '1_0_0' }, { id: '1_0_1' }, { id: '1_0_2' }],
      },
    ],
  },
  {
    id: '2',
  },
  {
    id: '3',
    submenus: [
      {
        id: '3_0',
      },
      {
        id: '3_1',
        submenus: [{ id: '3_1_0' }, { id: '3_1_1' }, { id: '3_1_2' }],
      },
      {
        id: '3_2',
        submenus: [{ id: '3_2_0' }, { id: '3_2_1' }, { id: '3_2_2' }],
      },
    ],
  },
];

const getMenuItem = (path: number[]): MenuItem => {
  return path.reduce(
    (current, index) => {
      return (current.submenus as MenuItem[])[index] as MenuItem;
    },
    { submenus: menus } as MenuItem,
  );
};

const createLabel = (id: string) => `TestLabel_${id}`;
const createHref = (id: string) => `http://test-link-${id}.com`;

const HeaderWithMenus = () => {
  return (
    <Header>
      <Header.ActionBar
        title="title"
        frontPageLabel={frontPageLabel}
        titleAriaLabel="titleAriaLabel"
        titleHref={titleHref}
        logo={<span />}
        logoAriaLabel="logoAriaLabel"
        logoHref="https://hel.fi"
        menuButtonAriaLabel="menuButtonAriaLabel"
        openFrontPageLinksAriaLabel="openFrontPageLinksAriaLabel"
      >
        ActionBar
      </Header.ActionBar>
      <Header.NavigationMenu>
        {menus.map((item) => {
          // these mappings are a bit akward way to create link structure,
          // but NavigationMenu child components are cloned and their props are copied and re-used,
          // so cannot use other components or funcs to return components for dropdownLinks.
          return (
            <Header.Link
              key={item.id}
              label={createLabel(item.id)}
              href={createHref(item.id)}
              onClick={(event) => {
                onClickHandler(event);
              }}
              dropdownLinks={
                item.submenus
                  ? item.submenus.map((i) => (
                      <Header.Link
                        key={i.id}
                        label={createLabel(i.id)}
                        href={createHref(i.id)}
                        onClick={(event) => {
                          onClickHandler(event);
                        }}
                        dropdownLinks={
                          i.submenus
                            ? i.submenus.map((jj) => (
                                <Header.Link
                                  key={jj.id}
                                  label={createLabel(jj.id)}
                                  href={createHref(jj.id)}
                                  onClick={(event) => {
                                    onClickHandler(event);
                                  }}
                                />
                              ))
                            : undefined
                        }
                      />
                    ))
                  : undefined
              }
            />
          );
        })}
      </Header.NavigationMenu>
    </Header>
  );
};

const renderHeader = (): TestTools => {
  const result = render(HeaderWithMenus());
  const { container, getByText, getAllByText } = result;

  const getNavSections: TestTools['getNavSections'] = () => container.querySelectorAll('section > nav');
  const isElementAriaHidden = (el: Element) => el.getAttribute('aria-hidden') === 'true';

  const isElementAriaVisible = (el: Element) => !isElementAriaHidden(el);
  const getDropdownButtonForLink = (el: Element) => el.parentElement?.querySelector('button') as HTMLButtonElement;
  const getVisibleNav = () => {
    return Array.from(getNavSections()).find((el) =>
      isElementAriaVisible(el.parentElement as HTMLElement),
    ) as HTMLElement;
  };
  const toggleMobileMenu = async (shouldBeOpen: boolean) => {
    const menuButton = getByText('Menu') as HTMLButtonElement;
    fireEvent.click(menuButton);
    await waitFor(() => {
      const isClosed = getNavSections().length === 0;
      if (isClosed === shouldBeOpen) {
        throw new Error('Navigation element mismatch');
      }
    });
  };

  const openMobileMenu: TestTools['openMobileMenu'] = async () => {
    await toggleMobileMenu(true);
  };

  const closeMobileMenu: TestTools['closeMobileMenu'] = async () => {
    await toggleMobileMenu(false);
  };

  const findVisibleSectionLinksByMenuIds: TestTools['findVisibleSectionLinksByMenuIds'] = async (menuIds) => {
    const visibleNav = getVisibleNav();
    // ignore links listed in activeListItem. They are invisible.
    const activeListItem = visibleNav.querySelector('li.activeListItem');
    return waitFor(() => {
      return menuIds.map((id) => {
        const hits = getAllByText(createLabel(id)).filter(
          (el) => visibleNav.contains(el) && (!activeListItem || !activeListItem.contains(el)),
        );
        if (hits.length !== 1) {
          throw new Error(`Label ${createLabel(id)} is found in ${hits.length} elements`);
        }
        return hits[0];
      });
    });
  };

  const getActiveLink: TestTools['getActiveLink'] = () => {
    const visibleNav = getVisibleNav();
    return visibleNav.querySelector('a.activeMobileLink') as HTMLAnchorElement;
  };

  const getPreviousLink: TestTools['getPreviousLink'] = () => {
    const visibleNav = getVisibleNav();
    return visibleNav.querySelector('span.previousMobileLink') as HTMLAnchorElement;
  };

  const selectMenuItem: TestTools['selectMenuItem'] = async (item) => {
    if (!item.submenus) {
      return Promise.reject(new Error('Menu item has no submenus'));
    }
    const links = await findVisibleSectionLinksByMenuIds([item.id]);
    if (links.length !== 1) {
      return Promise.reject(new Error(`Menu item ${item.id} not found`));
    }
    const getCurrentNavIndex = () => {
      const currentNav = getVisibleNav();
      const index = Array.from(getNavSections()).indexOf(currentNav);
      if (index === -1) {
        throw new Error('getCurrentNavIndex is -1');
      }
      return index;
    };
    const currentIndex = getCurrentNavIndex();
    fireEvent.click(getDropdownButtonForLink(links[0]));
    await waitFor(() => {
      if (getCurrentNavIndex() === currentIndex) {
        throw new Error('Current nav not changed.');
      }
    });
    return findVisibleSectionLinksByMenuIds(item.submenus.map((subItem) => subItem.id));
  };

  const verifyActiveItem: TestTools['verifyActiveItem'] = (itemOrString) => {
    const activeLink = getActiveLink();
    const comparison = typeof itemOrString === 'string' ? itemOrString : createLabel(itemOrString.id);
    // console.log('vai', activeLink.innerHTML, comparison);
    return activeLink.innerHTML === comparison;
  };

  const verifyPreviousItem: TestTools['verifyPreviousItem'] = (itemOrString) => {
    const previousLink = getPreviousLink();
    if (!itemOrString) {
      return !previousLink;
    }
    const comparison = typeof itemOrString === 'string' ? itemOrString : createLabel(itemOrString.id);
    return !!previousLink && previousLink.innerHTML === comparison;
  };

  const getFocusedElement: TestTools['getFocusedElement'] = () => {
    return getActiveElement(container);
  };

  const triggerAnimationEnd: TestTools['triggerAnimationEnd'] = (focusedItemOrString) => {
    const getFocusedElementContents = () => {
      const el = getFocusedElement();
      return el ? el.innerHTML : '';
    };
    const expectedFocusedElementContents =
      typeof focusedItemOrString === 'string' ? focusedItemOrString : createLabel(focusedItemOrString.id);
    const animatedElement = (container.querySelector('section') as HTMLElement).parentElement as HTMLElement;
    // For some reasong event will not be triggered without bubbles
    const ev = new Event('transitionend', { bubbles: true });
    // "propertyName" will not end up to the component in any other way than setting it to the object
    // @ts-ignore
    ev.propertyName = 'transform';
    fireEvent(animatedElement, ev);
    return waitFor(() => {
      if (getFocusedElementContents() !== expectedFocusedElementContents) {
        throw new Error('Focus is not in correct element');
      }
    });
  };

  const navigateTo: TestTools['navigateTo'] = async (item) => {
    await selectMenuItem(item);
    await triggerAnimationEnd(item);
    if (verifyActiveItem(item) !== true) {
      throw new Error('Active item is not set');
    }
  };

  const navigateBack: TestTools['navigateBack'] = async (waitForParentItemOrString) => {
    const previousLink = getPreviousLink() as HTMLElement;
    fireEvent.click(previousLink);
    await triggerAnimationEnd(waitForParentItemOrString);
  };

  return {
    ...result,
    openMobileMenu,
    closeMobileMenu,
    findVisibleSectionLinksByMenuIds,
    getNavSections,
    getActiveLink,
    selectMenuItem,
    verifyActiveItem,
    triggerAnimationEnd,
    getFocusedElement,
    getPreviousLink,
    verifyPreviousItem,
    navigateTo,
    navigateBack,
  };
};

afterEach(async () => {
  mockedWindowControls.reset();
  jest.resetAllMocks();
});

afterAll(() => {
  mockedWindowControls.restore();
});

describe('<HeaderActionBarNavigationMenu /> spec', () => {
  it('renders the component and menu can be opened', async () => {
    const { openMobileMenu, asFragment } = renderHeader();
    await openMobileMenu();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues when menu is open', async () => {
    const { container, openMobileMenu } = renderHeader();
    await openMobileMenu();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have basic accessibility issues when user has navigated to the deepest level is open', async () => {
    const { container, openMobileMenu, navigateTo } = renderHeader();
    await openMobileMenu();
    await navigateTo(getMenuItem([0]));
    await navigateTo(getMenuItem([0, 2]));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    // this can take a long time so increased timeout
  }, 10000);

  it('When mobile menu is opened, first level links are shown', async () => {
    const { openMobileMenu, findVisibleSectionLinksByMenuIds, getNavSections } = renderHeader();
    await openMobileMenu();
    await findVisibleSectionLinksByMenuIds(menus.map((item) => item.id));
    expect(getNavSections()).toHaveLength(1);
  });
  it('Nav sections are rendered only when needed and removed when not needed', async () => {
    const { openMobileMenu, navigateTo, getNavSections, navigateBack, closeMobileMenu } = renderHeader();
    expect(getNavSections()).toHaveLength(0);
    await openMobileMenu();
    expect(getNavSections()).toHaveLength(1);
    await navigateTo(getMenuItem([0]));
    expect(getNavSections()).toHaveLength(2);
    await navigateTo(getMenuItem([0, 2]));
    expect(getNavSections()).toHaveLength(3);
    await navigateBack(getMenuItem([0]));
    expect(getNavSections()).toHaveLength(2);
    await navigateBack(frontPageLabel);
    expect(getNavSections()).toHaveLength(1);
    await closeMobileMenu();
    expect(getNavSections()).toHaveLength(0);
  });
  it('Previous and active links change while navigating', async () => {
    const {
      openMobileMenu,
      navigateTo,
      getNavSections,
      navigateBack,
      verifyActiveItem,
      verifyPreviousItem,
    } = renderHeader();
    const menu3 = getMenuItem([3]);
    const menu31 = getMenuItem([3, 1]);
    const menu32 = getMenuItem([3, 2]);
    const menu0 = getMenuItem([0]);
    const menu02 = getMenuItem([0, 2]);
    expect(getNavSections()).toHaveLength(0);
    await openMobileMenu();
    expect(verifyActiveItem(frontPageLabel)).toBeTruthy();
    expect(verifyPreviousItem(null)).toBeTruthy();

    await navigateTo(menu3);
    expect(verifyActiveItem(menu3)).toBeTruthy();
    expect(verifyPreviousItem(frontPageLabel)).toBeTruthy();

    await navigateTo(menu31);
    expect(verifyActiveItem(menu31)).toBeTruthy();
    expect(verifyPreviousItem(menu3)).toBeTruthy();

    await navigateBack(menu3);
    expect(verifyActiveItem(menu3)).toBeTruthy();
    expect(verifyPreviousItem(frontPageLabel)).toBeTruthy();

    await navigateTo(menu32);
    expect(verifyActiveItem(menu32)).toBeTruthy();
    expect(verifyPreviousItem(menu3)).toBeTruthy();

    await navigateBack(menu3);
    await navigateBack(frontPageLabel);
    expect(verifyActiveItem(frontPageLabel)).toBeTruthy();
    expect(verifyPreviousItem(null)).toBeTruthy();

    await navigateTo(menu0);
    expect(verifyActiveItem(menu0)).toBeTruthy();
    expect(verifyPreviousItem(frontPageLabel)).toBeTruthy();

    await navigateTo(menu02);
    expect(verifyActiveItem(menu02)).toBeTruthy();
    expect(verifyPreviousItem(menu0)).toBeTruthy();

    await navigateBack(menu0);
    await navigateBack(frontPageLabel);
    expect(verifyActiveItem(frontPageLabel)).toBeTruthy();
    expect(verifyPreviousItem(null)).toBeTruthy();
  });
  it('If the top level active link is clicked, menu is closed.', async () => {
    const { openMobileMenu, getNavSections, getActiveLink } = renderHeader();
    expect(getNavSections()).toHaveLength(0);
    await openMobileMenu();

    const activeLinkToFrontpage = getActiveLink();
    // suppress jsdom "navigation not implemented" error
    activeLinkToFrontpage.setAttribute('href', '');
    fireEvent.click(activeLinkToFrontpage);
    await waitFor(() => {
      expect(getNavSections()).toHaveLength(0);
    });
  });
  it('If a lower level active link is clicked, menu is closed and onClick handler is called.', async () => {
    const { openMobileMenu, getNavSections, getActiveLink, selectMenuItem } = renderHeader();
    expect(getNavSections()).toHaveLength(0);
    await openMobileMenu();
    await selectMenuItem(getMenuItem([0]));

    const activeLinkToFrontpage = getActiveLink();
    fireEvent.click(activeLinkToFrontpage);
    await waitFor(() => {
      expect(onClickTracker).toHaveBeenCalledTimes(1);
      expect(getNavSections()).toHaveLength(0);
    });
  });
});
