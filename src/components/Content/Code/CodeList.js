import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import useStores from '../../../stores/useStores';
import CodeRow from './CodeRow';

const CodeList = () => {
  const { SystemCodeStore } = useStores();
  const { codeList, isAddCode } = SystemCodeStore;

  if (!isAddCode && !codeList.length) {
    return (
      <TableBody>
        <div className="center">
          <ColCell className="col-12 center">
            공통 코드 그룹을 클릭하여 조회하세요!
          </ColCell>
        </div>
      </TableBody>
    );
  }
  return codeList.map((data) => (<CodeRow data={data} key={data.code} />));
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  align-items: center;
  font-size: 14px;
  
  .center {
    text-align: center;
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
`;

export default memo(observer(CodeList));
