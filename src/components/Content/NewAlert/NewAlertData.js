import React, { memo } from 'react';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const NewAlertData = ({ data }) => {
  const { UserAlertStore } = useStores();
  const { onDeleteAlert, onClickAlert } = UserAlertStore;

  const {
    id, isRead, replyId, postId, replyName,
    postTitle, replyDate, replyContent, type,
  } = data;

  return (
    <AlertWrapper className={isRead ? '' : 'noRead'}>
      <AlertBox>
        <LinkA to={`/post/${postId}#${replyId}`} name={`${id}`} onClick={onClickAlert}>
          <StrongSpan>{replyName}</StrongSpan>님이 <StrongSpan>{postTitle}</StrongSpan>
          에 새&nbsp;
          {type === 'reply' ? '댓글' : '댓글의 답글'}을 달았습니다:&nbsp;
          {renderHTML(replyContent)}
        </LinkA>
        <DateSpan>{replyDate}</DateSpan>
      </AlertBox>
      <AlertActionBox>
        <DeleteA onClick={onDeleteAlert} name={`${id}`}>
          <FontAwesomeIcon icon={faTimes} />
        </DeleteA>
      </AlertActionBox>
    </AlertWrapper>
  );
};

NewAlertData.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    isRead: Proptypes.number,
    replyId: Proptypes.number,
    postId: Proptypes.number,
    replyName: Proptypes.string,
    postTitle: Proptypes.string,
    replyDate: Proptypes.number,
    replyContent: Proptypes.number,
    type: Proptypes.string,
  }).isRequired,
};

const AlertWrapper = styled.div`
  padding: 6px 8px;
  border-bottom: 1px solid #dddfe2;
  display: flex;
  width: 100%;
  &.noRead {
    background-color: #edf2fa;
  }
  
  &:hover {
    background: linear-gradient(rgba(29,33,41,.04),rgba(29,33,41,.04));
  }
`;

const AlertBox = styled.div`
  flex: 1;
`;

const AlertActionBox = styled.div`
  width: 80px;
  text-align: right;
`;

const LinkA = styled(Link)`
  display: block;
  font-size: 0.9rem;
  text-decoration: none !important;
  color: #666 !important;
  overflow: hidden !important;
  &:hover {
    cursor: pointer;
  }
`;

const DateSpan = styled.span`
  font-size: 0.7rem;
  color: #a9a;
`;

const DeleteA = styled.a`
  color: #333;
  text-decoration: none;
  padding: 6px 8px 4px 8px;
  &:hover {
    cursor: pointer;
    background-color: #eaefec;
  }
`;

const StrongSpan = styled.span`
  font-weight: 700;
`;

export default memo(NewAlertData);
