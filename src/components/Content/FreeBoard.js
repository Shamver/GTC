import React, { useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../stores/useStores';

const RightLink = styled(Link)`
  float : right;
`;

const BoardWrapper = styled.div`
  background-color : white;
`;

const MiddleTd = styled.td`
  padding : 8px 9px 2px 10px !important
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const ManginessTable = styled(Table)`
  margin : 0px !important;
  margin-top : 5px !important;
`;

const TableHead = styled.div`
  margin-bottom : 10px;
`;

const InlineH3 = styled.h3`
  display : inline;
`;

const PostTitle = styled(Link)`
  cursor: pointer
  color : black;
  
  &:hover {
    text-decoration: none;
  }
`;

const PostList = observer(({ location }) => {
  const { BoardStore } = useStores();
  useEffect(() => {
    BoardStore.getBoardPostList(location.pathname);
  }, []);

  return BoardStore.boardPostList[location.pathname].map((data) => (
    <tr height="35">
      <CenterTd>1</CenterTd>
      <MiddleTd>
        <FontAwesomeIcon icon={faCommentDots} /> &nbsp;
        <PostTitle to="/dsa">[타르코프] 전문 신입 스트리머 땡포룻입니다 라이브 중입니다</PostTitle>
      </MiddleTd>
      <CenterTd>땡포릇</CenterTd>
      <CenterTd>10:51</CenterTd>
    </tr>
  ));
});

PostList.propTypes = {
  location: Proptypes.shape({
    pathname: Proptypes.string,
  }).isRequired,
};

const FreeBoard = ({ location }) => (
  <BoardWrapper>
    <TableWrapper>
      <TableHead>
        <InlineH3>자유 게시판 </InlineH3>
        <RightLink to={`${location.pathname}/post`}>
          <Button color="danger" size="sm">
            <FontAwesomeIcon icon={faPen} />
            &nbsp;&nbsp;글 쓰기
          </Button>
        </RightLink>
      </TableHead>
      <ManginessTable bordered hover size="sm">
        <tbody>
          <PostList location={location} />
        </tbody>
      </ManginessTable>
    </TableWrapper>
  </BoardWrapper>
);

FreeBoard.propTypes = {
  location: Proptypes.shape({
    pathname: Proptypes.string,
  }).isRequired,
  BoardStore: Proptypes.shape({
    getBoardPostList: Proptypes.func,
  }),
};

FreeBoard.defaultProps = {
  BoardStore: null,
};

export default FreeBoard;
