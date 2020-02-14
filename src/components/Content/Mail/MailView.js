import React from 'react';
import {
  Button, Table, TabPane,
} from 'reactstrap';
import styled from 'styled-components';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const MailView = () => {
  const {
    UserMailStore, UserStore, ComponentMailStore,
  } = useStores();
  const { viewMail, deleteMail } = UserMailStore;
  const { userData } = UserStore;
  const { setTab } = ComponentMailStore;
  if (viewMail.id === undefined) {
    setTab('get');
  }
  const {
    id, message, targetName, date, readDate, fromName,
  } = viewMail;
  return (
    <TabPane tabId="view">
      <ListTable size="sm" bordered>
        <TableTr>
          <TableTh width={20}>
            보낸 사람
          </TableTh>
          <TableTd width={80}>
            {fromName || userData.username}
          </TableTd>
        </TableTr>
        <TableTr>
          <TableTh width={20}>
            받는 사람
          </TableTh>
          <TableTd width={80}>
            {targetName || userData.username}
          </TableTd>
        </TableTr>
        <TableTr>
          <TableTh width={20}>
            쪽지 내용
          </TableTh>
          <TableTd width={80}>
            {message}
          </TableTd>
        </TableTr>
        <TableTr>
          <TableTh width={20}>
            보낸 시간
          </TableTh>
          <TableTd width={80}>
            {date}
          </TableTd>
        </TableTr>
        <TableTr>
          <TableTh width={20}>
            읽은 시간
          </TableTh>
          <TableTd width={80}>
            {readDate || '-'}
          </TableTd>
        </TableTr>
        <TableTr>
          <TableTh width={20}>
            Action
          </TableTh>
          <TableTd width={80}>
            {readDate ? '' : (
              <DeleteBtn color="danger" size="sm" onClick={() => { deleteMail(id); }}>
                <FontAwesomeIcon icon={faTrash} /> 삭제
              </DeleteBtn>
            )}
          </TableTd>
        </TableTr>
      </ListTable>
    </TabPane>
  );
};

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

const TableTr = styled.tr`
  height: 30px;
`;

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;

MailView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }),
};

MailView.defaultProps = {
  match: null,
};

export default observer(MailView);
