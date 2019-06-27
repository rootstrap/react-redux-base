import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('email.presence').email('email.invalid'),
  password: Yup.string().required('password.presence')
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string().required('email.presence').email('email.invalid'),
  password: Yup.string().required('password.presence'),
  passwordConfirmation: Yup.string().required('passwordConfirmation.presence')
    .oneOf([Yup.ref('password'), null], 'passwordConfirmation.equality'),
});
