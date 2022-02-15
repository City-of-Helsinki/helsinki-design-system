import React from 'react';

import { FileInput } from './FileInput';

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
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFile}
      maxSize={args.maxSize}
      accept={args.accept}
    />
  );
};

Single.args = {
  label: 'Choose a file',
};

export const Multiple = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected files', files);

  return (
    <FileInput
      multiple={args.multiple}
      dragAndDrop={args.dragAndDrop}
      dragAndDropLabel={args.dragAndDropLabel}
      dragAndDropInputLabel={args.dragAndDropInputLabel}
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFiles}
      maxSize={args.maxSize}
      accept={args.accept}
    />
  );
};

Multiple.args = {
  multiple: true,
};

export const WithDragAndDrop = (args) => {
  const [files, setFiles] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected files', files);

  return (
    <FileInput
      multiple={args.multiple}
      dragAndDrop={args.dragAndDrop}
      dragAndDropLabel={args.dragAndDropLabel}
      dragAndDropInputLabel={args.dragAndDropInputLabel}
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFiles}
      maxSize={args.maxSize}
      accept={args.accept}
    />
  );
};

WithDragAndDrop.args = {
  multiple: true,
  dragAndDrop: true,
};

export const WithTooltip = (args) => {
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFile}
      accept={args.accept}
      maxSize={args.maxSize}
      tooltipLabel={args.tooltipLabel}
      tooltipButtonLabel={args.tooltipButtonLabel}
      tooltipText={args.tooltipText}
    />
  );
};
WithTooltip.args = {
  accept: 'image/*',
  tooltipLabel: 'More info',
  tooltipButtonLabel: 'Click to view more info',
  tooltipText: 'The file input will accept most of the known image formats. Please notice the size limit.',
};

export const Disabled = (args) => {
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      disabled={args.disabled}
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFile}
      accept={args.accept}
    />
  );
};

Disabled.args = {
  disabled: true,
  label: 'Choose a file',
  accept: '.png,.jpg,.pdf,.json',
};

export const DisabledDragAndDrop = (args) => {
  const [file, setFiles] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      disabled={args.disabled}
      multiple={args.multiple}
      dragAndDrop={args.dragAndDrop}
      dragAndDropLabel={args.dragAndDropLabel}
      dragAndDropInputLabel={args.dragAndDropInputLabel}
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFiles}
      maxSize={args.maxSize}
      accept={args.accept}
    />
  );
};

DisabledDragAndDrop.args = {
  disabled: true,
  multiple: true,
  dragAndDrop: true,
  accept: '.png,.jpg,.pdf,.json',
};

export const Required = (args) => {
  const [file, setFile] = React.useState<File[]>();
  // eslint-disable-next-line no-console
  console.log('selected file', file);

  return (
    <FileInput
      required
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      language={args.language}
      onChange={setFile}
      accept={args.accept}
    />
  );
};

Required.args = {
  label: 'Choose a file',
  accept: 'image/*',
};

export const Playground = (args) => {
  const onChange = (files) => {
    // eslint-disable-next-line no-console
    console.log('onChange callback files:', files);
  };

  return (
    <FileInput
      id={args.id}
      label={args.label}
      buttonLabel={args.buttonLabel}
      maxSize={args.maxSize}
      language={args.language}
      accept={args.accept}
      disabled={args.disabled}
      required={args.required}
      multiple={args.multiple}
      dragAndDrop={args.dragAndDrop}
      dragAndDropLabel={args.dragAndDropLabel}
      dragAndDropInputLabel={args.dragAndDropInputLabel}
      helperText={args.helperText}
      errorText={args.errorText}
      infoText={args.infoText}
      onChange={onChange}
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

Playground.args = {
  id: 'file-input',
  label: 'Choose files',
  buttonLabel: '',
  language: 'en',
  multiple: false,
  maxSize: 300 * 1024,
  accept: '.png,.jpg,.pdf,.json',
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
