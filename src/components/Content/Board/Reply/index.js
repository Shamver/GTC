import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faShare, faThumbsUp, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import renderHTML from 'react-render-html';
import { observer } from 'mobx-react';
import avatar from '../../../../resources/images/anonymous.png';
import useStores from '../../../../stores/useStores';
import ReplyModify from './ReplyModify';
import ReplyEdit from './ReplyEdit';

const Reply = ({ data }) => {
  const { UserStore, BoardReplyStore, BoardReportStore } = useStores();
  const {
    modifyMode, modifyModeId, deleteReply, setReplyEditId, likeReply, replyEditId,
  } = BoardReplyStore;
  const { toggleReport } = BoardReportStore;
  const { userData } = UserStore;

  const ReplyContentText = data.secretYN === 'N' || (data.secretYN === 'Y' && data.idPostWriter === data.idWriter)
    ? renderHTML(`${data.content}`)
    : '';

  const ReplyWriterJudge = data.idPostWriter === data.idWriter ? (<Writer>(글쓴이)</Writer>) : '';


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
          <ReplyWriter> {data.deleteYN === 'N' ? data.writer : '  [삭제된 댓글의 작성자]  '} </ReplyWriter>
          { data.deleteYN === 'N' ? ReplyWriterJudge : ''}


          <span className="replyOption">
            { data.deleteYN === 'N' ? (
              <>
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
                <SpanLikeLink onClick={() => toggleReport(data.id, 'RP02', renderHTML(`${data.content}`), data.writer)}>신고 #</SpanLikeLink>
              </>
            ) : (
              <>
                { data.updateDate ? data.updateDate : data.date }
              </>
            )}
          </span>
        </ReplyInHeader>
        <ReplyInContent>
          {/* 수정의 경우의 수 */}
          { data.secretYN === 'Y'
            ? (<><SecretReply><FontAwesomeIcon icon={faLock} /> 비밀 댓글</SecretReply> <br /></>)
            : '' }

          <SpanLikeLink>{data.replyWriterName && data.replyWriterName !== 'DELETED' ? `@${data.replyWriterName}` : ''}</SpanLikeLink>
          <Writer>{data.replyWriterName && data.replyWriterName === 'DELETED' ? '[삭제된 댓글의 답글]' : ''}</Writer>

          { modifyModeId === data.id
            ? (<ReplyModify content={data.content} />)
            : (
              <>
                {data.deleteYN === 'N'
                  ? ReplyContentText
                  : (<DeleteReply>[삭제된 댓글 입니다.]</DeleteReply>)}
              </>
            )}

          {/* 대댓글의 경우의 수 */}
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
    secretYN: Proptypes.string,
    deleteYN: Proptypes.string,
  }).isRequired,
};


const DeleteReply = styled.span`
  color : #ccc;
`;

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

const SecretReply = styled(Writer)`
  color : #e89717;
`;

export default observer(Reply);
