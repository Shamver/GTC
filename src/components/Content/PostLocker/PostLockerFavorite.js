import React, { memo } from 'react';
import { TabPane, Table } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';
import PostLockerFavoriteTable from './PostLockerFavoriteTable';

const PostLockerFavorite = () => {
  const { UserFavoriteStore } = useStores();
  const { favoriteList } = UserFavoriteStore;
  const FavoriteTableData = favoriteList.map(
    (v) => <PostLockerFavoriteTable data={v} key={v.postId} />,
  );

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
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

export default memo(observer(PostLockerFavorite));
