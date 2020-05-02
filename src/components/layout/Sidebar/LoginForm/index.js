import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const LoginForm = ({ parentProps, isRegister }) => {
  const { onClick } = parentProps;
  return (
    <LoginButton onClick={onClick}>
      <FontAwesomeIcon icon={isRegister ? faUserPlus : faSignInAlt} />
      &nbsp;
      { isRegister ? '회원가입' : '로그인' }
    </LoginButton>
  );
};

LoginForm.propTypes = {
  parentProps: Proptypes.shape({
    onClick: Proptypes.func.isRequired,
  }).isRequired,
  isRegister: Proptypes.bool.isRequired,
};

const LoginButton = styled(Button)`
  background-color : rgba(0,0,0,0) !important;
  color : white !important;
  border : 0 !important;
  padding : 0 !important;
  margin-left: 20px;
  
  &:focus {
    outline : 0 !important;
    box-shadow : none !important;
  }
`;

export default LoginForm;
