import React, { memo } from 'react';
import {
  TabPane, Table,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerMyPostTable from './PostLockerMyPostTable';
import Pagination from './Pagination';

const PostLockerMyPost = ({ currentPage, noPagination, currentTab }) => {
  const { BoardPostStore } = useStores();
  const { postMineList, postMineMaxPage } = BoardPostStore;
  const MyPostTableData = postMineList.map(
    (v) => <PostLockerMyPostTable data={v} key={v.postId} />,
  );

  return (
    <TabPane tabId="myPost">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh width={10}>번호</TableTh>
            <TableTh width={60}>제목</TableTh>
            <TableTh width={20}>작성일</TableTh>
            <TableTh width={10}>조회수</TableTh>
          </tr>
        </thead>
        <tbody>
          {MyPostTableData.length === 0 ? (
            <tr>
              <TableTd colSpan={4}>
                작성한 글이 없습니다.
              </TableTd>
            </tr>
          ) : MyPostTableData}
        </tbody>
      </ListTable>
      {postMineMaxPage !== 0
        ? (
          <Pagination
            currentPage={currentPage}
            noPagination={noPagination}
            path={currentTab}
            maxPage={postMineMaxPage}
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
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

PostLockerMyPost.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(PostLockerMyPost));
