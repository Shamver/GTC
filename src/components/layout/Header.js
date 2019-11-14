import React, { useState } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col, Badge,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import {
  faSearch, faStar, faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faSmile, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import avatar from '../../resources/images/avatar.png';
import logo from '../../resources/images/logo.png';

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

// const Avatar = styled.img`
//   width : 28px;
// `;

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const Logo = styled.img`
  width : 100px;
`;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <HeaderWrapper>
      <InH1>
        <Logo src={logo} alt="" />
      </InH1>
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
              <DropdownIn isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggleC caret>
                  <FontAwesomeIcon icon={faClock} /> 최근
                </DropdownToggleC>
                <DropdownMenu>
                  <DropdownItem30>괴물쥐</DropdownItem30>
                  <DropdownItem30>얍얍</DropdownItem30>
                  <DropdownItem30>룩삼</DropdownItem30>
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggleC caret>
                  <FontAwesomeIcon icon={faStar} /> 즐겨찾기
                </DropdownToggleC>
                <DropdownMenu>
                  <DropdownItem30>괴물쥐</DropdownItem30>
                  <DropdownItem30>얍얍</DropdownItem30>
                  <DropdownItem30>룩삼</DropdownItem30>
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggleC caret>
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
                <DropdownIn isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggleC caret>
                    <FontAwesomeIcon icon={faEnvelope} /> 메신저
                  </DropdownToggleC>
                  <DropdownMenu>
                    <DropdownItem30>채팅</DropdownItem30>
                    <DropdownItem30>쪽지</DropdownItem30>
                  </DropdownMenu>
                </DropdownIn>
                <DropdownIn isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggleC caret>
                    <FontAwesomeIcon icon={faSignInAlt} /> 로그인
                  </DropdownToggleC>
                  <DropdownMenu>
                    <DropdownItem30>새로운 알림(0개)</DropdownItem30>
                    <DropdownItem30>배진영</DropdownItem30>
                    <DropdownItem30>199 포인트</DropdownItem30>
                    <DropdownItem30 divider />
                    <DropdownItem30>설정</DropdownItem30>
                    <DropdownItem30>글보관함</DropdownItem30>
                    <DropdownItem30>아이콘보관함</DropdownItem30>
                    <DropdownItem30>로그아웃</DropdownItem30>
                  </DropdownMenu>
                </DropdownIn>
              </SpanRight>
            </ColNoP>
          </RowNoP>
        </InnerContainer>
      </HeaderNavBarWrapper>
    </HeaderWrapper>
  );
};

export default Header;
