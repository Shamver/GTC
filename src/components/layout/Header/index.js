import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import {
  faArrowRight, faBars, faSearch, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import logo from '../../../resources/images/logo.png';
import useStores from '../../../stores/useStores';
import HeaderInProfile from './HeaderInProfile';
import HeaderFavoriteItem from './HeaderFavoriteItem';
import HeaderLatelyItem from './HeaderLatelyItem';
import HeaderNoticeView from './HeaderNoticeView';

const Header = () => {
  const {
    ComponentHeaderStore, UserFavoriteStore, UserStore, CookieLatelyStore,
    BoardSearchStore, UtilStore, EventAdvertiseStore,
  } = useStores();
  const {
    onActive, dropdown, searchOpen, openSearch,
  } = ComponentHeaderStore;
  const { favoriteList, getFavorite } = UserFavoriteStore;
  const { userData } = UserStore;
  const { latelyList, getLately } = CookieLatelyStore;
  const {
    onChange, searchText, onSubmit, onSearch,
  } = BoardSearchStore;
  const { onSetSidebarOpen } = UtilStore;
  const { getAdPostListNow } = EventAdvertiseStore;

  useEffect(() => {
    if (userData) {
      getFavorite();
    }
    getAdPostListNow();
    getLately();
  }, [getFavorite, getLately, userData, getAdPostListNow]);

  const FavoriteData = favoriteList.length === 0
    ? (<DropdownItem30 disabled>즐겨찾기한 게시물이 없습니다.</DropdownItem30>)
    : favoriteList.map((v) => <HeaderFavoriteItem data={v} key={v.postId} />);
  const LatelyData = latelyList.length === 0
    ? (<DropdownItem30 disabled>최근 본 게시물이 없습니다.</DropdownItem30>)
    : latelyList.map((v) => <HeaderLatelyItem data={v} key={v.id} />);

  return (
    <HeaderWrapper>
      <HeaderTop>
        <MobileMenu icon={faBars} onClick={() => onSetSidebarOpen(true)} />
        <BlockLink to="/" searchopen={searchOpen ? 1 : 0}>
          <InH1>
            <Logo src={logo} alt="" />
          </InH1>
        </BlockLink>
        {/* 일반 서치 그룹 */}
        <InputGroupWrapper searchopen={searchOpen ? 1 : 0}>
          <InputGroupA>
            <Input placeholder="GTC 검색" onKeyPress={onSubmit} value={searchText} onChange={onChange} />
            <InputGroupAddon addonType="append">
              <ResponsiveButton color="danger" onClick={onSearch}>
                <MiddleIcon icon={faSearch} />
              </ResponsiveButton>
            </InputGroupAddon>
          </InputGroupA>
        </InputGroupWrapper>
        {/* 모바일 화면에서의 서치 그룹 */}
        <ResponsiveInputGroupWrapper searchopen={searchOpen ? 1 : 0}>
          <InputGroupA>
            <InputGroupAddon addonType="prepend" searchopen={searchOpen ? 1 : 0}>
              <ResponsiveButton color="danger" onClick={openSearch} searchopen={searchOpen ? 1 : 0}>
                { searchOpen ? (<MiddleIcon icon={faArrowRight} />)
                  : (<MiddleIcon icon={faSearch} />)}
              </ResponsiveButton>
            </InputGroupAddon>
            <ResponsiveInput placeholder="GTC 검색" onKeyPress={onSubmit} value={searchText} onChange={onChange} searchopen={searchOpen ? 1 : 0} />
            <AppendAddOn addonType="append" searchopen={searchOpen ? 1 : 0}>
              <ResponsiveButton color="danger" onClick={onSearch} searchopen={searchOpen ? 1 : 0}>
                <MiddleIcon icon={faSearch} />
              </ResponsiveButton>
            </AppendAddOn>
          </InputGroupA>
        </ResponsiveInputGroupWrapper>
      </HeaderTop>
      <HeaderNavBarWrapper fluid>
        <NavLine />
        <InnerContainer>
          <RowNoP>
            <ColNoP>
              <DropdownIn isOpen={dropdown.lately} toggle={(e) => onActive('lately', e)}>
                <DropdownToggleC caret>
                  <FontAwesomeIcon icon={faClock} /> 최근
                </DropdownToggleC>
                <DropdownMenu>
                  {LatelyData}
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdown.favorite} toggle={(e) => onActive('favorite', e)}>
                <DropdownToggleC caret>
                  <FontAwesomeIcon icon={faStar} /> 즐겨찾기
                </DropdownToggleC>
                <DropdownMenu>
                  {userData ? FavoriteData
                    : (<DropdownItem30 disabled>로그인 후 이용 가능합니다.</DropdownItem30>)}
                </DropdownMenu>
              </DropdownIn>
              <DropdownIn isOpen={dropdown.play} toggle={(e) => onActive('play', e)}>
                <DropdownToggleC caret>
                  <FontAwesomeIcon icon={faSmile} />
                </DropdownToggleC>
                <DropdownMenu>
                  <LinkNoDeco to="/daily">
                    <DropdownItem30>출석체크</DropdownItem30>
                  </LinkNoDeco>
                  <LinkNoDeco to="/advertise">
                    <DropdownItem30>포스팅 광고</DropdownItem30>
                  </LinkNoDeco>
                </DropdownMenu>
              </DropdownIn>
            </ColNoP>
            <ColCenter xs="7">
              <HeaderNoticeView />
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

const MiddleIcon = styled(FontAwesomeIcon)`
  vertical-align : sub;
`;

const AppendAddOn = styled(InputGroupAddon)`
  display : ${(props) => (props.searchopen ? 'inline-block' : 'none')} !important;
`;


const MobileMenu = styled(FontAwesomeIcon)`
  font-size : 35px;
  float: left;
  display : none;
  cursor : pointer;
  color : #DC3545;
  margin-top : 16.5px;
  margin-left : 5px;
  @media (max-width: 1200px) {
    display : inline;
  }
`;

const HeaderTop = styled.div`
  height : 68.13px;
  text-align : left;
  @media (max-width: 1200px) {
    text-align : center;
  }
`;

const BlockLink = styled(Link)`
  @media (max-width: 600px) {
    display : ${(props) => (props.searchopen ? 'none' : 'inline-block')}
  }
`;

const ResponsiveInput = styled(Input)`
  display : ${(props) => (props.searchopen ? 'inline-block' : 'none')} !important;
`;

const ResponsiveButton = styled(Button)`
  @media (max-width: 600px) {
    border-radius : ${(props) => (props.searchopen ? 'none' : '.25rem !important;')};
  }
`;

const LinkNoDeco = styled(Link)`
  text-decoration: none !important;
`;

const InputGroupWrapper = styled.div`
  display : inline-block;
  float : right;
  margin-top : 15.065px;
  @media (max-width: 600px) {
    margin-right : 4px;
    display : none;
  }
`;

const ResponsiveInputGroupWrapper = styled(InputGroupWrapper)`
  display: none;
  @media (max-width: 600px) {
    display : inline-block;
    width: ${(props) => (props.searchopen ? '80%' : 'unset')};
  }
`;

const InputGroupA = styled(InputGroup)`
  position : absolute;
`;

const InH1 = styled.h1`
  display : inline-block;
  margin : 0 !important;
  color : #DC3545;
`;

const HeaderWrapper = styled.div`
  padding : 5px;
  padding-top : 0px;
  height : 120px;
  margin-bottom : 15px;
`;

const NavLine = styled.hr`
  background :#DC3545;
  border : 0;
  height : 5px;
  margin-bottom : 0;
  margin-top : 0;
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
  width : 130px;
`;

export default memo(observer(Header));
