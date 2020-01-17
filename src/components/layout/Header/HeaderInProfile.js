import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import avatarImg from '../../../resources/images/avatar.png';
import KakaoSign from './KakaoSign';
import useStores from '../../../stores/useStores';

const HeaderInProfile = () => {
  const { UserStore, HeaderStore } = useStores();
  const { userData, logout } = UserStore;
  const { onActive, dropdown } = HeaderStore;
  const { mail, avatar } = dropdown;

  return (
    <>
      { !userData
        ? (
          <>
            <KakaoSign isRegister={false} />
            <KakaoSign isRegister />
          </>
        )
        : (
          <>
            <DropdownIn isOpen={mail} toggle={onActive}>
              <DropdownToggleC name="mail" caret>
                <FontAwesomeIcon icon={faEnvelope} />
              </DropdownToggleC>
              <DropdownMenu>
                <DropdownItem30>채팅</DropdownItem30>
                <DropdownItem30>쪽지</DropdownItem30>
              </DropdownMenu>
            </DropdownIn>
            <DropdownIn isOpen={avatar} toggle={onActive}>
              <AvatarDropdownToggleC name="avatar" caret>
                <Avatar src={avatarImg} />
              </AvatarDropdownToggleC>
              <DropdownMenu>
                <DropdownItemTitle>
                  <ProfileNick>닉네임</ProfileNick>
                  <ProfileId>thisIsId</ProfileId>
                </DropdownItemTitle>
                <Link to="/newalert">
                  <DropdownItem30>새로운 알림 ({1} 개)</DropdownItem30>
                </Link>
                <DropdownItem30>내 정보 관리</DropdownItem30>
                <DropdownItem30>{10} 포인트</DropdownItem30>
                <DropdownItem30 divider />
                <Link to="/settings">
                  <DropdownItem30>설정</DropdownItem30>
                </Link>
                <Link to="/postlocker">
                  <DropdownItem30>글보관함</DropdownItem30>
                </Link>
                <DropdownItem30>아이콘보관함</DropdownItem30>
                <DropdownItem30 onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  &nbsp; 로그아웃
                </DropdownItem30>
              </DropdownMenu>
            </DropdownIn>
          </>
        )}
    </>
  );
};

const DropdownIn = styled(Dropdown)`
  display : inline;
  
  & .dropdown-item:active {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
  
   & .dropdown-item:focus {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
`;

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const DropdownToggleC = styled(DropdownToggle)`
  background-color: transparent !important;
  color : black !important;
  border : 0 !important;
  height : 100%;
  &:focus {
    box-shadow : none !important;
  }
`;

const AvatarDropdownToggleC = styled(DropdownToggleC)`
  padding : 5px 13px 7px 10px !important;
`;

const DropdownItemTitle = styled(DropdownItem30)`
  margin: 2px 0px 5px 0px !important;
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


export default observer(HeaderInProfile);
