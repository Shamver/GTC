import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { Button } from 'reactstrap';
import useStores from '../../../stores/useStores';

const ReportUserList = ({ data }) => {
  const { UserStore, BoardReportStore } = useStores();
  const { getDetailReport } = BoardReportStore;
  const { userBanCancel } = UserStore;
  const {
    userId, userEmail, userName, userNickName, GTName, banTerm, banDate, reportId, suspendBanFl,
  } = data;
  return (
    <tr onClick={() => getDetailReport(reportId)}>
      <TdCenter>{userId}</TdCenter>
      <td>{userName}</td>
      <td>{userNickName}</td>
      <td>{GTName}</td>
      <td>{userEmail}</td>
      <td>{suspendBanFl ? '영구 정지' : `${banDate} ~ ${banTerm}`} </td>
      <td>
        <Button color="danger" size="sm" onClick={(e) => { userBanCancel(userId); e.stopPropagation(); }}>
          정지 해제
        </Button>
      </td>
    </tr>
  );
};

ReportUserList.propTypes = {
  data: Proptypes.shape({
    reportId: Proptypes.number,
    userId: Proptypes.number,
    userEmail: Proptypes.string,
    userName: Proptypes.string,
    userNickName: Proptypes.string,
    GTName: Proptypes.string,
    banTerm: Proptypes.string,
    banDate: Proptypes.string,
    suspendBanFl: Proptypes.number,
  }).isRequired,
};

const TdCenter = styled.td`
  text-align: center;
`;

export default memo(ReportUserList);
