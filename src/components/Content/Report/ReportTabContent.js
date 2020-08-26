import React, { memo, useLayoutEffect } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import ReportTable from './ReportTable';
import ReportResult from './ReportResult';
import ReportUser from './ReportUser';

const ReportTabContent = ({ currentPage, noPagination }) => {
  const { BoardReportStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const {
    getReportList, activeTab,
  } = BoardReportStore;

  useLayoutEffect(() => {
    loadingProcess([
      () => getReportList(currentPage),
    ]);
  }, [loadingProcess, getReportList, currentPage, activeTab]);

  return (
    <>
      <TabContent activeTab={activeTab}>
        <ReportTable currentPage={currentPage} noPagination={noPagination} />
        <ReportResult currentPage={currentPage} noPagination={noPagination} />
        <ReportUser currentPage={currentPage} noPagination={noPagination} />
      </TabContent>
    </>
  );
};

ReportTabContent.propTypes = {
  currentPage: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(ReportTabContent));
