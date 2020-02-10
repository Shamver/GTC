import React from 'react';
import {
  Button,
} from 'reactstrap';
import styled from 'styled-components';

const MailGetTable = (title, data, onClickEvent) => {
  const {
    id, message, fromName, date,
  } = data;

  return (
    <TableTr key={title + id}>
      <TableTd width={5}>
        <b>new?</b>
      </TableTd>
      <TableTd width={15}>
        {fromName}
      </TableTd>
      <TableTd width={60}>
        {message}
      </TableTd>
      <TableTd width={15}>
        {date}
      </TableTd>
      <TableTd width={5}>
        <DeleteBtn color="danger" size="sm" onClick={() => { onClickEvent(id); }}>
          삭제
        </DeleteBtn>
      </TableTd>
    </TableTr>
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

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;

export default MailGetTable;
