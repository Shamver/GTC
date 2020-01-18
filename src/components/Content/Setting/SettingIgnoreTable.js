import React from 'react';
import {
  CustomInput,
} from 'reactstrap';
import styled from 'styled-components';

const SettingIgnoreTable = (title, data, onClickEvent) => {
  const {
    id, nickname, date,
  } = data;

  return (
    <tr key={title + id}>
      <TableTh scope="row">
        <CustomInput type="checkbox" id={title + id} name={id} onClick={onClickEvent} />
      </TableTh>
      <TableTd>
        { nickname }
      </TableTd>
      <TableTd>{date}</TableTd>
    </tr>
  );
};

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

export default SettingIgnoreTable;
