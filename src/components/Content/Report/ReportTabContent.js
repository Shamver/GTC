import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import ReportTable from './ReportTable';
import ReportResult from './ReportResult';
import ReportUser from './ReportUser';
import ReportPagination from './Pagination';

const ReportTabContent = () => {
  const { BoardReportStore } = useStores();
  const { activeTab } = BoardReportStore;

  return (
    <>
      <TabContent activeTab={activeTab}>
        <ReportTable />
        <ReportResult />
        <ReportUser />
      </TabContent>
    </>
  );
};

export default memo(observer(ReportTabContent));
