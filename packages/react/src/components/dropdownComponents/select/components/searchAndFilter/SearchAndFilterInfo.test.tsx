import { eventIds, eventTypes } from '../../events';
import { groupsAndOptions, initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../../testUtil';
import { Group, SelectMetaData } from '../../types';
import { SearchAndFilterInfo } from './SearchAndFilterInfo';

jest.mock('../Container', () => {
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

  const getTestProps = (
    inputType: SelectMetaData['listInputType'],
    returnResults = false,
  ): Parameters<typeof initTests>[0] => {
    return {
      renderComponentOnly: false,
      selectProps: {
        open: true,
        onSearch:
          inputType === 'search'
            ? () => Promise.resolve({ options: returnResults ? (groupsAndOptions as Group[])[0].options : [] })
            : undefined,
        texts: (key) => key,
        filter: inputType === 'filter' ? () => returnResults : undefined,
      },
      testProps: { input: 'search', groups: false },
    };
  };
  it('Component is not rendered by default even if list is open', async () => {
    const { getSearchAndFilterInfoTexts } = initTests(getTestProps('search'));
    expect(() => getSearchAndFilterInfoTexts()).toThrow();
  });
  it('Component is rendered when list is open and searching and loading text is shown', async () => {
    const { triggerChangeEvent, getSearchAndFilterInfoTexts } = initTests(getTestProps('search'));
    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: 'search' } });
    expect(() => getSearchAndFilterInfoTexts()).not.toThrow();
  });
  it('Successful filtering is shown only to screen reader.', async () => {
    const { triggerChangeEvent, getByTestId, getMetaDataFromElement, dataTestIds } = initTests(
      getTestProps('filter', true),
    );
    await triggerChangeEvent({ id: eventIds.filter, type: eventTypes.change, payload: { value: 'filter' } });
    expect(() => getByTestId(dataTestIds.searchAndFilterInfo)).toThrow();
    const notifications = getMetaDataFromElement().screenReaderNotifications;
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe(`filterResults filterResultsCount_multiple`);
  });
  it('Failed filtering is shown.', async () => {
    const { triggerChangeEvent, getByTestId, getSearchAndFilterInfoTexts, dataTestIds } = initTests(
      getTestProps('filter'),
    );
    await triggerChangeEvent({ id: eventIds.filter, type: eventTypes.change, payload: { value: 'filter' } });
    expect(() => getByTestId(dataTestIds.searchAndFilterInfo)).not.toThrow();
    expect(getSearchAndFilterInfoTexts()).toEqual(['filteredWithoutResultsInfo', 'filterWithAnotherTerm']);
  });
  it('Screen reader notification is added and removed after clearing the search', async () => {
    const { triggerChangeEvent, getMetaDataFromElement } = initTests(getTestProps('search'));
    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: 'search' } });
    const notifications = getMetaDataFromElement().screenReaderNotifications;
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe('searching');

    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.success });
    const successNotifications = getMetaDataFromElement().screenReaderNotifications;
    expect(successNotifications).toHaveLength(1);
    expect(successNotifications[0].content).toBe('searchedWithoutResultsInfo searchWithAnotherTerm');

    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: '' } });
    expect(getMetaDataFromElement().screenReaderNotifications).toHaveLength(0);
  });
  it('Screen reader notification indicates number of results', async () => {
    const { triggerChangeEvent, getMetaDataFromElement } = initTests(getTestProps('search', true));
    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: 'search' } });
    const notifications = getMetaDataFromElement().screenReaderNotifications;
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe('searching');

    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.success });
    const successNotifications = getMetaDataFromElement().screenReaderNotifications;
    // length is still 1 because only one notification per notificationType is allowed in queue
    expect(successNotifications).toHaveLength(1);
    expect(successNotifications[0].content).toBe('searchResults_multiple');
  });
  it('Info and screen reader notification is added after a search error.', async () => {
    const { triggerChangeEvent, getSearchAndFilterInfoTexts, getMetaDataFromElement } = initTests(
      getTestProps('search'),
    );
    await triggerChangeEvent({ id: eventIds.search, type: eventTypes.change, payload: { value: 'error' } });
    await triggerChangeEvent({ id: eventIds.searchResult, type: eventTypes.error });
    expect(getSearchAndFilterInfoTexts()).toEqual(['searchErrorTitle', 'searchErrorText']);
    const notifications = getMetaDataFromElement().screenReaderNotifications;
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe(`searchErrorTitle searchErrorText`);
  });
});
