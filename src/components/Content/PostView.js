import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Container, Button } from 'reactstrap';
import { faClock, faEye, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import {
  faCommentDots, faPen, faBars, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import renderHTML from 'react-render-html';
import useStores from '../../Stores/useStores';
import CurrentBoard from './CurrentBoard';

const PostWrapper = styled.div`
  background-color : white;
  
  & .ck-content {
    height : 100px;
    font-family: 'NanumSquareRound',sans-serif !important;
  }
  
  & .ck.ck-editor {
    margin-bottom : 5px !important;
    border-radius: 0 0 2px 2px;
    box-shadow: 0.8px 0.8px 1px 0.8px rgb(0,0,0,.12);
  }
`;

const ViewWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const MarginlessH3 = styled.h4`
  margin : 0px;
  font-weight: bold;
  border-bottom : 1px solid #e6e6e6;
  padding-bottom : 4px;
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
  height : 35px;
  max-width : none !important;
  background: #f6f6f6;
  padding: 0.6em 0.8em !important;
`;

const InnerFooterContainer = styled(InnerContainer)`
  height : 47px;
`;

const PostViewWrapper = styled.div`
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  margin-bottom : 20px;
`;

const CategoryAndTitle = styled.h4`
  font-size : 20px !important;
  font-weight : 500;
`;

const Title = styled.span`
  padding-left : 7px;
`;

const Category = styled.span`
  
  border-right : 1px dotted gray;
  padding-right : 7px;
  color : blue;
`;

const RightSpan = styled.span`
  float : right;
`;

const ContentWrapper = styled.div`
  padding : 14px;
`;

const ReplyH5 = styled.h5`
  font-size: 14px;
  font-weight : bold;
`;

const ReplyHeader = styled.div`
  padding: 1em 7px 0.7em;
  color : #DC3545;
`;

const CKEditorCustom = styled(CKEditor)`
  margin-bottom : 5px !important;
`;

const RightButton = styled(Button)`
  float : right;
`;

const PostView = ({ match }) => {
  const { BoardStore } = useStores();
  useEffect(() => {
    BoardStore.getPost(match.params.id);
  }, [match.params.id, BoardStore]);

  return (
    <>
      <PostWrapper>
        <ViewWrapper>
          <MarginlessH3>{BoardStore.postView.boardName}</MarginlessH3>
          <br />
          <CategoryAndTitle>
            <Category>
              {BoardStore.postView.categoryName}
            </Category>
            <Title>
              {BoardStore.postView.title}
            </Title>
          </CategoryAndTitle>
          <b>{BoardStore.postView.writer}</b>님
          <NavLine />
          <PostViewWrapper>
            <InnerContainer>
              <span>
                <FontAwesomeIcon icon={faClock} /> {BoardStore.postView.date}
              </span>
              <RightSpan>
                <FontAwesomeIcon icon={faCommentDots} /> 0
                &nbsp;
                <FontAwesomeIcon icon={faEye} /> {BoardStore.postView.views}
              </RightSpan>
            </InnerContainer>
            <ContentWrapper>
              {renderHTML(`${BoardStore.postView.content}`)}
            </ContentWrapper>
            <InnerFooterContainer>
              <Button outline color="secondary" size="sm">
                <FontAwesomeIcon icon={faBars} />
                &nbsp;목록
              </Button>
              &nbsp;
              <Button outline color="danger" size="sm">
                <FontAwesomeIcon icon={faBellSlash} />
                &nbsp;신고
              </Button>
              <RightSpan>
                <Button outline color="secondary" size="sm">
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;스크랩
                </Button>
              </RightSpan>
            </InnerFooterContainer>
          </PostViewWrapper>
          <ReplyHeader>
            <ReplyH5>
              <FontAwesomeIcon icon={faCommentDots} /> 댓글 0개
            </ReplyH5>
          </ReplyHeader>
          <CKEditorCustom
            editor={ClassicEditor}
            data={BoardStore.replyText}
            onInit={(editor) => {
              console.log(editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              BoardStore.onChangeValue(data);
            }}
            placeholder="내용을 작성해주세요."
          />
          <RightButton color="info" size="sm">
            <FontAwesomeIcon icon={faPen} />
            &nbsp;
            댓글 쓰기
          </RightButton>
        </ViewWrapper>
      </PostWrapper>
      <CurrentBoard />
    </>
  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }).isRequired,
  BoardStore: Proptypes.shape({
    getPost: Proptypes.func,
    postView: Proptypes.shape({
      boardName: Proptypes.string,
      categoryName: Proptypes.string,
      views: Proptypes.string,
    }),
    replyText: Proptypes.string,
  }),
};

PostView.defaultProps = {
  BoardStore: null,
};

export default observer(PostView);
