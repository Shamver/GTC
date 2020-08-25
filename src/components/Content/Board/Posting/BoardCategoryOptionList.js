import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = () => {
  const { BoardPostStore } = useStores();
  const { categoryCodeList } = BoardPostStore;

  const categoryArr = JSON.parse(JSON.stringify(categoryCodeList));
  categoryArr.unshift({ code: '', codeName: '선택' });

  return categoryArr.map((data) => (
    <option
      value={data.code}
      key={data.code}
    >
      {data.codeName}
    </option>
  ));
};

export default memo(observer(BoardCategoryOptionList));
