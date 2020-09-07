import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import useStores from '../../../stores/useStores';

const ReportUserList = ({ data }) => {
  const { UserStore, BoardReportStore } = useStores();
  const { getDetailReport } = BoardReportStore;
  const { userBanCancel } = UserStore;
  const {
    userId, userEmail, userName, userNickName, GTName, banTerm, banDate, reportId, suspendBanFl,
  } = data;
  return (
    <TableBody onClick={() => getDetailReport(reportId)}>
      <div className="responsive-wrap-column">
        <div className="responsive-wrap">
          <ColCell className="col-1 id">
            {userId}
          </ColCell>
          <ColCell className="col-1">
            {userName}
          </ColCell>
          <ColCell className="col-2">
            {userNickName}
          </ColCell>
        </div>
        <div className="responsive-wrap info">
          <ColCell className="col-2">
            {GTName}
          </ColCell>
          <ColCell className="col-2">
            {userEmail}
          </ColCell>
          <ColCell className="col-2 result">
            {suspendBanFl ? '영구 정지' : `${banDate} ~ ${banTerm}`}
          </ColCell>
        </div>
      </div>
      <div className="responsive-wrap">
        <ColCell className="col-2">
          <Button color="danger" size="sm" onClick={(e) => { userBanCancel(userId); e.stopPropagation(); }}>
            정지 해제
          </Button>
        </ColCell>
      </div>
    </TableBody>
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

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  @media (max-width: 740px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 32px;
      font-size: 14px;
      flex: 1;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 3;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
    }
    
    .id {    
      font-size: 16px;
      color: #dc3545;
      font-weight: 600;
    }
    
    .contents {        
      color: #5a7989;
      font-size: 12px;
    }
    
    .info {
      color: #989898;
      font-size: 13px;
      line-height: 24px;
    }
    
    .result {
      color: #dc3545;
      font-weight: 600;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(ReportUserList);
