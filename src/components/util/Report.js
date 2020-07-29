import React, { memo } from 'react';
import { observer } from 'mobx-react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  FormGroup, CustomInput, Table, Input,
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

const Report = () => {
  const { BoardReportStore, SystemCodeStore } = useStores();
  const {
    reportToggle, toggleReport, reportData, report, onChangeValue,
  } = BoardReportStore;
  const { setCodeList } = SystemCodeStore;
  const {
    content, writer, description, type,
  } = reportData;

  const reportCode = setCodeList.map((data) => (
    <CustomInput type="radio" id={data.CODE} key={data.CODE} value={data.CODE} onChange={onChangeValue} name="reason" label={data.NAME} />
  ));

  return (
    <ModalW630 isOpen={reportToggle} toggle={toggleReport}>
      <ModalHeaderBack toggle={toggleReport}><b>신고하기</b></ModalHeaderBack>
      <ModalBodyNoPadding>
        <Table bordered size="sm">
          <tbody>
            <tr>
              <th width="100">작성자</th>
              <td>{writer}</td>
            </tr>
            <tr>
              <th>{type === 'RP01' ? '제목' : '댓글'}</th>
              <td>{content}</td>
            </tr>
          </tbody>
        </Table>
        <h5>신고사유 선택</h5>
        <FormGroup>
          <div>
            {reportCode}
          </div>
        </FormGroup>
        <Input type="textarea" onChange={onChangeValue} value={description} name="description" placeholder="신고 사유 설명이 필요하신 경우 작성해주세요." />
        <ReportDescription>
          다수의 신고를 받은 게시물은 숨김처리 될 수 있으며, 해당 글의 작성자는 사이트 이용제한 조치를 받을 수 있습니다.
          신고 결과에 대해 별도의 통지/안내를 하지 않으니 이 점 양지하여 주시기 바랍니다.
        </ReportDescription>
      </ModalBodyNoPadding>
      <ModalFooter>
        <Button onClick={toggleReport}>닫기</Button>
        <Button onClick={report} color="info">신고하기</Button>
      </ModalFooter>
    </ModalW630>
  );
};

const ModalW630 = styled(Modal)`
  max-width : 630px !important;
`;

const ReportDescription = styled.span`
  font-size : 12px;
  color: #999;
`;

const ModalBodyNoPadding = styled(ModalBody)`
  background-color : white !important
`;

const ModalHeaderBack = styled(ModalHeader)`
  background-color : white !important;
  border-bottom: 4px solid #DC3545 !important;
`;

export default memo(observer(Report));
