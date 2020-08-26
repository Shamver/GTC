import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Table, TabPane } from 'reactstrap';
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
      <CodeTable bordered hover>
        <thead>
          <tr>
            <ThCenter width="7%">유저ID</ThCenter>
            <th width="15%">이름</th>
            <th width="15%">닉네임</th>
            <th width="15%">게임 닉네임</th>
            <th width="20%">이메일</th>
            <th width="15%">정지 기간</th>
            <th width="15%">처리</th>
          </tr>
        </thead>
        <tbody>
          {BanUserList}
        </tbody>
      </CodeTable>
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

const CodeTable = styled(Table)`
  & > tbody > tr {
    cursor : pointer;
  }
  
  & > tbody > tr > td {
    vertical-align: middle;
  }
`;

const ThCenter = styled.td`
  text-align: center;
  font-weight: 600;
`;

export default memo(observer(ReportUser));
