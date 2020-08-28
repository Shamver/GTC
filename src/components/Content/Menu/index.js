import React, { memo, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  Button, Row, Col, Table,
} from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import BoardDetailModal from './MenuDetailModal';
import CategoryDetailModal from './MenuCategoryDetailModal';
import MenuList from './MenuList';
import MenuCategoryList from './MenuCategoryList';


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
            <CodeTable>
              <MarginlessRow>
                <HeadCol xs="3">이름</HeadCol>
                <HeadCol xs="3">경로</HeadCol>
                <HeadCol xs="3">사용</HeadCol>
                <HeadCol xs="3">상세</HeadCol>
              </MarginlessRow>
              <ScrollDiv>
                <MenuList />
              </ScrollDiv>
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
            <CodeTable>
              <MarginlessRow>
                <HeadCol xs="4">이름</HeadCol>
                <HeadCol xs="4">경로</HeadCol>
                <HeadCol xs="4">사용</HeadCol>
              </MarginlessRow>
              <ScrollDiv>
                <MenuCategoryList />
              </ScrollDiv>
            </CodeTable>
          </CodeCol>
        </CodeTableWrapper>
        <BoardDetailModal />
        <CategoryDetailModal />
      </TableWrapper>
    </BoardWrapper>
  );
};

const ScrollDiv = styled.div`
  height: 224px;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    position: fixed;
    display: none;
  }
`;

const MarginlessRow = styled(Row)`
  margin: 0 !important;
  
  & > .col-3 {
    border-top: 1px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    border-left: 1px solid #dee2e6;
  }
  
  & > .col-3:last-child {
    border-right: 1px solid #dee2e6;
  }
  
    & > .col-4 {
    border-top: 1px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    border-left: 1px solid #dee2e6;
  }
  
  & > .col-4:last-child {
    border-right: 1px solid #dee2e6;
  }
`;

const HeadCol = styled(Col)`
  padding: .75rem;
  font-weight: bold;
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
  margin-bottom: 10px;
`;

const CodeTable = styled.div`
  width: 100%;
  border-collapse: collapse;
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
