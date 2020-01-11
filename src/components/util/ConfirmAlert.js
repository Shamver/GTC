import React from 'react';
import { observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import * as Proptypes from 'prop-types';
import useStores from '../../Stores/useStores';

const ConfirmAlert = () => {
  const { UtilStore } = useStores();
  return (
    <div>
      <Modal isOpen={UtilStore.confirmAlertToggle} toggle={UtilStore.toggleConfirmAlert}>
        <ModalHeader toggle={UtilStore.toggleConfirmAlert}>확인 요청</ModalHeader>
        <ModalBody>
          {
            UtilStore.text.split('\n').map((line) => (<span key={line}>{line}<br /></span>))
          }
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              UtilStore.callbackFunc();
              UtilStore.toggleConfirmAlert();
            }}
          >네
          </Button>
          <Button color="secondary" onClick={UtilStore.toggleConfirmAlert}>아니오</Button>
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
