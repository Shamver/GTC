import React from 'react';
import { Table } from 'reactstrap';
import AdvertiseList from './AdvertiseList';

const WorkOnAdvertise = () => (
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

export default WorkOnAdvertise;
