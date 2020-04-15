import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import useStores from '../../../stores/useStores';
import AdvertiseList from './AdvertiseList';

const WorkOnAdvertise = () => {
  const { EventAdvertiseStore } = useStores();
  const { getAdPostList } = EventAdvertiseStore;

  useEffect(() => {
    getAdPostList();
  }, [getAdPostList]);

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>닉네임</th>
          <th>메시지</th>
        </tr>
      </thead>
      <tbody>
        <AdvertiseList />
      </tbody>
    </Table>
  );
};

export default WorkOnAdvertise;
