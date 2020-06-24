import React, { memo } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const MailTable = ({ data }) => {
  const { UserMailStore } = useStores();
  const { deleteMail, onView } = UserMailStore;
  const {
    id, message, fromName, targetName, date, readDate,
  } = data;

  return (
    <TableTr>
      <TableTd width={5} center>
        {!readDate && (<FontAwesomeIcon icon={faEnvelope} />)}
      </TableTd>
      <TableTd width={15}>
        {fromName || targetName}
      </TableTd>
      <TableTd width={50}>
        <MessageBtn onClick={() => onView(data)}>
          <Text>
            {message}
          </Text>
        </MessageBtn>
      </TableTd>
      <TableTd width={20}>
        {date}
      </TableTd>
      <TableTd width={10}>
        {!readDate && (
          <DeleteBtn color="danger" size="sm" onClick={() => deleteMail(id)}>
            <FontAwesomeIcon icon={faTrash} /> 삭제
          </DeleteBtn>
        )}
      </TableTd>
    </TableTr>
  );
};

MailTable.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    message: Proptypes.string,
    fromName: Proptypes.string,
    targetName: Proptypes.string,
    date: Proptypes.string,
    readDate: Proptypes.string,
  }).isRequired,
};

const Text = styled.span`
  max-width: 550px;
  line-height: auto;
  display: inline-block;
  vertical-align: middle !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
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

export default memo(MailTable);
