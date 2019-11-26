import React, { useState } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Input, Button,
} from 'reactstrap';
import classnames from 'classnames';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../stores/useStores';

// import useStores from '../../stores/useStores';

// reactstrap에서 빼온 컴포넌트들 스타일드로 다 구분하여 만들기.

// 20191126 hover, active 구분해서 커서 나오게 수정.

const NavLinkBtn = styled(NavLink)`
  
  &:hover {
    cursor: pointer;
  }
  
  &.active {
    cursor: default;
    background-color: #dbdbdb !important;
    border: 0.5px solid #c9c9c9 !important;
  }
`;

const CheckboxTh = styled.th`
  text-align: center; /* center checkbox horizontally */
  vertical-align: middle; /* center checkbox vertically */
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

const TableBody = (data) => (
  <tr>
    <CheckboxTh scope="row">
      <Input type="checkbox" name={data.id} />
    </CheckboxTh>
    <td>{data.name}</td>
    <td>{data.date}</td>
  </tr>
);

const Settings = () => {
  const { SettingStore } = useStores();
  const { activeTab } = SettingStore;

  const tempData = {
    ignoreLists: [
      {
        id: 1,
        name: 'holy Bible',
        date: '20191234',
      },
      {
        id: 2,
        name: 'SSSHIT',
        date: '20124823',
      },
    ],
  };

  const TableData = tempData.ignoreLists.map((v) => (TableBody(v)));

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLinkBtn
            className={classnames({ active: activeTab === 'ignore' })}
            onClick={SettingStore.onActive}
            name="ignore"
          >
            차단 목록
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={classnames({ active: activeTab === 'favorite' })}
            onClick={SettingStore.onActive}
            name="favorite"
          >
            즐겨찾기 목록
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={classnames({ active: activeTab === 'closeAccount' })}
            onClick={SettingStore.onActive}
            name="closeAccount"
          >
            회원탈퇴
          </NavLinkBtn>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="ignore">
          <ListTable size="sm">
            <thead>
              <tr>
                <th>선택</th>
                <th>차단 닉네임</th>
                <th>차단 일자</th>
              </tr>
            </thead>
            <tbody>
              {TableData}
            </tbody>
          </ListTable>
          <Button color="danger">삭제하기</Button>
        </TabPane>
        <TabPane tabId="favorite">
          <Row>
            <Col sm="12">
              <h4>즐겨찾기 목록 탭이야</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="closeAccount">
          <Row>
            <Col sm="12">
              <h4>회원탈퇴 탭이야</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default observer(Settings);
