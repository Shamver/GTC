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
      <div className="responsive-wrap center">
        <ColCell className="col-1 center index">
          {postId}
        </ColCell>
        <ColCell className="col-4">
          <Link to={`/post/${postId}`}>
            <Text>{postTitle}</Text>
          </Link>
        </ColCell>
        <ColCell className="col-2">
          {postDate}
        </ColCell>
        <ColCell className="col-1">
          {postViews}
        </ColCell>
        <ColCell className="col-2">
          <DeleteBtn color="danger" size="sm" onClick={() => deleteFavorite(postId, 'postLocker')}>삭제</DeleteBtn>
        </ColCell>
      </div>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
        </div>
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
  max-width: 490px;
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
`;

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;


const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  }
  
  & .point, .combo {
    display: none;
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  @media (max-width: 740px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 26px;
      font-size: 13px;
      flex: 1;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 5;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      padding-left: 10px;
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
