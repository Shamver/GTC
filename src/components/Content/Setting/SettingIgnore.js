import React from 'react';
import {
  TabPane, Table, Button,
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import useStores from '../../../stores/useStores';

import SettingIgnoreTable from './SettingIgnoreTable';

const SettingIgnore = () => {
  const {
    UserIgnoreStore, UtilAlertStore,
  } = useStores();

  const {
    ignoreList, onChangeIgnore, onDeleteIgnore,
  } = UserIgnoreStore;
  const {
    toggleConfirmAlert,
  } = UtilAlertStore;

  const IgnoreTableData = ignoreList.map((v) => (SettingIgnoreTable('ignore', v, onChangeIgnore)));

  return (
    <TabPane tabId="ignore">
      <ListTable size="sm" bordered>
        <thead>
          <tr>
            <TableTh>선택</TableTh>
            <TableTh>차단 닉네임</TableTh>
            <TableTh>차단 일자</TableTh>
          </tr>
        </thead>
        <tbody>
          {IgnoreTableData.length === 0 ? (
            <tr>
              <td colSpan={3}>
              차단한 유저가 없습니다.
              </td>
            </tr>
          ) : IgnoreTableData}
        </tbody>
      </ListTable>
      {IgnoreTableData.length === 0 ? '' : (
        <Button color="danger" onClick={() => { toggleConfirmAlert('정말 삭제하시겠어요?', onDeleteIgnore); }}>
          <FontAwesomeIcon icon={faTrashAlt} />  삭제하기
        </Button>
      )}
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

export default SettingIgnore;
