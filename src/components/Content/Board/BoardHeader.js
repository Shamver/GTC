import React from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import { Link } from 'react-router-dom';

const BoardHeader = ({ path }) => {
  const { BoardStore } = useStores();
  const { getBoardName } = BoardStore;
  const BoardName = getBoardName(path);
  return (
    <TableHead>
      <BoardLink to={path}>
        <MarginlessH3>{BoardName}</MarginlessH3>
      </BoardLink>
    </TableHead>
  );
};

BoardHeader.propTypes = {
  path: Proptypes.string.isRequired,
};

const BoardLink = styled(Link)`
  color : black;
  text-decoration : none;
  
  &:hover {
    color : black;
    text-decoration : none;
  }
`;

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
