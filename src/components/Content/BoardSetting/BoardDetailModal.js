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
    isBoardAddToggle, toggleBoardAdd, board, useFlagList,
    permissionLevelList, setPermissionLevelList, setUseFlagList,
  } = SystemBoardStore;
  const {
    id, name, desc, path,
    order, useFl, permissionLevel,
  } = board;

  return (
    <Modal isOpen={isBoardAddToggle} toggle={toggleBoardAdd}>
      <ModalHeaderBack toggle={toggleBoardAdd}>게시판 추가</ModalHeaderBack>
      <ModalBody>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>게시판</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="게시판" />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>이름</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="이름" />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>경로</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="경로" />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>순서</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="순서" />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>사용 여부</InputGroupText>
          </InputGroupAddon>
          <Input type="select" placeholder="사용 여부">
            <CodeOptionList codeGroup="YN_FLAG" array={useFlagList} setArrayMethod={setUseFlagList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>권한 레벨</InputGroupText>
          </InputGroupAddon>
          <Input type="select" placeholder="권한 레벨">
            <CodeOptionList codeGroup="PERMISSION_LEVEL" array={permissionLevelList} setArrayMethod={setPermissionLevelList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>설명</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="설명" />
        </InputGroupMb>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggleBoardAdd}>추가</Button>{' '}
        <Button color="danger" onClick={toggleBoardAdd}>수정</Button>{' '}
        <Button color="warning" onClick={toggleBoardAdd}>삭제</Button>{' '}
        <Button color="secondary" onClick={toggleBoardAdd}>취소</Button>
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
