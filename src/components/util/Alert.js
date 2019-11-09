import React from 'react';
import { inject } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const Alert = ({ UtilStore }) => (
  <div>
    <Button color="danger" onClick={UtilStore.ToggleAlert}>안녕</Button>
    <Modal isOpen={UtilStore.alertToggle} toggle={UtilStore.ToggleAlert}>
      <ModalHeader toggle={UtilStore.ToggleAlert}>Modal title</ModalHeader>
      <ModalBody>
        안녕하세요.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={UtilStore.ToggleAlert}>Do Something</Button>{' '}
        <Button color="secondary" onClick={UtilStore.ToggleAlert}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);

export default inject('UtilStore')(Alert);
