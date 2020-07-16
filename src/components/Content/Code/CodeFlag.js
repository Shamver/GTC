import React, { memo } from 'react';
import useStores from '../../../stores/useStores';

const CodeFlag = () => {
  const { SystemCodeStore } = useStores();
  const { setCodeList } = SystemCodeStore;

  return setCodeList.map((data) => (
    <option
      value={data.CODE}
      key={data.CODE}
    >
      {data.NAME}
    </option>
  ));
};

export default memo(CodeFlag);
