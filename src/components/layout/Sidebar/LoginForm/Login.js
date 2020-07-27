import KakaoLogin from 'react-kakao-login';
import * as Proptypes from 'prop-types';
import React, { memo } from 'react';
import { toast } from 'react-toastify';
import useStores from '../../../../stores/useStores';
import { jsKey } from '../../../../config/kakao-config.json';
import LoginForm from './index';

const Login = ({ isRegister }) => {
  const { UserStore, UtilStore } = useStores();
  const { toggleSign } = UtilStore;
  return (
    <KakaoLogin
      jsKey={jsKey}
      onSuccess={isRegister
        ? (result) => toggleSign(result)
        : (result) => UserStore.login(result.profile.kakao_account.email)}
      onFailure={() => toast.error('카카오 로그인에 실패하였습니다.')}
      render={(props) => (<LoginForm parentProps={props} isRegister={isRegister} />)}
      getProfile
    />
  );
};

Login.propTypes = {
  isRegister: Proptypes.bool.isRequired,
};

export default memo(Login);
