import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = () => {
  const { BoardStore } = useStores();
  const { boardCategoryList } = BoardStore;

  const categoryArr = JSON.parse(JSON.stringify(boardCategoryList));
  categoryArr.unshift({ id: '', name: '선택' });

  return categoryArr.map((data) => (
    <option
      value={data.id}
      key={data.id}
    >
      {data.name}
    </option>
  ));
};

export default memo(observer(BoardCategoryOptionList));
