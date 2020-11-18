import React, { memo } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import CodeOptionList from '../../util/CodeOptionList';

const MenuDetailModal = () => {
  const { SystemMenuStore } = useStores();
  const {
    isMenuModalToggle, toggleMenuModal, menu, useFlagList,
    permissionLevelList, setPermissionLevelList, setUseFlagList,
    onChangeMenu, addMenu, menuModalMode, modifyMenu,
    deleteMenu, menuIcon, setMenuIcon,
    menuTypeList, setMenuTypeList,
  } = SystemMenuStore;

  const {
    id, desc, path, icon, name, type,
    order, useFl, permissionLevel,
  } = menu;

  return (
    <Modal isOpen={isMenuModalToggle} toggle={toggleMenuModal}>
      <ModalHeaderBack toggle={toggleMenuModal}>
        {menuModalMode === 'modify' ? '메뉴 상세' : '메뉴 추가'}
      </ModalHeaderBack>
      <ModalBody>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>ID</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="ID" name="id" onChange={onChangeMenu} value={id} disabled={menuModalMode === 'modify'} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>이름</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="이름" name="name" onChange={onChangeMenu} value={name} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>경로</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="경로" name="path" onChange={onChangeMenu} value={path} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>종류</InputGroupText>
          </InputGroupAddon>
          <Input type="select" name="type" onChange={onChangeMenu} value={type}>
            <CodeOptionList codeGroup="MENU_TYPE" array={menuTypeList} setArrayMethod={setMenuTypeList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>아이콘</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="아이콘" name="icon" onChange={onChangeMenu} value={icon} />
          <AppendButton addonType="append" onClick={setMenuIcon}>
            <InputGroupText>
              미리보기
              { !!menuIcon && (<LeftMarginIcon icon={menuIcon} />)}
            </InputGroupText>
          </AppendButton>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>순서</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="순서" name="order" onChange={onChangeMenu} value={order} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>사용 여부</InputGroupText>
          </InputGroupAddon>
          <Input type="select" name="useFl" onChange={onChangeMenu} value={useFl}>
            <CodeOptionList codeGroup="YN_FLAG" array={useFlagList} setArrayMethod={setUseFlagList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>권한 레벨</InputGroupText>
          </InputGroupAddon>
          <Input type="select" placeholder="권한 레벨" name="permissionLevel" onChange={onChangeMenu} value={permissionLevel}>
            <CodeOptionList codeGroup="PERMISSION_LEVEL" array={permissionLevelList} setArrayMethod={setPermissionLevelList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>설명</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="설명" name="desc" onChange={onChangeMenu} value={desc} />
        </InputGroupMb>
      </ModalBody>
      <ModalFooter>
        {menuModalMode === 'modify'
          ? (
            <>
              <Button color="danger" onClick={modifyMenu}>수정</Button>{' '}
              <Button color="warning" onClick={deleteMenu}>삭제</Button>{' '}
            </>
          ) : (<Button color="danger" onClick={addMenu}>추가</Button>)}
        <Button color="secondary" onClick={toggleMenuModal}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

const LeftMarginIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;

const AppendButton = styled(InputGroupAddon)`
  cursor: pointer;
`;

const InputGroupMb = styled(InputGroup)`
  margin-bottom: 10px;
`;

const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;


export default memo(observer(MenuDetailModal));
