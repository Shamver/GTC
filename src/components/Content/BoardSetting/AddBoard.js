import React, { memo } from 'react';
import { Button, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';

const AddBoard = () => {
  const { BoardStore } = useStores();
  const {
    setIsAddBoard, Board, onChangeBoard, addBoard,
  } = BoardStore;
  const { id, name, desc } = Board;
  return (
    <tr>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="id" value={id} placeholder="게시판" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="name" value={name} placeholder="이름" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="desc" value={desc} placeholder="설명" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="desc" value={desc} placeholder="공통 그룹 설명" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeBoard} name="desc" value={desc} placeholder="공통 그룹 설명" />
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
