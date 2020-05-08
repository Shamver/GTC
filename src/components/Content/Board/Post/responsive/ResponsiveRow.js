import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import WriterDropdown from './WriterDropdown';

const ResponsiveRow = ({ data, index }) => {
  const {
    id, recommendCount, categoryName, commentCount,
    type, title,
  } = data;

  const IsBestPost = recommendCount >= 10
    ? (<Star icon={faStar} />)
    : (<FontAwesomeIcon icon={faCommentDots} />);
  return (
    <>
      <DateTd>
        { type !== 'notice' ? categoryName : ''}
      </DateTd>
      <MiddleTd width="700">
        <MiddleSpan>
          { type === 'notice' ? (<FontAwesomeIcon icon={faInfoCircle} />) : IsBestPost}
          &nbsp;
          <PostTitle to={`/post/${id}`}>{title}</PostTitle>
          { commentCount > 0 ? (<ReplyCountspan>&nbsp;&nbsp;&nbsp;[{commentCount}]</ReplyCountspan>) : ''}
          <MobileWriterDropdown>
            <WriterDropdown data={data} index={index} />
            <TopSpan>{ type !== 'notice' ? categoryName : ''}</TopSpan>
          </MobileWriterDropdown>
        </MiddleSpan>
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
    categoryName: Proptypes.string,
    recommendCount: Proptypes.number,
    commentCount: Proptypes.number,
    type: Proptypes.string,
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const MiddleSpan = styled.span`
  vertical-align : middle !important;
`;

const TopSpan = styled.span`
  vertical-align : top;
`;

const MobileWriterDropdown = styled.div`
  display : none !important;
  @media (max-width: 992px) {
    display : block !important;
  }
`;

const DateTd = styled.td`
  white-space : pre;
  text-align : center;
  vertical-align : inherit !important;
  padding : 0rem 0.5rem !important;
  @media (max-width: 992px) {
    display : none;
  }
`;

const Star = styled(FontAwesomeIcon)`
  color : #efc839;
`;

const ReplyCountspan = styled.span`
  color: #DC3545;
  font-weight: bold;
`;

const MiddleTd = styled.td`
  padding : 0px 10px !important;
  vertical-align : middle !important;
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

const PostTitle = styled(Link)`
  cursor: pointer
  color : black;
  &:hover {
    text-decoration: none;
  }
`;

export default ResponsiveRow;
