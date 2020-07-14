import React, { useLayoutEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faShare, faThumbsUp, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import renderHTML from 'react-render-html';
import { observer } from 'mobx-react';
import {
  DropdownToggle, DropdownMenu, DropdownItem, Dropdown,
} from 'reactstrap';
import avatar from '../../../../../resources/images/anonymous.png';
import useStores from '../../../../../stores/useStores';
import ReplyModify from './ReplyModify';
import ReplyEdit from './ReplyEdit';

const Reply = ({ data, index }) => {
  const {
    UserStore, BoardReplyStore, BoardReportStore, BoardPostStore, ComponentReplyStore,
    UtilAlertStore, UserIgnoreStore,
  } = useStores();
  const {
    modifyMode, modifyModeId, deleteReply, setReplyEditId, likeReply, replyEditId,
  } = BoardReplyStore;
  const { toggleReport } = BoardReportStore;
  const { userData, getProfile } = UserStore;
  const { dropdown, onActive, onSet } = ComponentReplyStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { addIgnore } = UserIgnoreStore;
  const { replyLockerHash } = BoardPostStore;
  const dropdownKey = index.toString();
  const hash = replyLockerHash.split('#')[1];
  const { id } = data;

  const ReplyContentText = (!data.secretFl
    || (data.secretFl && data.idPostWriter === data.idWriter))
    && renderHTML(`${data.content}`);

  // 하나하나 로우 드롭다운이 생성될때마다 그에 대한 드롭다운 객체 생성;
  useLayoutEffect(() => {
    onSet(dropdownKey);
  }, [onSet, dropdownKey]);

  return (
    <ReplyLayout>
      {!!data.tabFl && (
        <Link to="/">
          <ReplyDepthIcon icon={faShare} />
        </Link>
      )}
      <ReplyWrapper>
        <ReplyInHeader>
          <ReplyProfileWrapper>
            <AvatarImg src={data.writerProfile || avatar} />
            <WriterDropdown isOpen={dropdown[dropdownKey]} toggle={(e) => onActive(dropdownKey, e)}>
              <WriterDropdownToggle>{data.writer}</WriterDropdownToggle>
              <WriterDropdownMenu>
                <WriterDropdownItem onClick={() => getProfile(data.idWriter)}>
                  프로필
                </WriterDropdownItem>
                {!(!userData || userData.id === data.idWriter) && (
                  <WriterDropdownItem
                    onClick={() => toggleConfirmAlert('정말 차단하시겠습니까?', () => addIgnore(data.idWriter))}
                  >
                    차단하기
                  </WriterDropdownItem>
                )}
              </WriterDropdownMenu>
            </WriterDropdown>
            { data.idPostWriter === data.idWriter && (<Writer>(글쓴이)</Writer>)}
          </ReplyProfileWrapper>
          <span className="replyOption">
            { !data.deleteFl ? (
              <>
                { userData && userData.id === data.idWriter
                  && (
                    <>
                      <SpanLikeLink onClick={() => modifyMode(data.id)}>수정</SpanLikeLink>
                      &nbsp;·&nbsp;
                      <SpanLikeLink onClick={() => toggleConfirmAlert('정말 삭제 하시겠습니까?', () => deleteReply(data.id))}>삭제</SpanLikeLink>
                      &nbsp;·&nbsp;
                    </>
                  )}
                <SpanLikeLink onClick={() => likeReply(data.id)}>
                  {!data.likeCount ? '좋아요' : (<><FontAwesomeIcon icon={faThumbsUp} />&nbsp;&nbsp;{data.likeCount}</>)}
                </SpanLikeLink>
                &nbsp;·&nbsp;
                <SpanLikeLink onClick={() => setReplyEditId(data.id)}>대댓글</SpanLikeLink>
                &nbsp;·&nbsp;
                { data.updateDate ? data.updateDate : data.date}
                &nbsp;
                { userData.id === data.idWriter ? '' : (<SpanLikeLink onClick={() => toggleReport(data.id, 'P02', renderHTML(`${data.content}`), data.writer)}>·&nbsp;신고 #</SpanLikeLink>)}
              </>
            ) : (<>{data.updateDate ? data.updateDate : data.date}</>)}
          </span>
          <ClearFix />
        </ReplyInHeader>
        <ReplyInContent hash={hash} commentId={id}>
          {/* 수정의 경우의 수 */}
          { !!data.secretFl
            && (<><SecretReply><FontAwesomeIcon icon={faLock} />비밀 댓글</SecretReply><br /></>)}
          <SpanLikeLink>
            {(data.commentReplyName && data.commentReplyName !== 'DELETED') && (
              <>@{data.commentReplyName}<br /></>)}
          </SpanLikeLink>
          <Writer>
            {(data.commentReplyName && data.commentReplyName === 'DELETED' && data.tabFl) && (
              <>
                [삭제된 댓글의 답글]
                <br />
              </>
            )}
          </Writer>
          { modifyModeId === data.id
            ? (<ReplyModify content={data.content} />)
            : (
              <>
                { !data.deleteFl
                  ? ReplyContentText
                  : (<DeleteReply>[삭제된 댓글 입니다.]</DeleteReply>)}
              </>
            )}
          {/* 대댓글의 경우의 수 */}
          { replyEditId === data.id && (<ReplyEdit />)}
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
    writerProfile: Proptypes.string,
    content: Proptypes.string,
    tabFl: Proptypes.number,
    date: Proptypes.string,
    commentReplyName: Proptypes.string,
    updateDate: Proptypes.string,
    secretFl: Proptypes.number,
    deleteFl: Proptypes.number,
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const ClearFix = styled.div`
  clear: both;
  display: block;
  content: "";
  height: 0;
`;

const ReplyProfileWrapper = styled.div`
  display: inline-block;
  float: left;
`;

const WriterDropdown = styled(Dropdown)`
  display : inline;
  
  & .dropdown-item:active {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
  
   & .dropdown-item:focus {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
`;

const WriterDropdownItem = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
  font-size: 0.9rem;
`;

const WriterDropdownMenu = styled(DropdownMenu)`
  left: 20px !important;
`;

const WriterDropdownToggle = styled(DropdownToggle)`
  color : #DC3545 !important;
  font-weight : bold;
  font-size : 14px !important;
  padding: 0 6px !important;
  background-color: transparent !important;
  border : 0 !important;
  height : 100%;
  &:focus {
    box-shadow : none !important;
  }
`;

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
  background-color: ${(props) => (props.hash === props.commentId.toString() ? '#fff9e5' : 'default')}};
`;

const AvatarImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right : 1px;
`;

const ReplyWrapper = styled.div`
  margin-bottom: 0.5em;
  border: 1px solid #f1f1f1;
  width : 100%;
`;

const ReplyLayout = styled.div`
  display : flex;
`;

const ReplyDepthIcon = styled(FontAwesomeIcon)`
  margin: 8px;
`;

const SpanLikeLink = styled.span`
  color: rgb(51, 122, 183);
  cursor: pointer;
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

export default memo(observer(Reply));
