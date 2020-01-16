import React from 'react';
import { observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import * as Proptypes from 'prop-types';
import useStores from '../../stores/useStores';

const ConfirmAlert = () => {
  const { UtilAlertStore } = useStores();

  const {
    confirmAlertToggle, toggleConfirmAlert, text, callbackFunc,
  } = UtilAlertStore;

  return (
    <div>
      <Modal isOpen={confirmAlertToggle} toggle={toggleConfirmAlert}>
        <ModalHeader toggle={toggleConfirmAlert}>확인 요청</ModalHeader>
        <ModalBody>
          {
            text.split('\n').map((line) => (<span key={line}>{line}<br /></span>))
          }
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

ConfirmAlert.propTypes = {
  UtilStore: Proptypes.shape({
    confirmAlertToggle: Proptypes.bool,
    toggleConfirmAlert: Proptypes.func,
    text: Proptypes.string,
  }),
};

ConfirmAlert.defaultProps = {
  UtilStore: null,
};

export default observer(ConfirmAlert);
