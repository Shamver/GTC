import React, { memo } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import CodeOptionList from '../../util/CodeOptionList';

const BoardDetailModal = () => {
  const { SystemBoardStore } = useStores();
  const {
    isBoardModalToggle, toggleBoardModal, board, useFlagList,
    permissionLevelList, setPermissionLevelList, setUseFlagList,
    onChangeBoard, addBoard, boardModalMode, modifyBoard,
    deleteBoard,
  } = SystemBoardStore;

  const {
    id, name, desc, path,
    order, useFl, permissionLevel,
  } = board;

  return (
    <Modal isOpen={isBoardModalToggle} toggle={toggleBoardModal}>
      <ModalHeaderBack toggle={toggleBoardModal}>게시판 추가</ModalHeaderBack>
      <ModalBody>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>게시판</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="게시판" name="id" onChange={onChangeBoard} value={id} disabled={boardModalMode === 'modify'} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>이름</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="이름" name="name" onChange={onChangeBoard} value={name} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>경로</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="경로" name="path" onChange={onChangeBoard} value={path} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>순서</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="순서" name="order" onChange={onChangeBoard} value={order} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>사용 여부</InputGroupText>
          </InputGroupAddon>
          <Input type="select" placeholder="사용 여부" name="useFl" onChange={onChangeBoard} value={useFl}>
            <CodeOptionList codeGroup="YN_FLAG" array={useFlagList} setArrayMethod={setUseFlagList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>권한 레벨</InputGroupText>
          </InputGroupAddon>
          <Input type="select" placeholder="권한 레벨" name="permissionLevel" onChange={onChangeBoard} value={permissionLevel}>
            <CodeOptionList codeGroup="PERMISSION_LEVEL" array={permissionLevelList} setArrayMethod={setPermissionLevelList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>설명</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="설명" name="desc" onChange={onChangeBoard} value={desc} />
        </InputGroupMb>
      </ModalBody>
      <ModalFooter>
        {boardModalMode === 'modify'
          ? (
            <>
              <Button color="danger" onClick={modifyBoard}>수정</Button>{' '}
              <Button color="warning" onClick={() => deleteBoard(id)}>삭제</Button>{' '}
            </>
          ) : (<Button color="danger" onClick={addBoard}>추가</Button>)}
        <Button color="secondary" onClick={toggleBoardModal}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

const InputGroupMb = styled(InputGroup)`
  margin-bottom: 10px;
`;

const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;


export default memo(observer(BoardDetailModal));
