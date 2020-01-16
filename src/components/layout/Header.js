import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col, Badge,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import {
  faSearch, faStar, faSignInAlt, faUserPlus, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faSmile, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import avatar from '../../resources/images/avatar.png';
import logo from '../../resources/images/logo.png';
import useStores from '../../stores/useStores';
import { jsKey } from '../../config/kakao-config';

const InputGroupWrapper = styled.div`
  width : 250px;
  display : inline-block;
  float : right;
  position : relative;
`;

const InputGroupA = styled(InputGroup)`
  position : absolute;
  top : 10px;
`;

const InH1 = styled.h1`
  display : inline;
  color : #DC3545;
`;

const HeaderWrapper = styled.div`
  padding : 5px;
  height : 136px;
`;

const NavLine = styled.hr`
  background :#DC3545;
  border : 0;
  height : 5px;
  margin-bottom : 0;
`;

const HeaderNavBarWrapper = styled(Container)`
  height : 45px;
  background : white;
  padding : 0px !important;
  
  & * {
    font-size : 14px !important;
  }
`;

const RowNoP = styled(Row)`
  padding : 0px !important;
  margin : 0px !important;
  height : 100%;
`;

const ColNoP = styled(Col)`
  padding : 0px !important;
  margin : 0px !important;
  line-height : 40px;
`;

const ColCenter = styled(ColNoP)`
  line-height : 30px;
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

const InnerContainer = styled(Container)`
  margin : 0 !important;
  padding : 0 3px !important;
  height : 40px;
  max-width : none !important;
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
`;

const TextContainer = styled(Container)`
  margin : 0 !important;
  padding : 5px !important;
  text-align : center;
  height : 40px !important;
  border-left : 1px solid #e6e6e6;
  border-right : 1px solid #e6e6e6;
`;

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

const SpanRight = styled.span`
  float : right;
`;

const Avatar = styled.img`
  width : 28px;
  border-radius: 3px;
`;

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
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
`

const Logo = styled.img`
  width : 100px;
`;

const LoginButton = styled(Button)`
  background-color : rgba(0,0,0,0) !important;
  color : black !important;
  border : 0 !important;
  
  &:focus {
    outline : 0 !important;
    box-shadow : none !important;
  }
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

const KakaoSign = () => {
  const { UserStore, UtilStore } = useStores();
  return (
    <KakaoLogin
      jsKey={jsKey}
      onSuccess={(result) => UserStore.login(result.profile.kakao_account.email)}
      onFailure={() => UtilStore.alertToggle('카카오 로그인에 실패하였습니다.')}
      render={(props) => (
        <>
          <LoginButton onClick={props.onClick}>
            <FontAwesomeIcon icon={faSignInAlt} />
            &nbsp;
            로그인
          </LoginButton>
        </>
      )}
      getProfile
    />
  );
};

const KakaoRegister = () => {
  const { UtilStore } = useStores();

  return (
    <KakaoLogin
      jsKey={jsKey}
      onSuccess={(result) => UtilStore.toggleSign(result)}
      onFailure={(result) => console.log(result)}
      render={(props) => (
        <>
          <LoginButton onClick={props.onClick}>
            <FontAwesomeIcon icon={faUserPlus} />
            &nbsp;
            회원가입
          </LoginButton>
        </>
      )}
      getProfile
    />
  );
};

const HeaderSessionComp = observer(() => {
  const { UserStore, HeaderStore, UserAlertStore } = useStores();

  const {
    userData,
  } = UserStore;

  const {
    alertCount, getDataAlert,
  } = UserAlertStore;

  useEffect(() => {
    if (userData) {
      getDataAlert();
    }
  }, [userData, getDataAlert]);

  if (!userData) {
    return (
      <>
        <KakaoSign />
        <KakaoRegister />
      </>
    );
  }

  const { onActive, dropdown } = HeaderStore;
  return (
    <>
      <DropdownIn isOpen={dropdown.mail} toggle={onActive}>
        <DropdownToggleC name="mail" caret>
          <FontAwesomeIcon icon={faEnvelope} />
        </DropdownToggleC>
        <DropdownMenu>
          <DropdownItem30>채팅</DropdownItem30>
          <DropdownItem30>쪽지</DropdownItem30>
        </DropdownMenu>
      </DropdownIn>
      <DropdownIn isOpen={dropdown.avatar} toggle={onActive}>
        <AvatarDropdownToggleC name="avatar" caret>
          <NewAlertCountSpan>{alertCount}</NewAlertCountSpan>
          <Avatar src={avatar} />
        </AvatarDropdownToggleC>
        <DropdownMenu>
          <DropdownItemTitle>
            <ProfileNick>닉네임</ProfileNick>

            <ProfileId>thisIsId</ProfileId>
          </DropdownItemTitle>
          <Link to="/newalert">
            <DropdownItem30>새로운 알림 ({alertCount} 개)</DropdownItem30>
          </Link>
          <DropdownItem30>내 정보 관리</DropdownItem30>
          <DropdownItem30>{10} 포인트</DropdownItem30>
          <DropdownItem30 divider />
          <Link to="/setting">
            <DropdownItem30>설정</DropdownItem30>
          </Link>
          <Link to="/postlocker">
            <DropdownItem30>글보관함</DropdownItem30>
          </Link>
          <DropdownItem30>아이콘보관함</DropdownItem30>
          <DropdownItem30 onClick={UserStore.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            &nbsp; 로그아웃
          </DropdownItem30>
        </DropdownMenu>
      </DropdownIn>
    </>
  );
});

const Header = () => {
  const { HeaderStore } = useStores();
  const { onActive, dropdown } = HeaderStore;

  return (
    <HeaderWrapper>
      <Link to="/">
        <InH1>
          <Logo src={logo} alt="" />
        </InH1>
      </Link>
      <InputGroupWrapper>
        <InputGroupA>
          <Input placeholder="GTC 검색" />
          <InputGroupAddon addonType="append">
            <Button color="danger">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroupAddon>
        </InputGroupA>
      </InputGroupWrapper>
      <HeaderNavBarWrapper fluid>
        <NavLine />
        <InnerContainer>
          <RowNoP>
            <ColNoP>
              <DropdownIn isOpen={dropdown.lately} toggle={onActive}>
                <DropdownToggleC name="lately" caret>
                  <FontAwesomeIcon icon={faClock} /> 최근
                </DropdownToggleC>
                <DropdownMenu>
                  <DropdownItem30>괴물쥐</DropdownItem30>
                  <DropdownItem30>얍얍</DropdownItem30>
                  <DropdownItem30>룩삼</DropdownItem30>
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdown.favorite} toggle={onActive}>
                <DropdownToggleC name="favorite" caret>
                  <FontAwesomeIcon icon={faStar} /> 즐겨찾기
                </DropdownToggleC>
                <DropdownMenu>
                  <DropdownItem30>괴물쥐</DropdownItem30>
                  <DropdownItem30>얍얍</DropdownItem30>
                  <DropdownItem30>룩삼</DropdownItem30>
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdown.smile} toggle={onActive}>
                <DropdownToggleC name="smile" caret>
                  <FontAwesomeIcon icon={faSmile} />
                </DropdownToggleC>
                <DropdownMenu>
                  <DropdownItem30>출석체크</DropdownItem30>
                  <DropdownItem30>전광판</DropdownItem30>
                  <DropdownItem30>아이콘샵</DropdownItem30>
                  <DropdownItem30>포인트경품</DropdownItem30>
                </DropdownMenu>
              </DropdownIn>
            </ColNoP>
            <ColCenter xs="6">
              <TextContainer>
                <Badge color="danger">광고</Badge>
                &nbsp;
                이 안에 배신자가 있다... 이게 내 결론이다!! Project Winter 합방
              </TextContainer>
            </ColCenter>
            <ColNoP>
              <SpanRight>
                <HeaderSessionComp />
              </SpanRight>
            </ColNoP>
          </RowNoP>
        </InnerContainer>
      </HeaderNavBarWrapper>
    </HeaderWrapper>
  );
};

HeaderSessionComp.propTypes = {
  UserStore: Proptypes.shape({
    userSessionData: Proptypes.object,
    logout: Proptypes.func,
  }),
};

export default observer(Header);
