import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { FileInput, formatBytes } from './FileInput';

// eslint-disable-next-line
const onChangeTest = () => {};

describe('<FileInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <FileInput id="test-file-input" label="Choose a file" language="en" accept=".png,.jpg" onChange={onChangeTest} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FileInput id="test-file-input" label="Choose a file" language="en" accept=".png,.jpg" onChange={onChangeTest} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when there are files added', async () => {
    const inputLabel = 'Choose a file';
    const { container } = render(
      <FileInput
        id="test-file-input"
        label={inputLabel}
        language="en"
        accept=".png,.jpg"
        onChange={onChangeTest}
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, [
      new File(['test-a'], 'test-file-a.png', { type: 'image/png' }),
      new File(['test-b'], 'test-file-b.png', { type: 'image/png' }),
    ]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should list files when user adds multiple files', async () => {
    let filesValue;
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputLabel = 'Choose files';
    const fileNameA = 'test-image-a.png';
    const fileA = new File([''], fileNameA, { type: 'image/png' });
    Object.defineProperty(fileA, 'size', { value: 12.5 * 1024 * 1024 });
    const fileNameB = 'test-doc-b.json';
    const fileB = new File([''], fileNameB, { type: 'application/json' });
    Object.defineProperty(fileB, 'size', { value: 110 * 1024 });
    const fileNameC = 'test-image-c.png';
    const fileC = new File([''], fileNameC, { type: 'image/png' });
    Object.defineProperty(fileC, 'size', { value: 3.3 * 1024 * 1024 * 1024 });
    const files: File[] = [fileA, fileB, fileC];
    render(<FileInput id="test-file-input" label={inputLabel} language="en" onChange={onChangeCallback} multiple />);
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, files);
    const list = screen.getByLabelText('3 files added.');
    const { getAllByRole } = within(list);
    const fileListItems = getAllByRole('listitem');
    expect(fileListItems.length).toBe(3);

    const fileItemA = fileListItems.find((i) => i.innerHTML.includes(fileNameA));
    const { getByText: getByTextInA, getByLabelText: getByLabelInA } = within(fileItemA);
    expect(getByTextInA('(12.5 MB)')).toBeInTheDocument();
    expect(getByLabelInA(`Remove ${fileNameA} from the added files.`)).toBeInTheDocument();

    const fileItemB = fileListItems.find((i) => i.innerHTML.includes(fileNameB));
    const { getByText: getByTextInB, getByLabelText: getByLabelInB } = within(fileItemB);
    expect(getByTextInB('(110 KB)')).toBeInTheDocument();
    expect(getByLabelInB(`Remove ${fileNameB} from the added files.`)).toBeInTheDocument();

    const fileItemC = fileListItems.find((i) => i.innerHTML.includes(fileNameC));
    const { getByText: getByTextInC, getByLabelText: getByLabelInC } = within(fileItemC);
    expect(getByTextInC('(3.3 GB)')).toBeInTheDocument();
    expect(getByLabelInC(`Remove ${fileNameC} from the added files.`)).toBeInTheDocument();
    expect(filesValue).toEqual([fileA, fileB, fileC]);
  });

  it('should append files when user selects one at the time', async () => {
    let filesValue;
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputLabel = 'Choose files';
    const firstFileName = 'test-file-a';
    const firstFile = new File(['test-file'], firstFileName, { type: 'image/png' });
    const secondFileName = 'test-file-b';
    const secondFile = new File(['test-file'], secondFileName, { type: 'image/png' });
    render(<FileInput id="test-file-input" label={inputLabel} onChange={onChangeCallback} multiple />);
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, [firstFile]);
    userEvent.upload(fileUpload, [secondFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText(secondFileName)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(2);
    expect(filesValue).toEqual([firstFile, secondFile]);
  });

  it('should add file when user drops it into drag-and-drop area', async () => {
    let filesValue;
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputLabel = 'Choose files';
    const dragAndDropLabel = 'Drag files here';
    const fileName = 'test-file-a';
    const file = new File(['test-file'], fileName, { type: 'image/png' });
    render(
      <FileInput
        id="test-file-input"
        label={inputLabel}
        onChange={onChangeCallback}
        dragAndDrop
        dragAndDropLabel={dragAndDropLabel}
      />,
    );
    fireEvent.drop(screen.getByText(dragAndDropLabel, { exact: false }), {
      dataTransfer: {
        files: [file],
      },
    });
    expect(screen.getByText(fileName)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(1);
    expect(filesValue).toEqual([file]);
  });

  it('should validate files based on maxSize property', async () => {
    const inputLabel = 'Choose files';
    const maxSize = 10;
    const firstFileName = 'test-file-a';
    const firstFile = new File(['test'], firstFileName, { type: 'image/png' });
    const secondFileName = 'test-file-b';
    const secondFile = new File(['test-file-with-too-long-content'], secondFileName, { type: 'image/png' });
    const thirdFileName = 'test-file-with-exactly-max-size-bytes';
    const thirdFile = new File(['0123456789'], thirdFileName, { type: 'image/png' });
    render(
      <FileInput
        id="test-file-input"
        maxSize={maxSize}
        label={inputLabel}
        language="en"
        onChange={onChangeTest}
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, [firstFile, secondFile, thirdFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText('2/3 file(s) added', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('File processing failed for 1/3 files:', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`File, ${secondFileName}, is too large (31 B). The maximum file size is 10 B.`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it('should validate files based on accept file extension', async () => {
    const inputLabel = 'Choose files';
    const maxSize = 10;
    const firstFileName = 'test-file-a.jpg';
    const firstFile = new File(['test-jpg'], firstFileName, { type: 'image/jpeg' });
    const secondFileName = 'test-file-b.json';
    const secondFile = new File(['test-json'], secondFileName, { type: 'application/json' });
    const thirdFileName = 'test-file-c.JPG';
    const thirdFile = new File(['test-JPG'], thirdFileName, { type: 'image/jpeg' });
    render(
      <FileInput
        id="test-file-input"
        maxSize={maxSize}
        label={inputLabel}
        language="en"
        onChange={onChangeTest}
        accept=".jpg,.png"
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, [firstFile, secondFile, thirdFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText('2/3 file(s) added', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('File processing failed for 1/3 files:', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`The file type, ${secondFileName}, is not supported. Only .jpg and .png files.`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it('should validate files based on accept file type', async () => {
    const inputLabel = 'Choose files';
    const maxSize = 10;
    const firstFileName = 'test-file-a.jpg';
    const firstFile = new File(['test-jpg'], firstFileName, { type: 'image/jpeg' });
    const secondFileName = 'test-file-b.json';
    const secondFile = new File(['test-json'], secondFileName, { type: 'application/json' });
    const thirdFileName = 'test-file-c.png';
    const thirdFile = new File(['test-png'], thirdFileName, { type: 'image/png' });
    render(
      <FileInput
        id="test-file-input"
        maxSize={maxSize}
        label={inputLabel}
        language="en"
        onChange={onChangeTest}
        accept="image/*"
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, [firstFile, secondFile, thirdFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText('2/3 file(s) added', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('File processing failed for 1/3 files:', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`The file type, ${secondFileName}, is not supported. Only image/* files.`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it('should remove files when user clicks remove-buttons', async () => {
    let filesValue;
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputLabel = 'Choose files';
    const fileNameA = 'test-file-a';
    const fileA = new File(['test-file'], fileNameA, { type: 'image/png' });
    const fileNameB = 'test-file-b';
    const fileB = new File(['test-file'], fileNameB, { type: 'image/png' });
    render(<FileInput id="test-file-input" label={inputLabel} language="en" onChange={onChangeCallback} multiple />);
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, [fileA, fileB]);
    const list = screen.getByLabelText('2 files added.');
    const { getAllByRole } = within(list);
    const fileListItems = getAllByRole('listitem');
    expect(fileListItems.length).toBe(2);
    expect(filesValue).toEqual([fileA, fileB]);
    // Remove the second file
    await act(async () => {
      userEvent.click(screen.getByLabelText(`Remove ${fileNameB} from the added files.`));
    });
    const listItemsAfterFirstRemove = getAllByRole('listitem');
    expect(listItemsAfterFirstRemove.length).toBe(1);
    expect(listItemsAfterFirstRemove[0]).toHaveFocus();
    expect(filesValue).toEqual([fileA]);
    expect(screen.getByText('The file has been deleted.', { exact: false })).toBeInTheDocument();
    // Remove the last file
    await act(async () => {
      userEvent.click(screen.getByLabelText(`Remove ${fileNameA} from the added files.`));
    });
    expect(list).toBeEmptyDOMElement();
    expect(screen.getByText('No file has been selected.', { exact: false })).toBeInTheDocument();
    expect(fileUpload).toHaveFocus();
    expect(filesValue).toEqual([]);
  });
});

describe('formatBytes spec', () => {
  it('should return string for zero bytes', async () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('should return rounded string for bytes', async () => {
    expect(formatBytes(12.5)).toBe('13 B');
  });

  it('should return rounded string for kilobytes', async () => {
    expect(formatBytes(12.5 * 1024)).toBe('13 KB');
  });

  it('should return string for megabytes', async () => {
    expect(formatBytes(12.5 * 1024 * 1024)).toBe('12.5 MB');
  });

  it('should return string for gigabytes', async () => {
    expect(formatBytes(12.5 * 1024 * 1024 * 1024)).toBe('12.5 GB');
  });
});
