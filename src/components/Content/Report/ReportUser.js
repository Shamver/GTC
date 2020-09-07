import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Col, Row, TabPane } from 'reactstrap';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import ReportUserList from './ReportUserList';
import ReportPagination from './Pagination';

const ReportUser = ({ currentPage, noPagination }) => {
  const { UserStore, UtilLoadingStore, BoardReportStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { activeTab, currentReportMaxPage } = BoardReportStore;
  const { getUserBanned, banUserList } = UserStore;
  const BanUserList = banUserList.map(
    (v, index) => (<ReportUserList data={v} key={v.reportId} index={index} />),
  );

  useLayoutEffect(() => {
    loadingProcess([
      () => getUserBanned(currentPage),
    ]);
  }, [loadingProcess, getUserBanned, currentPage, activeTab]);

  return (
    <TabPane tabId="ReportUser">
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-1">
                유저ID
              </ColCell>
              <ColCell className="col-1">
                이름
              </ColCell>
              <ColCell className="col-2">
                닉네임
              </ColCell>
              <ColCell className="col-2">
                게임 닉네임
              </ColCell>
              <ColCell className="col-2">
                이메일
              </ColCell>
              <ColCell className="col-2">
                정지 기간
              </ColCell>
              <ColCell className="col-2">
                처리
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        {BanUserList}
      </Wrapper>
      {currentReportMaxPage !== 0
        ? (<ReportPagination currentPage={currentPage} noPagination={noPagination} />)
        : ''}
    </TabPane>
  );
};

ReportUser.propTypes = {
  currentPage: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

const Wrapper = styled.div`
  padding: 0px 1rem;
  border-bottom: 1px solid #dee2e6;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
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

export default memo(observer(ReportUser));
