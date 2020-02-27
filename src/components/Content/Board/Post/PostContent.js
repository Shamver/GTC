import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Container, Button } from 'reactstrap';
import {
  faClock, faEye, faBellSlash, faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCommentDots, faBars, faStar as fasStar, faThumbsUp, faThumbsDown, faHeart, faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderHTML from 'react-render-html';
import useStores from '../../../../stores/useStores';
import ReplyForm from '../Reply/ReplyForm';
import BoardContent from '../BoardContent';
import BoardFooter from '../BoardFooter';
import Loading from '../../../util/Loading';
import anonymous from '../../../../resources/images/anonymous.png';

const PostContent = ({ match }) => {
  const {
    BoardPostStore, BoardReplyStore, BoardStore, UtilLoadingStore, UserFavoriteStore,
    BoardReportStore, UtilAlertStore,
  } = useStores();
  const {
    postView, recommendPost, currentPostUpperLower, deletePost,
    setCurrentPostId,
  } = BoardPostStore;
  const { postReplyList, setReplyOption } = BoardReplyStore;
  const { currentBoard } = BoardStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { loading } = UtilLoadingStore;
  const { toggleReport } = BoardReportStore;
  const {
    id: postId, boardName, categoryName, title, writer, date, views, content,
    recommendCount, replyAllow, secretReplyAllow, notRecommendCount,
    isFavorite, myPostYN,
  } = postView;
  const { upper, lower } = currentPostUpperLower;
  const { id: upperId, title: upperTitle, writer: upperWriter } = upper;
  const { id: lowerId, title: lowerTitle, writer: lowerWriter } = lower;
  const { addFavorite, deleteFavorite } = UserFavoriteStore;

  useEffect(() => {
    setReplyOption(replyAllow, secretReplyAllow);
    setCurrentPostId(postId);
  }, [replyAllow, secretReplyAllow, setReplyOption, setCurrentPostId, postId]);

  if (loading) {
    return (
      <Loading loading={1} />
    );
  }

  return (
    <ViewWrapper>
      <BoardLink to={`/${currentBoard}`}>
        <MarginlessH3>{boardName}</MarginlessH3>
      </BoardLink>
      <br />
      <div>
        <CategoryAndTitle>
          <Category>
            {categoryName}
          </Category>
          <Title>
            {title}
          </Title>
          <ProfileImg src={anonymous} />
        </CategoryAndTitle>
        <b>{writer}</b>님
      </div>
      <NavLine />
      <PostViewWrapper>
        <InnerContainer>
          <span>
            <FontAwesomeIcon icon={faClock} /> {date}
          </span>
          <RightSpan>
            <FontAwesomeIcon icon={faCommentDots} /> {postReplyList.length}
            &nbsp;
            <FontAwesomeIcon icon={faHeart} /> {recommendCount}
            &nbsp;
            <FontAwesomeIcon icon={faEye} /> {views}
          </RightSpan>
        </InnerContainer>
        <ContentWrapper>
          {renderHTML(`${content}`)}
          <TextCenterDiv>
            <SmallFontButton outline color="success" onClick={() => recommendPost(postId, 'R01')}>
              <FontAwesomeIcon icon={faThumbsUp} />
              &nbsp;추천 {recommendCount}
            </SmallFontButton>
            &nbsp;
            <SmallFontButton outline color="primary" onClick={() => recommendPost(postId, 'R02')}>
              <FontAwesomeIcon icon={faThumbsDown} />
              &nbsp;비추천 {notRecommendCount}
            </SmallFontButton>
          </TextCenterDiv>
        </ContentWrapper>
        <InnerFooterContainer>
          <ListLink to={`/${currentBoard}`}>
            <GreyButton outline color="secondary" size="sm">
              <FontAwesomeIcon icon={faBars} />
              &nbsp;목록
            </GreyButton>
          </ListLink>
          &nbsp;
          <Button outline color="danger" size="sm" onClick={() => toggleReport(postId, 'RP01', title, writer)}>
            <FontAwesomeIcon icon={faBellSlash} />
            &nbsp;신고
          </Button>
          { myPostYN === 'Y'
            ? (
              <>
                <RightSpan>
                  <GreyButton color="secondary" size="sm" outline onClick={() => toggleConfirmAlert('해당 포스트를 삭제하시겠습니까?', () => deletePost(postId))}>
                    <FontAwesomeIcon icon={faTrash} /> 삭제
                  </GreyButton>
                </RightSpan>
                <RightSpan>
                  <Link to={`/${currentBoard}/modify/${postId}`}>
                    <GreyButton color="secondary" size="sm" outline>
                      <FontAwesomeIcon icon={faPen} /> 수정
                    </GreyButton>
                  </Link>
                </RightSpan>
              </>
            )
            : ''}
          <RightSpan>
            <GreyButton
              outline={!isFavorite}
              size="sm"
              onClick={() => {
                if (isFavorite) {
                  deleteFavorite(postId);
                } else {
                  addFavorite(postId);
                }
              }}
            >
              <FontAwesomeIcon icon={isFavorite ? fasStar : farStar} />
              &nbsp;즐겨찾기
            </GreyButton>
          </RightSpan>
        </InnerFooterContainer>
      </PostViewWrapper>
      <ReplyForm match={match} />
      <TopBottomWrapper>
        { upper ? (
          <div>
            <TopBottomDiv>▲ 윗글</TopBottomDiv>
            <TopBottomLink to={`${upperId}`}>{upperTitle}</TopBottomLink>
            <TopBottomWriter>{upperWriter}</TopBottomWriter>
          </div>
        ) : ''}
        { lower ? (
          <div>
            <TopBottomDiv>▼ 아랫글</TopBottomDiv>
            <TopBottomLink to={`${lowerId}`}>{lowerTitle}</TopBottomLink>
            <TopBottomWriter>{lowerWriter}</TopBottomWriter>
          </div>
        ) : ''}
      </TopBottomWrapper>
      <BoardContent path={currentBoard} currentPostId={postId} />
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

const BoardLink = styled(Link)`
  color : black;
  text-decoration : none;
  
  &:hover {
    color : black;
    text-decoration : none;
  }
`;

const GreyButton = styled(Button)`
  background-color : white !important;
  border-color: #ccc;
  color : black !important;
  &:hover {
    background-color : #e6e6e6 !important;
  }
  
  color: ${(props) => (props.outline ? 'black' : 'white')}
`;

const TopBottomLink = styled(Link)`
  color : inherit !important;
  text-decoration : none;
  
  &:hover {
    text-decoration : none !important; 
  }
`;

const ListLink = styled(Link)`
  color : #6c757d;
  text-decoration : none;
  
  &:hover {
    color : white;
    text-decoration : none;
  }
`;

const ProfileImg = styled.img`
  height : 42px;
  width : 42px;
  border-radius: 6px;
  float : right;
`;

const TopBottomWrapper = styled.div`
  margin-top : 50px;
  font-size : 14px;
  
  & div {
    padding : 2px 0px;
  }
  
  & div:hover {
    background-color : #fafafa;
  }
`;

const TopBottomWriter = styled.span`
  float : right;
  color : #aaa;
  font-weight : bold;
`;

const TopBottomDiv = styled.div`
  width : 80px;
  display : inline-block;
  font-weight : bold;
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
  vertical-align: bottom;
  display: inline-block;
  width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Category = styled.span`
  
  border-right : 1px dotted gray;
  padding-right : 7px;
  color : blue;
`;

const RightSpan = styled.span`
  margin-left : 5px;
  float : right;
`;

const ContentWrapper = styled.div`
  padding : 14px;
`;

export default observer(PostContent);
