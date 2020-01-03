import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import renderHTML from 'react-render-html';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import avatar from '../../../resources/images/anonymous.png';
import useStores from '../../../stores/useStores';

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
  margin : 8px;
`;
const ReplyAnswer = ({ depth }) => {
  if (depth > 1) {
    return (
      <Link to="#">
        <ReplyDepthIcon icon={faShare} />
      </Link>
    );
  }
  return (<></>);
};

ReplyAnswer.propTypes = {
  depth: Proptypes.string.isRequired,
};

const Reply = ({ data }) => {
  const { BoardStore } = useStores();
  return (
    <ReplyLayout>
      <ReplyAnswer depth={data.depth} />
      <ReplyWrapper>
        <ReplyInHeader>
          <AvatarImg src={avatar} />
          <ReplyWriter> {data.writer} </ReplyWriter> {/* (글쓴이) 구현되어야함. */}
          <span className="replyOption">
            <Link to="#">좋아요</Link>
            &nbsp;·&nbsp;
            <Link to="#">대댓글</Link>
            &nbsp;·&nbsp;
            {data.date}
            &nbsp;·&nbsp;
            {/* <Link to="#">수정</Link>
            &nbsp;·&nbsp; */} {/* (글쓴이) 와 마찬가지로 */}
            <Link to="#">신고 #</Link>
          </span>
        </ReplyInHeader>
        <ReplyInContent>
          {renderHTML(`${data.content}`)}
        </ReplyInContent>
        <CKEditor
          editor={ClassicEditor}
          data={BoardStore.reply.text}
          onInit={() => {
          }}
          onChange={(event, editor) => {
            const data1 = editor.getData();
            BoardStore.onChangeReplyValue(data1);
          }}
          placeholder="내용을 작성해주세요."
        />

      </ReplyWrapper>
    </ReplyLayout>
  )
};

Reply.propTypes = {
  data: Proptypes.shape({
    writer: Proptypes.string,
    content: Proptypes.string,
    depth: Proptypes.string,
    date: Proptypes.string,
  }).isRequired,
};

export default Reply;