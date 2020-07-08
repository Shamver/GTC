import React from 'react';
import * as Proptypes from 'prop-types';
import { Route } from 'react-router';
import useStores from '../../../stores/useStores';

const AuthRouter = (props) => {
  const { UserStore } = useStores();
  const { RouterAuthCheck } = UserStore;
  const {
    level, Component, path, exact,
  } = props;

  // 0: 비회원, 1: 회원, 2: 운영자, 3:관리자
  if (!RouterAuthCheck(level)) {
    return null;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={({ match, location }) => (
        <Component match={match} location={location} />
      )}
    />
  );
};

AuthRouter.propTypes = {
  level: Proptypes.number.isRequired,
  Component: Proptypes.shape({}).isRequired,
  path: Proptypes.string.isRequired,
  exact: Proptypes.bool.isRequired
};

export default AuthRouter;
