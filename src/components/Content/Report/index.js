import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import ReportTabContent from './ReportTabContent';
import ReportNav from './ReportNav';
import ReportPagination from './Pagination';

const Report = ({ match, parentProps }) => {
  const { BoardReportStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getReportList } = BoardReportStore;
  const { params } = match;
  let { noPagination } = parentProps;
  let { currentPage } = params;
  noPagination = noPagination !== undefined;
  currentPage = currentPage || '1';

  useLayoutEffect(() => {
    loadingProcess([
      () => getReportList(currentPage),
    ]);
  }, [loadingProcess, getReportList, currentPage]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <h3>신고 관리</h3>
        <ReportTableCol>
          <ReportNav />
          <ReportTabContent />
          <ReportPagination currentPage={currentPage} noPagination={noPagination} />
        </ReportTableCol>
      </TableWrapper>
    </BoardWrapper>
  );
};

Report.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      currentPage: Proptypes.string,
    }).isRequired,
  }).isRequired,
  parentProps: Proptypes.shape({
    noPagination: Proptypes.bool,
  }).isRequired,
};

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const ReportTableCol = styled.div`
  width : 100%;
`;

export default memo(observer(Report));
