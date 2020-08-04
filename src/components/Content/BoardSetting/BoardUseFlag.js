import React, { memo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const BoardSettingCode = ({ code }) => {
  const { SystemBoardStore, SystemCodeStore } = useStores();
  const { useFlagList, setUseFlagList } = SystemBoardStore;
  const { getCodeComponent } = SystemCodeStore;

  useLayoutEffect(() => {
    getCodeComponent(code, setUseFlagList);
  }, [getCodeComponent, code, setUseFlagList]);

  return useFlagList.map((data) => (
    <option
      value={data.code}
      key={data.code}
    >
      {data.codeName}
    </option>
  ));
};

export default memo(observer(BoardSettingCode));
