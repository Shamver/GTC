import React, { useEffect } from 'react';
import {
  Button, Table, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHome } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faStar } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../Stores/useStores';

const RightLink = styled(Link)`
  float : right;
  margin: 10px 0px 10px 0px;
`;

const AbsoluteRightLink = styled(RightLink)`
  margin : 0px;
`;
const AbsoluteLeftLink = styled(RightLink)`
  float: left;
  margin : 0px;
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

const CenterTdWriter = styled(CenterTd)`
  color : #DC3545;
  font-weight : bold;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const ManginessTable = styled(Table)`
  margin : 0px !important;
  margin-top : 0px !important;
  border : none !important;
  
  & td:first-child {
    border-left : none;
  }
  
  & td:last-child {
    border-right : none;
  }
`;

const TableHead = styled.div`
  margin-bottom : 10px;
`;

const PostTitle = styled(Link)`
  cursor: pointer
  color : black;
  
  &:hover {
    text-decoration: none;
  }
`;

const MarginlessH3 = styled.h4`
  margin : 0px;
  font-weight: bold;
  border-bottom : 1px solid #e6e6e6;
  padding-bottom : 4px;
`;

const InnerTableHeader = styled(Table)`
  margin : 0px !important;
  & th {
    padding : 0px !important;
    border-top : 2px solid #DC3545 !important;
  }
  & td {
    border : none !important;
  }
`;

const PaginationCustom = styled(Pagination)`
  color : #DC3545;
  width : max-content;
  margin : 0 auto;
  margin-top : 20px;
  
  & ul {
    margin : 0px;
  }
  
  
  & .page-link {
    color: #DC3545;
  }
  
  & .page-link:hover {
    color: #DC3545;
  } 
  
  & .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #DC3545;
    border-color: #DC3545;
  }
`;

const AbsolDiv = styled.div`
  margin-top : 20px;
`;

const PostList = observer(({ pathname }) => {
  const { BoardStore } = useStores();
  useEffect(() => {
    BoardStore.getBoardPostList(pathname);
    BoardStore.setCurrentBoard(pathname);
  }, [pathname, BoardStore]);

  return BoardStore.boardPostList[pathname].map((data) => (
    <tr height="35" key={data.id}>
      <CenterTd>{data.id}</CenterTd>
      <CenterTd>{data.categoryName}</CenterTd>
      <MiddleTd width="700">
        <FontAwesomeIcon icon={faCommentDots} /> &nbsp;
        <PostTitle to={`/post/${data.id}`}>{data.title}</PostTitle>
      </MiddleTd>
      <CenterTdWriter>{data.writer}</CenterTdWriter>
      <CenterTd>{data.date}</CenterTd>
    </tr>
  ));
});

PostList.propTypes = {
  pathname: Proptypes.string,
};

const FreeBoard = ({ pathname }) => (
  <BoardWrapper>
    <TableWrapper>
      <TableHead>
        <MarginlessH3>자유게시판</MarginlessH3>
        <RightLink to={`${pathname}/post`}>
          <Button color="danger" size="sm">
            <FontAwesomeIcon icon={faPen} />
            &nbsp;&nbsp;글 쓰기
          </Button>
        </RightLink>
      </TableHead>
      <InnerTableHeader>
        <th>
          <td><NavLink to="/free"><FontAwesomeIcon icon={faHome} /></NavLink></td>
          <td><NavLink to="/a">자유</NavLink></td>
          <td><NavLink to="/a">잡담</NavLink></td>
        </th>
      </InnerTableHeader>
      <ManginessTable bordered hover size="sm">
        <tbody>
          <PostList pathname={pathname} />
        </tbody>
      </ManginessTable>
      <AbsolDiv>
        <AbsoluteLeftLink to={`${pathname}/post`}>
          <Button outline color="warning" size="sm">
            <FontAwesomeIcon icon={faStar} />
            &nbsp;&nbsp;인기 글
          </Button>
        </AbsoluteLeftLink>
        <AbsoluteRightLink to={`${pathname}/post`}>
          <Button color="danger" size="sm">
            <FontAwesomeIcon icon={faPen} />
            &nbsp;&nbsp;글 쓰기
          </Button>
        </AbsoluteRightLink>
      </AbsolDiv>
      <PaginationCustom>
        <PaginationItem active>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </PaginationCustom>
    </TableWrapper>
    <br />
  </BoardWrapper>
);

FreeBoard.propTypes = {
  pathname: Proptypes.string.isRequired,
  BoardStore: Proptypes.shape({
    getBoardPostList: Proptypes.func,
    setCurrentBoard: Proptypes.func,
  }),
};

FreeBoard.defaultProps = {
  BoardStore: null,
};

export default FreeBoard;
