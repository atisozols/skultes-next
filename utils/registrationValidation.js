import Joi from 'joi';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Custom Joi extension for phone validation
const phoneValidator = (value, helpers) => {
  const phoneNumber = parsePhoneNumberFromString(value, 'LV'); // fallback to Latvia
  if (!phoneNumber || !phoneNumber.isValid()) {
    return helpers.error('any.invalid'); // Joi error
  }
  return phoneNumber.number; // Return formatted (E.164) phone number
};

const registrationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zĀ-ž\s'-]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Name must contain only letters and be at least 2 characters long',
    }),

  surname: Joi.string()
    .pattern(/^[A-Za-zĀ-ž\s'-]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Surname must contain only letters and be at least 2 characters long',
    }),

  email: Joi.string().email().required(),

  phone: Joi.string().required().custom(phoneValidator, 'Phone number validation'),
});

// Example usage
const result = registrationSchema.validate({
  name: 'Jānis',
  surname: 'Ozols',
  email: 'janis@example.com',
  phone: '22345678',
});

if (result.error) {
  console.error(result.error.details);
} else {
  console.log('Validated input:', result.value);
}
