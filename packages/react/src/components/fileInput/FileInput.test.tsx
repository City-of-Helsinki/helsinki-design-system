import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { FileInput, formatBytes } from './FileInput';

describe('<FileInput /> spec', () => {
  const defaultInputProps: Parameters<typeof FileInput>[0] = {
    id: 'test-file-input',
    label: 'Choose a file',
    language: 'en',
    accept: '.png,.jpg',
    onChange: () => {},
    helperText: 'Helper text',
  };

  it('renders the component', () => {
    const { asFragment } = render(<FileInput {...defaultInputProps} errorText="Error text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FileInput {...defaultInputProps} errorText="Error text" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when there are files added', async () => {
    const { container } = render(<FileInput {...defaultInputProps} multiple errorText="Error text" />);
    const fileUpload = screen.getByLabelText(defaultInputProps.label);
    userEvent.upload(fileUpload, [
      new File(['test-a'], 'test-file-a.png', { type: 'image/png' }),
      new File(['test-b'], 'test-file-b.png', { type: 'image/png' }),
    ]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should list files when user adds multiple files', async () => {
    let filesValue: File[] = [];
    const inputLabel = 'Choose files';
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputProps = {
      ...defaultInputProps,
      label: inputLabel,
      onChange: onChangeCallback,
      multiple: true,
      accept: undefined,
    };
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
    render(<FileInput {...inputProps} />);
    const fileUpload = screen.getByLabelText(inputLabel);
    userEvent.upload(fileUpload, files);
    const list = screen.getByLabelText('3 files added.');
    const { getAllByRole } = within(list);
    const fileListItems = getAllByRole('listitem');
    expect(fileListItems.length).toBe(3);

    const fileItemA = fileListItems.find((i) => i.innerHTML.includes(fileNameA)) as HTMLElement;
    const { getByText: getByTextInA, getByLabelText: getByLabelInA } = within(fileItemA);
    expect(getByTextInA('(12.5 MB)')).toBeInTheDocument();
    expect(getByLabelInA(`Remove ${fileNameA} from the added files.`)).toBeInTheDocument();

    const fileItemB = fileListItems.find((i) => i.innerHTML.includes(fileNameB)) as HTMLElement;
    const { getByText: getByTextInB, getByLabelText: getByLabelInB } = within(fileItemB);
    expect(getByTextInB('(110 KB)')).toBeInTheDocument();
    expect(getByLabelInB(`Remove ${fileNameB} from the added files.`)).toBeInTheDocument();

    const fileItemC = fileListItems.find((i) => i.innerHTML.includes(fileNameC)) as HTMLElement;
    const { getByText: getByTextInC, getByLabelText: getByLabelInC } = within(fileItemC);
    expect(getByTextInC('(3.3 GB)')).toBeInTheDocument();
    expect(getByLabelInC(`Remove ${fileNameC} from the added files.`)).toBeInTheDocument();
    expect(filesValue).toEqual([fileA, fileB, fileC]);
  });

  it('should append files when user selects one at the time', async () => {
    let filesValue: File[] = [];
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      onChange: onChangeCallback,
      multiple: true,
      accept: undefined,
    };
    render(<FileInput {...inputProps} />);
    const firstFileName = 'test-file-a';
    const firstFile = new File(['test-file'], firstFileName, { type: 'image/png' });
    const secondFileName = 'test-file-b';
    const secondFile = new File(['test-file'], secondFileName, { type: 'image/png' });
    const fileUpload = screen.getByLabelText(inputProps.label);
    userEvent.upload(fileUpload, [firstFile]);
    userEvent.upload(fileUpload, [secondFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText(secondFileName)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(2);
    expect(filesValue).toEqual([firstFile, secondFile]);
  });

  it('should add file when user drops it into drag-and-drop area', async () => {
    let filesValue: File[] = [];
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };

    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      dragAndDropLabel: 'Drag files here',
      onChange: onChangeCallback,
      dragAndDrop: true,
      accept: undefined,
    };

    const fileName = 'test-file-a';
    const file = new File(['test-file'], fileName, { type: 'image/png' });
    render(<FileInput {...inputProps} />);
    fireEvent.drop(screen.getByText(inputProps.dragAndDropLabel, { exact: false }), {
      dataTransfer: {
        files: [file],
      },
    });
    expect(screen.getByText(fileName)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(1);
    expect(filesValue).toEqual([file]);
  });

  it('should validate files based on maxSize property', async () => {
    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      multiple: true,
      accept: undefined,
      maxSize: 10,
    };
    const firstFileName = 'test-file-a';
    const firstFile = new File(['test'], firstFileName, { type: 'image/png' });
    const secondFileName = 'test-file-b';
    const secondFile = new File(['test-file-with-too-long-content'], secondFileName, { type: 'image/png' });
    const thirdFileName = 'test-file-with-exactly-max-size-bytes';
    const thirdFile = new File(['0123456789'], thirdFileName, { type: 'image/png' });
    render(<FileInput {...inputProps} />);
    const fileUpload = screen.getByLabelText(inputProps.label);
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

  it('should validate files based on minSize property', async () => {
    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      multiple: true,
      accept: undefined,
      minSize: 10,
    };
    const firstFileName = 'test-file-with-enaough-content';
    const firstFile = new File(['01234567890'], firstFileName, { type: 'image/png' });
    const secondFileName = 'test-file-with-too-small-content';
    const secondFile = new File(['012345678'], secondFileName, { type: 'image/png' });
    const thirdFileName = 'test-file-with-exactly-min-size-bytes';
    const thirdFile = new File(['0123456789'], thirdFileName, { type: 'image/png' });
    render(<FileInput {...inputProps} />);
    const fileUpload = screen.getByLabelText(inputProps.label);
    userEvent.upload(fileUpload, [firstFile, secondFile, thirdFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText('2/3 file(s) added', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('File processing failed for 1/3 files:', { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`File, ${secondFileName}, is too small (9 B). The minimum file size is 10 B.`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it('should validate files based on accept file extension', async () => {
    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      multiple: true,
      accept: '.jpg,.png',
      maxSize: 10,
    };
    render(<FileInput {...inputProps} />);

    const firstFileName = 'test-file-a.jpg';
    const firstFile = new File(['test-jpg'], firstFileName, { type: 'image/jpeg' });
    const secondFileName = 'test-file-b.json';
    const secondFile = new File(['test-json'], secondFileName, { type: 'application/json' });
    const thirdFileName = 'test-file-c.JPG';
    const thirdFile = new File(['test-JPG'], thirdFileName, { type: 'image/jpeg' });
    const fileUpload = screen.getByLabelText(inputProps.label);
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
    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      multiple: true,
      accept: 'image/*',
      maxSize: 10,
    };
    render(<FileInput {...inputProps} />);

    const firstFileName = 'test-file-a.jpg';
    const firstFile = new File(['test-jpg'], firstFileName, { type: 'image/jpeg' });
    const secondFileName = 'test-file-b.json';
    const secondFile = new File(['test-json'], secondFileName, { type: 'application/json' });
    const thirdFileName = 'test-file-c.png';
    const thirdFile = new File(['test-png'], thirdFileName, { type: 'image/png' });
    const fileUpload = screen.getByLabelText(inputProps.label);
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
    let filesValue: File[] = [];
    const onChangeCallback = (files: File[]) => {
      filesValue = files;
    };
    const inputProps = {
      ...defaultInputProps,
      label: 'Choose files',
      multiple: true,
      accept: undefined,
      maxSize: 10,
      onChange: onChangeCallback,
    };
    render(<FileInput {...inputProps} />);
    const fileNameA = 'test-file-a';
    const fileA = new File(['test-file'], fileNameA, { type: 'image/png' });
    const fileNameB = 'test-file-b';
    const fileB = new File(['test-file'], fileNameB, { type: 'image/png' });
    const fileUpload = screen.getByLabelText(inputProps.label);
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
