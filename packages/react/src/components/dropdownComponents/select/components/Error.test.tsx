import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../testUtil';
import { SelectProps } from '../types';
import { ErrorNotification } from './Error';

jest.mock('./Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<Error />', () => {
  beforeAll(() => {
    testUtilBeforeAll(ErrorNotification);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  it('renders the component', () => {
    const { asFragment } = initTests({
      renderComponentOnly: true,
      selectProps: { texts: { error: 'Error Text' }, invalid: true },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('When error contents change, a screen reader notification is rendered', async () => {
    const error = 'Error Text';
    const onChange: SelectProps['onChange'] = () => {
      return {
        invalid: true,
        texts: {
          error,
        },
      };
    };
    const testProps = {
      hasSelections: true,
      groups: true,
    };
    const { getMetaDataFromElement, triggerOptionChange } = initTests({
      selectProps: { onChange },
      testProps,
    });
    await triggerOptionChange();
    const notifications = getMetaDataFromElement().screenReaderNotifications;
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe(error);
  });
});
