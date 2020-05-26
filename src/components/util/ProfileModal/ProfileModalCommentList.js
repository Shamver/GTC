import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalComment from './ProfileModalComment';
import ModalPagination from './ProfilePageNation';
import {observer} from "mobx-react";

const ProfileModalCommentList = () => {
  const { UtilStore } = useStores();
  const {
    profileData, pageIndex, getCommentList, rows,
  } = UtilStore;
  const { commentRows } = rows;
  const { profileCommentData } = profileData;
  const { commentIndex } = pageIndex;

  const commentList = profileCommentData.map((index) => (
    <ProfileModalComment commentData={index} key={index.commentId} />
  ));
  return (
    <>
      <TableBox>
        <TableHeader>
          <Col xs="9">댓글 내용</Col>
          <Col xs="3">작성일</Col>
        </TableHeader>
        { commentList.length > 0
          ? commentList
          : <NoPost>작성한 댓글이 없습니다.</NoPost>}
      </TableBox>
      <ModalPagination rows={commentRows} pageIndex={commentIndex} req={getCommentList} />
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

export default ProfileModalCommentList;
