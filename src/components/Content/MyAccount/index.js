import React, { useEffect } from 'react';
import {
  Container, FormText, Input, Row, Col, CustomInput, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import avatarImg from '../../../resources/images/avatar.png';
import anonymous from '../../../resources/images/anonymous.png';

import useStores from '../../../stores/useStores';
import Loading from '../../util/Loading';

const MyAccount = () => {
  const {
    ComponentMyAccountStore, UserStore, UtilStore,
  } = useStores();
  const {
    profileYN, onChangeProfile, setDefaultValue, gender, nickname, birth,
    onChangeValue, nicknameValidation, birthValidation, genderValidation,
    isAllValidationChecked,
  } = ComponentMyAccountStore;
  const { userData, updateInfo } = UserStore;
  const { loginCheck } = UtilStore;

  useEffect(() => {
    if (loginCheck()) {
      setDefaultValue();
    }
  }, [setDefaultValue, loginCheck]);

  if (userData) {
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
                    <FormTextLeft>
                      이름
                    </FormTextLeft>
                    <FormInput type="text" name="name" value={userData.name} readOnly />
                    <FormTextLeft>
                      이메일
                    </FormTextLeft>
                    <FormInput type="text" name="email" value={userData.email} readOnly />
                    <FormTextLeft>
                      전화번호
                    </FormTextLeft>
                    <FormInput type="text" name="tel" value={userData.tel} maxLength="11" readOnly />
                    <FormTextLeft>
                      그로우토피아 닉네임
                    </FormTextLeft>
                    <FormInputWithText
                      type="text"
                      name="gtNickname"
                      value={userData.gtName}
                      readOnly
                    />
                  </RegisterForm>
                </Deform>
              </div>
            </Col>
            <Col>
              <div>
                <Deform>
                  <RegisterForm>
                    <h4>수정 가능한 정보</h4>
                    <FormTextLeft>
                      닉네임&nbsp;&nbsp;
                      <AccentText>{nicknameValidation.status ? '' : `❌${nicknameValidation.message}`}</AccentText>
                    </FormTextLeft>
                    <FormInput
                      type="text"
                      name="nickname"
                      value={nickname}
                      onChange={onChangeValue}
                    />
                    <FormTextLeft>
                      생년월일&nbsp;&nbsp;
                      <AccentText>{birthValidation.status ? '' : `❌${birthValidation.message}`}</AccentText>
                    </FormTextLeft>
                    <FormInput type="date" name="birth" value={birth} onChange={onChangeValue} />
                    <FormTextLeft>
                      성별&nbsp;&nbsp;
                      <AccentText>{genderValidation.status ? '' : `❌${genderValidation.message}`}</AccentText>
                    </FormTextLeft>
                    <FormSelect type="select" name="gender" value={gender} onChange={onChangeValue}>
                      <option value="">성별 선택</option>
                      <option value="M">남자</option>
                      <option value="FM">여자</option>
                    </FormSelect>
                    <FormSwitch>
                      {profileYN === 'Y' ? (<Avatar src={avatarImg} />) : (<Avatar src={anonymous} />)}
                      <InputProfile
                        type="switch"
                        id="profileSwitch"
                        name="Switch"
                        checked={profileYN === 'Y'}
                        onChange={onChangeProfile}
                        label="프로필 사진 공개 유무"
                      />
                    </FormSwitch>
                  </RegisterForm>
                </Deform>
              </div>
            </Col>
          </Row>
          <FormButton color="danger" onClick={updateInfo} disabled={!isAllValidationChecked}>수정</FormButton>
        </FormWrapper>
      </MainContainer>
    );
  }

  return (
    <Loading />
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
  
  color: ${(props) => (props.readOnly ? 'gray' : 'black')}
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

const FormSwitch = styled.div`
  margin-top: 30px;
`;

const FormInputWithText = styled(FormInput)`
  margin : 0;
`;

const FormButton = styled(Button)`
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

const Avatar = styled.img`
  position: absolute;
  width : 64px;
  border-radius: 3px;
  left: 40px;
`;

const InputProfile = styled(CustomInput)`
  top: 17px;
`;

const AccentText = styled.span`
  color : red !important;
`;

export default observer(MyAccount);
