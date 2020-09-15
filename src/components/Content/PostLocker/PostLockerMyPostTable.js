import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const PostLockerMyPostTable = ({ data }) => {
  const {
    postId, postTitle, postDate, viewCnt,
  } = data;

  return (
    <TableBody key={postId}>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
          <ColCell className="col-1 center id">
            {postId}
          </ColCell>
          <ColCell className="col-6">
            <Link to={`/post/${postId}`}>
              <Text>{postTitle}</Text>
            </Link>
          </ColCell>
        </div>
        <div className="responsive-wrap info">
          <ColCell className="col-3">
            {postDate}
          </ColCell>
          <ColCell className="col-2 center">
            <span className="view">조회수</span> {viewCnt}
          </ColCell>
        </div>
      </div>
    </TableBody>
  );
};

PostLockerMyPostTable.propTypes = {
  data: Proptypes.shape({
    postId: Proptypes.number,
    postTitle: Proptypes.string,
    postDate: Proptypes.string,
    viewCnt: Proptypes.number,
  }).isRequired,
};

const Text = styled.span`
  max-width: 550px;
  line-height: 21px;
  display: inline-block;
  vertical-align: middle !important;
`;

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  & .view {
    display: none;
  }
  
  @media (max-width: 800px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 32px;
      font-size: 14px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 3;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
    }
    
    .id {    
      font-size: 16px;
      color: #dc3545;
      font-weight: 600;
    }
    
    .info {
      color: #989898;
      font-size: 13px;
      line-height: 24px;
    }
    
    .view {
      display: inline;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(PostLockerMyPostTable);
