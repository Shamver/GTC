import React, { useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, CustomInput, Button, Container,
} from 'reactstrap';
import classnames from 'classnames';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../stores/useStores';

// import useStores from '../../stores/useStores';

//

const MainContainer = styled(Container)`
  background-color: white;
`;

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

const TableTh = styled.th`
`;

const TableTd = styled.td`
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

const TableBody = (data, onChangeIgnore) => (
  <tr key={data.id}>
    <TableTh scope="row">
      <CustomInput type="checkbox" id={data.id} name={data.id} onClick={onChangeIgnore} />
    </TableTh>
    <TableTd>{data.nickname}</TableTd>
    <TableTd>{data.date}</TableTd>
  </tr>
);

const Settings = () => {
  const { SettingStore, UtilStore } = useStores();
  const {
    activeTab, ignoreList, onChangeIgnore, getDataIgnore, onDeleteIgnore,
  } = SettingStore;
  const {
    toggleConfirmAlert,
  } = UtilStore;

  useEffect(() => {
    getDataIgnore();
  }, [])

  const TableData = ignoreList.map((v) => (TableBody(v, onChangeIgnore)));

  return (
    <MainContainer>
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
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh>선택</TableTh>
                <TableTh>차단 닉네임</TableTh>
                <TableTh>차단 일자</TableTh>
              </tr>
            </thead>
            <tbody>
              {TableData}
            </tbody>
          </ListTable>
          <Button color="danger" onClick={() => { toggleConfirmAlert('정말 삭제하시겠어요?', onDeleteIgnore); }}>삭제하기</Button>
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
    </MainContainer>
  );
};

export default observer(Settings);
