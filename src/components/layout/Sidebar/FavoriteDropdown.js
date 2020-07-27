import React, { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import HeaderFavoriteItem from '../Header/HeaderFavoriteItem';

const FavoriteDropdown = () => {
  const { UserStore, ComponentSidebarStore, UserFavoriteStore } = useStores();
  const { userData } = UserStore;
  const { onActive, dropdown } = ComponentSidebarStore;
  const { favoriteList, getFavorite } = UserFavoriteStore;

  useEffect(() => {
    if (userData) getFavorite();
  }, [userData, getFavorite]);

  const FavoriteData = favoriteList.length === 0
    ? (<DropdownItem30 disabled>즐겨찾기한 게시물이 없습니다.</DropdownItem30>)
    : favoriteList.map((v) => <HeaderFavoriteItem data={v} key={v.postId} />);

  return (
    <DropdownIn isOpen={dropdown.favorite} toggle={(e) => onActive('favorite', e)}>
      <DropdownToggleC caret>
        <FontAwesomeIcon icon={faStar} /> 즐겨찾기
      </DropdownToggleC>
      <DropdownMenu>
        {userData ? FavoriteData
          : (<DropdownItem30 disabled>로그인 후 이용 가능합니다.</DropdownItem30>)}
      </DropdownMenu>
    </DropdownIn>
  );
};

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

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const DropdownToggleC = styled(DropdownToggle)`
  background-color: transparent !important;
  color : white !important;
  padding : 0 10px 0 0 !important;
  border : 0 !important;
  height : 100%;
  &:focus {
    box-shadow : none !important;
  }
`;

export default memo(observer(FavoriteDropdown));
