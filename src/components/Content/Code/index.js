import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import * as Proptypes from 'prop-types';

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
  return codeList.map((data) => (<CodeRow data={data} key={data.group} />));
});

const CodeRow = ({ data }) => {
  const { code, codeName, codeOrder, codeDesc, codeUseYN } = data;
  return (
    <tr>
      <td>{code}</td>
      <td>{codeOrder}</td>
      <td>{codeName}</td>
      <td>{codeDesc}</td>
      <td>{codeUseYN}</td>
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

const Code = () => (
  <BoardWrapper>
    <TableWrapper>
      <h3>코드 관리</h3>
      <CodeTableWrapper>
        <CodeCol>
          <CodeTable bordered hover>
            <thead>
              <tr>
                <th>공통 코드 그룹</th>
                <th>공통 그룹명</th>
                <th>공통 그룹 설명</th>
              </tr>
            </thead>
            <tbody>
              <CodeGroupList />
            </tbody>
          </CodeTable>
        </CodeCol>
        <CodeCol>
          <Table bordered hover>
            <thead>
              <tr>
                <th>공통 코드</th>
                <th>공통 코드명</th>
                <th>정렬 순서</th>
                <th>공통 코드 설명</th>
                <th>사용 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <NoSelectGroup colSpan="5">공통 코드 그룹을 클릭하여 조회하세요!</NoSelectGroup>
              </tr>
              <CodeList />
            </tbody>
          </Table>
        </CodeCol>
      </CodeTableWrapper>
    </TableWrapper>
  </BoardWrapper>
);

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
