import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import WriterDropdown from './WriterDropdown';
import useStores from '../../../../../stores/useStores';

const PostRow = ({ data, index, isNotice }) => {
  const {
    id, recommendCount, categoryName, commentCount,
    type, title, boardName, isImage,
  } = data;
  const { ComponentPostStore, BoardStore, UserStore } = useStores();
  const { userData, guestAuthor } = UserStore;
  const { onClickPost, isVisited } = ComponentPostStore;
  const { currentBoardPath } = BoardStore;

  const isImageComponent = isImage
    ? (<FontAwesomeIcon icon={faImage} />)
    : (<FontAwesomeIcon icon={faCommentDots} />);
  const IsBestPost = recommendCount >= 10 ? (<Star icon={faStar} />) : isImageComponent;

  const weight = currentBoardPath === 'all' ? 8 : 9;
  return (
    <>
      {currentBoardPath === 'all' && (<CenterTd width={6}>{!isNotice && boardName}</CenterTd>)}
      {!isNotice && (<CenterTd width={5} colSpan={1}>{type !== 'notice' && categoryName}</CenterTd>)}
      <MiddleTd width={37} colSpan={isNotice ? 10 : weight}>
        <MiddleSpan>
          <PostTitle className={isVisited(id) && 'color-gray'} onClick={userData ? () => onClickPost(id) : guestAuthor}>
            {isNotice ? (<FontAwesomeIcon icon={faInfoCircle} />) : IsBestPost}
            &nbsp;
            {title}
          </PostTitle>
          <PostTitle>
            { commentCount > 0
            && (<ReplyCountspan>&nbsp;&nbsp;&nbsp;[{commentCount}]</ReplyCountspan>)}
          </PostTitle>
        </MiddleSpan>
      </MiddleTd>
      <CenterTdWriter width={9}>
        <WriterDropdown data={data} index={index} isNotice={isNotice} />
      </CenterTdWriter>
    </>
  );
};

PostRow.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    categoryName: Proptypes.string,
    recommendCount: Proptypes.number,
    commentCount: Proptypes.number,
    type: Proptypes.string,
    boardName: Proptypes.string,
    isImage: Proptypes.number,
  }).isRequired,
  index: Proptypes.number.isRequired,
  isNotice: Proptypes.bool.isRequired,
};

const MiddleSpan = styled.span`
  display : block;
  line-height : normal;
`;

const Star = styled(FontAwesomeIcon)`
  color : #efc839;
`;

const ReplyCountspan = styled.span`
  color: #DC3545;
  font-weight: bold;
`;

const PercentTd = styled.td`
  width: ${(props) => props.width}% !important;
`;

const MiddleTd = styled(PercentTd)`
  padding : 0px 0.5rem !important;
  vertical-align : middle !important;
  font-size : 14px;
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
`;

const CenterTdWriter = styled(MiddleTd)`
  text-align : center;
  color : #DC3545;
  font-weight : bold;
`;

const PostTitle = styled.div`
  display: inline-block;
  vertical-align : bottom; 
  cursor: pointer;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
  max-width : 90%;

  &.color-gray {
    color: #b0b0b0 !important;
  }
  &:hover {
    text-decoration: none;
  }
`;

export default memo(PostRow);
