/* eslint-disable jsx-a11y/anchor-is-valid, no-console */
import React, { FormEvent, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CityOptionType, getCitites, isValidDate } from './validationUtils';
import {
  Button,
  TextInput,
  Checkbox,
  SelectionGroup,
  RadioButton,
  TextArea,
  ErrorSummary,
  Combobox,
  DateInput,
} from '../../components';

import './validation.scss';

const cities = getCitites();

export const Hybrid = () => {
  /**
   * Form submitted state
   */
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  /**
   * Backend errors state
   */
  const [hasBackendErrors, setHasBackendErrors] = useState<boolean>(false);
  /**
   * Initialize formik
   */
  const formik = useFormik({
    // Set initial field values
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
    // Define Yup validation schema
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Please enter your first name'),
      lastName: Yup.string().required('Please enter your last name'),
      city: Yup.string().required('Please select your city of residence'),
      postalCode: Yup.string()
        .matches(/^\d+$/, 'Postal code can only contain numbers')
        .length(5, 'Postal code needs to contain 5 numbers')
        .required('Please enter your postal code'),
      email: Yup.string().email('Please check the email address format').required('Please enter your email address'),
      registerPlate: Yup.string()
        .matches(/^\w{2,3}-\d{1,3}$/, 'Register plate number must include 2-3 letters, a hyphen and 1-3 numbers.')
        .required('Please enter a register plate number'),
      brand: Yup.string().required('Please enter a vehicle brand'),
      model: Yup.string().required('Please enter a vehicle model'),
      parkingPeriod: Yup.string().oneOf(['continuous', 'temporary'], 'Please select a parking pediod'),
      permitEndDate: Yup.string().when('parkingPeriod', {
        is: 'temporary',
        then: Yup.string()
          .required('Please enter a permit end date')
          .test('is-date', 'Please enter a permit end date in DD.MM.YYYY format.', isValidDate),
        otherwise: Yup.string(),
      }),
      acceptTerms: Yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
    }),
    // Enable validation on field change
    validateOnChange: true,
    // Enable validation on field blur
    validateOnBlur: true,
    // Handle the form submit after validation
    onSubmit: (values, helpers) => {
      console.log('Form submitted:', values);

      // Simulate backend errors
      setHasBackendErrors(true);
      helpers.setTouched({});
    },
  });

  /**
   * Get the error message for a single field
   */
  const getErrorMessage = (fieldName: string) => {
    if (hasBackendErrors && fieldName === 'registerPlate' && !formik.touched[fieldName]) {
      return 'Permit for this plate number already exists. Only one permit per vehicle is allowed.';
    }
    return (formik.touched[fieldName] || isSubmitted) && formik.errors[fieldName];
  };

  /**
   * Get the success message for a single field
   */
  const getSuccessMessage = (fieldName: string) => {
    if (fieldName === 'registerPlate') {
      return formik.touched[fieldName] && !formik.errors[fieldName] ? 'Register plate number is valid' : undefined;
    }
    return null;
  };

  /**
   * Get the focusable field id
   */
  const getFocusableFieldId = (fieldName: string): string => {
    // For the city select element, focus the toggle button
    if (fieldName === 'city') {
      return `${fieldName}-toggle-button`;
    }
    return fieldName;
  };

  /**
   * Handle form submit
   */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    formik.validateForm().then((errors) => {
      // Focus the first invalid field
      const invalidFields = Object.keys(errors);
      if (invalidFields.length > 0) {
        const firstFieldId = getFocusableFieldId(invalidFields[0]);
        document.getElementById(firstFieldId).focus();
      } else {
        setHasBackendErrors(false);
        formik.submitForm();
      }
    });
  };

  /**
   * Render the error summary section for backend validation errors
   */
  const renderErrorSummary = () =>
    hasBackendErrors ? (
      <ErrorSummary label="Form contains following errors" className="hds-example-form__error-summary" autofocus>
        <ul>
          <li>
            Error 1:{' '}
            <a href="#registerPlate">
              Permit for this plate number already exists. Only one permit per vehicle is allowed.
            </a>
          </li>
        </ul>
      </ErrorSummary>
    ) : null;

  return (
    <div className="hds-example-form">
      <h1 className="hds-example-form__main-title">Hybrid form validation example</h1>
      <form onSubmit={onSubmit} noValidate>
        <h2 className="hds-example-form__title">Residental parking permit application</h2>
        {renderErrorSummary()}
        <div className="hds-example-form__required-info">All fields marked with * are required</div>
        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Contact information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <TextInput
                id="firstName"
                name="firstName"
                label="First name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                invalid={!!getErrorMessage('firstName')}
                aria-invalid={!!getErrorMessage('firstName')}
                errorText={getErrorMessage('firstName')}
                autoComplete="given-name"
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                id="lastName"
                name="lastName"
                label="Last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                invalid={!!getErrorMessage('lastName')}
                aria-invalid={!!getErrorMessage('lastName')}
                errorText={getErrorMessage('lastName')}
                autoComplete="family-name"
                required
              />
            </div>
          </div>
          <div className="hds-example-form__grid-8-4">
            <div className="hds-example-form__item">
              <Combobox<CityOptionType>
                id="city"
                label="City"
                optionLabelField="label"
                options={cities}
                onChange={(selected: CityOptionType) => {
                  formik.setFieldValue('city', selected ? selected.label : '');
                }}
                onBlur={() => {
                  formik.handleBlur({ target: { name: 'city' } });
                }}
                defaultValue={{ label: formik.values.city }}
                toggleButtonAriaLabel="Toggle"
                invalid={!!getErrorMessage('city')}
                error={getErrorMessage('city')}
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                id="postalCode"
                name="postalCode"
                label="Postal code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
                invalid={!!getErrorMessage('postalCode')}
                aria-invalid={!!getErrorMessage('postalCode')}
                errorText={getErrorMessage('postalCode')}
                autoComplete="postal-code"
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
              onBlur={formik.handleBlur}
              value={formik.values.email}
              invalid={!!getErrorMessage('email')}
              aria-invalid={!!getErrorMessage('email')}
              errorText={getErrorMessage('email')}
              autoComplete="email"
              required
              tooltipButtonLabel="Tooltip: Email address"
              tooltipText="We will send a confirmation to this email address. You may also receive important updates about your parking permit via email."
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
                onBlur={formik.handleBlur}
                value={formik.values.registerPlate}
                invalid={!!getErrorMessage('registerPlate')}
                aria-invalid={!!getErrorMessage('registerPlate')}
                errorText={getErrorMessage('registerPlate')}
                successText={getSuccessMessage ? getSuccessMessage('registerPlate') : undefined}
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
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                invalid={!!getErrorMessage('brand')}
                aria-invalid={!!getErrorMessage('brand')}
                errorText={getErrorMessage('brand')}
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
                onBlur={formik.handleBlur}
                value={formik.values.model}
                invalid={!!getErrorMessage('model')}
                aria-invalid={!!getErrorMessage('model')}
                errorText={getErrorMessage('model')}
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
                errorText={getErrorMessage('parkingPeriod')}
              >
                <RadioButton
                  id="parkingPeriodContinuous"
                  name="parkingPeriod"
                  value="continuous"
                  label="Continuous"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.parkingPeriod === 'continuous'}
                />
                <RadioButton
                  id="parkingPeriodTemporary"
                  name="parkingPeriod"
                  value="temporary"
                  label="Temporary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.parkingPeriod === 'temporary'}
                />
              </SelectionGroup>
            </div>
            {formik.values.parkingPeriod === 'temporary' && (
              <div className="hds-example-form__item">
                <DateInput
                  id="permitEndDate"
                  name="permitEndDate"
                  label="Permit end date"
                  helperText="Use format DD.MM.YYYY"
                  onChange={(value) => {
                    formik.setFieldValue('permitEndDate', value || '');
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.permitEndDate}
                  invalid={!!getErrorMessage('permitEndDate')}
                  aria-invalid={!!getErrorMessage('permitEndDate')}
                  errorText={getErrorMessage('permitEndDate')}
                  required
                  tooltipButtonLabel="Tooltip: Permit end date"
                  tooltipText="This is the last date you need the permit to be active. The permit will expire at the inputted date at 23:59 o'clock."
                />
              </div>
            )}
          </div>
          <div className="hds-example-form__item">
            <TextArea
              id="additionalRequests"
              name="additionalRequests"
              label="Additional requests"
              placeholder="E.g. Request for a parking space near a specific location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.additionalRequests}
              invalid={!!getErrorMessage('additionalRequests')}
              aria-invalid={!!getErrorMessage('additionalRequests')}
              errorText={getErrorMessage('additionalRequests')}
              tooltipButtonLabel="Tooltip: Additional requests"
              tooltipText="Here you may leave extra requests regarding the parking space. For example, you may request space near a specific location. If you have a large vehicle, you may request a larger space."
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
              errorText={getErrorMessage('acceptTerms')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={!!getErrorMessage('acceptTerms')}
            />
            <div className="hds-example-form__terms">
              <span>Read the terms of service</span>
            </div>
          </div>
        </div>
        <div className="hds-example-form__item">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

Hybrid.parameters = { loki: { skip: true } };
