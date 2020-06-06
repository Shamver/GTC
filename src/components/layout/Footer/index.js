import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import UtilComponentList from './UtilComponentList';

const Footer = () => {
  const { UtilStore } = useStores();
  const { toggleTos, togglePrivacy } = UtilStore;

  return (
    <LayoutFooter>
      © 2020-2020 GTC(Growtopia Community) <br />
      <Button onClick={toggleTos}>이용약관</Button>
      &nbsp; | &nbsp;
      <Button onClick={togglePrivacy}>개인정보보호방침</Button>
      &nbsp; | &nbsp;
      <Link to="/team">관리자 모집</Link>
      &nbsp; | &nbsp;
      <Link to="/advertising">광고문의</Link>
      <br />
      GTC(Growtopia Community)는 Growtopia에서 운영하는 사이트가 아닙니다. <br />
      shamver0114@gmail.com<br />
      <br />
      <Link to="/">모바일버전으로 전환하기</Link>
      <UtilComponentList />
    </LayoutFooter>
  );
};

const LayoutFooter = styled.div`
  text-align : center;
  padding : 20px 40px 20px;
  font-size : 14px;
`;

export default memo(Footer);
