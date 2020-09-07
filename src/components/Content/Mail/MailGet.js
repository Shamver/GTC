import React, { memo } from 'react';
import { TabPane, Table } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import MailTable from './MailTable';
import useStores from '../../../stores/useStores';

const MailGet = () => {
  const { UserMailStore } = useStores();
  const { getMailList } = UserMailStore;
  const MailGetData = getMailList.map((v) => <MailTable data={v} key={v.id} />);

  return (
    <TabPane tabId="get">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh>New</TableTh>
            <TableTh>보낸 사람</TableTh>
            <TableTh>쪽지 내용</TableTh>
            <TableTh>보낸 시각</TableTh>
            <TableTh>설정</TableTh>
          </tr>
        </thead>
        <tbody>
          {MailGetData.length === 0 ? (
            <tr>
              <td colSpan={5}>받은 쪽지가 없습니다.</td>
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

export default memo(observer(MailGet));
