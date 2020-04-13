import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

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
        <tr>
          <BoldTd>비스트ㆍ3ㆍ</BoldTd>
          <td>
            <Link to="temp">
              평균티어 브론즈의 롤 합방!! 버틸 수 있으면 구경오쉴?
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const BoldTd = styled.td`
  font-weight : bold;
`;

export default WorkOnAdvertise;
