import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalComment from './ProfileModalComment';
import ModalPagination from './ProfilePageNation';

const ProfileModalCommentList = () => {
  const { UtilStore, UserStore } = useStores();
  const {
    pageIndex, rows,
  } = UtilStore;
  const { profileData, getCommentList } = UserStore;
  const { commentRows } = rows;
  const { profileCommentData } = profileData;
  const { commentIndex } = pageIndex;
  const commentList = profileCommentData.map((index) => (
    <ProfileModalComment commentData={index} key={index.commentId} />
  ));
  return (
    <>
      <TableBox xs="12">
        <TableHeader>
          <Col xs="9">댓글 내용</Col>
          <Col xs="3">작성일</Col>
        </TableHeader>
        { commentList.length > 0
          ? commentList
          : <NoPost>작성한 댓글이 없습니다.</NoPost>}
      </TableBox>
      { commentList.length > 0
        ? <ModalPagination rows={commentRows} pageIndex={commentIndex} req={getCommentList} />
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

export default memo(ProfileModalCommentList);
