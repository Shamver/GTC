import React from 'react';
import {
  Table,
} from 'reactstrap';
import styled from 'styled-components';

import MyPointTableRow from './MyPointTableRow';

const MyPointTable = () => {
  const myPointList = [
    {
      id: 1,
      date: '2020-01-10 15:31:31',
      point: 1,
      desc: '댓글 작성',
      postId: 35102603,
    },
    {
      id: 2,
      date: '2020-01-07 15:31:31',
      point: -1,
      desc: '댓글 삭제',
      postId: 35102621,
    },
    {
      id: 3,
      date: '2020-01-03 15:31:31',
      point: 10,
      desc: '글 작성',
      postId: 3512603,
    },
  ];

  const MyPointTableData = myPointList.map((v) => (MyPointTableRow('myPoint', v)));

  return (
    <ListTable size="sm" bordered>
      <thead>
        <tr>
          <TableTh width={22}>시간</TableTh>
          <TableTh width={16}>포인트</TableTh>
          <TableTh width={62}>설명</TableTh>
        </tr>
      </thead>
      <tbody>
        {MyPointTableData.length === 0 ? (
          <tr>
            <td colSpan={3}>
              획득한 포인트가 없습니다.
            </td>
          </tr>
        ) : MyPointTableData}
      </tbody>
    </ListTable>
  );
};

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

export default MyPointTable;
