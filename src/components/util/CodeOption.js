import React, { memo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../stores/useStores';

const CodeOption = ({ code, setArrayMethod, array }) => {
  const { SystemCodeStore } = useStores();
  const { getCodeComponent } = SystemCodeStore;

  useLayoutEffect(() => {
    getCodeComponent(code, setArrayMethod);
  }, [getCodeComponent, code, setArrayMethod]);

  return array.map((data) => (
    <option
      value={data.code}
      key={data.code}
    >
      {data.codeName}
    </option>
  ));
};

export default memo(observer(CodeOption));
