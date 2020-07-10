import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { Button } from 'reactstrap';
import useStores from '../../../stores/useStores';

const ReportUserList = ({ data }) => {
  const { UserStore } = useStores();
  const { userBanned } = UserStore;
  const {
    userId, userEmail, userName, userNickName, GTName, reportId
  } = data;

  return (
    <tr>
      <TdCenter>{reportId}</TdCenter>
      <td>{userName}</td>
      <td>{userNickName}</td>
      <td>{GTName}</td>
      <td>{userEmail}</td>
      <td>
        <Button color="danger" size="sm" onClick={() => userBanned(userId, 'CANCEL')}>
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
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const TdCenter = styled.td`
  text-align: center;
`;

export default memo(ReportUserList);
