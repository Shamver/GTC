import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import CodeGroup from './CodeGroup';

const CodeGroupList = () => {
  const { SystemCodeStore } = useStores();
  const { getCodeGroupList, codeGroupList } = SystemCodeStore;
  useEffect(() => {
    getCodeGroupList();
  }, [getCodeGroupList]);

  return codeGroupList.map((data) => (<CodeGroup data={data} key={data.group} />));
};

export default observer(CodeGroupList);
