import * as Yup from 'yup';
import { isBefore, parse, startOfDay } from 'date-fns';

import { isValidDate } from './validationUtils';

export const validationSchema = Yup.object()
  .shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    city: Yup.string().required('Please select your city of residence'),
    postalCode: Yup.string()
      .required('Please enter your postal code')
      .matches(/^\d+$/, 'Postal code can only contain numbers')
      .length(5, 'Postal code needs to contain 5 numbers'),
    email: Yup.string().email('Please check the email address format').required('Please enter your email address'),
    phoneNumber: Yup.string().matches(/^[+][0-9]*$/, {
      message: 'Please enter the phone number in international mobile phone number format.',
      excludeEmptyString: true,
    }),
    registerPlate: Yup.string()
      .required('Please enter a register plate number')
      .matches(/^\w{2,3}-\d{1,3}$/, 'Register plate number must include 2-3 letters, a hyphen and 1-3 numbers.'),
    brand: Yup.string().required('Please enter a vehicle brand'),
    model: Yup.string().required('Please enter a vehicle model'),
    parkingPeriod: Yup.string().oneOf(['continuous', 'temporary'], 'Please select a parking pediod'),
    permitEndDate: Yup.string().when('parkingPeriod', {
      is: 'temporary',
      then: (schema) =>
        schema.required('Please enter a permit end date').test('is-date', (value, { createError, path }) => {
          if (!isValidDate(value)) {
            return createError({
              path,
              message: 'Please enter a permit end date in D.M.YYYY format',
            });
          }
          const selectedDate = parse(value, 'd.M.yyyy', new Date());

          if (isBefore(selectedDate, startOfDay(new Date()))) {
            return createError({
              path,
              message: 'Selected permit date is in the past. Please select a date that is in the future',
            });
          }
          return true;
        }),
      otherwise: (schema) => schema,
    }),
    acceptTerms: Yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
  })
  .required();

export type FormData = {
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  registerPlate: string;
  brand: string;
  model: string;
  parkingPeriod: string;
  permitEndDate: string;
  additionalRequests: string;
  acceptTerms: boolean;
};

export type FieldName = keyof FormData;

export const defaultValues: FormData = {
  firstName: '',
  lastName: '',
  city: '',
  postalCode: '',
  phoneNumber: '',
  email: '',
  registerPlate: '',
  brand: '',
  model: '',
  parkingPeriod: 'continuous',
  permitEndDate: '',
  additionalRequests: '',
  acceptTerms: false,
};
