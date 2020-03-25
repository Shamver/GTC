import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import CodeRow from './CodeRow';

const CodeList = () => {
  const { SystemCodeStore } = useStores();
  const { codeList, isAddCode } = SystemCodeStore;

  if (!isAddCode && !codeList.length) {
    return (
      <tr>
        <NoSelectGroup colSpan="7">공통 코드 그룹을 클릭하여 조회하세요!</NoSelectGroup>
      </tr>
    );
  }
  return codeList.map((data) => (<CodeRow data={data} key={data.code} />));
};

const NoSelectGroup = styled.td`
  text-align : center;
`;

export default observer(CodeList);
