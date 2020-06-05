import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import WriterDropdown from './WriterDropdown';
import useStores from '../../../../../stores/useStores';

const ResponsiveRow = ({
  data, index, path, isNotice,
}) => {
  const {
    id, recommendCount, categoryName, commentCount,
    type, title, boardName, isImage,
  } = data;
  const { ComponentPostStore } = useStores();
  const { onClickPost, isVisited } = ComponentPostStore;

  const IsBestPost = recommendCount >= 10
    ? (<Star icon={faStar} />)
    : isImage ? (<FontAwesomeIcon icon={faImage} />)
      : (<FontAwesomeIcon icon={faCommentDots} />);
  return (
    <>
      { path === 'all' ? (
        <DateTd>
          { !isNotice ? boardName : ''}
        </DateTd>
      ) : '' }
      { !isNotice ? (
        <DateTd>
          { type !== 'notice' ? categoryName : ''}
        </DateTd>
      ) : '' }
      <MiddleTd width="700" colSpan={isNotice ? 2 : 1}>
        { isNotice ? (<Info icon={faInfoCircle} />) : IsBestPost}
        &nbsp;
        <PostTitle className={isVisited(id) ? 'color-gray' : ''} onClick={() => onClickPost(id)}>{title}</PostTitle>
        { commentCount > 0 ? (<ReplyCountspan>&nbsp;&nbsp;&nbsp;[{commentCount}]</ReplyCountspan>) : ''}
      </MiddleTd>
      <CenterTdWriter>
        <WriterDropdown data={data} index={index} />
      </CenterTdWriter>
    </>
  );
};

ResponsiveRow.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    date: Proptypes.string,
    categoryName: Proptypes.string,
    recommendCount: Proptypes.number,
    commentCount: Proptypes.number,
    type: Proptypes.string,
    boardName: Proptypes.string,
    isImage: Proptypes.bool,
  }).isRequired,
  index: Proptypes.number.isRequired,
  path: Proptypes.string.isRequired,
  isNotice: Proptypes.bool.isRequired,
};

const DateTd = styled.td`
  white-space : pre;
  text-align : center;
  vertical-align : inherit !important;
  padding : 0.5rem 0.8rem !important;
  @media (max-width: 992px) {
    display : none;
  }
`;

const Star = styled(FontAwesomeIcon)`
  color : #efc839;
`;

const Info = styled(FontAwesomeIcon)`
  color: #0083e2;
`;

const ReplyCountspan = styled.span`
  color: #DC3545;
  font-weight: bold;
`;

const MiddleTd = styled.td`
  padding : 8px 9px 2px 10px !important;
  font-size : 13px;
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

const CenterTdWriter = styled(CenterTd)`
  color : #DC3545;
  font-weight : bold;
  @media (max-width: 992px) {
    display : none;
  }
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

export default ResponsiveRow;
