import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Post = ({ data }) => {
  const {
    id, title, writer, date, categoryName,
  } = data;

  return (
    <tr height="35" key={data.id}>
      <CenterTd>{id}</CenterTd>
      <CenterTd>{categoryName}</CenterTd>
      <MiddleTd width="700">
        <FontAwesomeIcon icon={faCommentDots} /> &nbsp;
        <PostTitle to={`/post/${id}`}>{title}</PostTitle>
      </MiddleTd>
      <CenterTdWriter>{writer}</CenterTdWriter>
      <CenterTd>{date}</CenterTd>
    </tr>
  );
};

Post.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    writer: Proptypes.string,
    date: Proptypes.string,
    categoryName: Proptypes.string,
  }).isRequired,
};

const PostTitle = styled(Link)`
  cursor: pointer
  color : black;
  
  &:hover {
    text-decoration: none;
  }
`;

const MiddleTd = styled.td`
  padding : 8px 9px 2px 10px !important
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

const CenterTdWriter = styled(CenterTd)`
  color : #DC3545;
  font-weight : bold;
`;

export default Post;
