import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = () => {
  const { BoardPostStore } = useStores();
  const { categoryCodeList } = BoardPostStore;
  const categoryArr = [];
  categoryArr.push(<option key={0}>선택</option>);

  categoryCodeList.map((data) => (
    categoryArr.push(
      <option
        value={data.code}
        key={data.code}
      >
        {data.codeName}
      </option>,
    )
  ));

  return categoryArr;
};

export default memo(observer(BoardCategoryOptionList));
