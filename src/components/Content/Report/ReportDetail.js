import React, { memo } from 'react';
import styled from 'styled-components';
import {
  Button, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const ReportDetail = () => {
  const { BoardReportStore } = useStores();
  const { reportDetailToggle, toggleDetailReport, reportDetailData } = BoardReportStore;
  const {
    targetName, userId, reason, reasonDetail, reportDate,
  } = reportDetailData;

  return (
    <Modal isOpen={reportDetailToggle} toggle={toggleDetailReport}>
      <ModalHeaderBack toggle={toggleDetailReport}>
        <b>
          신고 상세
        </b>
      </ModalHeaderBack>
      <ModalBodyBox>
        <ReportInfoWrap>
          <ReportInfoRow>
            <ReportInfoLabel>신고 사유</ReportInfoLabel>
            <ReportInfoDesc>{reason}</ReportInfoDesc>
          </ReportInfoRow>
          <ReportInfoRow>
            <ReportInfoLabel>신고 날짜</ReportInfoLabel>
            <ReportInfoDesc>{reportDate}</ReportInfoDesc>
          </ReportInfoRow>
          <ReportInfoRow>
            <Flex1>
              <ReportInfoLabel>신고자</ReportInfoLabel>
              <ReportInfoDesc>{userId}</ReportInfoDesc>
            </Flex1>
            <Flex1>
              <ReportInfoLabel>피신고자</ReportInfoLabel>
              <ReportInfoDesc>{targetName}</ReportInfoDesc>
            </Flex1>
          </ReportInfoRow>
          <ReportInfoRow2>
            <ReportInfoLabel>게시물</ReportInfoLabel>
            <ReportInfoDesc>{}</ReportInfoDesc>
          </ReportInfoRow2>
          <ReportInfoRow2>
            <ReportInfoLabel>상세 사유</ReportInfoLabel>
            <ReportInfoDesc>{reasonDetail}</ReportInfoDesc>
          </ReportInfoRow2>
          <ReportInfoRow>
            <ButtonCustom color="danger" size="sm">
              영구 정지
            </ButtonCustom>
            <ButtonCustom color="secondary" size="sm">
              반려 처리
            </ButtonCustom>
          </ReportInfoRow>
        </ReportInfoWrap>
      </ModalBodyBox>
    </Modal>
  );
};

const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;

const ModalBodyBox = styled(ModalBody)`
  padding: 16px !important;
`;

const ReportInfoWrap = styled.div`
`;

const ReportInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-top: 30px !important;
    margin-bottom: 0 !important;
  }
`;

const ReportInfoRow2 = styled.div`
  margin-bottom: 10px;
`;

const ReportInfoLabel = styled.div`
  font-size: 14px;
  color: #f57c73;
  margin-right: 6px;
`;

const ReportInfoDesc = styled.div`
  font-size: 14px;
`;

const Flex1 = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ButtonCustom = styled(Button)`
  margin-right: 10px;
`;

export default memo(observer(ReportDetail));
