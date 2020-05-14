import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import AdvertiseRow from './AdvertiseRow';

const AdvertiseList = () => {
  const { EventAdvertiseStore } = useStores();
  const { AdvertisePostListNow } = EventAdvertiseStore;

  return AdvertisePostListNow.map((data) => (
    <AdvertiseRow key={data.id} data={data} />
  ));
};

export default observer(AdvertiseList);
