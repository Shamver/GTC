import React, { memo } from 'react';
import {
  faBellSlash, faClock, faEye, faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBars, faCommentDots, faHeart, faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../../../stores/useStores';
import PostVote from './PostVote';
import PostOption from './PostOption';

const PostViewContent = () => {
  const {
    BoardPostStore, BoardReplyStore, BoardReportStore,
    UserFavoriteStore,
  } = useStores();
  const { postView } = BoardPostStore;
  const { postReplyList } = BoardReplyStore;
  const { toggleReport } = BoardReportStore;
  const { judgeFavorite } = UserFavoriteStore;
  const {
    id, title, writerName, board, date,
    viewCnt, content,
    recommendCount, isFavorite, isMyPost,
  } = postView;

  const realBoardPath = board ? board.toLowerCase() : board;

  return (
    <>
      <NavLine />
      <ContentWrapper>
        <ContentHeader>
          <FontAwesomeIcon icon={faClock} /> {date}
          <RightSpan>
            <FontAwesomeIcon icon={faCommentDots} /> {postReplyList.length}
            <FontAwesomeIcon icon={faHeart} /> {recommendCount}
            <FontAwesomeIcon icon={faEye} /> {viewCnt}
          </RightSpan>
        </ContentHeader>
        <ContentMain>
          {renderHTML(`${content}`)}
          <PostVote />
        </ContentMain>
        <ContentFooter>
          <LeftSpan>
            <StylessLink to={`/${realBoardPath}`}>
              <GreyButton outline color="secondary" size="sm">
                <FontAwesomeIcon icon={faBars} /> 목록
              </GreyButton>
            </StylessLink>
            {!isMyPost && (
              <Button outline color="danger" size="sm" onClick={() => toggleReport(id, 'RP01', title, writerName)}>
                <FontAwesomeIcon icon={faBellSlash} /> 신고
              </Button>
            )}
          </LeftSpan>
          <RightSpan>
            <GreyButton outline={!isFavorite} color="secondary" size="sm" onClick={() => judgeFavorite(isFavorite, id)}>
              <FontAwesomeIcon icon={isFavorite ? fasStar : farStar} /> 즐겨찾기
            </GreyButton>
            <PostOption />
          </RightSpan>
          <ClearFix />
        </ContentFooter>
      </ContentWrapper>
    </>
  );
};

const ClearFix = styled.div`
  clear: both;
  display: block;
  content: "";
  height: 0;
`;

const GreyButton = styled(Button)`
  background-color : white !important;
  border-color: #ccc !important;
  color : black !important;
  &:hover {
    background-color : #e6e6e6 !important;
  }
  color: ${(props) => (props.outline ? 'black' : 'white')};
`;

const StylessLink = styled(Link)`
  color : #6c757d;
  text-decoration : none;
  margin-right : 5px;
  &:hover {
    color : white;
    text-decoration : none;
  }
`;

const NavLine = styled.hr`
  background :#DC3545;
  border : 0;
  height : 2px;
  margin-top : 7px;
  margin-bottom : 0;
`;

const ContentHeader = styled(Container)`
  margin : 0 !important;
  padding : 0px 3px !important;
  max-width : none !important;
  background: #f6f6f6;
  padding: 0.6em 0.8em !important;
`;

const ContentFooter = styled(ContentHeader)`
`;

const ContentWrapper = styled.div`
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  margin-bottom : 20px;
`;

const LeftSpan = styled.div`
  display: inline-block;
  float : left;
  margin-bottom: 2.5px;
`;

const RightSpan = styled.span`
  margin-left: 5px;
  float: right;
  margin-top: 2.5px;
  & > svg {
    margin-left: 5px;
  }
`;

const ContentMain = styled.div`
  padding: 14px;
`;

export default memo(observer(PostViewContent));
