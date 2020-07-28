import React, { memo } from 'react';
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
      <LinkButton onClick={toggleTos}>이용약관</LinkButton>
      &nbsp; | &nbsp;
      <LinkButton onClick={togglePrivacy}>개인정보보호방침</LinkButton>
      <br />
      GTC(Growtopia Community)는 Growtopia에서 운영하는 사이트가 아닙니다. <br />
      문의사항은 shamver0114@gmail.com 로 메일 보내주세요.<br />
      <UtilComponentList />
    </LayoutFooter>
  );
};

const LinkButton = styled(Button)`
  background-color: transparent !important;
  border: 0 !important;
  padding: 0 !important;
  display: inline !important;
  color: #007bff !important;
  font-size: 14px !important;
  vertical-align: baseline !important;
  transition: none !important;
  &:hover {
    color: #0056b3 !important;
    text-decoration: underline !important;
  }
  &:focus {
    box-shadow: none !important;
  }
`;

const LayoutFooter = styled.div`
  text-align : center;
  padding : 20px 40px 20px;
  font-size : 14px;
`;

export default memo(Footer);
