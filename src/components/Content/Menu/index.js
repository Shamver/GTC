import React, { memo, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button, Table } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import BoardDetailModal from './MenuDetailModal';
import CategoryDetailModal from './MenuCategoryDetailModal';
import BoardList from './MenuList';
import CategoryList from './MenuCategoryList';


const Menu = () => {
  const { UtilLoadingStore, SystemMenuStore } = useStores();
  const { toggleMenuModal, toggleCategoryModal, getMenuList } = SystemMenuStore;
  const { loadingProcess } = UtilLoadingStore;

  useLayoutEffect(() => {
    loadingProcess([
      getMenuList,
    ]);
  });

  return (
    <BoardWrapper>
      <TableWrapper>
        <h3>게시판 관리</h3>
        <CodeTableWrapper>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger" onClick={() => toggleMenuModal('add')}>
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                게시판 추가
              </RightButton>
            </PaddedDiv>
            <CodeTable bordered hover>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>경로</th>
                  <th>사용</th>
                  <th>상세</th>
                </tr>
              </thead>
              <ScrollTbody>
                <BoardList />
              </ScrollTbody>
            </CodeTable>
          </CodeCol>
          <CodeCol>
            <PaddedDiv>
              <RightButton size="sm" color="danger" onClick={() => toggleCategoryModal('add')}>
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                카테고리 추가
              </RightButton>
            </PaddedDiv>
            <CodeTable bordered hover>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>경로</th>
                  <th>사용</th>
                </tr>
              </thead>
              <tbody>
                <CategoryList />
              </tbody>
            </CodeTable>
          </CodeCol>
        </CodeTableWrapper>
        <BoardDetailModal />
        <CategoryDetailModal />
      </TableWrapper>
    </BoardWrapper>
  );
};

const ScrollTbody = styled.tbody`
  display: block;
  height: 200px;
  overflow: auto;
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
  width: 100%;
`;

const CodeTable = styled(Table)`
  display: block;
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #000;
  & th:nth-of-type(1), & td:nth-of-type(1) { width: 20%; } 
  & th:nth-of-type(2), & td:nth-of-type(2) { width: 20%; } 
  & th:nth-of-type(3), & td:nth-of-type(3) { width: 30%; } 
  & th:last-child { width: 120%; }
  & td:last-child { width: 120%; } 


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

export default memo(observer(Menu));
