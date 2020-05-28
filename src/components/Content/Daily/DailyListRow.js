import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';

const DailyListRow = ({ data, index }) => {
  const {
    nickname, message, point, combo, time,
  } = data;

  return (
    <tr>
      <TableTh scope="row">{index + 1} 등</TableTh>
      <TableTd>{nickname}</TableTd>
      <TableTd>{message}</TableTd>
      <TableTd>{point}</TableTd>
      <TableTd>{combo}</TableTd>
      <TableTd>{time}</TableTd>
    </tr>
  );
};

DailyListRow.propTypes = {
  data: Proptypes.shape({
    nickname: Proptypes.string,
    message: Proptypes.string,
    point: Proptypes.number,
    combo: Proptypes.number,
    time: Proptypes.string,
  }).isRequired,
  index: Proptypes.number.isRequired,
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

export default memo(DailyListRow);
