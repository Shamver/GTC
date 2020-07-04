import React, { useLayoutEffect } from 'react';
import useStores from '../../../stores/useStores';

const SuspenseLoading = () => {
  const { UtilLoadingStore } = useStores();
  const { startLoading } = UtilLoadingStore;
  useLayoutEffect(() => {
    startLoading();
  });

  return (<></>);
};

export default SuspenseLoading;
