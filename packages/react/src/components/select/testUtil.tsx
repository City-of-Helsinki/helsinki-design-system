import { waitFor, fireEvent, render } from '@testing-library/react';
import React from 'react';

import { getLastMockCallArgs } from '../../utils/testHelpers';
import { eventIds, eventTypes } from './events';
import { useSelectDataHandlers } from './hooks/useSelectDataHandlers';
import { Select } from './Select';
import { SelectProps, SelectMetaData, SelectData } from './types';

// storage for the target component to test
const renderMockedComponent = jest.fn();
const renderOnlyTheComponent = jest.fn().mockReturnValue(false);

// tempStorages for data updates triggered from DOM clicks
// These are cleared after each update.
const tempDataStorage = jest.fn();
const tempMetaDataStorage = jest.fn();

export const testUtilBeforeAll = (TargetComponent: React.FC) => {
  renderMockedComponent.mockImplementation(() => <TargetComponent />);
};
export const testUtilAfterAll = () => {
  renderMockedComponent.mockClear();
};

const ButtonsForDataUpdates = () => {
  const dataHandlers = useSelectDataHandlers();

  const onDataClick = () => {
    dataHandlers.updateData(getLastMockCallArgs(tempDataStorage)[0]);
    tempDataStorage.mockReset();
    dataHandlers.trigger({ id: eventIds.showAllButton, type: eventTypes.click });
  };

  const onMetaDataClick = () => {
    dataHandlers.updateMetaData(getLastMockCallArgs(tempMetaDataStorage)[0]);
    tempMetaDataStorage.mockReset();
  };

  return (
    <>
      <button type="button" onClick={onDataClick} id="data-updater">
        Update data
      </button>
      <button type="button" onClick={onMetaDataClick} id="meta-data-updater">
        Update metaData
      </button>
    </>
  );
};

const UpdateChecker = () => {
  // hook usage will cause update when context re-renders
  useSelectDataHandlers();
  return <span id="render-time">{Date.now()}</span>;
};

const ExportedData = () => {
  const { getData } = useSelectDataHandlers();
  const jsonData = JSON.stringify(getData());
  return <span id="exported-data">{jsonData}</span>;
};

const ExportedMetaData = () => {
  const { getMetaData } = useSelectDataHandlers();
  const jsonData = JSON.stringify(getMetaData());
  return <span id="exported-meta-data">{jsonData}</span>;
};

export const mockedContainer = () => {
  if (renderOnlyTheComponent()) {
    return renderMockedComponent();
  }
  return (
    <>
      {renderMockedComponent()}
      <ButtonsForDataUpdates />
      <UpdateChecker />
      <ExportedData />
      <ExportedMetaData />
    </>
  );
};

const onChangeTracker = jest.fn();

const defaultTestProps: SelectProps = {
  options: [],
  onChange: onChangeTracker,
  placeholder: 'Choose one',
  required: false,
  id: 'test-select',
  texts: {
    label: 'Label',
    error: '',
  },
};

export const initTests = ({
  renderComponentOnly,
  selectProps = {},
}: { renderComponentOnly?: boolean; selectProps?: Partial<SelectProps> } = {}) => {
  renderOnlyTheComponent.mockReturnValue(!!renderComponentOnly);
  const props = render(<Select {...{ ...defaultTestProps, ...selectProps }} />);

  const getElementById = <T = HTMLElement,>(id: string) => {
    return props.container.querySelector(`#${id}`) as unknown as T;
  };

  const getRenderTime = () => {
    const el = getElementById('render-time');
    return parseInt(el.innerHTML, 10);
  };

  const createRenderUpdatePromise = () => {
    const lastUpdate = getRenderTime();
    return waitFor(() => {
      if (getRenderTime() <= lastUpdate) {
        throw new Error('Time not updated');
      }
    });
  };

  const getDataFromElement = () => {
    const el = getElementById('exported-data');
    return JSON.parse(el && el.innerHTML);
  };

  const createDataUpdatePromise = () => {
    const lastUpdate = getDataFromElement();
    return waitFor(() => {
      if (getDataFromElement() === lastUpdate) {
        throw new Error('Data not updated');
      }
    });
  };

  const getMetaDataFromElement = () => {
    const el = getElementById('exported-meta-data');
    return JSON.parse(el && el.innerHTML);
  };

  // metadata update does not trigger render!
  const triggerMetaDataChange = async (metaData: Partial<SelectMetaData>) => {
    tempMetaDataStorage(metaData);
    fireEvent.click(getElementById('meta-data-updater'));
  };

  const triggerDataChange = async (data: Partial<SelectData>) => {
    const promise = createRenderUpdatePromise();
    const promise2 = createDataUpdatePromise();
    tempDataStorage(data);
    fireEvent.click(getElementById('data-updater'));
    return Promise.all([promise, promise2]);
  };

  return {
    ...props,
    triggerDataChange,
    triggerMetaDataChange,
    getMetaDataFromElement,
    getDataFromElement,
  };
};
