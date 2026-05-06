import React, { useEffect, useRef, useState } from 'react';

import { Notification, NotificationProps, NotificationSize } from './Notification';
import { Button } from '../button';
import { Link } from '../link/Link';
import { TextInput } from '../textInput';

const props = {
  label: 'Label',
};
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

export default {
  component: Notification,
  title: 'Components/Notification',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
};

export const Default = () => <Notification {...props}>{content}</Notification>;

export const Alert = () => (
  <Notification {...props} type="alert">
    {content}
  </Notification>
);

export const Error = () => (
  <Notification {...props} type="error">
    {content}
  </Notification>
);

export const Success = () => (
  <Notification {...props} type="success">
    {content}
  </Notification>
);

export const Small = () => (
  <Notification label="Only visible for screen readers" size={NotificationSize.Small}>
    Message
  </Notification>
);

export const Large = () => (
  <Notification {...props} size={NotificationSize.Large}>
    {content}
  </Notification>
);

export const WithBoxShadow = () => (
  <Notification {...props} boxShadow>
    {content}
  </Notification>
);

WithBoxShadow.storyName = 'With box shadow';

export const Invisible = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle notification</Button>
      {open && (
        <Notification label="Invisible notification" invisible>
          I&apos;m only seen by screen readers
        </Notification>
      )}
    </>
  );
};

export const Dismissible = () => {
  const [open, setOpen] = useState(true);
  const showButtonRef = useRef<HTMLButtonElement | null>(null);
  const onClose = () => {
    setOpen(false);
    if (showButtonRef.current) {
      showButtonRef.current.focus();
    }
  };

  return (
    <>
      {!open && (
        <Button ref={showButtonRef} onClick={() => setOpen(true)}>
          Open notification
        </Button>
      )}
      {open && (
        <Notification {...props} dismissible onClose={() => onClose()} closeButtonLabelText="Close notification">
          {content}
        </Notification>
      )}
    </>
  );
};

export const AutoClose = () => {
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const showButtonRef = useRef<HTMLButtonElement | null>(null);
  const showProgressButtonRef = useRef<HTMLButtonElement | null>(null);
  const onClose = () => {
    setOpen(false);
    setOpenProgress(false);
    if (showButtonRef.current) {
      showButtonRef.current.focus();
    }
    if (showProgressButtonRef.current) {
      showProgressButtonRef.current.focus();
    }
  };

  return (
    <>
      <Button disabled={open || openProgress} ref={showButtonRef} onClick={() => setOpen(true)}>
        Show without progress bar
      </Button>
      <br />
      <br />
      <Button disabled={open || openProgress} ref={showProgressButtonRef} onClick={() => setOpenProgress(true)}>
        Show with progress bar
      </Button>
      {open && (
        <Notification
          label="Without progress bar"
          position="top-left"
          autoClose
          displayAutoCloseProgress={false}
          onClose={() => onClose()}
        >
          {content}
        </Notification>
      )}
      {openProgress && (
        <Notification label="With progress bar" position="top-left" autoClose onClose={() => onClose()}>
          {content}
        </Notification>
      )}
    </>
  );
};

export const WithCustomAriaLabel = () => (
  <Notification {...props} notificationAriaLabel="Custom aria label">
    {content}
  </Notification>
);

WithCustomAriaLabel.storyName = 'With a custom aria-label';

export const WithCustomHeadingLevel = () => (
  <Notification {...props} headingLevel={3}>
    {content}
  </Notification>
);

WithCustomHeadingLevel.storyName = 'With a custom aria-level';

export const WithLink = () => (
  <Notification
    {...props}
    link={
      <Link href="https://example.com" data-test="notification-link">
        Link
      </Link>
    }
  >
    {content}
  </Notification>
);

WithLink.storyName = 'With a link';

// Test case for when link is undefined or not a valid element
export const WithInvalidLink = () => (
  <Notification
    {...props}
    // @ts-ignore - deliberately testing incorrect usage
    link="not a valid React element"
  >
    {content}
  </Notification>
);

WithInvalidLink.storyName = 'With invalid link (for testing)';

export const AsErrorSummary = () => (
  <Notification type="error" label="Form contains following errors" notificationAriaLabel="Error summary">
    <ul>
      <li>
        Error 1: <a href="#first-name">Please enter your first name</a>
      </li>
      <li>
        Error 2: <a href="#last-name">Please enter your last name</a>
      </li>
      <li>
        Error 3: <a href="#email">Please enter a valid email address</a>
      </li>
    </ul>
  </Notification>
);

AsErrorSummary.storyName = 'As error summary';

type FormFields = { firstName: string; lastName: string; email: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

const formFields: Array<{ key: keyof FormFields; id: string; label: string; errorMessage: string }> = [
  { key: 'firstName', id: 'first-name', label: 'First name', errorMessage: 'Please enter your first name' },
  { key: 'lastName', id: 'last-name', label: 'Last name', errorMessage: 'Please enter your last name' },
  { key: 'email', id: 'email', label: 'Email address', errorMessage: 'Please enter a valid email address' },
];

const validate = (values: FormFields): FormErrors => {
  const errors: FormErrors = {};
  if (!values.firstName) errors.firstName = formFields[0].errorMessage;
  if (!values.lastName) errors.lastName = formFields[1].errorMessage;
  if (!values.email || !values.email.includes('@')) errors.email = formFields[2].errorMessage;
  return errors;
};

export const AsErrorSummaryWithForm = () => {
  const [values, setValues] = useState<FormFields>({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitCount, setSubmitCount] = useState(0);

  const fieldsWithErrors = formFields.filter((f) => errors[f.key]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitCount((c) => c + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {fieldsWithErrors.length > 0 && (
        <Notification
          key={submitCount}
          type="error"
          label="Form contains following errors"
          notificationAriaLabel="Error summary"
          autofocus
        >
          <ul>
            {fieldsWithErrors.map((f) => (
              <li key={f.id}>
                <a href={`#${f.id}`}>{errors[f.key]}</a>
              </li>
            ))}
          </ul>
        </Notification>
      )}
      {formFields.map((f) => (
        <TextInput
          key={f.id}
          id={f.id}
          label={f.label}
          value={values[f.key]}
          onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
          invalid={!!errors[f.key]}
          errorText={errors[f.key]}
        />
      ))}
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

AsErrorSummaryWithForm.storyName = 'As error summary with form';

export const Playground = (args: NotificationProps & Record<string, string>) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (args.position === 'inline') setOpen(true);
  }, [args.position]);

  return (
    <>
      <Button
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => setOpen(!open)}
      >
        Toggle notification
      </Button>
      {open && (
        <Notification
          autoClose={args.autoClose}
          autoCloseDuration={args.autoCloseDuration}
          displayAutoCloseProgress={args.displayAutoCloseProgress}
          invisible={args.invisible}
          label={args.label}
          type={args.type}
          onClose={() => setOpen(false)}
          position={args.position}
          size={args.size as NotificationSize.Medium}
          dismissible={args.dismissible}
          closeButtonLabelText={args.closeButtonLabelText as string}
          headingLevel={args.headingLevel}
        >
          {args.body}
        </Notification>
      )}
    </>
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
  label: 'Label',
  body: content,
  closeButtonLabelText: 'Close notification',
  type: 'info',
  size: NotificationSize.Medium,
  position: 'inline',
  invisible: false,
  dismissible: false,
  autoClose: false,
  displayAutoCloseProgress: true,
  autoCloseDuration: 6000,
  headingLevel: 2,
};

Playground.argTypes = {
  type: {
    options: ['info', 'success', 'alert', 'error'],
    control: { type: 'radio' },
  },
  size: {
    options: [NotificationSize.Small, NotificationSize.Medium, NotificationSize.Large],
    control: { type: 'radio' },
  },
  position: {
    options: ['inline', 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    control: { type: 'radio' },
  },
};
