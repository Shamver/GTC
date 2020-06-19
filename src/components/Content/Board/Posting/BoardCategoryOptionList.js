import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = () => {
  const { SystemCodeStore } = useStores();
  const { setCodeList } = SystemCodeStore;

  const categoryArr = [];
  categoryArr.push(<option key={0}>선택</option>);

  setCodeList.map((data) => (
    categoryArr.push(
      <option
        value={data.CODE}
        key={data.CODE}
      >
        {data.NAME}
      </option>,
    )
  ));

  return categoryArr;
};

export default memo(observer(BoardCategoryOptionList));
