import React from 'react';
import {
  Button, InputGroup, InputGroupAddon, InputGroupText, Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import BoardPagination from './Pagination';

const BoardFooter = ({ path, noPagination, currentPage }) => (
  <>
    <AbsolDiv>
      <AbsoluteLeftLink to={`${path}/post`}>
        <Button outline color="warning" size="sm">
          <FontAwesomeIcon icon={faStar} />
            &nbsp;&nbsp;인기 글
        </Button>
      </AbsoluteLeftLink>
      <AbsoluteRightLink to={`${path}/post`}>
        <Button color="danger" size="sm">
          <FontAwesomeIcon icon={faPen} />
            &nbsp;&nbsp;글 쓰기
        </Button>
      </AbsoluteRightLink>
    </AbsolDiv>
    <BoardPagination path={path} currentPage={currentPage} noPagination={noPagination} />
    <InputGroupWrapper>
      <InputGroupWidth>
        <InputGroupAddon addonType="prepend">
          <Input type="select">
            <option>제목</option>
            <option>제목 + 내용</option>
            <option>닉네임</option>
          </Input>
        </InputGroupAddon>
        <Input placeholder="검색어" />
        <InputGroupAddon addonType="append">
          <InputGroupButton>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroupWidth>
    </InputGroupWrapper>
  </>
);

BoardFooter.propTypes = {
  path: Proptypes.string.isRequired,
  noPagination: Proptypes.bool,
  currentPage: Proptypes.string,
};

BoardFooter.defaultProps = {
  noPagination: false,
  currentPage: '1',
};

const InputGroupWrapper = styled.div`
  text-align : center;
  margin-top : 20px;
`;

const InputGroupWidth = styled(InputGroup)`
  width : 500px !important; 
  display : inline-flex !important;
`;

const InputGroupButton = styled(InputGroupText)`
  cursor : pointer;
  color : #DC3545 !important;
  background-color : white !important;
`;

const AbsolDiv = styled.div`
  margin-top : 20px;
`;

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


export default BoardFooter;
