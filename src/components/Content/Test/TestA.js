import React, { memo } from 'react';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const TestA = () => {
  const { UtilLoadingStore } = useStores();
  const { setTest, setTestB, testB } = UtilLoadingStore;
  return (
    <>
      <Button type="button" onClick={setTest}>
        test Plus
      </Button>
      <br />
      {testB}
      <Button type="button" onClick={setTestB}>
        testBPlus
      </Button>
    </>
  );
};

export default memo(observer(TestA));
