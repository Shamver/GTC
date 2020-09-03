import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button, CustomInput } from 'reactstrap';
import useStores from '../../../../stores/useStores';

const PostingFooter = () => {
  const { LoadingStore } = useStores();
  return (
    <>
      <PostingFooterDiv>
        <CustomCheckbox type="checkbox" id="replyAllow" name="commentAllowFl" label="댓글 허용" value={post.commentAllowFl} onChange={onChangeValue} checked={post.commentAllowFl} />
        <CustomCheckbox type="checkbox" id="secret" name="secretFl" label="비밀글" value={post.secretFl} onChange={onChangeValue} checked={post.secretFl} disabled />
        <CustomCheckbox type="checkbox" id="secretReplyAllow" name="secretCommentAllowFl" value={post.secretCommentAllowFl} label="비밀 댓글 허용" onChange={onChangeValue} checked={post.secretCommentAllowFl} />
        <CustomCheckbox type="checkbox" id="noticeFl" name="noticeFl" value={post.noticeFl} label="공지 여부" onChange={onChangeValue} checked={post.noticeFl} />
      </PostingFooterDiv>
      <PostingFooterDiv>
        <MarginButton onClick={goBack} color="secondary">작성취소</MarginButton>
        {!isModify ? (
          <RightButton color="danger" onClick={() => addPost(match)}>
            <FontAwesomeIcon icon={faPen} />
            &nbsp;쓰기
          </RightButton>
        ) : (
          <RightButton color="danger" onClick={() => modifyPost(match)}>
            <FontAwesomeIcon icon={faPen} />
            &nbsp;수정하기
          </RightButton>
        )}
      </PostingFooterDiv>
    </>
  );
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
`;

const PostingFooterDiv = styled.div`
margin-top : 15px;
`;

export default PostingFooter;
