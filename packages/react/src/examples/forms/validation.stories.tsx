import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  ErrorSummary,
  TextInput,
  Checkbox,
  Select,
  SelectionGroup,
  RadioButton,
  TextArea,
  Container,
} from '../../components';

import './validation.scss';

export default {
  title: 'Patterns/Form validation',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const FormItem = ({ children }: React.PropsWithChildren<{}>) => {
  return <div style={{ marginBottom: 'var(--spacing-m)' }}>{children}</div>;
};

const isValidDate = (value?: string) => {
  const dateParts = typeof value === 'string' ? value.split('.') : [];
  return !Number.isNaN(Date.parse(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`));
};

export const Static = () => {
  // Form error state
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  // The validation schema
  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string()
      .matches(/^\d+$/, 'Postal code must contain numbers only')
      .required('Postal code is required'),
    email: Yup.string().email('Email is invalid').required('Email is invalid'),
    registerPlate: Yup.string()
      .matches(/^\w{1,3}-\d{1,3}$/, 'Invalid register plate number')
      .required('Register plate number is required'),
    brand: Yup.string().required('Vehicle brand is required'),
    model: Yup.string().required('Vehicle model is required'),
    parkingPeriod: Yup.string().oneOf(
      ['continuous', 'temporary'],
      'Parking period must be either continuous or temporary',
    ),
    permitEndDate: Yup.string()
      .required('Permit end date is required')
      .test('is-date', 'Permit end date must be in DD.MM.YYYY format.', isValidDate),
    acceptTerms: Yup.boolean().oneOf([true], 'You must read and accept the terms and conditions'),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      city: '',
      postalCode: '',
      email: '',
      registerPlate: '',
      brand: '',
      model: '',
      parkingPeriod: 'continuous',
      permitEndDate: '',
      additionalRequests: '',
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

  // Get the focusable field id based on field name
  const getFocusableFieldId = (fieldName: string): string => {
    // For the city select element, focus the toggle button
    if (fieldName === 'city') {
      return `${fieldName}-toggle-button`;
    }
    return fieldName;
  };

  return (
    <Container className="hds-example-form">
      <form>
        <h2 className="hds-example-form__title">Residental parking permit application</h2>

        {hasErrors && (
          <ErrorSummary label="Form contains following errors" style={{ marginBottom: 'var(--spacing-m)' }} autofocus>
            <ul>
              {Object.entries(formik.errors).map(([field, error], index) => (
                <li key={error}>
                  Error {index + 1}: <a href={`#${getFocusableFieldId(field)}`}>{error}</a>
                </li>
              ))}
            </ul>
          </ErrorSummary>
        )}

        <p className="hds-example-form__required-info">All fields marked with * are required</p>

        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Contact information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
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
            </div>
            <div className="hds-example-form__item">
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
            </div>
          </div>
          <div className="hds-example-form__grid-8-4">
            <div className="hds-example-form__item">
              <Select<{ label: string }>
                id="city"
                label="City"
                options={[{ label: 'Espoo' }, { label: 'Helsinki' }, { label: 'Vantaa' }]}
                onChange={(value: { label: string }) => {
                  formik.setFieldValue('city', value.label);
                }}
                value={{ label: formik.values.city }}
                invalid={!!(hasErrors && formik.errors.city)}
                error={hasErrors && formik.errors.city}
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                id="postalCode"
                name="postalCode"
                label="Postal code"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                invalid={!!(hasErrors && formik.errors.postalCode)}
                errorText={hasErrors && formik.errors.postalCode}
                required
              />
            </div>
          </div>
          <div className="hds-example-form__item">
            <TextInput
              id="email"
              name="email"
              label="Email address"
              onChange={formik.handleChange}
              value={formik.values.email}
              invalid={!!(hasErrors && formik.errors.email)}
              errorText={hasErrors && formik.errors.email}
              required
            />
          </div>
        </div>
        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Vehicle information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <TextInput
                id="registerPlate"
                name="registerPlate"
                label="Register plate number"
                placeholder="E.g. ABC-123"
                helperText="Use format XXX-NNN"
                onChange={formik.handleChange}
                value={formik.values.registerPlate}
                invalid={!!(hasErrors && formik.errors.registerPlate)}
                errorText={hasErrors && formik.errors.registerPlate}
                required
              />
            </div>
          </div>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <TextInput
                id="brand"
                name="brand"
                label="Vehicle brand"
                placeholder="E.g. Skoda"
                onChange={formik.handleChange}
                value={formik.values.brand}
                invalid={!!(hasErrors && formik.errors.brand)}
                errorText={hasErrors && formik.errors.brand}
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                id="model"
                name="model"
                label="Vehicle model"
                placeholder="E.g. Octavia"
                onChange={formik.handleChange}
                value={formik.values.model}
                invalid={!!(hasErrors && formik.errors.model)}
                errorText={hasErrors && formik.errors.model}
                required
              />
            </div>
          </div>
        </div>
        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Parking information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <SelectionGroup
                label="Parking period"
                direction="horizontal"
                required
                errorText={hasErrors && formik.errors.parkingPeriod}
              >
                <RadioButton
                  id="parkingPeriodContinuous"
                  name="parkingPeriod"
                  value="continuous"
                  label="Continuous"
                  onChange={formik.handleChange}
                  checked={formik.values.parkingPeriod === 'continuous'}
                />
                <RadioButton
                  id="parkingPeriodTemporary"
                  name="parkingPeriod"
                  value="temporary"
                  label="Temporary"
                  onChange={formik.handleChange}
                  checked={formik.values.parkingPeriod === 'temporary'}
                />
              </SelectionGroup>
            </div>
            <div className="hds-example-form__item">
              <TextInput
                id="permitEndDate"
                name="permitEndDate"
                label="Permit end date"
                helperText="Use format DD.MM.YYYY"
                onChange={formik.handleChange}
                value={formik.values.permitEndDate}
                invalid={!!(hasErrors && formik.errors.permitEndDate)}
                errorText={hasErrors && formik.errors.permitEndDate}
                required
              />
            </div>
          </div>
          <div className="hds-example-form__item">
            <TextArea
              id="additionalRequests"
              name="additionalRequests"
              label="Additional requests"
              placeholder="E.g. Request for a parking space near a specific location"
              onChange={formik.handleChange}
              value={formik.values.additionalRequests}
              invalid={!!(hasErrors && formik.errors.additionalRequests)}
              errorText={hasErrors && formik.errors.additionalRequests}
            />
          </div>
        </div>
        <div className="hds-example-form__section">
          <div className="hds-example-form__item">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              label="I have read and I accept the terms and conditions"
              required
              checked={formik.values.acceptTerms === true}
              errorText={hasErrors && formik.errors.acceptTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="hds-example-form__item">
          <Button type="button" onClick={onSubmitButtonClick}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
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
          onBlur={formik.handleBlur}
          errorText={formik.touched.acceptTerms && formik.errors.acceptTerms}
        />
      </FormItem>
      <FormItem>
        <Button type="submit">Submit</Button>
      </FormItem>
    </form>
  );
};
