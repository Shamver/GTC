import React, { memo } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const ReportNav = () => {
  const { BoardReportStore } = useStores();
  const { activeTab, onActive } = BoardReportStore;

  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'reportTable' ? 'active' : '')}
          onClick={onActive}
          name="reportTable"
        >
          신고 관리
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn
          className={(activeTab === 'ReportResult' ? 'active' : '')}
          onClick={onActive}
          name="ReportResult"
        >
          처리 결과
        </NavLinkBtn>
      </NavItem>
    </Nav>
  );
};

const NavLinkBtn = styled(NavLink)`
  padding: 10px 15px !important;
  border: 1px solid transparent !important;
  margin-right: 2px;
  
  &:hover {
    cursor: pointer;
    border-color: #eee #eee #ddd;
    background-color: #eee;
  }
  
  &.active {
    cursor: default;
    border: 1px solid #c9c9c9 !important;
    border-bottom-color: transparent !important;
  }
`;

export default memo(observer(ReportNav));
