/* eslint-disable jsx-a11y/anchor-is-valid, no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getCitites } from './validationUtils';
import { defaultValues, FieldName, FormData, validationSchema } from './validationSchema';
import {
  Button,
  Checkbox,
  DateInput,
  ErrorSummary,
  PhoneInput,
  RadioButton,
  SelectionGroup,
  TextArea,
  TextInput,
  Select,
  Option,
} from '../../components';
import './validation.scss';

const cities = getCitites();

export const Static = () => {
  const {
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues,
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (fieldName: FieldName, value) => {
    setValue(fieldName, value);
  };

  /**
   * Get the success message for a single field
   */
  const getSuccessMessage = (fieldName: FieldName) => {
    if (fieldName === 'registerPlate') {
      return getValues('registerPlate') && errors?.registerPlate === undefined
        ? 'Register plate number is valid'
        : undefined;
    }
    return undefined;
  };

  /**
   * Get the focusable field id
   */
  const getFocusableFieldId = (fieldName: FieldName): string => {
    // For the city select element, focus the toggle button
    if (fieldName === 'city') {
      return `${fieldName}-label`;
    }
    return fieldName;
  };

  /**
   * Handle form submit
   */
  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  /**
   * Render the error summary section
   */
  const renderErrorSummary = () =>
    Object.keys(errors).length > 0 ? (
      <ErrorSummary label="Form contains following errors" className="hds-example-form__error-summary" autofocus>
        <ul>
          {Object.keys(errors).map((errorKey, index) => (
            <li key={`error-${errorKey}`}>
              Error {index + 1}:{' '}
              <a href={`#${getFocusableFieldId(errorKey as FieldName)}`}>{errors[errorKey].message}</a>
            </li>
          ))}
        </ul>
      </ErrorSummary>
    ) : null;

  return (
    <div className="hds-example-form">
      <h1 className="hds-example-form__main-title">Static form validation example</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <h2 className="hds-example-form__title">Residental parking permit application</h2>
        {renderErrorSummary()}
        <div className="hds-example-form__required-info">All fields marked with * are required</div>
        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Contact information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <TextInput
                {...register('firstName')}
                onChange={(e) => {
                  handleChange('firstName', e.currentTarget.value);
                }}
                id="firstName"
                name="firstName"
                label="First name"
                invalid={!!errors.firstName?.message}
                aria-invalid={!!errors.firstName?.message}
                errorText={errors.firstName?.message}
                autoComplete="given-name"
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                {...register('lastName')}
                onChange={(e) => {
                  handleChange('lastName', e.currentTarget.value);
                }}
                id="lastName"
                name="lastName"
                label="Last name"
                invalid={!!errors.lastName?.message}
                aria-invalid={!!errors.lastName?.message}
                errorText={errors.lastName?.message}
                autoComplete="family-name"
                required
              />
            </div>
          </div>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <Select
                id="city"
                clearable
                texts={{ label: 'City', error: errors.city?.message, placeholder: '' }}
                options={cities}
                onChange={(selectedOptions: Option[]) => {
                  handleChange('city', selectedOptions.length ? selectedOptions[0].label : '');
                }}
                value={[getValues('city')]}
                invalid={!!errors.city?.message}
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                {...register('postalCode')}
                onChange={(e) => {
                  handleChange('postalCode', e.currentTarget.value);
                }}
                id="postalCode"
                name="postalCode"
                label="Postal code"
                invalid={!!errors.postalCode?.message}
                aria-invalid={!!errors.postalCode?.message}
                errorText={errors.postalCode?.message}
                autoComplete="postal-code"
                required
              />
            </div>
          </div>
          <div className="hds-example-form__item">
            <TextInput
              {...register('email')}
              onChange={(e) => {
                handleChange('email', e.currentTarget.value);
              }}
              id="email"
              name="email"
              label="Email address"
              invalid={!!errors.email?.message}
              aria-invalid={!!errors.email?.message}
              errorText={errors.email?.message}
              autoComplete="email"
              required
              tooltipButtonLabel="Tooltip: Email address"
              tooltipText="We will send a confirmation to this email address. You may also receive important updates about your parking permit via email."
            />
          </div>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <PhoneInput
                {...register('phoneNumber')}
                onChange={(e) => {
                  handleChange('phoneNumber', e.currentTarget.value);
                }}
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                pattern="[+][0-9]"
                helperText="Use international mobile number format, e.g. +358401234567"
                invalid={!!errors.phoneNumber?.message}
                aria-invalid={!!errors.phoneNumber?.message}
                errorText={errors.phoneNumber?.message}
                successText={getSuccessMessage('phoneNumber')}
              />
            </div>
          </div>
        </div>
        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Vehicle information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <TextInput
                {...register('registerPlate')}
                onChange={(e) => {
                  handleChange('registerPlate', e.currentTarget.value);
                }}
                id="registerPlate"
                name="registerPlate"
                label="Register plate number"
                placeholder="E.g. ABC-123"
                helperText="Use format XXX-NNN"
                invalid={!!errors.registerPlate?.message}
                aria-invalid={!!errors.registerPlate?.message}
                errorText={errors.registerPlate?.message}
                successText={getSuccessMessage('registerPlate')}
                required
              />
            </div>
          </div>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <TextInput
                {...register('brand')}
                onChange={(e) => {
                  handleChange('brand', e.currentTarget.value);
                }}
                id="brand"
                name="brand"
                label="Vehicle brand"
                placeholder="E.g. Skoda"
                invalid={!!errors.brand?.message}
                aria-invalid={!!errors.brand?.message}
                errorText={errors.brand?.message}
                required
              />
            </div>
            <div className="hds-example-form__item">
              <TextInput
                {...register('model')}
                onChange={(e) => {
                  handleChange('model', e.currentTarget.value);
                }}
                id="model"
                name="model"
                label="Vehicle model"
                placeholder="E.g. Octavia"
                invalid={!!errors.model?.message}
                aria-invalid={!!errors.model?.message}
                errorText={errors.model?.message}
                required
              />
            </div>
          </div>
        </div>
        <div className="hds-example-form__section">
          <h3 className="hds-example-form__section-title">Parking information</h3>
          <div className="hds-example-form__grid-6-6">
            <div className="hds-example-form__item">
              <SelectionGroup label="Parking period" direction="horizontal" required>
                <RadioButton
                  {...register('parkingPeriod')}
                  id="parkingPeriodContinuous"
                  name="parkingPeriod"
                  value="continuous"
                  label="Continuous"
                  checked={watch('parkingPeriod') === 'continuous'}
                  onChange={() => {
                    handleChange('parkingPeriod', 'continuous');
                    setValue('permitEndDate', '');
                  }}
                />
                <RadioButton
                  {...register('parkingPeriod')}
                  id="parkingPeriodTemporary"
                  name="parkingPeriod"
                  value="temporary"
                  label="Temporary"
                  checked={watch('parkingPeriod') === 'temporary'}
                  onChange={() => handleChange('parkingPeriod', 'temporary')}
                />
              </SelectionGroup>
            </div>
            {getValues('parkingPeriod') === 'temporary' && (
              <div className="hds-example-form__item">
                <DateInput
                  {...register('permitEndDate')}
                  id="permitEndDate"
                  name="permitEndDate"
                  label="Permit end date"
                  helperText="Use format DD.MM.YYYY"
                  minDate={new Date()}
                  onChange={(e) => {
                    handleChange('permitEndDate', e);
                  }}
                  value={getValues('permitEndDate')}
                  invalid={!!errors.permitEndDate?.message}
                  aria-invalid={!!errors.permitEndDate?.message}
                  errorText={errors.permitEndDate?.message}
                  required
                  tooltipButtonLabel="Tooltip: Permit end date"
                  tooltipText="This is the last date you need the permit to be active. The permit will expire at the inputted date at 23:59 o'clock."
                />
              </div>
            )}
          </div>
          <div className="hds-example-form__item">
            <TextArea
              {...register('additionalRequests')}
              onChange={(e) => {
                handleChange('additionalRequests', e.currentTarget.value);
              }}
              id="additionalRequests"
              name="additionalRequests"
              label="Additional requests"
              placeholder="E.g. Request for a parking space near a specific location"
              tooltipButtonLabel="Tooltip: Additional requests"
              tooltipText="Here you may leave extra requests regarding the parking space. For example, you may request space near a specific location. If you have a large vehicle, you may request a larger space."
            />
          </div>
        </div>
        <div className="hds-example-form__section">
          <div className="hds-example-form__item">
            <Checkbox
              {...register('acceptTerms')}
              id="acceptTerms"
              name="acceptTerms"
              label="I have read and I accept the terms and conditions"
              required
              aria-invalid={!!errors.acceptTerms?.message}
              errorText={errors.acceptTerms?.message}
              checked={watch('acceptTerms')}
              onChange={(e) => {
                handleChange('acceptTerms', e.target.checked);
              }}
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

Static.parameters = { loki: { skip: true } };
