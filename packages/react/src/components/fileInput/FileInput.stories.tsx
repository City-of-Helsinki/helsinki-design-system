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
  console.log('selected file', file);
  return (
    <FileInput {...args} id="file-input" onChange={setFile} accept=".png,.jpg" helperText="Only .png and .jpg files." />
  );
};

export const Multiple = (args) => {
  const [files, setFiles] = React.useState<FileList>();
  console.log('selected files', files);
  return (
    <FileInput
      {...args}
      id="file-input"
      onChange={setFiles}
      accept=".png,.jpg"
      helperText="Only .png and .jpg files."
      multiple
    />
  );
};
