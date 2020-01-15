import React from 'react';
import { observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import renderHTML from 'react-render-html';
import useStores from '../../stores/useStores';

const ConfirmAlert = () => {
  const { UtilStore } = useStores();
  const {
    callbackFunc, toggleConfirmAlert, confirmAlertToggle, text,
  } = UtilStore;
  return (
    <div>
      <Modal isOpen={confirmAlertToggle} toggle={toggleConfirmAlert}>
        <ModalHeader toggle={toggleConfirmAlert}>확인 요청</ModalHeader>
        <ModalBody>
          {renderHTML(text)}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              callbackFunc();
              toggleConfirmAlert();
            }}
          >네
          </Button>
          <Button color="secondary" onClick={toggleConfirmAlert}>아니오</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default observer(ConfirmAlert);
