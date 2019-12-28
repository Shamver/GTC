import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Container, Button } from 'reactstrap';
import { faClock, faCommentDots, faEye } from '@fortawesome/free-regular-svg-icons';
import { faCommentDots as faCommentDotss, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useStores from '../../stores/useStores';
import CurrentBoard from './CurrentBoard';

const PostWrapper = styled.div`
  background-color : white;
  
  & .ck-content {
    height : 100px;
    font-family: 'NanumSquareRound',sans-serif !important;
  }
`;

const ViewWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const MarginlessH3 = styled.h3`
  margin : 0px;
`;

const NavLine = styled.hr`
  background :#DC3545;
  border : 0;
  height : 2px;
  margin-bottom : 0;
`;

const InnerContainer = styled(Container)`
  margin : 0 !important;
  padding : 0 3px !important;
  height : 40px;
  max-width : none !important;
  background: #f6f6f6;
`;

const PostViewWrapper = styled.div`
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
`;

const PostView = ({ match }) => {
  const { BoardStore } = useStores();
  useEffect(() => {
    BoardStore.getPost(match.params.id);
  }, []);

  return (
    <>
      <PostWrapper>
        <ViewWrapper>
          <MarginlessH3>{BoardStore.postView.boardName}</MarginlessH3>
          <br />
          {BoardStore.postView.category} | {BoardStore.postView.title}
          <br />
          {BoardStore.postView.writer}
          <NavLine />
          <PostViewWrapper>
            <InnerContainer>
              <span>
                <FontAwesomeIcon icon={faClock} /> &nbsp;
                7시간 전
              </span>
              <span>
                <FontAwesomeIcon icon={faEye} /> 0
                <FontAwesomeIcon icon={faCommentDots} /> 0
              </span>
            </InnerContainer>
            ㅎㅇㅎㅇㅎㅇㅎ
            <InnerContainer>
              <Button size="sm">목록</Button>
              <Button size="sm">신고</Button>
              <Button size="sm">스크랩</Button>
            </InnerContainer>
          </PostViewWrapper>
          <FontAwesomeIcon icon={faCommentDotss} /> 댓글 0개
          <CKEditor
            editor={ClassicEditor}
            data={BoardStore.replyText}
            onChange={(event, editor) => {
              const data = editor.getData();
              BoardStore.onChangeValue(data);
            }}
          />
          <Button size="sm">
            <FontAwesomeIcon icon={faPen} />
            &nbsp;
            댓글 쓰기
          </Button>
        </ViewWrapper>
      </PostWrapper>
      <CurrentBoard />
    </>
  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.object,
  }).isRequired,
  BoardStore: Proptypes.shape({
    getPost: Proptypes.func,
    postView: Proptypes.shape({
      boardName: Proptypes.string,
    }),
    replyText: Proptypes.string,
  }),
};

PostView.defaultProps = {
  BoardStore: null,
};

export default observer(PostView);
