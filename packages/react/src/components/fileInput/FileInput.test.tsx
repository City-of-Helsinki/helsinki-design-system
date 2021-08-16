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
        removeButtonLabel="remove"
        removeButtonAriaLabel={name => `Remove ${name} from the list`}
        successMessage="File added successfully."
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
        removeButtonLabel="remove"
        removeButtonAriaLabel={name => `Remove ${name} from the list`}
        successMessage="File added successfully."
        onChange={() => {}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should list added files', async () => {
    const inputLabel = 'Add files';
    const fileNameA = 'test-file-a.png';
    const fileNameB = 'test-file-b.png';
    const files: File[] = [
      new File(['test-file-a'], fileNameA, { type: 'image/png' }),
      new File(['test-file-b'], fileNameB, { type: 'image/png' }),
    ];
    render(
      <FileInput
        id="test-file-input"
        label="Choose files"
        buttonLabel={inputLabel}
        removeButtonLabel="remove"
        removeButtonAriaLabel={name => `Remove ${name} from the list`}
        successMessage="Files added successfully."
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
        removeButtonLabel="remove"
        removeButtonAriaLabel={name => `Remove ${name} from the list`}
        successMessage="Files added successfully."
        onChange={onChangeCallback}
        multiple
      />,
    );
    const fileUpload = screen.getByLabelText('Add files');
    userEvent.upload(fileUpload, [file]);
    expect(testFileHolder).toEqual([file]);
  });
});
