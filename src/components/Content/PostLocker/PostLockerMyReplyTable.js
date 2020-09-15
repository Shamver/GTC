import React, { memo } from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const PostLockerMyReplyTable = ({ data }) => {
  const {
    postId, replyId, postTitle, replyContent, replyDate,
  } = data;

  return (
    <TableBody>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
          <ColCell className="col-4">
            <Link to={`/post/${postId}#${replyId}`}>
              <Text post>{postTitle}</Text>
            </Link>
          </ColCell>
        </div>
        <div className="responsive-wrap ">
          <ColCell className="col-5">
            <Text>{renderHTML(replyContent)}</Text>
          </ColCell>
        </div>
        <div className="responsive-wrap info">
          <ColCell className="col-3">
            {replyDate}
          </ColCell>
        </div>
      </div>
    </TableBody>
  );
};

PostLockerMyReplyTable.propTypes = {
  data: Proptypes.shape({
    postId: Proptypes.number,
    replyId: Proptypes.number,
    postTitle: Proptypes.string,
    replyContent: Proptypes.string,
    replyDate: Proptypes.string,
  }).isRequired,
};

const Text = styled.span`
  line-height: 21px;
  display: inline-block;
  vertical-align: middle !important;
  
  & p {
    margin-bottom: 0 !important;
  }
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

export default memo(PostLockerMyReplyTable);
