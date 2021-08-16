import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { FileInput } from './FileInput';

describe('<FileInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <FileInput
        id="test-file-input"
        label="Choose a file"
        buttonLabel="Add file"
        successMessage="File added successfully."
        removeButtonLabel="remove"
        removeButtonAriaLabel={(name) => `Remove ${name} from the list`}
        removeSuccessMessage="File removed."
        onChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <FileInput
        id="test-file-input"
        label="Choose a file"
        buttonLabel="Add file"
        successMessage="File added successfully."
        removeButtonLabel="remove"
        removeButtonAriaLabel={(name) => `Remove ${name} from the list`}
        removeSuccessMessage="File removed."
        onChange={() => {}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should list added files', async () => {
    const inputLabel = 'Add files';
    const fileNameA = 'test-file-a.png';
    const fileNameB = 'doc.json';
    const files: File[] = [
      new File(['test-file-a'], fileNameA, { type: 'image/png' }),
      new File(['test-file-b'], fileNameB, { type: 'application/json' }),
    ];
    render(
      <FileInput
        id="test-file-input"
        label="Choose files"
        buttonLabel={inputLabel}
        successMessage="Files added successfully."
        removeButtonLabel="remove"
        removeButtonAriaLabel={(name) => `Remove ${name} from the list`}
        removeSuccessMessage="File removed."
        onChange={() => {}}
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText('Add files');
    userEvent.upload(fileUpload, files);
    expect(screen.getByText(fileNameA)).toBeInTheDocument();
    expect(screen.getByText(fileNameB)).toBeInTheDocument();
  });

  test('should call onChange with a list of files', async () => {
    let testFileHolder;
    const onChangeCallback = (files: File[]) => {
      testFileHolder = files;
    };
    const inputLabel = 'Add files';
    const file = new File(['test-file'], 'test-file', { type: 'image/png' });
    render(
      <FileInput
        id="test-file-input"
        label="Choose files"
        buttonLabel={inputLabel}
        successMessage="Files added successfully."
        removeButtonLabel="remove"
        removeButtonAriaLabel={(name) => `Remove ${name} from the list`}
        removeSuccessMessage="File removed."
        onChange={onChangeCallback}
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText('Add files');
    userEvent.upload(fileUpload, [file]);
    expect(testFileHolder).toEqual([file]);
  });

  test('should append files to list with multiple props onChange with a list of files', async () => {
    const inputLabel = 'Add files';
    const firstFileName = 'test-file-a';
    const firstFile = new File(['test-file'], firstFileName, { type: 'image/png' });
    const secondFileName = 'test-file-b';
    const secondFile = new File(['test-file'], secondFileName, { type: 'image/png' });
    render(
      <FileInput
        id="test-file-input"
        label="Choose files"
        buttonLabel={inputLabel}
        successMessage="Files added successfully."
        removeButtonLabel="remove"
        removeButtonAriaLabel={(name) => `Remove ${name} from the list`}
        removeSuccessMessage="File removed."
        onChange={() => {}}
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText('Add files');
    userEvent.upload(fileUpload, [firstFile]);
    userEvent.upload(fileUpload, [secondFile]);
    expect(screen.getByText(firstFileName)).toBeInTheDocument();
    expect(screen.getByText(secondFileName)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(2);
  });
});
