import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../testUtil';
import { SelectProps } from '../types';
import { ErrorNotification } from './Error';

jest.mock('./Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<ErrorNotification />', () => {
  beforeAll(() => {
    testUtilBeforeAll(ErrorNotification);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  it('renders the component', () => {
    const { asFragment } = initTests({
      renderComponentOnly: true,
      selectProps: { texts: { error: 'THIS IS AN ERROR' } },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('Hello', async () => {
    const selectProps = { texts: { error: 'THIS IS AN ERROR' } };
    const { container, triggerDataChange, triggerMetaDataChange, getMetaDataFromElement } = initTests({ selectProps });
    expect(container).not.toBeNull();
    triggerMetaDataChange({ search: '' });
    selectProps.texts.error = 'NEW ERROR!';
    await triggerDataChange({ open: true });
    expect(getMetaDataFromElement().screenReaderNotifications).toHaveLength(1);
  });
});
