import React from 'react';
import {
  TabPane, Table,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';
import PostLockerMyReplyTable from './PostLockerMyReplyTable';

const PostLockerMyReply = () => {
  const { BoardReplyStore } = useStores();
  const { replyMineList } = BoardReplyStore;
  const MyReplyTableData = replyMineList.map(
    (v) => <PostLockerMyReplyTable data={v} key={v.replyId} />,
  );

  return (
    <TabPane tabId="myReply">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh width={20}>글 제목</TableTh>
            <TableTh width={60} classname="col-8">댓글 내용</TableTh>
            <TableTh width={20} classname="col-2">작성일</TableTh>
          </tr>
        </thead>
        <tbody>
          {MyReplyTableData.length === 0 ? (
            <tr>
              <TableTd colSpan={3}>작성한 댓글이 없습니다.</TableTd>
            </tr>
          ) : MyReplyTableData}
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
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

export default observer(PostLockerMyReply);
