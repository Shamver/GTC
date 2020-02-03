import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  FormGroup, CustomInput, Table, Input,
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

const Report = () => {
  const { BoardReportStore } = useStores();
  const {
    reportToggle, toggleReport, reportData, onChangeValue, report,
  } = BoardReportStore;
  const {
    content, writer, description, type,
  } = reportData;


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
            <CustomInput type="radio" id="RR01" value="RR01" onChange={onChangeValue} name="reason" label="욕설/비하" />
            <CustomInput type="radio" id="RR02" value="RR02" onChange={onChangeValue} name="reason" label="음란성" />
            <CustomInput type="radio" id="RR03" value="RR03" onChange={onChangeValue} name="reason" label="게시글/댓글 도배" />
            <CustomInput type="radio" id="RR04" value="RR04" onChange={onChangeValue} name="reason" label="홍보성 콘텐츠" />
            <CustomInput type="radio" id="RR05" value="RR05" onChange={onChangeValue} name="reason" label="타인의 개인정보 유포" />
            <CustomInput type="radio" id="RR06" value="RR06" onChange={onChangeValue} name="reason" label="허위사실 유포" />
            <CustomInput type="radio" id="RR07" value="RR07" onChange={onChangeValue} name="reason" label="명예훼손 관련" />
            <CustomInput type="radio" id="RR08" value="RR08" onChange={onChangeValue} name="reason" label="기타" />
          </div>
        </FormGroup>
        <Input type="textarea" name="text" onChange={onChangeValue} value={description} name="description" placeholder="신고 사유 설명이 필요하신 경우 작성해주세요." />
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

export default observer(Report);
