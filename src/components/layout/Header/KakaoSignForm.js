import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const KakaoSignForm = ({ parentProps, isRegister }) => {
  const { onClick } = parentProps;
  return (
    <LoginButton onClick={onClick}>
      <FontAwesomeIcon icon={isRegister ? faUserPlus : faSignInAlt} />
      &nbsp;
      { isRegister ? '회원가입' : '로그인' }
    </LoginButton>
  );
};

KakaoSignForm.propTypes = {
  parentProps: Proptypes.shape({
    onClick: Proptypes.func.isRequired,
  }).isRequired,
  isRegister: Proptypes.bool.isRequired,
};

const LoginButton = styled(Button)`
  background-color : rgba(0,0,0,0) !important;
  color : black !important;
  border : 0 !important;
  
  &:focus {
    outline : 0 !important;
    box-shadow : none !important;
  }
`;

export default memo(KakaoSignForm);
