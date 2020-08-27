import React, { useEffect, memo } from 'react';
import { Switch } from 'react-router';
import { observer } from 'mobx-react';
import Contents from '../../Content';
import useStores from '../../../stores/useStores';
import AuthRouter from './AuthRouter';
import Router from './Router';

const SwitchList = () => {
  const { UserStore } = useStores();
  const { userData } = UserStore;

  useEffect(() => {
  }, [userData]);

  return (
    <Switch>
      <AuthRouter exact Component={Contents.Home} level={0} path="/" />
      <AuthRouter exact Component={Contents.Daily} level={0} path="/daily" />
      <AuthRouter exact Component={Contents.Advertise} level={0} path="/advertise" />

      <AuthRouter exact Component={Contents.PostView} level={1} path="/post/:id" />
      <AuthRouter exact Component={Contents.Mail} level={1} path="/mail" />
      <AuthRouter exact Component={Contents.Setting} level={1} path="/setting" />
      <AuthRouter exact Component={Contents.NewAlert} level={1} path="/newalert" />
      <AuthRouter exact Component={Contents.MyAccount} level={1} path="/myaccount" />
      <AuthRouter exact Component={Contents.Code} level={3} path="/code" />
      <AuthRouter exact Component={Contents.Test} level={3} path="/test" />
      <AuthRouter exact Component={Contents.BoardSetting} level={3} path="/boardsetting" />

      {/* ---------------------------- ConsultAdmin Router Component --------------------------- */}
      <AuthRouter exact={false} Component={Router.ConsultAdminRouter} level={1} path="/consult/get" />

      {/* ---------------------------- Consult Router Component --------------------------- */}
      <AuthRouter exact={false} Component={Router.ConsultRouter} level={1} path="/consult" />

      {/* ---------------------------- PostLocker Router Component --------------------------- */}
      <AuthRouter exact={false} Component={Router.PostLockerRouter} level={1} path="/postlocker" />

      {/* --------------------------- Pointer Router Component --------------------------- */}
      <AuthRouter exact={false} Component={Router.PointRouter} level={1} path="/mypoint" />

      {/* ---------------------------- Search Router Component --------------------------- */}
      <AuthRouter exact={false} Component={Router.SearchRouter} level={1} path="/search" />

      {/* ---------------------------- Pointer Router Component --------------------------- */}
      <AuthRouter exact={false} Component={Router.ReportRouter} level={3} path="/report" />

      {/* ---------------------------- Board Router Component ---------------------------- */}
      <AuthRouter exact={false} Component={Router.BoardRouter} level={0} path="/:board" />
    </Switch>
  );
};

export default memo(observer(SwitchList));
