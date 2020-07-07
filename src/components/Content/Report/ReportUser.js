import React, { memo, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { Table, TabPane } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import ReportUserList from './ReportUserList';

const ReportUser = () => {
  const { UserStore, UtilLoadingStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getUserBanned, banUserList } = UserStore;
  const BanUserList = banUserList.map(
    (v, index) => (<ReportUserList data={v} key={v.userId} index={index} />),
  );

  useEffect(() => {
    loadingProcess([
      getUserBanned,
    ]);
    getUserBanned();
  }, [getUserBanned, loadingProcess]);

  return (
    <TabPane tabId="ReportUser">
      <CodeTable bordered hover>
        <thead>
          <tr>
            <ThCenter width="6%">순서</ThCenter>
            <th>이름</th>
            <th>닉네임</th>
            <th>그로우토피아 닉네임</th>
            <th>이메일</th>
            <th>처리</th>
          </tr>
        </thead>
        <tbody>
          {BanUserList}
        </tbody>
      </CodeTable>
    </TabPane>
  );
};

const CodeTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: middle;
  }
`;

const ThCenter = styled.td`
  text-align: center;
`;

export default memo(observer(ReportUser));
