import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import Board from './Board';

const BoardList = () => {
  const { SystemBoardStore } = useStores();
  const { boardList } = SystemBoardStore;

  return boardList.length ? boardList.map(
    (data) => <Board data={data} key={data.board} />,
  ) : (<tr><CenterTd colSpan={4}>게시판이 존재하지 않습니다.</CenterTd></tr>);
};

const CenterTd = styled.td`
  text-align: center;
`;

export default memo(observer(BoardList));
