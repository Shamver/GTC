import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button, Input, Modal, ModalBody, ModalHeader, FormGroup, Label,
} from 'reactstrap';
import { observer } from 'mobx-react';
import renderHTML from 'react-render-html';
import useStores from '../../../stores/useStores';

const ReportDetail = () => {
  const { BoardReportStore, UserStore } = useStores();
  const { detailBanData } = UserStore;
  const {
    tookReason, tookBanTerm, tookDate, suspendBanFl,
  } = detailBanData;
  const {
    reportDetailToggle, toggleDetailReport, reportDetailData, reportTakeOn,
    reportReject, onChangeDetailValue, reportTakeOnData, activeTab,
  } = BoardReportStore;
  const { takeReason, banType, banTerm } = reportTakeOnData;
  const {
    reportId, reportDate, userId, reason, reasonDetail, targetContentsLink,
    targetContents, typeCode, targetContentsId, targetUserName,
  } = reportDetailData;
  const ContentText = typeCode === 'RT02' ? renderHTML(`${targetContents}`) : targetContents;

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
          {activeTab === 'ReportUser'
            ? (
              <>
                <ReportInfoRow>
                  <ReportInfoLabel>처리 날짜</ReportInfoLabel>
                  <ReportInfoDesc>{tookDate}</ReportInfoDesc>
                </ReportInfoRow>
                <ReportInfoRow>
                  <ReportInfoLabel>정지 기간</ReportInfoLabel>
                  <ReportInfoDesc>{suspendBanFl ? '영구 정지' : `${tookDate} ~ ${tookBanTerm}`}</ReportInfoDesc>
                </ReportInfoRow>
              </>
            )
            : ''}
          {typeCode === 'RT03' ? ''
            : (
              <ReportInfoRow2>
                <ReportInfoLabel>{typeCode === 'RT01' ? '게시글' : '댓글'}</ReportInfoLabel>
                <ReportInfoLink to={typeCode === 'RT01' ? `/post/${targetContentsLink}` : `/post/${targetContentsLink}#${targetContentsId}`} onClick={toggleDetailReport}>
                  {ContentText}
                  <InlineLink>&gt;</InlineLink>
                </ReportInfoLink>
              </ReportInfoRow2>
            )}
          {reasonDetail
            ? (
              <ReportInfoRow2>
                <ReportInfoLabel>상세 사유</ReportInfoLabel>
                <ReportInfoDesc>{reasonDetail}</ReportInfoDesc>
              </ReportInfoRow2>
            )
            : ''}

          { activeTab === 'reportTable'
            ? (
              <>
                <ReportInfoRow2>
                  <ReportInfoLabel>처벌 사유 입력</ReportInfoLabel>
                  <ReportInfoDesc>
                    <Input type="textarea" onChange={onChangeDetailValue} value={takeReason} name="takeReason" placeholder="정지 사유 입력" maxLength="200" />
                  </ReportInfoDesc>
                </ReportInfoRow2>
                <ReportInfoRow2>
                  <ReportInfoLabel>처벌 종류 선택</ReportInfoLabel>
                  <ReportInfoDesc>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="banType" value="BAN" onChange={onChangeDetailValue} />{' '}
                        영구 정지
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="banType" value="BAN2" onChange={onChangeDetailValue} />{' '}
                        기간 정지
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="date"
                        name="banTerm"
                        value={banTerm}
                        disabled={banType !== 'BAN2'}
                        onChange={onChangeDetailValue}
                      />
                    </FormGroup>
                  </ReportInfoDesc>
                </ReportInfoRow2>
              </>
            ) : (
              <ReportInfoRow2>
                <ReportInfoLabel>정지 사유</ReportInfoLabel>
                <ReportInfoDesc>
                  {tookReason}
                </ReportInfoDesc>
              </ReportInfoRow2>
            )}
          { activeTab === 'reportTable'
            ? (
              <ReportInfoRow>
                <ButtonCustom color="danger" size="sm" onClick={() => reportTakeOn(banType)}>
                  처리
                </ButtonCustom>
                <ButtonCustom color="secondary" size="sm" onClick={() => reportReject(reportId)}>
                  반려
                </ButtonCustom>
              </ReportInfoRow>
            ) : ''}
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
  
  &  > div {
    margin-bottom: 5px;
  }
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