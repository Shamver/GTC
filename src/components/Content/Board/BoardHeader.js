import React from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import useStores from '../../../stores/useStores';

const BoardHeader = ({ path }) => {
  const { BoardStore } = useStores();
  const { getBoardName } = BoardStore;
  const BoardName = getBoardName(path);
  return (
    <TableHead>
      <BoardLink to={path}>
        <h4>{BoardName}</h4>
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
  
  & > h4 {
    margin : 0px;
    font-weight: bold;
    border-bottom : 1px solid #e6e6e6;
    padding-bottom : 4px;
  }
`;

const TableHead = styled.div`
  margin-bottom : 10px;
`;

export default BoardHeader;
