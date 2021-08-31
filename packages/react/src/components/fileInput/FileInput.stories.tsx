import React from 'react';

import { FileInput } from './FileInput';

export default {
  component: FileInput,
  title: 'Components/FileInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Single = (args) => {
  const [file, setFile] = React.useState<FileList>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      id="file-input"
      label="Choose a file"
      buttonLabel="Add file"
      language="en"
      onChange={setFile}
      maxSize={1.5 * 1024 * 1024}
      accept=".png,.jpg"
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
      maxSize={300 * 1024}
      language="en"
      onChange={setFiles}
      accept=".png,.jpg,.pdf,.json"
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
      language="en"
      onChange={setFile}
      accept="image/*"
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
      language="en"
      onChange={setFile}
      accept="image/*"
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
      language="en"
      buttonLabel="Add files"
      onChange={setFile}
      accept=".png,.jpg"
    />
  );
};
