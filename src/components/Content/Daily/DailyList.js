import React, { memo } from 'react';
import {
  Table,
} from 'reactstrap';
import styled from 'styled-components';

import { observer } from 'mobx-react';
import DailyListRow from './DailyListRow';
import useStores from '../../../stores/useStores';

const DailyList = () => {
  const { EventDailyStore } = useStores();
  const { dailyList } = EventDailyStore;
  const DailyListData = dailyList.map((v, index) => (DailyListRow('daily', v, index)));

  return (
    <>
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh width={5}>#</TableTh>
            <TableTh width={15}>닉네임</TableTh>
            <TableTh width={60}>한마디</TableTh>
            <TableTh width={7}>포인트</TableTh>
            <TableTh width={7}>콤보</TableTh>
            <TableTh width={6}>시간</TableTh>
          </tr>
        </thead>
        <tbody>
          {DailyListData.length === 0 ? (
            <tr>
              <td colSpan={6}>
                출석체크한 유저가 없습니다.
              </td>
            </tr>
          ) : DailyListData}
        </tbody>
      </ListTable>
    </>
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

export default memo(observer(DailyList));
