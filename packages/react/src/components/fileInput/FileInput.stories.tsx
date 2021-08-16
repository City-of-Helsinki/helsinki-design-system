import React from 'react';

import { FileInput } from './FileInput';

export default {
  component: FileInput,
  title: 'Components/FileInput',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => {
  const [file, setFile] = React.useState<FileList>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      id="file-input"
      label="Choose a file"
      buttonLabel="Add file"
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      successMessage="File added successfully."
      onChange={setFile}
      accept=".png,.jpg"
      helperText="Only .png and .jpg files."
    />
  );
};

export const Multiple = (args) => {
  const [files, setFiles] = React.useState<FileList>();
  // eslint-disable-next-line no-console
  console.log('selected files', files);

  return (
    <FileInput
      {...args}
      id="file-input"
      label="Choose files"
      buttonLabel="Add files"
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      successMessage="Files added successfully."
      onChange={setFiles}
      accept=".png,.jpg"
      helperText="Only .png and .jpg files."
      multiple
    />
  );
};
