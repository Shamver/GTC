import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import HomePostList from './HomePostList';
import Loading from '../../util/Loading';
import useStores from '../../../stores/useStores';

const Home = () => {
  const { UtilLoadingStore } = useStores();
  const { loading, doLoading } = UtilLoadingStore;

  return (
    <>
      <Loading loading={loading} />
      <LoadingRow loading={loading}>
        <NoRightPadding lg="6" xs="12">
          <TextH5>
            <NoStyleLink to="/free">
              커뮤니티 자유게시판 <ArrowIcon icon={faChevronRight} />
            </NoStyleLink>
          </TextH5>
          <PostList>
            <ul>
              <HomePostList board="free" />
            </ul>
          </PostList>
        </NoRightPadding>
        <NoRightPadding lg="6" xs="12">
          <TextH5>현금 거래 게시판 <ArrowIcon icon={faChevronRight} /></TextH5>
          <PostList>
            <ul>
              <HomePostList board="cash" />
            </ul>
          </PostList>
        </NoRightPadding>
        <NoRightPadding lg="12">
          <TextH5>공지사항 <ArrowIcon icon={faChevronRight} /></TextH5>
          <MiddlePostList>
            <ul>
              <HomePostList board="notice" />
            </ul>
          </MiddlePostList>
        </NoRightPadding>
        <NoRightPadding lg="6" xs="12">
          <TextH5>거래 게시판 <ArrowIcon icon={faChevronRight} /></TextH5>
          <PostList>
            <ul>
              <HomePostList board="trade" />
            </ul>
          </PostList>
        </NoRightPadding>
        <NoRightPadding lg="6" xs="12">
          <TextH5>질문 & 답변 <ArrowIcon icon={faChevronRight} /></TextH5>
          <PostList>
            <ul>
              <HomePostList board="qna" />
            </ul>
          </PostList>
        </NoRightPadding>
      </LoadingRow>
    </>
  );
};

const LoadingRow = styled(Row)`
  display: ${(props) => (props.loading ? 'none !important' : 'flex !important')}
  margin : 0 !important;
`;

const NoRightPadding = styled(Col)`
  padding-right : 0 !important; 
  
  @media (max-width: 992px) {
    padding-left : 5px !important;
    padding-right : 5px !important;
  }
`;

const NoStyleLink = styled(Link)`
  color : black;
  &:hover {
    text-decoration : none;
    color : black;
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  vertical-align: baseline;
  font-size : 12px;
  color : #b6b6b6 !important;
`;

const TextH5 = styled.h5`
  font-weight : bold;
`;

const PostList = styled.div`
  background-color : white;
  height : 285px;
  margin-bottom : 20px;
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  
  & > ul {
    padding : 5px;
    list-style : none;
    font-size : 15px;
  }
  
  & > ul > li {
    padding : 0.2em 0.5em;
    border-bottom : 1px solid #f3f3f3;
  }
  
  & > ul > li:last-child {
    padding : 0.2em 0.5em;
    border-bottom : none;
  }
  
  & > ul > li a {
    color : #737373;
  }
  
  & > ul > li div {
    max-width : 400px;
    overflow : hidden;
    text-overflow : ellipsis;
    white-space : nowrap;
    display : inline-block;
    vertical-align: middle;
  }

`;

const MiddlePostList = styled(PostList)`
  height : 200px;
  
    & > ul > li div {
    max-width : 900px;
  }
`;

export default observer(Home);
