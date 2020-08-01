import React, { useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button, Table } from 'reactstrap';
import useStores from '../../../stores/useStores';

const BoardSetting = () => {
  const { UtilLoadingStore } = useStores();
  const { stopLoading } = UtilLoadingStore;
  useLayoutEffect(() => {
    stopLoading();
  });

  return (
    <BoardWrapper>
      <TableWrapper>
        <h3>게시판 관리</h3>
        <CodeTableWrapper>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                게시판 추가
              </RightButton>
            </PaddedDiv>
            <CodeTable bordered hover>
              <thead>
                <tr>
                  <th>게시판</th>
                  <th>이름</th>
                  <th>경로</th>
                  <th>순서</th>
                  <th>사용 여부</th>
                  <th>권한</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </CodeTable>
          </CodeCol>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                카테고리 추가
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

const CodeTableWrapper = styled.div`
`;

const CodeCol = styled.div`
  width : 100%;
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

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

export default BoardSetting;
