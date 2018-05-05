import React from 'react';
import { number, object } from 'prop-types';
import { Route } from 'react-router-dom';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code;
      }
      return children;
    }}
  />
);

Status.propTypes = {
  code: number.isRequired,
  children: object.isRequired
};

export default Status;
