import { object, string, ref } from 'yup';

export const loginSchema = object().shape({
  email: string().required('email.presence').email('email.invalid'),
  password: string().required('password.presence')
});

export const signUpSchema = object().shape({
  email: string().required('email.presence').email('email.invalid'),
  password: string().required('password.presence'),
  passwordConfirmation: string().required('passwordConfirmation.presence')
    .oneOf([ref('password'), null], 'passwordConfirmation.equality'),
});
