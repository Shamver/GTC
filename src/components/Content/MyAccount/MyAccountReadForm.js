import React, { memo } from 'react';
import { FormText, Col } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const MyAccountReadForm = () => {
  const { UserStore } = useStores();
  const { userData } = UserStore;

  return (
    <Col xs="12" sm="6">
      <div>
        <Deform>
          <RegisterForm>
            <h4>수정 불가능한 정보</h4>
            <FormTextLeft>이름</FormTextLeft>
            <FormInput type="text" name="name" value={userData.name} readOnly />
            <FormTextLeft>이메일</FormTextLeft>
            <FormInput type="text" name="email" value={userData.email} readOnly />
            <FormTextLeft>전화번호</FormTextLeft>
            <FormInput type="text" name="tel" value={userData.tel} maxLength="11" readOnly />
          </RegisterForm>
        </Deform>
      </div>
    </Col>
  );
};

const Form = styled.form`
  z-index: 1;
  background: #FFFFFF;
  max-width: 100%;
  margin: 0 auto 10px;
  text-align: center;
  transition: visibility 0s, opacity 0.5s, height 5s linear;
`;

const FormInput = styled.input`
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  
  color: ${(props) => (props.readOnly ? 'gray' : 'black')}
`;

const Deform = styled.div`
  & button:hover, & button:active, & button:focus {
    background-color: #c70000;
    outline : 0;
  }
`;

const RegisterForm = styled(Form)`
  &.disable {
    height : 0px;
    visibility: hidden;
    opacity: 0;
  }
  &.enable {
    opacity: 1;
    visibility: visible;
  }
  margin-bottom: 40px;
`;

const FormTextLeft = styled(FormText)`
  float : left;
  text-align : left;
  margin : 0 0 10px ;
`;

export default memo(observer(MyAccountReadForm));
