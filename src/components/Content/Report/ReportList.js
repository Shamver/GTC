import React, { memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import { Col, Row } from 'reactstrap';
import useStores from '../../../stores/useStores';

const ReportList = ({ data }) => {
  const { BoardReportStore } = useStores();
  const { getDetailReport } = BoardReportStore;
  const {
    userId, reason, reportId, reportDate, targetName, contents,
  } = data;

  return (
    <TableBody onClick={() => getDetailReport(reportId)}>
      <div className="responsive-wrap">
        <ColCell className="col-1 id">
          {reportId}
        </ColCell>
        <ColCell className="col-3 reason">
          {reason}
        </ColCell>
        <ColCell className="col-2 contents">
          {contents}
        </ColCell>
      </div>
      <div className="responsive-wrap info">
        <ColCell className="col-2 user-name">
          {userId}
        </ColCell>
        <ColCell className="col-2 target-name">
          {targetName}
        </ColCell>
        <ColCell className="col-2 date">
          {reportDate}
        </ColCell>
      </div>
    </TableBody>
  );
};

ReportList.propTypes = {
  data: Proptypes.shape({
    reportId: Proptypes.number,
    userId: Proptypes.string,
    reason: Proptypes.string,
    reasonDetail: Proptypes.string,
    reportDate: Proptypes.string,
    targetName: Proptypes.string,
    contents: Proptypes.string,
  }).isRequired,
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .responsive-wrap {
    display: contents;
  }
  
  @media (max-width: 740px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 32px;
      font-size: 14px;
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
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(observer(ReportList));
