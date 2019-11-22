import React from 'react';
import { observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import * as Proptypes from 'prop-types';
import useStores from '../../stores/useStores';

const Alert = () => {
  const { UtilStore } = useStores();
  return (
    <div>
      <Modal isOpen={UtilStore.alertToggle} toggle={UtilStore.toggleAlert}>
        <ModalHeader toggle={UtilStore.toggleAlert}>알림</ModalHeader>
        <ModalBody>
          {UtilStore.text}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={UtilStore.toggleAlert}>닫기</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Alert.propTypes = {
  UtilStore: Proptypes.shape({
    alertToggle: Proptypes.bool,
    text: Proptypes.string,
    toggleAlert: Proptypes.func,
  }),
};

Alert.defaultProps = {
  UtilStore: null,
};

export default observer(Alert);
