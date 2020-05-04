import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col, Badge,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { faBars, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faClock, faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import logo from '../../../resources/images/logo.png';
import useStores from '../../../stores/useStores';
import HeaderInProfile from './HeaderInProfile';
import HeaderFavoriteItem from './HeaderFavoriteItem';
import HeaderLatelyItem from './HeaderLatelyItem';

const Header = () => {
  const {
    ComponentHeaderStore, UserFavoriteStore, UserStore, CookieLatelyStore,
    BoardSearchStore, UtilStore,
  } = useStores();
  const { onActive, dropdown } = ComponentHeaderStore;
  const { favoriteList, getFavorite, deleteFavorite } = UserFavoriteStore;
  const { userData } = UserStore;
  const { latelyList, getLately, deleteLately } = CookieLatelyStore;
  const {
    onChange, searchText, onSubmit, search,
  } = BoardSearchStore;
  const { onSetSidebarOpen } = UtilStore;

  useEffect(() => {
    if (userData) {
      getFavorite();
    }
    getLately();
  }, [getFavorite, getLately, userData]);

  const FavoriteData = favoriteList.length === 0
    ? (<DropdownItem30 disabled>즐겨찾기한 게시물이 없습니다.</DropdownItem30>)
    : favoriteList.map((v) => HeaderFavoriteItem(v, deleteFavorite));
  const LatelyData = latelyList.length === 0
    ? (<DropdownItem30 disabled>최근 본 게시물이 없습니다.</DropdownItem30>)
    : latelyList.map((v) => HeaderLatelyItem(v, deleteLately));

  return (
    <HeaderWrapper>
      <button type="button" onClick={() => onSetSidebarOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/">
        <InH1>
          <Logo src={logo} alt="" />
        </InH1>
      </Link>
      <InputGroupWrapper>
        <InputGroupA>
          <Input placeholder="GTC 검색" onKeyPress={onSubmit} value={searchText} onChange={onChange} />
          <InputGroupAddon addonType="append">
            <Button color="danger" onClick={search}>
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
              <DropdownIn isOpen={dropdown.lately}>
                <DropdownToggleC name="lately" onClickCapture={onActive} caret>
                  <FontAwesomeIcon icon={faClock} /> 최근
                </DropdownToggleC>
                <DropdownMenu>
                  {LatelyData}
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdown.favorite} toggle={onActive}>
                <DropdownToggleC name="favorite" caret>
                  <FontAwesomeIcon icon={faStar} /> 즐겨찾기
                </DropdownToggleC>
                <DropdownMenu>
                  {userData ? FavoriteData
                    : (<DropdownItem30 disabled>로그인 후 이용 가능합니다.</DropdownItem30>)}
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdown.smile} toggle={onActive}>
                <DropdownToggleC name="play" caret>
                  <FontAwesomeIcon icon={faSmile} />
                </DropdownToggleC>
                <DropdownMenu>
                  <LinkNoDeco to="/daily">
                    <DropdownItem30>출석체크</DropdownItem30>
                  </LinkNoDeco>
                  <LinkNoDeco to="/advertise">
                    <DropdownItem30>포스팅 광고</DropdownItem30>
                  </LinkNoDeco>
                  <DropdownItem30>포인트샵</DropdownItem30>
                </DropdownMenu>
              </DropdownIn>
            </ColNoP>
            <ColCenter xs="7">
              <TextContainer>
                <Badge color="danger">공지사항</Badge>
                &nbsp;
                최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
                최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
              </TextContainer>
            </ColCenter>
            <ColNoP>
              <SpanRight>
                <HeaderInProfile />
              </SpanRight>
            </ColNoP>
          </RowNoP>
        </InnerContainer>
      </HeaderNavBarWrapper>
    </HeaderWrapper>
  );
};

const LinkNoDeco = styled(Link)`
  text-decoration: none !important;
`;

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
  
  @media (max-width: 1200px) {
      display : none;
  }
`;

const ColCenter = styled(Col)`
  padding : 0px !important;
  margin : 0px !important;
  line-height : 30px;
  @media (max-width: 1200px) {
      flex: 0 0 100% !important;
      max-width : 100% !important;
  }
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
  overflow : hidden;
  text-overflow : ellipsis;
  white-space:nowrap;
  padding : 5px 10px !important;
  @media (max-width: 1200px) {
    border : 0;
  }
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
`;

const SpanRight = styled.span`
  float : right;
`;

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const Logo = styled.img`
  width : 100px;
`;

export default observer(Header);
