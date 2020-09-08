import React, { memo } from 'react';
import {TabPane, Table, Row, Col} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import MailTable from './MailTable';
import useStores from '../../../stores/useStores';

const MailSent = () => {
  const { UserMailStore } = useStores();
  const { sentMailList } = UserMailStore;
  const MailSentData = sentMailList.map((v) => <MailTable data={v} key={v.id} />);

  return (
    <TabPane tabId="sent">
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-1 center">
                Read
              </ColCell>
              <ColCell className="col-5">
                쪽지 내용
              </ColCell>
              <ColCell className="col-2">
                받는 사람
              </ColCell>
              <ColCell className="col-3">
                보낸 시각
              </ColCell>
              <ColCell className="col-1 center">
                관리
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        {MailSentData.length === 0 ? (
          '보낸 쪽지가 없습니다.'
        ) : MailSentData}
      </Wrapper>
    </TabPane>
  );
};

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

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


export default memo(observer(MailSent));
