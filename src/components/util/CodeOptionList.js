import React, { memo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../stores/useStores';

const CodeOptionList = ({ codeGroup, setArrayMethod, array }) => {
  const { SystemCodeStore } = useStores();
  const { getCodeComponent } = SystemCodeStore;

  useLayoutEffect(() => {
    getCodeComponent(codeGroup, setArrayMethod);
  }, [getCodeComponent, codeGroup, setArrayMethod]);

  return array.map((data) => (
    <option
      value={data.code}
      key={data.code}
    >
      {data.codeName}
    </option>
  ));
};

export default memo(observer(CodeOptionList));
