import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import {Table, Button, TabPane, Row, Col} from 'reactstrap';
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
    getCodeGroupList, getCodeComponent, setCodeList,
  } = SystemCodeStore;
  const { loadingProcess } = UtilLoadingStore;

  useLayoutEffect(() => {
    loadingProcess([
      () => getCodeComponent('YN_FLAG', setCodeList),
      getCodeGroupList,
    ]);
  }, [loadingProcess, getCodeGroupList, getCodeComponent, setCodeList]);

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
            <Wrapper size="sm">
              <Row className="content-header">
                <Col className="col-sm-12">
                  <TableHeader>
                    <ColCell className="col-4">
                      코드그룹
                    </ColCell>
                    <ColCell className="col-3">
                      코드그룹명
                    </ColCell>
                    <ColCell className="col-3">
                      코드그룹 설명
                    </ColCell>
                    <ColCell className="col-1 center">
                      수정
                    </ColCell>
                    <ColCell className="col-1 center">
                      삭제
                    </ColCell>
                  </TableHeader>
                </Col>
              </Row>
              { isAddCodeGroup ? (<NewCodeGroup />) : null}
              <CodeGroupList />
            </Wrapper>
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

const Wrapper = styled.div`
  padding: 0px 1rem;
  border-bottom: 1px solid #dee2e6;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  & .center {
    text-align: center;
  }
  
  @media (max-width: 800px) {
    & .content-header {
      display: none;
    }
    
    & .content-body {
      display: block;
    }
    
    .col {
      max-width: 100%;
    }
  }
`;

const TableHeader = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
`;

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
