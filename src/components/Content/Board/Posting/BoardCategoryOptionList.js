import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = () => {
  const { SystemCodeStore } = useStores();
  const { setCodeList } = SystemCodeStore;

  const categoryArr = [];
  categoryArr.push(<option>선택</option>);

  setCodeList.map((data) => (
    categoryArr.push(
      <option
        value={data.NAME}
        key={data.CODE}
      >
        {data.NAME}
      </option>,
    )
  ));

  return categoryArr;
};

export default memo(observer(BoardCategoryOptionList));
