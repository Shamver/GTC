import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

const Report = () => {
  const { BoardReportStore } = useStores();
  const { reportToggle, toggleReport } = BoardReportStore;

  return (
    <Modal isOpen={reportToggle} toggle={toggleReport}>
      <ModalHeaderBack toggle={toggleReport}><b>신고하기</b></ModalHeaderBack>
      <ModalBodyNoPadding>
        신고사유 선택
        욕설/비하
        음란성
        게시글/댓글 도배
        홍보성 콘텐츠
        타인의 개인정보 유포
        허위사실 유포
        명예훼손 관련
        기타 <br />
        <textArea />
        다수의 신고를 받은 게시물은 숨김처리 될 수 있으며, 해당 글의 작성자는 사이트 이용제한 조치를 받을 수 있습니다. 신고 결과에 대해 별도의 통지/안내를 하지 않으니 이 점 양지하여 주시기 바랍니다.
      </ModalBodyNoPadding>
      <ModalFooter>
        <Button >닫기</Button>
        <Button color="info">신고하기</Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalBodyNoPadding = styled(ModalBody)`
  background-color : white !important
  height : 400px;
`;

const ModalHeaderBack = styled(ModalHeader)`
  background-color : white !important;
  border-bottom: 4px solid #DC3545 !important;
`;

export default observer(Report);
