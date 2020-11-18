import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import { Route } from 'react-router';
import { toast } from 'react-toastify';
import useStores from '../../../stores/useStores';

const AuthRouter = (props) => {
  const { UserStore, UtilRouteStore } = useStores();
  const { history } = UtilRouteStore;
  const { RouterAuthCheck } = UserStore;
  const {
    level, Component, path, exact,
  } = props;

  // 0: 비회원, 1: 회원, 2: 운영자, 3:관리자
  if (!RouterAuthCheck(level)) {
    toast.error('😳 권한이 없습니다.');
    history.push('/');
    return null;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={({ match, location }) => (
        <Component location={location} match={match} parentProps={props} />
      )}
    />
  );
};

AuthRouter.propTypes = {
  level: Proptypes.number.isRequired,
  Component: Proptypes.elementType.isRequired,
  path: Proptypes.string.isRequired,
  exact: Proptypes.bool.isRequired,
};

export default memo(AuthRouter);
