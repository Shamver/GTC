import React, { useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import renderHTML from 'react-render-html';

import { Link } from 'react-router-dom';
import useStores from '../../Stores/useStores';

const MainContainer = styled(Container)`
  background-color: white;
  padding: 14px !important;
`;

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

const TableTr = styled.tr`
  height: 30px;
`;

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;

const MyPostTableBody = (title, data) => (
  <TableTr key={title + data.postId}>
    <TableTd scope="row">
      <b>{data.postId}</b>
    </TableTd>
    <TableTd>
      <Link to={`/post/${data.postId}`}>
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
  <TableTr key={title + data.postId}>
    <TableTd>
      <Link to={`/post/${data.postId}#${data.replyId}`}>
        {data.postTitle}
      </Link>
    </TableTd>
    <TableTd width={60}>
      {renderHTML(data.replyContent)}
    </TableTd>
    <TableTd>
      {data.replyDate}
    </TableTd>
  </TableTr>
);

const FavoriteTableBody = (title, data, onClickEvent) => (
  <TableTr key={title + data.id}>
    <TableTd>
      <b>{data.postId}</b>
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
      <DeleteBtn name={data.favoriteId} color="danger" size="sm" onClick={onClickEvent}>
        삭제
      </DeleteBtn>
    </TableTd>
  </TableTr>
);

const PostLocker = () => {
  const { PostLockerStore, UtilStore } = useStores();
  const {
    activeTab, postList, replyList, favoriteList,
    onActive, onDeleteFavorite,
    getDataPost, getDataReply, getDataFavorite,
  } = PostLockerStore;
  const {
    toggleConfirmAlert,
  } = UtilStore;

  useEffect(() => {
    getDataPost();
    getDataReply();
    getDataFavorite();
  }, []);

  const myReplyList = [
    {
      postId: 32877163,
      postTitle: '오늘 쥐스타 인벤, 상황정리 짤',
      replyContent: `
        <p>1번째 줄</p>
        <p>2번째 줄@@ㅁㄴㅇㅁㄴㅇㅁㄴ</p>
        <p>3번째 줄</p>
        <p>4번째 줄~~~~~~~</p>
      `,
      replyDate: '2019-11-17 15:31:23',
      replyId: 123,
    },
  ];

  const MyPostTableData = postList.map((v) => (MyPostTableBody('myPost', v)));
  const MyReplyTableData = replyList.map((v) => (MyReplyTableBody('myReply', v)));
  const FavoriteTableData = favoriteList.map((v) => (FavoriteTableBody('favorite', v, onDeleteFavorite)));

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
            즐겨찾은 게시물
          </NavLinkBtn>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="myPost">
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh width={10}>번호</TableTh>
                <TableTh width={60}>제목</TableTh>
                <TableTh width={20}>작성일</TableTh>
                <TableTh width={10}>조회수</TableTh>
              </tr>
            </thead>
            <tbody>
              {MyPostTableData.length === 0 ? (
                <tr>
                  <TableTd colSpan={4}>
                    작성한 글이 없습니다.
                  </TableTd>
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
                  <TableTd colSpan={3}>
                    작성한 댓글이 없습니다.
                  </TableTd>
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
              {FavoriteTableData.length === 0 ? (
                <tr>
                  <TableTd colSpan={5}>
                    즐겨찾기한 게시물이 없습니다.
                  </TableTd>
                </tr>
              ) : FavoriteTableData}
            </tbody>
          </ListTable>
        </TabPane>
      </TabContent>
    </MainContainer>
  );
};

export default observer(PostLocker);
