import React from 'react';
import {
  Table,
} from 'reactstrap';
import styled from 'styled-components';

import { observer } from 'mobx-react';
import DailyListRow from './DailyListRow';

const DailyList = () => {
  const data = [
    {
      username: '테스터1',
      message: 'cex cex cexx',
      point: 20,
      combo: 12,
      time: '00:00',
    },
    {
      username: '테스터2',
      message: 'cex cex ce!!!@#@!xx',
      point: 20,
      combo: 2,
      time: '00:00',
    },
    {
      username: '테스터3',
      message: 'cex cex @#!#@!#!!!!@#@!#!@$!@%@!$@!#!#!@#!@#!@#@!$!@$cexx',
      point: 30,
      combo: 30,
      time: '00:01',
    },
  ];
  const DailyListData = data.map((v, index) => (DailyListRow('daily', v, index)));

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
              <td colSpan={3}>
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

export default observer(DailyList);
