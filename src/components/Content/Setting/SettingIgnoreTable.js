import React, { memo } from 'react';
import { CustomInput } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const SettingIgnoreTable = ({ data }) => {
  const { UserIgnoreStore } = useStores();
  const { onChangeIgnore } = UserIgnoreStore;
  const { id, nickname, date } = data;

  return (
    <tr>
      <TableTh scope="row">
        <CustomInput type="checkbox" id={id} name={id} onClick={onChangeIgnore} />
      </TableTh>
      <TableTd>{nickname}</TableTd>
      <TableTd>{date}</TableTd>
    </tr>
  );
};

SettingIgnoreTable.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    nickname: Proptypes.string,
    date: Proptypes.string,
  }).isRequired,
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

export default memo(SettingIgnoreTable);
