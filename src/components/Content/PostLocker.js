import React, { useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Link } from 'react-router-dom';
import useStores from '../../stores/useStores';

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

const TableTr = styled.tr`
  height: 30px;
`

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

const MyPostTableBody = (title, data) => (
  <TableTr key={title + data.id}>
    <TableTd scope="row">
      <b>{data.id}</b>
    </TableTd>
    <TableTd>
      <Link to={`/post/${data.id}`}>
        {data.postTitle}
      </Link>
    </TableTd>
    <TableTd>
      {data.postDate}
    </TableTd>
    <TableTd>
      {data.postViews}
    </TableTd>
  </TableTr>
);

const MyReplyTableBody = (title, data) => (
  <TableTr key={title + data.id}>
    <TableTd>
      <Link to={`/post/${data.id}#${data.replyId}`}>
        {data.postTitle}
      </Link>
    </TableTd>
    <TableTd>
      {data.replyText}
    </TableTd>
    <TableTd>
      {data.replyDate}
    </TableTd>
  </TableTr>
);

const ScrapTableBody = (title, data, onClickEvent) => (
  <TableTr key={title + data.id}>
    <TableTd>
      <b>{data.id}</b>
    </TableTd>
    <TableTd>
      <Link to={`/post/${data.id}`}>
        {data.postTitle}
      </Link>
    </TableTd>
    <TableTd>
      {data.postDate}
    </TableTd>
    <TableTd>
      {data.postViews}
    </TableTd>
    <TableTd>
      <Button color="danger" size="sm" onClick={onClickEvent}>
        삭제
      </Button>
    </TableTd>
  </TableTr>
);

const PostLocker = () => {
  const { PostLockerStore, UtilStore } = useStores();
  const {
    activeTab, onActive, onDeleteScrap,
  } = PostLockerStore;
  const {
    toggleConfirmAlert,
  } = UtilStore;

  useEffect(() => {

  }, []);

  const myPostList = [
    {
      id: 32877163,
      postTitle: '오늘 쥐스타 인벤, 상황정리 짤',
      postDate: '2019-11-17 15:29:03',
      postViews: 2223,
    },
  ];

  const myReplyList = [
    {
      id: 32877163,
      postTitle: '오늘 쥐스타 인벤, 상황정리 짤',
      replyText: 'ㄹㅇ ㅋㅋ',
      replyDate: '2019-11-17 15:31:23',
      replyId: 123,
    },
  ];

  const scrapList = [
    {
      id: 32877163,
      postTitle: '오늘 쥐스타 인벤, 상황정리 짤',
      postDate: '2019-11-17 15:29:03',
      postViews: 2223,
    },
  ];

  const MyPostTableData = myPostList.map((v) => (MyPostTableBody('myPost', v)));
  const MyReplyTableData = myReplyList.map((v) => (MyReplyTableBody('myReply', v)));
  const ScrapTableData = scrapList.map((v) => (ScrapTableBody('scrap', v, onDeleteScrap)));

  return (
    <MainContainer>
      <Nav tabs>
        <NavItem>
          <NavLinkBtn
            className={(activeTab === 'myPost' ? 'active' : '')}
            onClick={onActive}
            name="myPost"
          >
            내가 쓴 글
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={(activeTab === 'myReply' ? 'active' : '')}
            onClick={onActive}
            name="myReply"
          >
            내가 쓴 댓글
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={(activeTab === 'scrap' ? 'active' : '')}
            onClick={onActive}
            name="scrap"
          >
            스크랩
          </NavLinkBtn>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="myPost">
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh width={15}>번호</TableTh>
                <TableTh width={50}>제목</TableTh>
                <TableTh width={20}>작성일</TableTh>
                <TableTh width={15}>조회수</TableTh>
              </tr>
            </thead>
            <tbody>
              {MyPostTableData.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    작성한 글이 없습니다.
                  </td>
                </tr>
              ) : MyPostTableData}
            </tbody>
          </ListTable>
        </TabPane>
        <TabPane tabId="myReply">
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh width={20}>글 제목</TableTh>
                <TableTh width={60} classname="col-8">댓글 내용</TableTh>
                <TableTh width={20} classname="col-2">작성일</TableTh>
              </tr>
            </thead>
            <tbody>
              {MyReplyTableData.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    작성한 댓글이 없습니다.
                  </td>
                </tr>
              ) : MyReplyTableData}
            </tbody>
          </ListTable>
        </TabPane>
        <TabPane tabId="scrap">
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh width={10}>번호</TableTh>
                <TableTh width={55}>제목</TableTh>
                <TableTh width={20}>작성일</TableTh>
                <TableTh width={10}>조회수</TableTh>
                <TableTh width={5}>삭제</TableTh>
              </tr>
            </thead>
            <tbody>
              {ScrapTableData.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    스크랩한 게시물이 없습니다.
                  </td>
                </tr>
              ) : ScrapTableData}
            </tbody>
          </ListTable>
        </TabPane>
      </TabContent>
    </MainContainer>
  );
};

export default observer(PostLocker);
