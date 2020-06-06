import React, { memo } from 'react';
import {
  Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const TermOfService = () => {
  const { UtilStore } = useStores();
  const {
    tosToggle, toggleTos,
  } = UtilStore;

  return (
    <Modal isOpen={tosToggle} toggle={toggleTos}>
      <ModalHeaderBack toggle={toggleTos}>
        이용약관
      </ModalHeaderBack>
      <ModalBodyBox>
        asd
      </ModalBodyBox>
    </Modal>
  );
};

const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;

const ModalBodyBox = styled(ModalBody)`
  padding: 1rem !important;
`;

export default memo(observer(TermOfService));
