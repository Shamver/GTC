import React from 'react';
import {
  faBellSlash, faClock, faEye, faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faCommentDots,
  faHeart,
  faPen, faStar as fasStar,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import useStores from '../../../../../stores/useStores';

const PostViewContent = () => {
  const { BoardStore, BoardPostStore } = useStores();

  return (
    <>
      <NavLine />
      <PostViewWrapper>
        <InnerContainer>
          <span>
            <MiddleIcon icon={faClock} /> {date}
          </span>
          <RightSpan>
            <MiddleIcon icon={faCommentDots} /> {postReplyList.length}
            &nbsp;
            <MiddleIcon icon={faHeart} /> {recommendCount}
            &nbsp;
            <MiddleIcon icon={faEye} /> {viewCnt}
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
          <Button outline color="danger" size="sm" onClick={() => toggleReport(postId, 'RP01', title, writerName)}>
            <FontAwesomeIcon icon={faBellSlash} />
            &nbsp;신고
          </Button>
          { isMyPost
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
              color="secondary"
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
    </>
  );
};

export default PostViewContent;
