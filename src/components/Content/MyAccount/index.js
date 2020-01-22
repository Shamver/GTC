import React, { useEffect } from 'react';
import {
  Container, FormText, Input, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

const MyAccount = () => {
  const { UtilLoadingStore } = useStores();
  const { doLoading } = UtilLoadingStore;

  doLoading();

  useEffect(() => {
  }, []);

  return (
    <MainContainer>
      <h3>내 정보 수정</h3>
      <FormWrapper>
        <Row>
          <Col>
            <div>
              <Deform>
                <RegisterForm>
                  <h4>수정 불가능한 정보</h4>
                  <FormInputWithText type="text" name="name" placeholder="이름" />
                  <FormTextLeft>
                    <AccentText>실명이 아니거나 공백일시 사이트에서 밴 당할 우려가 있습니다.</AccentText>
                  </FormTextLeft>
                  <FormInput type="text" name="email" placeholder="이메일" readOnly />
                  <FormInputWithText type="text" name="tel" placeholder="전화번호" maxLength="11" />
                  <FormTextLeft>
                    GTC는 한 전화번호 명의로 하나의 계정만 생성할 수 있습니다. <br />
                    -를 빼고 입력해주세요. ex) 01012345678
                  </FormTextLeft>
                  <FormInputWithText
                    type="text"
                    name="gtNickname"
                    placeholder="그로우토피아 닉네임"
                  />
                  <FormTextLeft>
                    <AccentText>거래 중 해당 닉네임으로 인증이 안될시 거래에 문제가 생길 수 있습니다.</AccentText>
                  </FormTextLeft>
                  프로필 사진 비공개 유무 설정 넣기.
                </RegisterForm>
              </Deform>
            </div>
          </Col>
          <Col>
            <div>
              <Deform>
                <RegisterForm>
                  <h4>수정 가능한 정보</h4>
                  <FormInputWithText
                    type="text"
                    name="nickname"
                    placeholder="닉네임"
                  />
                  <FormTextLeft>
                    GTC에서 보여질 닉네임을 적어주세요.
                  </FormTextLeft>
                  <FormInputWithText type="date" name="birth" />
                  <FormTextLeft>
                    생년월일을 입력해주세요.
                  </FormTextLeft>
                  <FormSelect type="select" name="gender">
                    <option value="">성별 선택</option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                  </FormSelect>
                </RegisterForm>
              </Deform>
            </div>
          </Col>
        </Row>
        <FormButton type="button">가입</FormButton>
      </FormWrapper>
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

const FormWrapper = styled.div`
  padding: 25px;
`;

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
`;

const FormSelect = styled(Input)`
  outline: 0 !important;
  background: #f2f2f2 !important;
  width: 100% !important;
  border: 0 !important;
  margin: 0 0 15px !important;
  height : auto !important;
  padding: 15px !important;
  box-sizing: border-box !important;
  font-size: 14px !important;
  
  &:focus {
    outline: 0 !important;
`;

const FormInputWithText = styled(FormInput)`
  margin : 0;
`;

const FormButton = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #DC3545;;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
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
`;

const FormTextLeft = styled(FormText)`
  float : left;
  text-align : left;
  margin : 0 0 15px;
`;

const AccentText = styled.span`
  color : red !important;
`;

export default observer(MyAccount);
