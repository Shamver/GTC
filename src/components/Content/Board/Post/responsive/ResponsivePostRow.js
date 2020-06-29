import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../../../stores/useStores';

const ResponsivePostRow = ({ data, isNotice }) => {
  const {
    id, recommendCount, categoryName, commentCount,
    type, title, boardName, isImage, writerName,
  } = data;
  const { ComponentPostStore, BoardStore } = useStores();
  const { isVisited } = ComponentPostStore;
  const { currentBoardPath } = BoardStore;

  const isImageComponent = isImage
    ? (<FontAwesomeIcon icon={faImage} />)
    : (<FontAwesomeIcon icon={faCommentDots} />);
  const IsBestPost = recommendCount >= 10 ? (<Star icon={faStar} />) : isImageComponent;

  return (
    <MiddleTd width={180} colSpan={2}>
      <MiddleSpan>
        <PostTitle className={isVisited(id) && 'color-gray'}>
          {isNotice ? (<FontAwesomeIcon icon={faInfoCircle} />) : IsBestPost}
          &nbsp;
          {title}
        </PostTitle>
        <PostTitle>
          {commentCount > 0 && (<RedBoldSpan>&nbsp;[{commentCount}]</RedBoldSpan>)}
        </PostTitle>
        <br />
        <RedSpan>{writerName}</RedSpan>
        &nbsp;
        {!isNotice && (type !== 'notice' && (<TextSpan>{categoryName}</TextSpan>))}
        &nbsp;
        {currentBoardPath === 'all' && (!isNotice && (<TextSpan>·&nbsp;{boardName}</TextSpan>))}
      </MiddleSpan>
    </MiddleTd>
  );
};

ResponsivePostRow.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    categoryName: Proptypes.string,
    recommendCount: Proptypes.number,
    commentCount: Proptypes.number,
    type: Proptypes.string,
    boardName: Proptypes.string,
    isImage: Proptypes.number,
    writerName: Proptypes.string,
  }).isRequired,
  isNotice: Proptypes.bool.isRequired,
};

const MiddleSpan = styled.span`
  display : block;
  line-height : normal;
  vertical-align: middle;
`;

const Star = styled(FontAwesomeIcon)`
  color : #efc839;
`;

const TextSpan = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 30%;
`;

const RedSpan = styled(TextSpan)`
  color: #DC3545;
`;

const RedBoldSpan = styled(RedSpan)`
  max-width: 100%;
  font-weight: bold;
  vertical-align: sub;
`;

const MiddleTd = styled.td`
  padding : 0px !important;
  vertical-align : middle !important;
  font-size : 14px;
  border-left: none !important;
  border-right: none !important;
`;

const PostTitle = styled.div`
  display: inline-block;
  cursor: pointer;
  color : black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width : 80%; 
  &.color-gray {
    color: #b0b0b0 !important;
  }
`;

export default memo(ResponsivePostRow);
