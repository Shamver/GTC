import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UtilComponentList from './UtilComponentList';

const Footer = () => (
  <LayoutFooter>
      © 2020-2020 GTC(Growtopia Community) <br />
    <Link to="/">이용약관</Link>
      &nbsp; | &nbsp;
    <Link to="/">개인정보보호방침</Link>
      &nbsp; | &nbsp;
    <Link to="/">관리자 모집</Link>
      &nbsp; | &nbsp;
    <Link to="/">광고문의</Link>
      &nbsp; | &nbsp;
    <Link to="/">고객센터</Link> <br />
      GTC(Growtopia Community)는 Growtopia에서 운영하는 사이트가 아닙니다. <br />
    <br />
    <UtilComponentList />
  </LayoutFooter>
);

const LayoutFooter = styled.div`
  text-align : center;
  padding : 20px 40px 20px;
  font-size : 14px;
`;

export default Footer;
