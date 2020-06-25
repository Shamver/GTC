import React, { memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import WriterDropdown from './WriterDropdown';
import useStores from '../../../../../stores/useStores';

const ResponsivePostRow = ({ data, index, isNotice }) => {
  const {
    id, recommendCount, categoryName, commentCount,
    type, title, boardName, isImage,
  } = data;
  const { ComponentPostStore, BoardStore } = useStores();
  const { onClickPost, isVisited } = ComponentPostStore;
  const { currentBoardPath } = BoardStore;

  const isImageComponent = isImage
    ? (<FontAwesomeIcon icon={faImage} />)
    : (<FontAwesomeIcon icon={faCommentDots} />);
  const IsBestPost = recommendCount >= 10 ? (<Star icon={faStar} />) : isImageComponent;

  return (
    <MiddleTd width="700" colSpan={2}>
      <TdInner onClick={() => onClickPost(id)}>
        <span>
          {isNotice ? (<FontAwesomeIcon icon={faInfoCircle} />) : IsBestPost}
          &nbsp;
          <PostTitle className={isVisited(id) && 'color-gray'}>{title}</PostTitle>
          { commentCount > 0
          && (<ReplyCountspan>&nbsp;[{commentCount}]</ReplyCountspan>)}
          <br />
          <WriterDropdown data={data} index={index} isNotice={isNotice} isMobile />
          &nbsp;
          { currentBoardPath === 'all' && (!isNotice && (<>{boardName}&nbsp;·&nbsp;</>))}
          {!isNotice && (type !== 'notice' && categoryName)}
        </span>
      </TdInner>
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
  }).isRequired,
  index: Proptypes.number.isRequired,
  isNotice: Proptypes.bool.isRequired,
};

const TdInner = styled.div`
  cursor: pointer;
`;

const Star = styled(FontAwesomeIcon)`
  color : #efc839;
`;

const ReplyCountspan = styled.span`
  color: #DC3545;
  font-weight: bold;
`;

const MiddleTd = styled.td`
  padding : 0px !important;
  vertical-align : middle !important;
  font-size : 14px;
  border-left: none !important;
  border-right: none !important;
`;

const PostTitle = styled.a`
  cursor: pointer
  color : black;
  &.color-gray {
    color: #b0b0b0 !important;
  }
  &:hover {
    text-decoration: none;
  }
`;

export default memo(ResponsivePostRow);
