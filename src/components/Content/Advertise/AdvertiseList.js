import React from 'react';
import useStores from '../../../stores/useStores';
import AdvertiseRow from './AdvertiseRow';
import { observer } from 'mobx-react';

const AdvertiseList = () => {
  const { EventAdvertiseStore } = useStores();
  const { AdvertisePostList } = EventAdvertiseStore;

  return AdvertisePostList.map((data) => (
    <AdvertiseRow key={data.id} data={data} />
  ));
};

export default observer(AdvertiseList);
