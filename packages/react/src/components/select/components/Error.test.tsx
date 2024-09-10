import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../testUtil';
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
  const errorText = 'Error Text';
  it('renders the component', () => {
    const { asFragment } = initTests({
      renderComponentOnly: true,
      selectProps: { texts: { error: errorText }, invalid: true },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('Component is rendered only when data.invalid and texts.error are set', async () => {
    const selectProps = { texts: { error: errorText }, invalid: false };
    const { triggerDataChange, getByText } = initTests({ selectProps });
    expect(() => getByText(errorText)).toThrow();
    await triggerDataChange({ invalid: true });
    expect(() => getByText(errorText)).not.toThrow();
    await triggerDataChange({ invalid: false });
    expect(() => getByText(errorText)).toThrow();
  });
});
