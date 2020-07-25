import React, { memo } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const PrivacyPolicy = () => {
  const { UtilStore } = useStores();
  const {
    privacyToggle, togglePrivacy,
  } = UtilStore;

  return (
    <Modal isOpen={privacyToggle} toggle={togglePrivacy}>
      <ModalHeaderBack toggle={togglePrivacy}>
        개인정보보호방침
      </ModalHeaderBack>
      <ModalBodyBox>
        test
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

export default memo(observer(PrivacyPolicy));
