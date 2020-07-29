import React, { memo, useEffect } from 'react';
import {
  FormText, Col, CustomInput, Input,
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import avatarImg from '../../../resources/images/anonymous.png';
import useStores from '../../../stores/useStores';

/* const GenderCode = () => {
  const { SystemCodeStore } = useStores();
  const { setCodeList } = SystemCodeStore;

  return setCodeList.map((data) => (
    <option id value={data.CODE} key={data.CODE}>{data.NAME}</option>
  ));
}; */

const MyAccountEditForm = () => {
  const { ComponentMyAccountStore, SystemCodeStore } = useStores();
  const { getCodeComponent, setCodeList } = SystemCodeStore;
  const {
    profileYN, onChangeProfile, gender, nickname, birth,
    onChangeValue, nicknameValidation, birthValidation, genderValidation,
    profile, onChangeProfileImage, uploadImagePreview, gtName, gtNicknameValidation,
    isCanChangeGtNickname,
  } = ComponentMyAccountStore;

  const GenderCode = setCodeList.map((data) => (
    <option value={data.CODE} key={data.CODE}>{data.NAME}</option>
  ));

  useEffect(() => {
    getCodeComponent('GENDER_CODE', '');
  }, []);

  return (
    <Col xs="12" sm="6">
      <div>
        <Deform>
          <RegisterForm>
            <h4>수정 가능한 정보</h4>
            <FormTextLeft>
              그로우토피아 닉네임&nbsp;&nbsp;
              <AccentText>{isCanChangeGtNickname ? (!gtNicknameValidation.status && (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  { gtNicknameValidation.message }
                </>
              ))
                : (
                  <>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> 변경한 지 30일이 지나지 않아 변경할 수 없습니다.
                  </>
                )}
              </AccentText>
            </FormTextLeft>
            <FormInput readOnly={!isCanChangeGtNickname} disabled={!isCanChangeGtNickname} type="text" name="gtName" value={gtName} onChange={onChangeValue} />
            <FormTextLeft>
              닉네임&nbsp;&nbsp;
              <AccentText>{!nicknameValidation.status && (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  &nbsp;{ nicknameValidation.message }
                </>
              )}
              </AccentText>
            </FormTextLeft>
            <FormInput type="text" name="nickname" value={nickname} onChange={onChangeValue} />
            <FormTextLeft>
              생년월일&nbsp;&nbsp;
              <AccentText>{!birthValidation.status && (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  &nbsp;{ gtNicknameValidation.message }
                </>
              )`❌${birthValidation.message}`}
              </AccentText>
            </FormTextLeft>
            <FormInput type="date" name="birth" value={birth} onChange={onChangeValue} />
            <FormTextLeft>
              성별&nbsp;&nbsp;
              <AccentText>{!genderValidation.status && (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  &nbsp;{ genderValidation.message }
                </>
              )}
              </AccentText>
            </FormTextLeft>
            <FormSelect type="select" name="gender" value={gender} onChange={onChangeValue}>
              {GenderCode}
            </FormSelect>
            <FormSwitch>
              {profileYN
                ? (<Avatar src={uploadImagePreview || profile} />) : (<Avatar src={avatarImg} />)}
              <ProfileDiv>
                <InputProfile
                  type="switch"
                  id="profileSwitch"
                  name="Switch"
                  checked={profileYN}
                  onChange={onChangeProfile}
                  label="프로필 사진 공개 유무"
                />
                <Input type="file" name="file" id="profileUpload" bsSize="sm" onChange={(e) => onChangeProfileImage(e)} accept="image/jpeg, image/png" />
              </ProfileDiv>
            </FormSwitch>
          </RegisterForm>
        </Deform>
      </div>
    </Col>
  );
};

const Form = styled.div`
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

const FormSelect = styled(CustomInput)`
  outline: 0 !important;
  background-color: #f2f2f2 !important;
  width: 100% !important;
  border: 0 !important;
  margin: 0 0 15px !important;
  height : auto !important;
  padding: 15px !important;
  box-sizing: border-box !important;
  font-size: 14px !important;
  
  background-position:
    calc(100% - 21px) 1.5em,
    calc(100% - 20px) 1em,
    100% 0 !important;
  
  &:focus {
    outline: 0 !important;
`;

const FormSwitch = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
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
  width: 64px;
  height: 64px;
  border-radius: 3px;
`;

const InputProfile = styled(CustomInput)`
  margin-left: 10px;
`;

const ProfileDiv = styled.div`
  text-align: left;
`;

const AccentText = styled.span`
  color : red !important;
`;

export default memo(observer(MyAccountEditForm));
