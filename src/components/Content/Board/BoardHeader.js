import React from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const BoardHeader = ({ path }) => {
  const { BoardStore } = useStores();
  const { getBoardName } = BoardStore;
  const BoardName = getBoardName(path);
  return (
    <TableHead>
      <MarginlessH3>{BoardName}</MarginlessH3>
    </TableHead>
  );
};

BoardHeader.propTypes = {
  path: Proptypes.string.isRequired,
};

const TableHead = styled.div`
  margin-bottom : 10px;
`;

const MarginlessH3 = styled.h4`
  margin : 0px;
  font-weight: bold;
  border-bottom : 1px solid #e6e6e6;
  padding-bottom : 4px;
`;

export default BoardHeader;
