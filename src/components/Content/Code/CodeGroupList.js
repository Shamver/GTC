import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import CodeGroup from './CodeGroup';

const CodeGroupList = () => {
  const { SystemCodeStore } = useStores();
  const { codeGroupList } = SystemCodeStore;

  return codeGroupList.map((data) => (<CodeGroup data={data} key={data.group} />));
};

export default memo(observer(CodeGroupList));
