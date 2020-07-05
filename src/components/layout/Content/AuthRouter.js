import React from 'react';
import * as Proptypes from 'prop-types';
import { Route } from 'react-router';
import useStores from '../../../stores/useStores';

const AuthRouter = ({ level, Component, path }) => {
  const { UserStore } = useStores();
  const { RouterAuthCheck } = UserStore;

  if (!RouterAuthCheck(level)) {
    return null;
  }

  return (
    <Route exact path={path} render={() => (<Component />)} />
  );
};

AuthRouter.propTypes = {
  level: Proptypes.number.isRequired,
  Component: Proptypes.shape({}).isRequired,
  path: Proptypes.string.isRequired,
};

export default AuthRouter;
