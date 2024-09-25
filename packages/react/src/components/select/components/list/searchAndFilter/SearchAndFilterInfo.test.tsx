import { eventIds, eventTypes } from '../../../events';
import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../../../testUtil';
import { SearchAndFilterInfo } from './SearchAndFilterInfo';

jest.mock('../../Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<SearchAndFilterInfo />', () => {
  beforeAll(() => {
    testUtilBeforeAll(SearchAndFilterInfo);
  });
  afterAll(() => {
    testUtilAfterAll();
  });

  const getTestProps = (): Parameters<typeof initTests>[0] => {
    return {
      renderComponentOnly: false,
      selectProps: {
        open: true,
        onSearch: () => Promise.resolve({ options: [] }),
        texts: (key) => key,
        filter: () => false,
      },
      testProps: { input: 'search', groups: false },
    };
  };
  it('Component is not rendered by default even if list is open', async () => {
    const { getSearchAndFilterInfoTexts } = initTests(getTestProps());
    expect(() => getSearchAndFilterInfoTexts()).toThrow();
  });
  it('Component is rendered when list is open and searching and loading text is shown', async () => {
    const { triggerChangeEvent, getSearchAndFilterInfoTexts } = initTests(getTestProps());
    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: 'search' } });
    expect(() => getSearchAndFilterInfoTexts()).not.toThrow();
  });
  it('Failed filtering is shown', async () => {
    const { triggerChangeEvent, getByTestId, getSearchAndFilterInfoTexts } = initTests(getTestProps());
    await triggerChangeEvent({ id: eventIds.filter, type: eventTypes.change, payload: { value: 'search' } });
    expect(() => getByTestId('search-and-filter-info')).not.toThrow();
    expect(getSearchAndFilterInfoTexts()).toEqual(['searchedWithoutResultsInfo', 'searchWithAnotherTerm']);
  });
  it('Screen reader notification is added and removed after clearing the search', async () => {
    const { triggerChangeEvent, getMetaDataFromElement } = initTests(getTestProps());
    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: 'search' } });
    const notifications = getMetaDataFromElement().screenReaderNotifications;
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe('searching');

    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: '' } });
    expect(getMetaDataFromElement().screenReaderNotifications).toHaveLength(0);
  });
});
