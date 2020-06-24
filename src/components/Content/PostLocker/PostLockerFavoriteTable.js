import React, { memo } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const PostLockerFavoriteTable = ({ data }) => {
  const { UserFavoriteStore } = useStores();
  const { deleteFavorite } = UserFavoriteStore;

  const {
    postId, postTitle, postDate, postViews,
  } = data;

  return (
    <TableTr>
      <TableTd>
        <b>{postId}</b>
      </TableTd>
      <TableTd>
        <Link to={`/post/${postId}`}>
          <Text>{postTitle}</Text>
        </Link>
      </TableTd>
      <TableTd>{postDate}</TableTd>
      <TableTd>{postViews}</TableTd>
      <TableTd>
        <DeleteBtn color="danger" size="sm" onClick={() => deleteFavorite(postId, 'postLocker')}>삭제</DeleteBtn>
      </TableTd>
    </TableTr>
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

const TableTr = styled.tr`
  height: 30px;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;

export default memo(PostLockerFavoriteTable);
