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
      <Link to="/">광고문의</Link>
      <br />
      GTC(Growtopia Community)는 Growtopia에서 운영하는 사이트가 아닙니다. <br />
      문의사항은 shamver0114@gmail.com 로 메일 보내주세요.<br />
      <br />
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
