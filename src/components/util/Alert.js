import React from 'react';
import { observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import renderHTML from 'react-render-html';
import useStores from '../../stores/useStores';

const Alert = () => {
  const { UtilAlertStore } = useStores();
  const { alertToggle, toggleAlert, text } = UtilAlertStore;
  return (
    <div>
      <Modal isOpen={alertToggle} toggle={toggleAlert}>
        <ModalHeader toggle={toggleAlert}>알림</ModalHeader>
        <ModalBody>
          {renderHTML(text)}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleAlert}>닫기</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default observer(Alert);
