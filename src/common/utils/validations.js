import validate from 'validate.js';

const validations = (constraints, props = {}) =>
  data => validate(data.toJS(), constraints, props) || {};

export default validations;
