import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import * as Proptypes from 'prop-types';

const Alert = ({ UtilStore }) => (
  <div>
    <Modal isOpen={UtilStore.alertToggle} toggle={() => { UtilStore.toggleAlert(''); }}>
      <ModalHeader toggle={() => { UtilStore.toggleAlert(''); }}>알림</ModalHeader>
      <ModalBody>
        {UtilStore.text}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => { UtilStore.toggleAlert(''); }}>닫기</Button>
      </ModalFooter>
    </Modal>
  </div>
);

Alert.propTypes = {
  UtilStore: Proptypes.shape({
    alertToggle: Proptypes.bool,
    toggleAlert: Proptypes.func,
    text: Proptypes.string,
  }),
};

Alert.defaultProps = {
  UtilStore: null,
};

export default inject('UtilStore')(observer(Alert));
