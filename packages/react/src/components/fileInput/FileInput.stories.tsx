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
      successMessage="File added successfully."
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      removeSuccessMessage="File removed."
      fileListAriaLabel="Added file"
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
      successMessage="Files added successfully."
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      removeSuccessMessage="File removed."
      fileListAriaLabel="Added files"
      onChange={setFiles}
      accept=".png,.jpg,.pdf,.json"
      helperText="Only .png, .jpg, .pdf or .json files."
      multiple
    />
  );
};

export const Disabled = (args) => {
  const [file, setFile] = React.useState<FileList>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      disabled
      id="file-input"
      label="Choose a file"
      buttonLabel="Add file"
      successMessage="File added successfully."
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      removeSuccessMessage="File removed."
      fileListAriaLabel="Added files"
      onChange={setFile}
      accept=".png,.jpg"
      helperText="Only .png and .jpg files."
    />
  );
};

export const Required = (args) => {
  const [file, setFile] = React.useState<FileList>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      required
      id="file-input"
      label="Choose a file"
      buttonLabel="Add file"
      successMessage="File added successfully."
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      removeSuccessMessage="File removed."
      fileListAriaLabel="Added files"
      onChange={setFile}
      accept=".png,.jpg"
      helperText="Only .png and .jpg files."
    />
  );
};

export const WithDragAndDrop = (args) => {
  const [file, setFile] = React.useState<FileList>();
  // eslint-disable-next-line no-console
  console.log('selected files', file);

  return (
    <FileInput
      {...args}
      multiple
      id="file-input"
      label="Drag and drop files here"
      dragAndDrop={{
        label: 'Drag files here',
        helperText: 'or browse from your computer',
      }}
      buttonLabel="Add files"
      successMessage="Files added successfully."
      removeButtonLabel="Remove"
      removeButtonAriaLabel={(name) => `Remove ${name} from the files list`}
      removeSuccessMessage="File removed."
      fileListAriaLabel="Added files"
      onChange={setFile}
      accept=".png,.jpg"
      helperText="Only .png and .jpg files."
    />
  );
};
