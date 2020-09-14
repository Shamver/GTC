import React, { memo } from 'react';
import { Button, Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const PostLockerFavoriteTable = ({ data }) => {
  const { UserFavoriteStore } = useStores();
  const { deleteFavorite } = UserFavoriteStore;

  const {
    postId, postTitle, postDate, postViews,
  } = data;

  return (
    <TableBody>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
          <ColCell className="col-1 center id">
            {postId}
          </ColCell>
          <ColCell className="col-5">
            <Link to={`/post/${postId}`}>
              <Text>{postTitle}</Text>
            </Link>
          </ColCell>
        </div>
        <div className="responsive-wrap info">
          <ColCell className="col-3">
            {postDate}
          </ColCell>
          <ColCell className="col-2">
            <span className="view">조회수</span> {postViews}
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap center">
        <ColCell className="col-1 center">
          <DeleteBtn color="danger" size="sm" onClick={() => deleteFavorite(postId, 'postLocker')}>삭제</DeleteBtn>
        </ColCell>
      </div>
    </TableBody>
  );
};

PostLockerFavoriteTable.propTypes = {
  data: Proptypes.shape({
    postId: Proptypes.number,
    postTitle: Proptypes.string,
    postDate: Proptypes.string,
    postViews: Proptypes.number,
  }).isRequired,
};

const Text = styled.span`
`;

const DeleteBtn = styled(Button)`
`;

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  
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
    
    .contents {        
      color: #5a7989;
      font-size: 12px;
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

export default memo(observer(PostLockerFavoriteTable));
