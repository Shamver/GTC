import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import TestA from './TestA';

const Test = () => {
  const { UtilLoadingStore } = useStores();
  const { test } = UtilLoadingStore;
  console.log('Test 렌더링');
  return (
    <>
      Test
      <br />
      {test}
      <br />
      <TestA />
    </>
  );
};

export default observer(Test);
