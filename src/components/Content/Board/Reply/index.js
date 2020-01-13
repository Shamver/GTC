import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import renderHTML from 'react-render-html';
import { observer } from 'mobx-react';
import avatar from '../../../../resources/images/anonymous.png';
import useStores from '../../../../stores/useStores';
import ReplyModify from './ReplyModify';
import ReplyEdit from './ReplyEdit';

const Reply = ({ data }) => {
  const { UserStore, ReplyStore } = useStores();
  const {
    modifyMode, modifyModeId, deleteReply, setReplyEditId, likeReply, replyEditId,
  } = ReplyStore;
  const { userData } = UserStore;

  return (
    <ReplyLayout>
      { data.depth > 1 ? (
        <Link to="/">
          <ReplyDepthIcon icon={faShare} />
        </Link>
      ) : ''}
      <ReplyWrapper>
        <ReplyInHeader>
          <AvatarImg src={avatar} />
          <ReplyWriter> {data.writer} </ReplyWriter>
          { data.idPostWriter === data.idWriter ? (<Writer>(글쓴이)</Writer>) : ''}
          <span className="replyOption">
            { userData.id === data.idWriter
              ? (
                <>
                  <SpanLikeLink onClick={() => modifyMode(data.id)}>수정</SpanLikeLink>
                  &nbsp;·&nbsp;
                  <SpanLikeLink onClick={() => deleteReply(data.id)}>삭제</SpanLikeLink>
                  &nbsp;·&nbsp;
                </>
              )
              : '' }
            <SpanLikeLink onClick={() => likeReply(data.id)}>
              { !data.likeCount ? '좋아요' : (<><FontAwesomeIcon icon={faThumbsUp} />&nbsp;&nbsp;{data.likeCount}</>)}
            </SpanLikeLink>
            &nbsp;·&nbsp;
            <SpanLikeLink onClick={() => setReplyEditId(data.id)}>대댓글</SpanLikeLink>
             &nbsp;·&nbsp;
            { data.updateDate ? data.updateDate : data.date}
            &nbsp;·&nbsp;
            <SpanLikeLink>신고 #</SpanLikeLink>
          </span>
        </ReplyInHeader>
        <ReplyInContent>
          <SpanLikeLink>{data.replyWriterName && data.replyWriterName !== 'DELETED' ? `@${data.replyWriterName}` : ''}</SpanLikeLink>
          <Writer>{data.replyWriterName && data.replyWriterName === 'DELETED' ? '[삭제된 댓글의 답글]' : ''}</Writer>

          { modifyModeId === data.id
            ? (<ReplyModify content={data.content} />)
            : renderHTML(`${data.content}`)}
          { replyEditId === data.id
            ? (<ReplyEdit />)
            : ''}
        </ReplyInContent>
      </ReplyWrapper>
    </ReplyLayout>
  );
};

Reply.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    idWriter: Proptypes.number,
    idPostWriter: Proptypes.number,
    likeCount: Proptypes.number,
    writer: Proptypes.string,
    content: Proptypes.string,
    depth: Proptypes.number,
    date: Proptypes.string,
    replyWriterName: Proptypes.string,
    updateDate: Proptypes.string,
  }).isRequired,
};


const ReplyInHeader = styled.div`
  background: #f7f7f7;
  border-bottom: 1px solid #efefef;
  padding: 0.4em 0.5em;
  
  & .replyOption {
    padding-top: 6px;
    font-size : 12px;
    float : right;
  }
`;

const ReplyInContent = styled.div`
  padding: 0.7em;
`;

const AvatarImg = styled.img`
  height : 30px;
  border-radius: 50%;
  margin-right : 1px;
`;

const ReplyWrapper = styled.div`
  margin-bottom: 0.5em;
  border: 1px solid #f1f1f1;
  width : 100%;
`;

const ReplyWriter = styled.span`
  color : #DC3545;
  font-weight : bold;
  font-size : 14px;
`;

const ReplyLayout = styled.div`
  display : flex;
`;

const ReplyDepthIcon = styled(FontAwesomeIcon)`
  margin: 8px;
`;

const SpanLikeLink = styled.span`
  color: #337ab7;
  cursor : pointer;
  &:hover {
    color: #23527c;
  }
`;

const Writer = styled.span`
  font-size: 12px;
  color : #aaa;
`;

export default observer(Reply);
