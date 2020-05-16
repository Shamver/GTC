import React, { useEffect } from 'react';
import {
  Badge,
} from 'reactstrap';
import useStores from '../../../stores/useStores';

const HeaderNoticeView = () => {
  const { EventAdvertiseStore } = useStores();

  const { AdvertisePostListNow } = EventAdvertiseStore;

  useEffect(() => {
    const interval = setInterval(() => {
      // 5초마다 싸이클로 돌리기
      console.log(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [AdvertisePostListNow]);

  return (
    <>
      <Badge color="danger">공지사항</Badge>
      &nbsp;
      최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
      최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
    </>
  );
};

export default HeaderNoticeView;
