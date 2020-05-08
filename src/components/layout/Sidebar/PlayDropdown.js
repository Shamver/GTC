import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const PlayDropdown = () => {
  const { ComponentSidebarStore } = useStores();
  const { onActive, dropdown } = ComponentSidebarStore;

  return (
    <DropdownIn isOpen={dropdown.play} toggle={(e) => onActive('play', e)}>
      <DropdownToggleC caret>
        <FontAwesomeIcon icon={faSmile} /> 놀이터
      </DropdownToggleC>
      <DropdownMenu>
        <LinkNoDeco to="/daily">
          <DropdownItem30>
            출석체크
          </DropdownItem30>
        </LinkNoDeco>
        <LinkNoDeco to="/advertise">
          <DropdownItem30>
              포스팅 광고
          </DropdownItem30>
        </LinkNoDeco>
        <DropdownItem30>포인트샵</DropdownItem30>
      </DropdownMenu>
    </DropdownIn>
  );
};

const LinkNoDeco = styled(Link)`
  text-decoration: none !important;
  color : #16181b;
  transition : all 0.25s;
  &:hover {
    color : #16181b;
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

export default observer(PlayDropdown);
