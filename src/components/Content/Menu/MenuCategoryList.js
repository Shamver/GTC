import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import Category from './MenuCategory';

const BoardList = () => {
  const { SystemBoardStore } = useStores();
  const { categoryList } = SystemBoardStore;

  return categoryList.length ? categoryList.map(
    (data) => <Category data={data} key={data.id} />,
  ) : (<tr><CenterTd colSpan={4}>해당 게시판의 카테고리가 존재하지 않습니다.</CenterTd></tr>);
};

const CenterTd = styled.td`
  text-align: center;
`;

export default memo(observer(BoardList));
