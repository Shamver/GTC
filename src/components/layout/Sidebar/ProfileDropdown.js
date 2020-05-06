import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import avatarImg from '../../../resources/images/avatar.png';
import Login from './LoginForm/Login';
import useStores from '../../../stores/useStores';

const ProfileDropdown = () => {
  const {
    UserStore, ComponentSidebarStore, UserAlertStore, UserPointStore,
  } = useStores();
  const { userData, logout } = UserStore;
  const { onActive, dropdown } = ComponentSidebarStore;
  const { mail, avatar } = dropdown;
  const { alertCount, getAlert } = UserAlertStore;
  const {
    totalPoint, getTotalPointData,
  } = UserPointStore;

  useEffect(() => {
    if (userData) {
      getAlert();
      getTotalPointData();
    }
  }, [getAlert, userData, getTotalPointData]);

  return (
    <>
      { !userData
        ? (
          <KakaoWrapper>
            <Login isRegister={false} />
            <Login isRegister />
          </KakaoWrapper>
        )
        : (
          <DropDownWrapper>
            <DropdownIn isOpen={mail} toggle={(e) => onActive('mail', e)}>
              <DropdownToggleC caret>
                <FontAwesomeIcon icon={faEnvelope} />
              </DropdownToggleC>
              <DropdownMenu>
                <DropdownItem30>채팅</DropdownItem30>
                <LinkNoDeco to="/mail">
                  <DropdownItem30>쪽지</DropdownItem30>
                </LinkNoDeco>
              </DropdownMenu>
            </DropdownIn>
            <DropdownInRight isOpen={avatar} toggle={(e) => onActive('avatar', e)}>
              <AvatarDropdownToggleC caret>
                { alertCount > 0 ? (<NewAlertCountSpan>{alertCount}</NewAlertCountSpan>) : null}
                <Avatar src={avatarImg} />
              </AvatarDropdownToggleC>
              <DropdownMenuLeft>
                <DropdownItemTitle>
                  <ProfileNick>{userData.username}</ProfileNick>
                  <ProfileId>{userData.gtName}</ProfileId>
                </DropdownItemTitle>
                <LinkNoDeco to="/newalert">
                  <DropdownItem30>새로운 알림 ({alertCount} 개)</DropdownItem30>
                </LinkNoDeco>
                <LinkNoDeco to="/myaccount">
                  <DropdownItem30>내 정보 관리</DropdownItem30>
                </LinkNoDeco>
                <LinkNoDeco to="/mypoint">
                  <DropdownItem30><b>{totalPoint || 0}</b> 포인트</DropdownItem30>
                </LinkNoDeco>
                <DropdownItem30 divider />
                <LinkNoDeco to="/setting">
                  <DropdownItem30>설정</DropdownItem30>
                </LinkNoDeco>
                <LinkNoDeco to="/postlocker">
                  <DropdownItem30>글보관함</DropdownItem30>
                </LinkNoDeco>
                <DropdownItem30 onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  &nbsp; 로그아웃
                </DropdownItem30>
              </DropdownMenuLeft>
            </DropdownInRight>
          </DropDownWrapper>
        )}
    </>
  );
};

const DropDownWrapper = styled.div`
  color : white !important;
`;

const KakaoWrapper = styled.div`
  color : white !important;
`;

const DropdownIn = styled(Dropdown)`
  display : inline;
  
  
  & .dropdown-item:active {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
    outline: 0;
  }
  
   & .dropdown-item:focus {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
    outline: 0;
  }
  
  & > .dropdown-toggle {
    padding-top : 0 !important;
    padding-left : 0 !important;
  }
  
`;

const DropdownInRight = styled(DropdownIn)`
  & > .dropdown-toggle:first-child {
    padding-right : 0 !important;
  }
`;

const LinkNoDeco = styled(Link)`
  text-decoration: none !important;
`;

// 나중에 화면단위별로 위치 변경
const DropdownMenuLeft = styled(DropdownMenu)`
  left: -92px !important;
`;

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const DropdownToggleC = styled(DropdownToggle)`
  background-color: transparent !important;
  border : 0 !important;
  height : 100%;
  &:focus {
    box-shadow : none !important;
  }
`;

const AvatarDropdownToggleC = styled(DropdownToggleC)`
  padding : 5px 13px 7px 10px !important;
`;

const DropdownItemTitle = styled.div`
  display: block;
  width: 100%;
  padding: 0 1.5rem;
  clear: both;
  font-weight: 700;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  max-height: 36px;

  margin: 0px !important;
  cursor: default !important;
  &:hover {
    background: none !important;
  }
  &:focus {
    background: none !important;
  }
`;

const ProfileNick = styled.span`
  font-size: 15px !important;
  font-weight: 700;
`;

const ProfileId = styled.span`
  font-size: 11px !important;
  color: gray;
  margin-left: 5px;
  padding-left: 5px;
  border-left: 1px solid gray;
`;

const Avatar = styled.img`
  width : 28px;
  border-radius: 3px;
`;

const NewAlertCountSpan = styled.span`
  margin-right: 5px;

  border-radius: 100px;
  padding: 3.4px 7px;
  background: #d80a0a;
  
  display: inline-block;
  min-width: 20px;
  font-size: 0.9rem !important;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
`;


export default observer(ProfileDropdown);
