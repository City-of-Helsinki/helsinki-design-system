import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { FileInput } from './FileInput';

describe('<FileInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FileInput id="test-file-input" label="Add files" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FileInput id="test-file-input" label="Add files" />);
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
    render(<FileInput id="test-file-input" label={inputLabel} multiple />);
    const fileUpload = screen.getByLabelText('Add files');
    userEvent.upload(fileUpload, files);
    expect(screen.getByText(fileNameA)).toBeInTheDocument();
    expect(screen.getByText(fileNameB)).toBeInTheDocument();
  });

  test('should call onChange with FileList', async () => {
    let testFileHolder;
    const onChangeCallback = (files:FileList) => {
      testFileHolder = files
    }
    const inputLabel = 'Add files';
    const file = new File(['test-file'], 'test-file', { type: 'image/png' });
    render(<FileInput id="test-file-input" label={inputLabel} multiple onChange={onChangeCallback} />);
    const fileUpload = screen.getByLabelText('Add files');
    userEvent.upload(fileUpload, [file]);
    expect(testFileHolder).toEqual(fileUpload.files);
  });
});
