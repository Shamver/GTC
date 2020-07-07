import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { observer } from 'mobx-react';
import renderHTML from 'react-render-html';
import useStores from '../../../stores/useStores';

const ReportDetail = () => {
  const { BoardReportStore, UserStore } = useStores();
  const {
    reportDetailToggle, toggleDetailReport, reportDetailData, reportReject,
  } = BoardReportStore;
  const { userBanned } = UserStore;
  const {
    reportId, reportDate, userId, reason, reasonDetail, targetContentsLink,
    targetContents, typeCode, targetContentsId, targetUserName, targetUserId,
  } = reportDetailData;
  const ContentText = typeCode === 'RP02' ? renderHTML(`${targetContents}`) : targetContents;

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
              <ReportInfoDesc>{targetUserName}</ReportInfoDesc>
            </Flex1>
          </ReportInfoRow>
          <ReportInfoRow2>
            <ReportInfoLabel>{typeCode === 'RP01' ? '게시글' : '댓글'}</ReportInfoLabel>
            <ReportInfoLink to={typeCode === 'RP01' ? `/post/${targetContentsLink}` : `/post/${targetContentsLink}#${targetContentsId}`} onClick={toggleDetailReport}>
              {ContentText}
              <InlineLink>&gt;</InlineLink>
            </ReportInfoLink>
          </ReportInfoRow2>
          <ReportInfoRow2>
            <ReportInfoLabel>상세 사유</ReportInfoLabel>
            <ReportInfoDesc>{reasonDetail}</ReportInfoDesc>
          </ReportInfoRow2>
          <ReportInfoRow>
            <ButtonCustom color="danger" size="sm" onClick={() => userBanned(targetUserId, 'BAN')}>
              영구 정지
            </ButtonCustom>
            <ButtonCustom color="secondary" size="sm" onClick={() => reportReject(reportId)}>
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

const ReportInfoLink = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  display: block;
  color: #212529 !important;
  text-decoration: none !important;
  
  & :hover {
    opacity: 0.7;
    text-decoration: none !important;
  }
  
  & p {
    margin: 0 !important;
    display: inline !important;
  }
  
  & p:hover {
    text-decoration: none !important;
  }
`;

const Flex1 = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ButtonCustom = styled(Button)`
  margin-right: 10px;
`;

const InlineLink = styled.span`
  margin-left: 6px;
  font-size: 8px;
  color: #ffffff;
  background: #dc3545;
  padding: 2px 2px 1px 3px;
  border-radius: 23px;
  vertical-align: text-top;
  
`;

export default memo(observer(ReportDetail));
