import React, { memo } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const ProfileModalPost = ({ postData }) => {
  const { ComponentPostStore } = useStores();
  const { goToPost } = ComponentPostStore;
  const {
    postId, postTitle, postCreated, postCommentCount,
  } = postData;

  return (
    <TableBody onClick={() => goToPost(postId)}>
      <Row>
        <ContentsBodyTitle xs="9">
          <ContentsTitle>{postTitle}</ContentsTitle>
          {' '}
          { postCommentCount > 0 ? (
            <CommentCount>
              [
              { postCommentCount }
              ]
            </CommentCount>
          ) : ''}
        </ContentsBodyTitle>
        <ContentsBodyDate xs="3">{postCreated}</ContentsBodyDate>
      </Row>
    </TableBody>
  );
};

ProfileModalPost.propTypes = {
  postData: Proptypes.shape({
    postId: Proptypes.number.isRequired,
    postTitle: Proptypes.string.isRequired,
    postCreated: Proptypes.string.isRequired,
    postCommentCount: Proptypes.number,
  }).isRequired,
};

const TableBody = styled.div`
  display: block;
  padding: 12px 0;
  color: black !important; 
  font-size: 13px;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;

const ContentsBodyTitle = styled(Col)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentsTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 90%;
  vertical-align: middle;
`;

const ContentsBodyDate = styled(Col)`
`;

const CommentCount = styled.b`
  color: #DC3545;
  vertical-align: middle;
`;

export default memo(observer(ProfileModalPost));
