const validator = require('validator');

const validateSignup = (data) => {
  const errors = {};

  // Display Name validation
  if (!data.displayName || data.displayName.trim().length === 0) {
    errors.displayName = 'Display name is required';
  } else if (data.displayName.trim().length < 2) {
    errors.displayName = 'Display name must be at least 2 characters long';
  } else if (data.displayName.trim().length > 50) {
    errors.displayName = 'Display name must be less than 50 characters';
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  // Password validation
  if (!data.password || data.password.length === 0) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  } else if (data.password.length > 128) {
    errors.password = 'Password must be less than 128 characters';
  }

  // Confirm Password validation
  if (!data.confirmPassword || data.confirmPassword.length === 0) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateLogin = (data) => {
  const errors = {};

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  // Password validation
  if (!data.password || data.password.length === 0) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateSignup,
  validateLogin
};
