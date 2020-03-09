import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const CodeGroupList = observer(() => {
  const { SystemCodeStore } = useStores();
  const { getCodeGroupList, codeGroupList } = SystemCodeStore;
  useEffect(() => {
    getCodeGroupList();
  }, [getCodeGroupList]);

  return codeGroupList.map((data) => (<CodeGroup data={data} key={data.group} />));
});

const CodeGroup = ({ data }) => {
  const { SystemCodeStore } = useStores();
  const { getCodeList } = SystemCodeStore;
  const { group, groupName, groupDesc } = data;
  return (
    <tr onClick={() => getCodeList(group)}>
      <td>{group}</td>
      <td>{groupName}</td>
      <td>{groupDesc}</td>
      <CenterPaddingTd>
        <Button size="sm" color="danger">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CenterPaddingTd>
    </tr>
  );
};

CodeGroup.propTypes = {
  data: Proptypes.shape({
    group: Proptypes.string,
    groupName: Proptypes.string,
    groupDesc: Proptypes.string,
  }).isRequired,
};

const CodeList = observer(() => {
  const { SystemCodeStore } = useStores();
  const { codeList } = SystemCodeStore;

  if (!codeList.length) {
    return (
      <tr>
        <NoSelectGroup colSpan="7">공통 코드 그룹을 클릭하여 조회하세요!</NoSelectGroup>
      </tr>
    );
  }

  return codeList.map((data) => (<CodeRow data={data} key={data.group} />));
});

const CodeRow = ({ data }) => {
  const {
    code, codeName, codeOrder, codeDesc, codeUseYN,
  } = data;
  return (
    <tr>
      <td>{code}</td>
      <td>{codeName}</td>
      <CenterTd>{codeOrder}</CenterTd>
      <td>{codeDesc}</td>
      <CenterTd>{codeUseYN}</CenterTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </CenterPaddingTd>
      <CenterPaddingTd>
        <Button size="sm" color="danger">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CenterPaddingTd>
    </tr>
  );
};

CodeRow.propTypes = {
  data: Proptypes.shape({
    code: Proptypes.string,
    codeName: Proptypes.string,
    codeOrder: Proptypes.number,
    codeDesc: Proptypes.string,
    codeUseYN: Proptypes.string,
  }).isRequired,
};

const Code = () => (
  <BoardWrapper>
    <TableWrapper>
      <h3>코드 관리</h3>
      <CodeTableWrapper>
        <CodeCol>
          <PaddedDiv>
            <RightButton size="sm" color="danger">
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;
              코드 그룹 추가
            </RightButton>
          </PaddedDiv>
          <CodeTable bordered hover>
            <thead>
              <tr>
                <th>공통 코드 그룹</th>
                <th>공통 그룹명</th>
                <th>공통 그룹 설명</th>
                <CenterTh>수정</CenterTh>
                <CenterTh>삭제</CenterTh>
              </tr>
            </thead>
            <tbody>
              <CodeGroupList />
            </tbody>
          </CodeTable>
        </CodeCol>
        <CodeCol>
          <PaddedDiv>
            <RightButton size="sm" color="danger">
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;
              코드 추가
            </RightButton>
          </PaddedDiv>
          <Table bordered hover>
            <thead>
              <tr>
                <th>공통 코드</th>
                <th>공통 코드명</th>
                <CenterTh width="50">순서</CenterTh>
                <th>공통 코드 설명</th>
                <CenterTh width="80">사용 여부</CenterTh>
                <CenterTh width="66">수정</CenterTh>
                <CenterTh width="66">삭제</CenterTh>
              </tr>
            </thead>
            <tbody>
              <CodeList />
            </tbody>
          </Table>
        </CodeCol>
      </CodeTableWrapper>
    </TableWrapper>
  </BoardWrapper>
);

const PaddedDiv = styled.div`
  padding-bottom : 10px;
  height : 40px;
`;

const RightButton = styled(Button)`
  float : right;
`;

const CenterTd = styled.td`
  text-align : center;
`;

const CenterPaddingTd = styled(CenterTd)`
  padding : .4rem !important;
`;

const CenterTh = styled.th`
  text-align : center;
`;

const CodeTable = styled(Table)`
  & > tbody > tr {
    cursor : pointer;
  }
`;

const NoSelectGroup = styled.td`
  text-align : center;
`;

const CodeCol = styled.div`
  width : 100%;
  // &:first-child {
  //   padding-right : 10px;
  // }
  //
  // &:last-child {
  //   padding-left : 10px;
  // }
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

export default Code;
