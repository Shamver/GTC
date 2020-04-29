import KakaoLogin from 'react-kakao-login';
import * as Proptypes from 'prop-types';
import React from 'react';
import useStores from '../../../../stores/useStores';
import { jsKey } from '../../../../config/kakao-config.json';
import LoginForm from './index';

const Login = ({ isRegister }) => {
  const { UserStore, UtilStore, UtilAlertStore } = useStores();
  const { toggleSign } = UtilStore;
  const { alertToggle } = UtilAlertStore;
  return (
    <KakaoLogin
      jsKey={jsKey}
      onSuccess={isRegister
        ? (result) => toggleSign(result)
        : (result) => UserStore.login(result.profile.kakao_account.email)}
      onFailure={() => alertToggle('카카오 로그인에 실패하였습니다.')}
      render={(props) => (<LoginForm parentProps={props} isRegister={isRegister} />)}
      getProfile
    />
  );
};

Login.propTypes = {
  isRegister: Proptypes.bool.isRequired,
};

export default Login;
