import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import TestA from './TestA';

const Test = () => {
  const { UtilLoadingStore } = useStores();
  const { test, startLoading, stopLoading } = UtilLoadingStore;

  useEffect(() => {
    console.log('render 완료!');
    stopLoading();
  }, []);

  useLayoutEffect(() => {
    startLoading();
  }, []);

  console.log('Test 렌더링 시작!');

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
