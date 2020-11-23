import React, { useEffect, useState } from 'react';
import { Formik, useFormik, Form } from 'formik';
import * as Yup from 'yup';

import { Button, ErrorSummary, TextInput, Checkbox } from '../../components';

export default {
  title: 'Patterns/Form validation',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const FormItem = ({ children }: React.PropsWithChildren<{}>) => {
  return <div style={{ marginBottom: 'var(--spacing-m)' }}>{children}</div>;
};

export const Static = () => {
  // Form error state
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  // Define the validation schema
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'First name is too short')
      .max(50, 'First name is too long')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name is too short')
      .max(50, 'Last name is too long')
      .required('Last name is required'),
    email: Yup.string().email('Email is invalid').required('Email is invalid'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      acceptTerms: false,
    },
    validateOnChange: false, // Disable validation on field change
    validateOnBlur: false, // Disable validation on field blur
    validationSchema: schema, // Assign the validation schema
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  // Update the hasErrors state based on validation errors
  useEffect(() => {
    setHasErrors(Object.values(formik.errors).length > 0 && Object.values(formik.touched).length > 0);
  }, [formik.errors, formik.touched]);

  // Handle the form submit button click
  const onSubmitButtonClick = () => {
    setHasErrors(false);
    formik.validateForm().then(() => formik.submitForm());
  };

  return (
    <form>
      {hasErrors && (
        <ErrorSummary label="Form contains following errors" style={{ marginBottom: 'var(--spacing-m)' }} autofocus>
          <ul>
            {Object.entries(formik.errors).map(([field, error], index) => (
              <li key={error}>
                Error {index + 1}: <a href={`#${field}`}>{error}</a>
              </li>
            ))}
          </ul>
        </ErrorSummary>
      )}
      <FormItem>
        <TextInput
          id="firstName"
          name="firstName"
          label="First name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          invalid={!!(hasErrors && formik.errors.firstName)}
          errorText={hasErrors && formik.errors.firstName}
          required
        />
      </FormItem>
      <FormItem>
        <TextInput
          id="lastName"
          name="lastName"
          label="Last name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          invalid={!!(hasErrors && formik.errors.lastName)}
          errorText={hasErrors && formik.errors.lastName}
          required
        />
      </FormItem>
      <FormItem>
        <TextInput
          id="email"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          invalid={!!(hasErrors && formik.errors.email)}
          errorText={hasErrors && formik.errors.email}
          required
        />
      </FormItem>
      <FormItem>
        <Checkbox
          id="acceptTerms"
          name="acceptTerms"
          label="I accept the terms of this service"
          checked={!!formik.values.acceptTerms}
          onChange={formik.handleChange}
        />
      </FormItem>
      <FormItem>
        <Button type="button" onClick={onSubmitButtonClick}>
          Submit
        </Button>
      </FormItem>
    </form>
  );
};

export const Dynamic = () => {
  // Define the validation schema
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'First name is too short')
      .max(50, 'First name is too long')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name is too short')
      .max(50, 'Last name is too long')
      .required('Last name is required'),
    email: Yup.string().email('Email is invalid').required('Email is invalid'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      acceptTerms: false,
    },
    validateOnChange: true, // Enable validation on field change
    validateOnBlur: true, // Enable validation on field blur
    validationSchema: schema, // Assign the validation schema
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItem>
        <TextInput
          id="firstName"
          name="firstName"
          label="First name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          invalid={!!(formik.touched.firstName && formik.errors.firstName)}
          errorText={formik.touched.firstName && formik.errors.firstName}
          required
        />
      </FormItem>
      <FormItem>
        <TextInput
          id="lastName"
          name="lastName"
          label="Last name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          invalid={!!(formik.touched.lastName && formik.errors.lastName)}
          errorText={formik.touched.lastName && formik.errors.lastName}
          required
        />
      </FormItem>
      <FormItem>
        <TextInput
          id="email"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          invalid={!!(formik.touched.email && formik.errors.email)}
          errorText={formik.touched.email && formik.errors.email}
          required
        />
      </FormItem>
      <FormItem>
        <Checkbox
          id="acceptTerms"
          name="acceptTerms"
          label="I accept the terms of this service"
          checked={!!formik.values.acceptTerms}
          onChange={formik.handleChange}
        />
      </FormItem>
      <FormItem>
        <Button type="submit">Submit</Button>
      </FormItem>
    </form>
  );
};
