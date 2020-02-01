import React from 'react';
import {
  Table,
} from 'reactstrap';
import styled from 'styled-components';

import { observer } from 'mobx-react';
import MyPointTableRow from './MyPointTableRow';
import useStores from '../../../stores/useStores';

const MyPointTable = () => {
  const { UserPointStore } = useStores();

  const { pointList } = UserPointStore;
  const MyPointTableData = pointList.map((v) => (MyPointTableRow('myPoint', v)));

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

export default observer(MyPointTable);
