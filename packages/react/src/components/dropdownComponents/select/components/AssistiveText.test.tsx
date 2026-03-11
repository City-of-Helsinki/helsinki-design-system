import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../testUtil';
import { SelectProps } from '../types';
import { AssistiveText } from './AssistiveText';

jest.mock('./Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<AssistiveText />', () => {
  beforeAll(() => {
    testUtilBeforeAll(AssistiveText);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  const text = 'Assistive text';
  it('Component is rendered when texts.assistive is set', async () => {
    const propsWithAssistiveText = { texts: { assistive: text } };
    const { getByText, asFragment } = initTests({ renderComponentOnly: true, selectProps: propsWithAssistiveText });
    expect(() => getByText(text)).not.toThrow();
    expect(asFragment()).toMatchSnapshot();
  });
  it('Component is not rendered when texts.assistive is not set', async () => {
    const propsWithoutAssistiveText = { renderComponentOnly: true, texts: { assistive: '' } };
    const { getByText } = initTests({ selectProps: propsWithoutAssistiveText });
    expect(() => getByText(text)).toThrow();
  });
  it('When contents change, a screen reader notification is rendered', async () => {
    const assistive = 'New Text';
    const onChange: SelectProps['onChange'] = () => {
      return {
        texts: {
          assistive,
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
    expect(notifications[0].content).toBe(assistive);
  });
});
