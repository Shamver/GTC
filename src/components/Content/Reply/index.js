import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faShare, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import renderHTML from 'react-render-html';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
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
  margin: ${(props) => ((props.depth - 1) * 8)}px; 
`;

const RightButton = styled(Button)`
  float : right;
`;

const ReplyAnswer = ({ depth }) => {
  if (depth > 1) {
    return (
      <Link to="/">
        <ReplyDepthIcon icon={faShare} depth={depth} />
      </Link>
    );
  }
  return (<></>);
};

ReplyAnswer.propTypes = {
  depth: Proptypes.number.isRequired,
};

const ReplyEdit = observer(({ id }) => {
  const { BoardStore } = useStores();
  const {
    onChangeReplyValue, reply, replyEditId, setReplyEditId, addReply,
  } = BoardStore;
  const { text } = reply;

  if (replyEditId === id) {
    return (
      <>
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onInit={() => {}}
          onChange={(event, editor) => {
            const ReplyContent = editor.getData();
            onChangeReplyValue(ReplyContent);
          }}
          placeholder="내용을 작성해주세요."
        />

        <Button size="sm" outline onClick={() => { setReplyEditId(0); }}>취소</Button>
        <RightButton size="sm" color="info" onClick={addReply}>
          <FontAwesomeIcon icon={faPen} />
          &nbsp;
          댓글 쓰기
        </RightButton>
      </>
    );
  }
  return (<></>);
});

ReplyEdit.propTypes = {
  id: Proptypes.number.isRequired,
};


const Reply = ({ data }) => {
  const { BoardStore, UserStore } = useStores();
  const { setReplyEditId } = BoardStore;
  const { userData } = UserStore;
  const { id } = userData;

  return (
    <ReplyLayout>
      <ReplyAnswer depth={data.depth} />
      <ReplyWrapper>
        <ReplyInHeader>
          <AvatarImg src={avatar} />
          <ReplyWriter> {data.writer} </ReplyWriter>
          { id === data.idWriter ? '(글쓴이)' : ''}
          <span className="replyOption">
            <Link to="/">좋아요</Link>
            &nbsp;·&nbsp;
            <Link onClick={() => { setReplyEditId(data.id); }}>대댓글</Link>
          &nbsp;·&nbsp;
            {data.date}
            &nbsp;·&nbsp;
            {/* <Link to="#">수정</Link>
            &nbsp;·&nbsp;  {/* (글쓴이) 와 마찬가지로 */}
            <Link to="/#">신고 #</Link>
          </span>
        </ReplyInHeader>
        <ReplyInContent>
          <Link>{data.replyWriterName ? `@${data.replyWriterName}` : ''}</Link>
          {renderHTML(`${data.content}`)}
          <ReplyEdit id={data.id} />
        </ReplyInContent>
      </ReplyWrapper>
    </ReplyLayout>
  );
};

Reply.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    idWriter : Proptypes.number,
    writer: Proptypes.string,
    content: Proptypes.string,
    depth: Proptypes.number,
    date: Proptypes.string,
    replyWriterName: Proptypes.string,
  }).isRequired,
};

export default Reply;
