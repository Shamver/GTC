import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ReportTable from './ReportTable';
import useStores from '../../../stores/useStores';

const Report = () => {
  const { BoardReportStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getReportList } = BoardReportStore;

  useLayoutEffect(() => {
    loadingProcess([
      getReportList,
    ]);
  }, [loadingProcess, getReportList]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <h3>신고 관리</h3>
        <ReportTableCol>
          <ReportTable />
        </ReportTableCol>
      </TableWrapper>
    </BoardWrapper>
  );
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
