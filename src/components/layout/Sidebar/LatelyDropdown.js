import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import styled from 'styled-components';
import HeaderLatelyItem from '../Header/HeaderLatelyItem';
import useStores from '../../../stores/useStores';

const LatelyDropdown = () => {
  const { CookieLatelyStore, ComponentSidebarStore } = useStores();
  const { latelyList, getLately, deleteLately } = CookieLatelyStore;
  const { onActive, dropdown } = ComponentSidebarStore;

  useEffect(() => {
    getLately();
  }, []);

  const LatelyData = latelyList.length === 0
    ? (<DropdownItem30 disabled>최근 본 게시물이 없습니다.</DropdownItem30>)
    : latelyList.map((v) => HeaderLatelyItem(v, deleteLately));

  return (
    <DropdownIn isOpen={dropdown.lately} toggle={onActive}>
      <DropdownToggleC name="lately" caret>
        <FontAwesomeIcon icon={faClock} /> 최근
      </DropdownToggleC>
      <DropdownMenu>
        {LatelyData}
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
  border : 0 !important;
  height : 100%;
  &:focus {
    box-shadow : none !important;
  }
`;

export default LatelyDropdown;
