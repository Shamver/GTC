import React ,{ useState } from 'react';
import styled from 'styled-components';
import {
  InputGroup, InputGroupAddon, Button, Input,
  Container, Row, Col,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
`;

const RowNoP = styled(Row)`
  padding : 0px !important;
  margin : 0px !important;
  font-size : 14px !important;
`;

const DropdownToggleC = styled(DropdownToggle)`
  background-color: transparent !important;
  color : black !important;
  border : 0 !important;
  &:focus {
    box-shadow : none !important;
  }
  
`;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <HeaderWrapper>
      <InH1>GTC</InH1>
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
        <RowNoP>
          <Col>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggleC caret>
                <FontAwesomeIcon icon={faClock} /> 최근
              </DropdownToggleC>
              <DropdownMenu>
                <DropdownItem>괴물쥐</DropdownItem>
                <DropdownItem>얍얍</DropdownItem>
                <DropdownItem>룩삼</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>dsadsa</Col>
          <Col>dsadsa</Col>
        </RowNoP>
      </HeaderNavBarWrapper>
    </HeaderWrapper>
  );
};

export default Header;
