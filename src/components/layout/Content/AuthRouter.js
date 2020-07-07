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

  if (!RouterAuthCheck(level)) {
    return null;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={({ match, location }) => (
        <Component match={match} location={location} {...props} />
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
