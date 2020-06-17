import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = () => {
  const { SystemCodeStore } = useStores();
  const { setCodeList } = SystemCodeStore;

  return setCodeList.map((data) => (
    <option
      value={data.NAME}
      key={data.CODE}
    >
      {data.NAME}
    </option>
  ));
};

export default memo(observer(BoardCategoryOptionList));
