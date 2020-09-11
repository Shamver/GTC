import React, { memo } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import AdvertiseRow from './AdvertiseRow';
import styled from "styled-components";
import {Col, Row} from "reactstrap";

const AdvertiseList = () => {
  const { EventAdvertiseStore } = useStores();
  const { advertisePostListNow } = EventAdvertiseStore;

  if (advertisePostListNow.length === 0) {
    return (
      <TableBody>
        <div className="center">
          <ColCell className="col-12">
            현재 광고중인 게시글이 없습니다.
          </ColCell>
        </div>
      </TableBody>
    );
  }

  return advertisePostListNow.map((data) => (
    <AdvertiseRow key={data.id} data={data} />
  ));
};


const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  align-items: center;
  font-size: 14px;
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
`;

export default memo(observer(AdvertiseList));
