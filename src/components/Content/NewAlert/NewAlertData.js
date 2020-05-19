import React from 'react';
import styled from 'styled-components';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

const NewAlertData = (data, onLink, onDelete) => {
  const {
    id, isRead, replyId, postId, replyName, postTitle, replyDate,
  } = data;

  return (
    <AlertWrapper className={(isRead === 'Y' ? '' : 'noRead')} key={`alertData${id}`}>
      <AlertBox>
        <LinkA to={`/post/${postId}#${replyId}`} name={`${id}`} onClick={onLink}>
          <StrongSpan>{replyName}</StrongSpan>님이 <StrongSpan>{postTitle}</StrongSpan>
          에 새&nbsp;
          {data.type === 'reply' ? '댓글' : '대댓글'}을 달았습니다:&nbsp;
          {renderHTML(data.replyContent)}
        </LinkA>
        <DateSpan>{replyDate}</DateSpan>
      </AlertBox>
      <AlertActionBox>
        <DeleteA onClick={onDelete} name={`${data.id}`}>
          <FontAwesomeIcon icon={faTimes} />
        </DeleteA>
      </AlertActionBox>
    </AlertWrapper>
  );
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

export default NewAlertData;
