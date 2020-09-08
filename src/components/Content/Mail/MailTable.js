import React, { memo } from 'react';
import {Button, Col, Row} from 'reactstrap';
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
    <TableBody>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
          <ColCell className="col-1 center">
            {!readDate && (<FontAwesomeIcon icon={faEnvelope} />)}
          </ColCell>
          <ColCell className="col-5">
            <MessageBtn onClick={() => onView(data)}>
              <Text>
                {message}
              </Text>
            </MessageBtn>
          </ColCell>
        </div>
        <div className="responsive-wrap info">
          <ColCell className="col-2">
            {fromName || targetName}
          </ColCell>
          <ColCell className="col-2">
            {date}
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap">
        <ColCell className="col-2 center">
          {!readDate && (
            <Button color="danger" size="sm" onClick={() => deleteMail(id)}>
              <FontAwesomeIcon icon={faTrash} /> 삭제
            </Button>
          )}
        </ColCell>
      </div>
    </TableBody>
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


const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .center {
    text-align: center;
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  @media (max-width: 740px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 32px;
      font-size: 14px;
      flex: 1;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 3;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
    }
    
    .info {
      color: #989898;
      font-size: 13px;
      line-height: 24px;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(MailTable);
