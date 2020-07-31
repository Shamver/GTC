import React, { memo } from 'react';
import useStores from '../../../stores/useStores';

const CodeFlag = () => {
  const { SystemCodeStore } = useStores();
  const { codeYnList } = SystemCodeStore;

  return codeYnList.map((data) => (
    <option
      value={data.code}
      key={data.code}
    >
      {data.codeName}
    </option>
  ));
};

export default memo(CodeFlag);
