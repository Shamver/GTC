import React, { memo, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button, Table } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import BoardDetailModal from './BoardDetailModal';
import BoardList from './BoardList';


const BoardSetting = () => {
  const { UtilLoadingStore, SystemBoardStore } = useStores();
  const { toggleBoardModal, getBoardList } = SystemBoardStore;
  const { loadingProcess } = UtilLoadingStore;

  useLayoutEffect(() => {
    loadingProcess([
      getBoardList,
    ]);
  });

  return (
    <BoardWrapper>
      <TableWrapper>
        <h3>게시판 관리</h3>
        <CodeTableWrapper>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger" onClick={toggleBoardModal}>
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
                  <th>사용</th>
                </tr>
              </thead>
              <tbody>
                <BoardList />
                <tr>
                  <CenterTd colSpan={4}>게시판이 존재하지 않습니다.</CenterTd>
                </tr>
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
                  <CenterTh>순서</CenterTh>
                  <th>코드 설명</th>
                  <CenterTh>사용 여부</CenterTh>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <CenterTd colSpan={7}>해당 게시판에 대한 카테고리가 존재하지 않습니다.</CenterTd>
                </tr>
              </tbody>
            </CodeTable>
          </CodeCol>
        </CodeTableWrapper>
        <BoardDetailModal />
      </TableWrapper>
    </BoardWrapper>
  );
};

const CenterTd = styled.td`
  text-align: center;
`;

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

export default memo(observer(BoardSetting));
