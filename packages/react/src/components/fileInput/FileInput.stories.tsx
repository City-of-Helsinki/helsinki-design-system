import React from 'react';
import { boolean, number, radios, text } from '@storybook/addon-knobs';

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

export const Playground = () => {
  const onChange = (files) => {
    // eslint-disable-next-line no-console
    console.log('onChange callback files:', files);
  };

  const id = text('id', 'file-input');
  const label = text('Label', 'Choose files');
  const buttonLabel = text('ButtonLabel', '');
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
  const infoText = text('InfoText', '');
  const dragAndDrop = boolean('DragAndDrop', false);
  const dragAndDropLabel = text('DragAndDropLabel', '');
  const dragAndDropInputLabel = text('DragAndDropInputLabel', '');

  return (
    <FileInput
      id={id}
      label={label}
      buttonLabel={buttonLabel}
      maxSize={maxSize}
      language={language}
      onChange={onChange}
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
