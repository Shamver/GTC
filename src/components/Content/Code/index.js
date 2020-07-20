import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CodeGroupList from './CodeGroupList';
import CodeList from './CodeList';
import useStores from '../../../stores/useStores';
import NewCodeGroup from './NewCodeGroup';
import NewCodeRow from './NewCodeRow';

const Code = () => {
  const { SystemCodeStore, UtilLoadingStore } = useStores();
  const {
    isAddCodeGroup, setIsAddCodeGroup, setIsAddCode, isAddCode,
    getCodeGroupList, getCodeComponent,
  } = SystemCodeStore;
  const { loadingProcess } = UtilLoadingStore;

  useLayoutEffect(() => {
    loadingProcess([
      () => getCodeComponent('YN_FLAG'),
      getCodeGroupList,
    ]);
  }, [loadingProcess, getCodeGroupList, getCodeComponent]);

  return (
    <BoardWrapper>
      <TableWrapper>
        <h3>코드 관리</h3>
        <CodeTableWrapper>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger" onClick={() => setIsAddCodeGroup(true)}>
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                코드 그룹 추가
              </RightButton>
            </PaddedDiv>
            <CodeTable bordered hover>
              <thead>
                <tr>
                  <th>코드그룹</th>
                  <th>코드그룹명</th>
                  <th>코드그룹 설명</th>
                  <CenterTh>수정</CenterTh>
                  <CenterTh>삭제</CenterTh>
                </tr>
              </thead>
              <tbody>
                { isAddCodeGroup ? (<NewCodeGroup />) : null}
                <CodeGroupList />
              </tbody>
            </CodeTable>
          </CodeCol>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger" onClick={() => setIsAddCode(true)}>
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                코드 추가
              </RightButton>
            </PaddedDiv>
            <CodeTable bordered hover>
              <thead>
                <tr>
                  <th>코드</th>
                  <th>코드명</th>
                  <CenterTh width="50">순서</CenterTh>
                  <th>코드 설명</th>
                  <CenterTh width="80">사용 여부</CenterTh>
                  <CenterTh width="66">수정</CenterTh>
                  <CenterTh width="66">삭제</CenterTh>
                </tr>
              </thead>
              <tbody>
                { isAddCode ? (<NewCodeRow />) : null}
                <CodeList />
              </tbody>
            </CodeTable>
          </CodeCol>
        </CodeTableWrapper>
      </TableWrapper>
    </BoardWrapper>
  );
};

const PaddedDiv = styled.div`
  padding-bottom : 10px;
  height : 40px;
`;

const RightButton = styled(Button)`
  float : right;
`;

const CenterTh = styled.th`
  text-align : center;
`;

const CodeTable = styled(Table)`
  & > tbody > tr {
    cursor : pointer;
  }
  
  & > tbody > tr > td {
    vertical-align: middle;
  }
`;

const CodeCol = styled.div`
  width : 100%;
`;

const CodeTableWrapper = styled.div`
`;

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

export default memo(observer(Code));
