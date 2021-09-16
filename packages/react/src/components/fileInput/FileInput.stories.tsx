import React from 'react';
import { boolean, number, object, radios, text } from '@storybook/addon-knobs';

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
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      id="file-input"
      label="Choose a file"
      buttonLabel="Add a file"
      language="en"
      onChange={setFile}
      maxSize={1.5 * 1024 * 1024}
      accept=".png,.jpg"
    />
  );
};

export const Multiple = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected files', files);

  return (
    <FileInput
      {...args}
      id="file-input"
      label="Choose files"
      buttonLabel="Add files"
      maxSize={1.5 * 1024 * 1024}
      language="en"
      onChange={setFiles}
      accept=".png,.jpg,.pdf,.json"
      multiple
    />
  );
};

export const Disabled = (args) => {
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      disabled
      id="file-input"
      label="Choose a file"
      buttonLabel="Add a file"
      language="en"
      onChange={setFile}
      accept="image/*"
    />
  );
};

export const Required = (args) => {
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      {...args}
      required
      id="file-input"
      label="Choose a file"
      buttonLabel="Add a file"
      language="en"
      onChange={setFile}
      accept="image/*"
    />
  );
};

export const WithDragAndDrop = (args) => {
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected files', file);

  return (
    <FileInput
      {...args}
      multiple
      dragAndDrop
      id="file-input"
      label="Drag and drop files here"
      language="en"
      buttonLabel="Add files"
      onChange={setFile}
      accept=".png,.jpg"
    />
  );
};

export const Playground = () => {
  const [files, setFiles] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected files', files);

  const id = text('id', 'file-input');
  const label = text('Label', 'Choose files');
  const buttonLabel = text('ButtonLabel', 'Add files');
  const language = radios(
    'language',
    {
      fi: 'fi',
      en: 'en',
      sv: 'sv',
    },
    'en',
  );

  const multiple = boolean('Multiple', false);
  const maxSize = number('MaxSize', 300 * 1024);
  const accept = text('Accept', '.png,.jpg,.pdf,.json');
  const disabled = boolean('Disabled', false);
  const required = boolean('Required', false);
  const helperText = text('HelperText', '');
  const errorText = text('ErrorText', '');
  const infoText = text('infoText', '');
  const dragAndDrop = boolean('DragAndDrop', false);
  const dragAndDropLabel = text('dragAndDropLabel', '');
  const dragAndDropInputLabel = text('dragAndDropInputLabel', '');

  return (
    <FileInput
      id={id}
      label={label}
      buttonLabel={buttonLabel}
      maxSize={maxSize}
      language={language}
      onChange={setFiles}
      accept={accept}
      disabled={disabled}
      required={required}
      multiple={multiple}
      dragAndDrop={dragAndDrop}
      dragAndDropLabel={dragAndDropLabel}
      dragAndDropInputLabel={dragAndDropInputLabel}
      helperText={helperText}
      errorText={errorText}
      infoText={infoText}
    />
  );
};
Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};
