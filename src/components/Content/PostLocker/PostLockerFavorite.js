import React, { memo } from 'react';
import { TabPane, Table } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerFavoriteTable from './PostLockerFavoriteTable';
import Pagination from './Pagination';

const PostLockerFavorite = ({ currentPage, noPagination, currentTab }) => {
  const { UserFavoriteStore } = useStores();
  const { myFavoriteList, favoriteMaxPage } = UserFavoriteStore;
  const FavoriteTableData = myFavoriteList.map(
    (v) => <PostLockerFavoriteTable data={v} key={v.postId} />,
  );

  console.log(favoriteMaxPage);

  return (
    <TabPane tabId="favorite">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh width={10}>번호</TableTh>
            <TableTh width={55}>제목</TableTh>
            <TableTh width={20}>작성일</TableTh>
            <TableTh width={10}>조회수</TableTh>
            <TableTh width={5}>삭제</TableTh>
          </tr>
        </thead>
        <tbody>
          {FavoriteTableData.length === 0 ? (
            <tr>
              <TableTd colSpan={5}>
                즐겨찾기한 게시물이 없습니다.
              </TableTd>
            </tr>
          ) : FavoriteTableData}
        </tbody>
      </ListTable>
      {favoriteMaxPage !== 0
        ? (
          <Pagination
            currentPage={currentPage}
            noPagination={noPagination}
            path={currentTab}
            maxPage={favoriteMaxPage}
          />
        ) : null}
    </TabPane>
  );
};

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

PostLockerFavorite.propTypes = {
  currentPage: Proptypes.string,
  currentTab: Proptypes.string,
  noPagination: Proptypes.bool,
};

PostLockerFavorite.defaultProps = {
  currentPage: '1',
  currentTab: 'myPost',
  noPagination: false,
};

export default memo(observer(PostLockerFavorite));
