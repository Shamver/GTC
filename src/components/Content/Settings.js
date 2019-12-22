import React, { useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, CustomInput, Button, Container,
} from 'reactstrap';
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

const CustomCheckbox = styled(CustomInput)`
  display : inline !important;
  margin-right : 10px;
`;

const TableBody = (title, data, onClickEvent) => (
  <tr key={title + data.id}>
    <TableTh scope="row">
      <CustomInput type="checkbox" id={title + data.id} name={data.id} onClick={onClickEvent} />
    </TableTh>
    <TableTd>
      { title === 'favorite' ? '나중에 글 제목도 넣어야 함. 글 ID: ' : '' }
      { data.nickname }
    </TableTd>
    <TableTd>{data.date}</TableTd>
  </tr>
);

const Settings = () => {
  const { SettingStore, UtilStore } = useStores();
  const {
    activeTab, ignoreList, favoriteList, onChangeIgnore, onChangeFavorite, getDataIgnore,
    onDeleteIgnore, onDeleteFavorite, getDataFavorite,
  } = SettingStore;
  const {
    toggleConfirmAlert,
  } = UtilStore;

  useEffect(() => {
    getDataIgnore();
    getDataFavorite();
  }, []);

  const IgnoreTableData = ignoreList.map((v) => (TableBody('ignore', v, onChangeIgnore)));
  const FavoriteTableData = favoriteList.map((v) => (TableBody('favorite', v, onChangeFavorite)));

  return (
    <MainContainer>
      <Nav tabs>
        <NavItem>
          <NavLinkBtn
            className={{ active: activeTab === 'ignore' }}
            onClick={SettingStore.onActive}
            name="ignore"
          >
            차단 목록
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={{ active: activeTab === 'favorite' }}
            onClick={SettingStore.onActive}
            name="favorite"
          >
            즐겨찾기 목록
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={{ active: activeTab === 'closeAccount' }}
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
              {IgnoreTableData.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                  차단한 유저가 없습니다.
                  </td>
                </tr>
              ) : IgnoreTableData}
            </tbody>
          </ListTable>
          <Button color="danger" onClick={() => { toggleConfirmAlert('정말 삭제하시겠어요?', onDeleteIgnore); }}>삭제하기</Button>
        </TabPane>
        <TabPane tabId="favorite">
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh>선택</TableTh>
                <TableTh>즐겨찾기한 게시물</TableTh>
                <TableTh>즐겨찾기한 날짜</TableTh>
              </tr>
            </thead>
            <tbody>
              {FavoriteTableData.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    즐겨찾기한 게시물이 없습니다.
                  </td>
                </tr>
              ) : FavoriteTableData}
            </tbody>
          </ListTable>
          <Button color="danger" onClick={() => { toggleConfirmAlert('정말 삭제하시겠어요?', onDeleteFavorite); }}>삭제하기</Button>
        </TabPane>
        <TabPane tabId="closeAccount">
          <p><b>회원 탈퇴시 유의사항</b></p>
          <p>유의사항 및 약관 내용</p>
          <p>
            <CustomCheckbox type="checkbox" id="1" name="name" /> 위 내용을 충분히 이해했으며, 회원탈퇴를 진행하겠습니다.
          </p>
          체크박스 체크유무 확인하도록 해야함.
          <Button color="danger" onClick={() => { toggleConfirmAlert('정말 삭제하시겠어요?', () => { console.log('여기 넣을 함수 구현'); }); }}>회원탈퇴</Button>
        </TabPane>
      </TabContent>
    </MainContainer>
  );
};

export default observer(Settings);
