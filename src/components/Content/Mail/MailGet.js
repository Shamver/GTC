import React from 'react';
import {
  TabPane, Table,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import MailGetTable from './MailGetTable';

const MailGet = () => {
  const data = [
    {
      id: 0,
      fromName: 1,
      message: 'test',
      date: '2020-01-01 08:08:08',
    },
    {
      id: 1,
      fromName: 1,
      message: 'test2',
      date: '2020-01-01 08:08:08',
    },
  ];

  const MailGetData = data.map((v) => (MailGetTable('mailGet', v, () => {})));

  return (
    <TabPane tabId="get">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh>New</TableTh>
            <TableTh>보낸 사람</TableTh>
            <TableTh>쪽지 내용</TableTh>
            <TableTh>보낸 시각</TableTh>
            <TableTh>삭제</TableTh>
          </tr>
        </thead>
        <tbody>
          {MailGetData.length === 0 ? (
            <tr>
              <td colSpan={3}>
                받은 쪽지가 없습니다.
              </td>
            </tr>
          ) : MailGetData}
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

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

export default observer(MailGet);
