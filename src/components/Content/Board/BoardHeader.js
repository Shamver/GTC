import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';


const BoardHeader = () => {
  const { BoardStore } = useStores();
  const { currentBoardName, currentBoardPath } = BoardStore;

  return (
    <TableHead>
      <BoardLink to={`/${currentBoardPath}`}>
        <h4>{currentBoardName}</h4>
      </BoardLink>
    </TableHead>
  );
};

const BoardLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: block;
  @media (max-width: 992px) {
    padding : 10px;
  }
  
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

export default memo(observer(BoardHeader));
