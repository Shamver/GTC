import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button, CustomInput } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const PostingFooter = ({ isModify }) => {
  const { BoardPostStore, UtilRouteStore } = useStores();
  const {
    post, addPost, modifyPost, onChangeValue,
  } = BoardPostStore;
  const { goBack } = UtilRouteStore;
  const {
    commentAllowFl, secretFl, secretCommentAllowFl,
    noticeFl,
  } = post;

  return (
    <>
      <PostingFooterDiv>
        <CustomCheckbox type="checkbox" id="replyAllow" name="commentAllowFl" label="댓글 허용" value={commentAllowFl} onChange={onChangeValue} checked={commentAllowFl} />
        <CustomCheckbox type="checkbox" id="secret" name="secretFl" label="비밀글" value={secretFl} onChange={onChangeValue} checked={secretFl} disabled />
        <CustomCheckbox type="checkbox" id="secretReplyAllow" name="secretCommentAllowFl" value={secretCommentAllowFl} label="비밀 댓글 허용" onChange={onChangeValue} checked={secretCommentAllowFl} />
        <CustomCheckbox type="checkbox" id="noticeFl" name="noticeFl" value={noticeFl} label="공지 여부" onChange={onChangeValue} checked={noticeFl} />
      </PostingFooterDiv>
      <PostingFooterDiv>
        <MarginButton onClick={goBack} color="secondary">작성취소</MarginButton>
        <RightButton color="danger" onClick={!isModify ? addPost : modifyPost}>
          <FontAwesomeIcon icon={faPen} /> {!isModify ? '쓰기' : '수정하기'}
        </RightButton>
      </PostingFooterDiv>
    </>
  );
};

PostingFooter.propTypes = {
  isModify: Proptypes.bool.isRequired,
};

const CustomCheckbox = styled(CustomInput)`
  display : inline-block !important;
  margin-right : 10px;
`;

const MarginButton = styled(Button)`
  margin-right : 5px;
`;

const RightButton = styled(Button)`
  float : right;
  & > svg {
    margin-right: 5px;
  }
`;

const PostingFooterDiv = styled.div`
  margin-top : 15px;
`;

export default memo(observer(PostingFooter));
