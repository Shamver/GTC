import React, { useEffect } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

import { Row, Col } from 'reactstrap';

import ProfileModalPost from './ProfileModalPost';
import ModalPagination from './ProfilePageNation';
const ProfileModalPostList = () => {
  const { UtilStore } = useStores();
  const { profileData, pageIndex, getPostList, rows } = UtilStore;
  const { postRows } = rows;
  const { profilePostData } = profileData;
  const { postIndex } = pageIndex;
  const postList =  profilePostData.map( index => (
    <ProfileModalPost postData={index} key={index.postId}/>
  ));

  return (
    <>
      <TableBox>
        <TableHeader>
          <Col xs="9">제목</Col>
          <Col xs="3">작성일</Col>
        </TableHeader>

        { postList.length > 0
          ? postList
          : <NoPost>등록된 글이 없습니다.</NoPost>}
      </TableBox>
      <ModalPagination rows={postRows} pageIndex={postIndex} req={getPostList}/>
    </>
  );
};

const TableBox = styled.div`
  padding: 5px;
`;

const TableHeader = styled(Row)`
  font-size: 15px;
  padding: 12px 0;
`;

const NoPost = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
`;

export default ProfileModalPostList;