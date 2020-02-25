import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const HomePostList = observer(({ board }) => {
  const { BoardPostStore } = useStores();
  const { getHomePostList, homePostList } = BoardPostStore;

  useEffect(() => {
    getHomePostList(board);
  }, [getHomePostList, board]);

  return homePostList[board].map((data) => (
    <li>
      <Link to="/temp">
        {data.title}
      </Link>
    </li>
  ));
});

HomePostList.propTypes = {
  board: Proptypes.string.isRequired,
};


const Home = () => (
  <Row>
    <Col xs="6">
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
    </Col>
    <Col xs="6">
      <TextH5>현금 거래 게시판 <ArrowIcon icon={faChevronRight} /></TextH5>
      <PostList />
    </Col>
    <Col xs="12">
      <TextH5>공지사항 <ArrowIcon icon={faChevronRight} /></TextH5>
      <MiddlePostList />
    </Col>
    <Col xs="6">
      <TextH5>거래 게시판 <ArrowIcon icon={faChevronRight} /></TextH5>
      <PostList />
    </Col>
    <Col xs="6">
      <TextH5>질문 & 답변 <ArrowIcon icon={faChevronRight} /></TextH5>
      <PostList />
    </Col>
  </Row>
);

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
  height : 300px;
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
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  
  & > ul > li:last-child {
    border : none !important;
  }
   
  & > ul > li > a {
    color : #737373 !important;
  }
`;

const MiddlePostList = styled(PostList)`
  height : 200px;
`;

export default Home;
