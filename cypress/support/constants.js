// HTTP METHODS
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

// HTTP CODES
export const SUCCESS_CODE = 200;
export const UNAUTHORIZED_CODE = 401;
export const NOT_FOUND_CODE = 401;
export const UNPROCESSABLE_ENTITY_CODE = 422;
export const INTERNAL_SERVER_ERROR_CODE = 500;

// COMMON STUB REQUEST CASES
export const SUCCESS_CASE = 'success';
export const FAIL_CASE = 'fail';

// INPUT TYPES
export const inputTypes = {
  INPUT: 'input',
  TEXTAREA: 'textarea'
};

// INPUT TYPES
export const validationTypes = {
  PRESENCE: 'presence',
  EMAIL: 'email',
  EQUALITY: 'equality'
};

// INPUT TYPES
export const checkTypes = {
  ERROR: { id: 'error', selector: '.error' },
  WARNING: { id: 'warning', selector: '.warning' }
};
