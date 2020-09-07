import React, { memo } from 'react';
import { TabPane, Table } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import MailTable from './MailTable';
import useStores from '../../../stores/useStores';

const MailSent = () => {
  const { UserMailStore } = useStores();
  const { sentMailList } = UserMailStore;
  const MailSentData = sentMailList.map((v) => <MailTable data={v} key={v.id} />);

  return (
    <TabPane tabId="sent">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh>Read</TableTh>
            <TableTh>받는 사람</TableTh>
            <TableTh>쪽지 내용</TableTh>
            <TableTh>보낸 시각</TableTh>
            <TableTh>관리</TableTh>
          </tr>
        </thead>
        <tbody>
          {MailSentData.length === 0 ? (
            <tr>
              <td colSpan={5}>
                보낸 쪽지가 없습니다.
              </td>
            </tr>
          ) : MailSentData}
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

export default memo(observer(MailSent));
