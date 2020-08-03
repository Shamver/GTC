import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const BoardUseFlag = () => {
  const { SystemBoardStore } = useStores();
  const { useFlagList } = SystemBoardStore;

  return useFlagList.map((data) => (
    <option
      value={data.code}
      key={data.code}
    >
      {data.codeName}
    </option>
  ));
};

export default memo(observer(BoardUseFlag));
