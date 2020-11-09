import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';
import BoardCategory from './BoardCategory';

const BoardCategoryList = () => {
  const { BoardStore } = useStores();
  const { boardCategoryList } = BoardStore;
  return boardCategoryList.map((data) => (<BoardCategory data={data} key={data.id} />));
};

export default memo(observer(BoardCategoryList));
