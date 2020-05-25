import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import AdvertiseRow from './AdvertiseRow';

const AdvertiseList = () => {
  const { EventAdvertiseStore } = useStores();
  const { AdvertisePostListNow } = EventAdvertiseStore;

  if (AdvertisePostListNow.length === 0) {
    return (
      <tr>
        <td colSpan="2">현재 광고중인 게시글이 없습니다.</td>
      </tr>
    );
  }

  return AdvertisePostListNow.map((data) => (
    <AdvertiseRow key={data.id} data={data} />
  ));
};

export default memo(observer(AdvertiseList));
