import React, { memo } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import CodeOptionList from '../../util/CodeOptionList';

const MenuCategoryDetailModal = () => {
  const { SystemMenuStore } = useStores();
  const {
    isCategoryModalToggle, toggleCategoryModal, category, useFlagList,
    setUseFlagList, onChangeCategory, addCategory,
    categoryModalMode, modifyCategory, deleteCategory,
  } = SystemMenuStore;

  const {
    id, menu, name, desc,
    path, order, useFl,
  } = category;

  return (
    <Modal isOpen={isCategoryModalToggle} toggle={toggleCategoryModal}>
      <ModalHeaderBack toggle={toggleCategoryModal}>
        {categoryModalMode === 'modify' ? '카테고리 상세' : '카테고리 추가'}
      </ModalHeaderBack>
      <ModalBody>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>MENU</InputGroupText>
          </InputGroupAddon>
          <Input name="menu" value={menu} disabled />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>ID</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="ID" name="id" onChange={onChangeCategory} value={id} disabled={categoryModalMode === 'modify'} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>이름</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="이름" name="name" onChange={onChangeCategory} value={name} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>경로</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="경로" name="path" onChange={onChangeCategory} value={path} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>순서</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="순서" name="order" onChange={onChangeCategory} value={order} />
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>사용 여부</InputGroupText>
          </InputGroupAddon>
          <Input type="select" placeholder="사용 여부" name="useFl" onChange={onChangeCategory} value={useFl}>
            <CodeOptionList codeGroup="YN_FLAG" array={useFlagList} setArrayMethod={setUseFlagList} />
          </Input>
        </InputGroupMb>
        <InputGroupMb>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>설명</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="설명" name="desc" onChange={onChangeCategory} value={desc} />
        </InputGroupMb>
      </ModalBody>
      <ModalFooter>
        {categoryModalMode === 'modify'
          ? (
            <>
              <Button color="danger" onClick={modifyCategory}>수정</Button>{' '}
              <Button color="warning" onClick={deleteCategory}>삭제</Button>{' '}
            </>
          ) : (<Button color="danger" onClick={addCategory}>추가</Button>)}
        <Button color="secondary" onClick={toggleCategoryModal}>취소</Button>
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


export default memo(observer(MenuCategoryDetailModal));
