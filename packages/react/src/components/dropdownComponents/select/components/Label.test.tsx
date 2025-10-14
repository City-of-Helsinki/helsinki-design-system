import { mockedContainer, testUtilAfterAll, testUtilBeforeAll, initTests } from '../testUtil';
import { SelectMetaData } from '../types';
import { Label } from './Label';

jest.mock('./Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<Label />', () => {
  beforeAll(() => {
    testUtilBeforeAll(Label);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  const label = 'This is the label';

  const getLabelElementById = (container: HTMLElement, metaData: SelectMetaData) => {
    const id = metaData.elementIds.label;
    return container.querySelector(`#${id}`) as HTMLElement;
  };

  it('is rendered without errors and with "*" when data.required is true', async () => {
    const { asFragment } = initTests({
      renderComponentOnly: true,
      selectProps: { required: true, texts: { label } },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('is rendered without errors and without "*" when data.required is false', async () => {
    const { asFragment } = initTests({
      renderComponentOnly: true,
      selectProps: { texts: { label } },
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('Component is rendered when texts.label is set', async () => {
    const { getByText } = initTests({ renderComponentOnly: true, selectProps: { texts: { label } } });
    expect(() => getByText(label)).not.toThrow();
  });
  it('Component is not rendered when texts.label is not set', async () => {
    const { getByText } = initTests({ renderComponentOnly: true, selectProps: { texts: { label: '' } } });
    expect(() => getByText(label)).toThrow();
  });
  it("Label's id is set as the id in the getMetaData()", async () => {
    const { container, getMetaDataFromElement } = initTests({
      renderComponentOnly: false,
      selectProps: { texts: { label } },
    });
    const metaData = getMetaDataFromElement();
    const element = getLabelElementById(container, metaData);
    expect(element.getAttribute('id')).toBe(metaData.elementIds.label);
  });
});
