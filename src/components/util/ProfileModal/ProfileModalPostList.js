import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import useStores from '../../../stores/useStores';
import ProfileModalPost from './ProfileModalPost';
import ModalPagination from './ProfilePageNation';

const ProfileModalPostList = () => {
  const { UtilStore, UserStore } = useStores();
  const {
    pageIndex, rows,
  } = UtilStore;
  const { profileData, getPostList } = UserStore;
  const { postRows } = rows;
  const { profilePostData } = profileData;
  const { postIndex } = pageIndex;

  const postList = profilePostData.map((data) => (
    <ProfileModalPost postData={data} key={data.postId} />
  ));

  return (
    <>
      <TableBox xs="12">
        <TableHeader>
          <Col xs="9">제목</Col>
          <Col xs="3">작성일</Col>
        </TableHeader>
        { postList.length > 0
          ? postList
          : <NoPost>등록된 글이 없습니다.</NoPost>}
      </TableBox>
      { postList.length > 0
        ? <ModalPagination rows={postRows} pageIndex={postIndex} req={getPostList} />
        : ''}
    </>
  );
};

const TableBox = styled(Col)`
  padding: 5px;
`;

const TableHeader = styled(Row)`
  font-size: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const NoPost = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
`;

export default ProfileModalPostList;
