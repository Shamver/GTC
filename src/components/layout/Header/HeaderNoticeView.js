import React, { useEffect } from 'react';
import {
  Badge,
} from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const HeaderNoticeView = () => {
  const { EventAdvertiseStore, ComponentHeaderStore } = useStores();

  const { AdvertisePostListNow } = EventAdvertiseStore;
  const {
    showIndex, showMode, doCycleAds, showingHeader,
  } = ComponentHeaderStore;

  useEffect(() => {
    const interval = doCycleAds();
    return () => clearInterval(interval);
  }, [AdvertisePostListNow, showIndex, showMode, doCycleAds, showingHeader]);

  return (
    <>
      { showMode === 0 ? (
        <>
          <Badge color="danger">공지사항</Badge>
          &nbsp;
          최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
          최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
        </>
      ) : (
        <>
          <Badge color="primary">광고</Badge>
          &nbsp;
          { showingHeader ? showingHeader.message : '' }
        </>
      )}
    </>
  );
};

export default observer(HeaderNoticeView);
