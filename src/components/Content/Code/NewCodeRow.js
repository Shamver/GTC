import React, { memo } from 'react';
import { Button, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';

const NewCodeRow = () => {
  const { SystemCodeStore } = useStores();
  const {
    setIsAddCode, code, onChangeCode, addCode,
  } = SystemCodeStore;
  const {
    id, name, desc, order, useYN,
  } = code;
  return (
    <tr>
      <td>
        <Input bsSize="sm" onChange={onChangeCode} name="id" value={id} placeholder="공통 코드" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeCode} name="name" value={name} placeholder="공통 코드명" />
      </td>
      <td width="67">
        <Input bsSize="sm" onChange={onChangeCode} name="order" value={order} placeholder="순서" />
      </td>
      <td>
        <Input bsSize="sm" onChange={onChangeCode} name="desc" value={desc} placeholder="공통 그룹 설명" />
      </td>
      <td>
        <Input type="select" bsSize="sm" onChange={onChangeCode} name="useYN" value={useYN}>
          <option value={1}>Y</option>
          <option value={0}>N</option>
        </Input>
      </td>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={addCode}>
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger" onClick={() => setIsAddCode(false)}>
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

export default memo(observer(NewCodeRow));
