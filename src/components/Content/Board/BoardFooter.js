import React, { memo } from 'react';
import { observer } from 'mobx-react';
import {
  Button, InputGroup, InputGroupAddon, InputGroupText, Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BoardPagination from './Pagination';
import useStores from '../../../stores/useStores';

const BoardFooter = () => {
  const { BoardStore } = useStores();
  const {
    currentBoardPath, bestFilterMode, currentBoardPage,
    searchKeyword, onSubmit, onChange, onSearch, searchTarget,
    onChangeTarget,
  } = BoardStore;
  const filterQs = '?filter_mode=true';
  const pageUrl = Number(currentBoardPage) > 1 ? `/${currentBoardPath}/page/${currentBoardPage}` : `/${currentBoardPath}`;
  const bestFilterUrl = bestFilterMode ? pageUrl : pageUrl.concat(filterQs);

  return (
    <FooterWrapper>
      <AbsolDiv>
        <AbsoluteLeftLink to={bestFilterUrl}>
          <Button outline={!bestFilterMode} color="warning" size="sm">
            <FontAwesomeIcon icon={faStar} />
            &nbsp;&nbsp;인기 글
          </Button>
        </AbsoluteLeftLink>
        <AbsoluteRightLink to={`/${currentBoardPath}/post`}>
          <Button color="danger" size="sm">
            <FontAwesomeIcon icon={faPen} />
              &nbsp;&nbsp;글 쓰기
          </Button>
        </AbsoluteRightLink>
      </AbsolDiv>
      <BoardPagination />
      <InputGroupWrapper>
        <InputGroupWidth>
          <InputGroupAddon addonType="prepend">
            <RightNoRadiusSelect type="select" value={searchTarget} onChange={onChangeTarget}>
              <option value="title">제목</option>
              <option value="titleText">제목 + 내용</option>
              <option value="nickname">닉네임</option>
            </RightNoRadiusSelect>
          </InputGroupAddon>
          <Input placeholder="검색어" onKeyPress={onSubmit} value={searchKeyword} onChange={onChange} />
          <InputGroupAddon addonType="append">
            <InputGroupButton onClick={onSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroupWidth>
      </InputGroupWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  @media (max-width: 992px) {
    margin: 10px;
  }
`

const RightNoRadiusSelect = styled(Input)`
  border-bottom-right-radius: 0px !important;
  border-top-right-radius: 0px !important;
`;

const InputGroupWrapper = styled.div`
  text-align : center;
  margin-top : 20px;

`;

const InputGroupWidth = styled(InputGroup)`
  max-width : 500px;
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

export default memo(observer(BoardFooter));
