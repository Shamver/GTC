import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Container, Button } from 'reactstrap';
import {
  faClock, faEye, faBellSlash, faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCommentDots, faBars, faStar as fasStar, faThumbsUp, faThumbsDown, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderHTML from 'react-render-html';
import useStores from '../../../../stores/useStores';
import ReplyForm from '../Reply/ReplyForm';
import BoardContent from '../BoardContent';
import BoardFooter from '../BoardFooter';
import Loading from '../../../util/Loading';

const PostContent = ({ match }) => {
  const {
    BoardPostStore, BoardReplyStore, BoardStore, UtilLoadingStore,
  } = useStores();
  const { postView, recommendPost } = BoardPostStore;
  const { postReplyList, setReplyOption } = BoardReplyStore;
  const { currentBoard } = BoardStore;
  const { loading } = UtilLoadingStore;
  const {
    id: postId, boardName, categoryName, title, writer, date, views, content,
    recommendCount, replyAllow, secretReplyAllow, isFavorite,
  } = postView;

  useEffect(() => {
    setReplyOption(replyAllow, secretReplyAllow);
  }, [replyAllow, secretReplyAllow, setReplyOption]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <ViewWrapper>
      <MarginlessH3>{boardName}</MarginlessH3>
      <br />
      <CategoryAndTitle>
        <Category>
          {categoryName}
        </Category>
        <Title>
          {title}
        </Title>
      </CategoryAndTitle>
      <b>{writer}</b>님
      <NavLine />
      <PostViewWrapper>
        <InnerContainer>
          <span>
            <FontAwesomeIcon icon={faClock} /> {date}
          </span>
          <RightSpan>
            <FontAwesomeIcon icon={faCommentDots} /> {postReplyList.length}
            &nbsp;
            <FontAwesomeIcon icon={faHeart} /> 0
            &nbsp;
            <FontAwesomeIcon icon={faEye} /> {views}
          </RightSpan>
        </InnerContainer>
        <ContentWrapper>
          {renderHTML(`${content}`)}
          <TextCenterDiv>
            <SmallFontButton outline color="success" onClick={() => recommendPost(postId)}>
              <FontAwesomeIcon icon={faThumbsUp} />
              &nbsp;추천 {recommendCount}
            </SmallFontButton>
            &nbsp;
            <SmallFontButton outline color="primary">
              <FontAwesomeIcon icon={faThumbsDown} />
              &nbsp;비추천 0
            </SmallFontButton>
          </TextCenterDiv>
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
            <FavoriteButton outline={!isFavorite} color="warning" size="sm">
              <FontAwesomeIcon icon={isFavorite ? fasStar : farStar} />
              &nbsp;즐겨찾기
            </FavoriteButton>
          </RightSpan>
        </InnerFooterContainer>
      </PostViewWrapper>
      <ReplyForm match={match} />
      <BoardContent path={currentBoard} />
      <BoardFooter path={currentBoard} />
    </ViewWrapper>
  );
};

PostContent.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }),
};

PostContent.defaultProps = {
  match: null,
};

const FavoriteButton = styled(Button)`
  color: ${(props) => (props.outline ? 'black' : 'white')}
`;

const TextCenterDiv = styled.div`
  text-align : center;
`;

const SmallFontButton = styled(Button)`
  font-size : 14px !important;
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

export default observer(PostContent);
