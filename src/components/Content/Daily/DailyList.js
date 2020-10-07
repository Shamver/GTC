import React, { memo } from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import { observer } from 'mobx-react';
import DailyListRow from './DailyListRow';
import useStores from '../../../stores/useStores';

const DailyList = () => {
  const { EventDailyStore } = useStores();
  const { dailyList } = EventDailyStore;

  const DailyListData = dailyList.map(
    (v, index) => <DailyListRow data={v} index={index} key={v.id} />,
  );

  return (
    <>
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-1 center">
                #
              </ColCell>
              <ColCell className="col-4">
                한마디
              </ColCell>
              <ColCell className="col-2">
                닉네임
              </ColCell>
              <ColCell className="col-2">
                포인트
              </ColCell>
              <ColCell className="col-1">
                콤보
              </ColCell>
              <ColCell className="col-2">
                시간
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        {DailyListData.length === 0 ? (
          <TableBody>
            <div className="responsive-wrap center">
              <ColCell className="col-2 center">
                출석체크한 유저가 없습니다.
              </ColCell>
            </div>
          </TableBody>
        ) : DailyListData}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 0px 1rem;
  border-bottom: 1px solid #dee2e6;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  & .center {
    text-align: center;
  }
  
  @media (max-width: 740px) {
    & .content-header {
      display: none;
    }
    
    & .content-body {
      display: block;
    }
    
    .col {
      max-width: 100%;
    }
  }
`;

const TableHeader = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
`;

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(observer(DailyList));
