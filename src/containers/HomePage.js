import React from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import LogoutButton from '../components/session/LogoutButton';
import Loading from '../components/common/Loading';

const HomePage = ({ logoutLoading }) => {
  if (logoutLoading) {
    return <Loading />;
  }

  return (
    <div>
      <p>Welcome to React Redux Base</p>
      <LogoutButton />
    </div>
  );
};

HomePage.propTypes = {
  logoutLoading: bool.isRequired,
};

const mapStateToProps = ({ auth: { loading } }) => ({
  logoutLoading: loading,
});

export default connect(mapStateToProps)(HomePage);
