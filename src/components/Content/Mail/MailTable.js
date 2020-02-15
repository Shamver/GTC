import React from 'react';
import {
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import { faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MailTable = (title, data, onDelete, onView) => {
  const {
    id, message, fromName, targetName, date, readDate,
  } = data;

  return (
    <TableTr key={title + id}>
      <TableTd width={5} center>
        {readDate ? '' : (<FontAwesomeIcon icon={faEnvelope} />)}
      </TableTd>
      <TableTd width={15}>
        {fromName || targetName}
      </TableTd>
      <TableTd width={60}>
        <MessageBtn onClick={() => { onView(data); }}>
          <Text>
            {message}
          </Text>
        </MessageBtn>
      </TableTd>
      <TableTd width={15}>
        {date}
      </TableTd>
      <TableTd width={5}>
        {readDate ? '' : (
          <DeleteBtn color="danger" size="sm" onClick={() => { onDelete(id); }}>
            <FontAwesomeIcon icon={faTrash} /> 삭제
          </DeleteBtn>
        )}
      </TableTd>
    </TableTr>
  );
};

const Text = styled.span`
  max-width: 550px;
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  padding: 6px !important;
`;

const TableTr = styled.tr`
  height: 30px;
`;

const MessageBtn = styled(Button)`
  padding: 0px !important;
  border: none !important;
  background: none !important;
  color: #337ab7 !important;
  
  &:hover {
    color: #23527c !important;
    background: none !important;
    text-decoration: underline !important;
  }
  
  &:focus {
    box-shadow: none !important;
  }
`;

const DeleteBtn = styled(Button)`
  margin: -5px 0 !important;
`;

export default MailTable;
