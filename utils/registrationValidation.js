import Joi from 'joi';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Custom email validation function that works in browsers
const emailValidator = (value, helpers) => {
  // RFC 5322 compliant regex pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

// Custom Joi extension for phone validation
const phoneValidator = (value, helpers) => {
  // Try to parse with explicit country code first
  let phoneNumber = parsePhoneNumberFromString(value);

  // If not valid with explicit code, try with LV as default
  if (!phoneNumber || !phoneNumber.isValid()) {
    phoneNumber = parsePhoneNumberFromString(value, 'LV');
    if (!phoneNumber || !phoneNumber.isValid()) {
      return helpers.error('any.invalid'); // Joi error
    }
  }

  // Always return E.164 format with country code
  return phoneNumber.format('E.164'); // Return formatted (E.164) phone number with country code
};

// Error message translations - Latvian versions
const errorMessages = {
  name: 'Vārdam jāsatur tikai burti un jābūt vismaz 2 rakstzīmēm garam',
  surname: 'Uzvārdam jāsatur tikai burti un jābūt vismaz 2 rakstzīmēm garam',
  email: 'Lūdzu, ievadiet derīgu e-pasta adresi',
  phone: 'Lūdzu, ievadiet derīgu telefona numuru',
};

export const registrationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zĀ-ž\s'-]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': errorMessages.name,
      'string.empty': errorMessages.name,
      'any.required': errorMessages.name,
    }),

  surname: Joi.string()
    .pattern(/^[A-Za-zĀ-ž\s'-]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': errorMessages.surname,
      'string.empty': errorMessages.surname,
      'any.required': errorMessages.surname,
    }),

  email: Joi.string().required().custom(emailValidator, 'Email validation').messages({
    'any.invalid': errorMessages.email,
    'string.empty': errorMessages.email,
    'any.required': errorMessages.email,
  }),

  phone: Joi.string().required().custom(phoneValidator, 'Phone number validation').messages({
    'any.invalid': errorMessages.phone,
    'string.empty': errorMessages.phone,
    'any.required': errorMessages.phone,
  }),
  mailing: Joi.boolean().optional(),
});

export const validateRegistration = (data) => {
  return registrationSchema.validate(data, { abortEarly: false });
};
