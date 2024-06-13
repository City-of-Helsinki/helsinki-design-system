import React from 'react';
import { action } from '@storybook/addon-actions';

import { FileInput } from './FileInput';

const onFilesChanged = (files: File[] | undefined) => action('filesChanged')(files);

export default {
  component: FileInput,
  title: 'Components/FileInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'file-input',
    label: 'Choose files',
    buttonLabel: '',
    language: 'en',
    maxSize: 1.5 * 1024 * 1024,
    accept: '.png,.jpg',
  },
};

export const Single = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

Single.args = {
  label: 'Choose a file',
};

export const Multiple = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

Multiple.args = {
  multiple: true,
};

export const WithDefaultValue = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

WithDefaultValue.args = {
  accept: '',
  defaultValue: [
    new File(['string content'], 'dummy.txt', { type: 'text/plain' }),
    new File(['string content with more text'], 'anotherDummy.txt', { type: 'text/plain' }),
  ],
  multiple: true,
};

export const WithDragAndDrop = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

WithDragAndDrop.args = {
  multiple: true,
  dragAndDrop: true,
};

export const WithTooltip = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};
WithTooltip.args = {
  accept: 'image/*',
  tooltipLabel: 'More info',
  tooltipButtonLabel: 'Click to view more info',
  tooltipText: 'The file input will accept most of the known image formats. Please notice the size limit.',
};

export const Disabled = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

Disabled.args = {
  disabled: true,
  label: 'Choose a file',
  accept: '.png,.jpg,.pdf,.json',
};

export const DisabledDragAndDrop = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

DisabledDragAndDrop.args = {
  disabled: true,
  multiple: true,
  dragAndDrop: true,
  accept: '.png,.jpg,.pdf,.json',
};

export const Required = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} />;
};

Required.args = {
  label: 'Choose a file',
  accept: 'image/*',
};

export const Playground = (args) => {
  const onChange = (files) => {
    onFilesChanged(files);
  };

  return <FileInput {...args} onChange={onChange} />;
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

Playground.args = {
  id: 'file-input',
  label: 'Choose files',
  buttonLabel: '',
  language: 'en',
  multiple: false,
  minSize: 10,
  maxSize: 300 * 1024,
  accept: '.png,.jpg,.pdf,.json',
  defaultValue: undefined,
  disabled: false,
  required: false,
  helperText: '',
  errorText: '',
  infoText: '',
  dragAndDrop: false,
  dragAndDropLabel: 'DragAndDropLabel',
  dragAndDropInputLabel: 'DragAndDropInputLabel',
};

Playground.argTypes = {
  language: {
    options: ['fi', 'en', 'sv'],
    control: { type: 'radio' },
  },
};

export const Invalid = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  onFilesChanged(files);

  return <FileInput {...args} onChange={setFiles} errorText="An error occurred. Try again later." />;
};
