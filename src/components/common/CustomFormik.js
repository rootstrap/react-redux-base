import React from 'react';
import { func, object } from 'prop-types';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';

const CustomFormik = ({ component, handleSubmit, initialValues, ...props }) => {
  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    // resolve promise and set submitting to false
    try {
      await handleSubmit(values, { setSubmitting, setStatus });
    } catch (e) {
      isEmpty(e.errors) ? setStatus(e.error) : setStatus(e.errors);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      component={component}
      {...props}
    />
  );
};

CustomFormik.propTypes = {
  component: func.isRequired,
  handleSubmit: func.isRequired,
  initialValues: object.isRequired
};
export default CustomFormik;
