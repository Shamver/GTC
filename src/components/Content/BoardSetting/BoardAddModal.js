import React, { memo } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const BoardAddModal = () => {
  const { SystemBoardStore } = useStores();
  const { isBoardAddToggle, toggleBoardAdd } = SystemBoardStore;

  return (
    <Modal isOpen={isBoardAddToggle} toggle={toggleBoardAdd}>
      <ModalHeaderBack toggle={toggleBoardAdd}>게시판 추가</ModalHeaderBack>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur
        . Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleBoardAdd}>Do Something</Button>{' '}
        <Button color="secondary" onClick={toggleBoardAdd}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;


export default memo(observer(BoardAddModal));
