import React, { memo, useLayoutEffect } from 'react';
import { Button, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';
import BoardUseFlag from './BoardUseFlag';

const AddBoard = () => {
  const { BoardStore, SystemCodeStore } = useStores();
  const {
    setIsAddBoard, Board, onChangeBoard, addBoard,
    setUseFlagList,
  } = BoardStore;
  const { getCodeComponent } = SystemCodeStore;
  const {
    id, name, desc, path,
    order, useFl, permissionLevel,
  } = Board;

  useLayoutEffect(() => {
    getCodeComponent(setUseFlagList);
  }, [setUseFlagList]);

  return (
    <tr>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="id" value={id} placeholder="게시판" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="name" value={name} placeholder="이름" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="path" value={path} placeholder="경로" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="order" value={order} placeholder="순서" />
      </td>
      <td>
        <Input type="select" bsSize="sm" onChange={onChangeBoard} name="useFl" value={useFl}>
          <BoardUseFlag />
        </Input>
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="permissionLevel" value={permissionLevel} placeholder="권한 레벨" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="desc" value={desc} placeholder="설명" />
      </td>

      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={addBoard}>
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={() => setIsAddBoard(false)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>
      </CenterPaddingTd>
    </tr>
  );
};

const CenterTd = styled.td`
  text-align : center;
`;

const CenterPaddingTd = styled(CenterTd)`
  padding : .8rem !important;
`;

export default memo(observer(AddBoard));
