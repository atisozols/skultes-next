import { expect, test, describe } from 'vitest';
import { registrationSchema, validateRegistration } from '../../utils/registrationValidation';

// Helper function to validate - now using the imported validation function
function validate(data) {
  return validateRegistration(data);
}

describe('Registration Validation', () => {
  // Valid test cases
  describe('Valid registrations', () => {
    test('should validate a standard registration', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).toBeUndefined();
    });

    test('should validate registration with complex name', () => {
      const result = validate({
        name: 'Anna-Marija',
        surname: "O'Brien",
        email: 'anna.marija@example.com',
        phone: '+37126789012',
      });
      expect(result.error).toBeUndefined();
    });

    test('should validate registration with spaces in names', () => {
      const result = validate({
        name: 'Līga Marija',
        surname: 'Kalniņa Bērziņa',
        email: 'liga.marija@domain.lv',
        phone: '20123456',
      });
      expect(result.error).toBeUndefined();
    });

    test('should accept different phone number formats', () => {
      const result = validate({
        name: 'Pēteris',
        surname: 'Liepa',
        email: 'peteris@company.eu',
        phone: '(+371) 27 654 321',
      });
      expect(result.error).toBeUndefined();
    });

    test('should accept minimum length names', () => {
      const result = validate({
        name: 'Jo',
        surname: 'Li',
        email: 'jo.li@short.com',
        phone: '29876543',
      });
      expect(result.error).toBeUndefined();
    });
  });

  // Invalid test cases
  describe('Invalid name field', () => {
    test('should reject name with numbers', () => {
      const result = validate({
        name: 'Jānis123',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject too short name', () => {
      const result = validate({
        name: 'J',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject name with special characters', () => {
      const result = validate({
        name: 'Jānis!@#',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject empty name', () => {
      const result = validate({
        name: '',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject missing name field', () => {
      const result = validate({
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });
  });

  describe('Invalid surname field', () => {
    test('should reject surname with numbers', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols42',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject too short surname', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'O',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject surname with invalid special characters', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols*&^',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject empty surname', () => {
      const result = validate({
        name: 'Jānis',
        surname: '',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject missing surname field', () => {
      const result = validate({
        name: 'Jānis',
        email: 'janis@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });
  });

  describe('Invalid email field', () => {
    test('should reject invalid email format', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis.example.com', // missing @
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject email without domain', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject email with spaces', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis ozols@example.com',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject empty email', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: '',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject missing email field', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        phone: '22345678',
      });
      expect(result.error).not.toBeUndefined();
    });
  });

  describe('Invalid phone field', () => {
    test('should reject invalid phone format', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: 'abcdefg',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject phone number too short', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '123',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject invalid international format', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '+99912345',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject phone with letters', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '2234ABC5',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject empty phone', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
        phone: '',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject missing phone field', () => {
      const result = validate({
        name: 'Jānis',
        surname: 'Ozols',
        email: 'janis@example.com',
      });
      expect(result.error).not.toBeUndefined();
    });
  });

  describe('Multiple invalid fields', () => {
    test('should reject registration with multiple invalid fields', () => {
      const result = validate({
        name: 'J',
        surname: 'O',
        email: 'invalid-email',
        phone: '123',
      });
      expect(result.error).not.toBeUndefined();
    });

    test('should reject completely empty registration', () => {
      const result = validate({});
      expect(result.error).not.toBeUndefined();
    });

    test('should reject null values', () => {
      const result = validate({
        name: null,
        surname: null,
        email: null,
        phone: null,
      });
      expect(result.error).not.toBeUndefined();
    });
  });
});
