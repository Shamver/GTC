import React from 'react';
import { Row, Col } from 'reactstrap';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Home = () => (
  <Row>
    <Col xs="6">
      <TextH5>커뮤니티 자유게시판 <ArrowIcon icon={faChevronRight} /></TextH5>
      <PostList>
        <ul>
          <li>
            <Link to="/temp">
              [메이플스토리] 오로라]24시간…
            </Link>
          </li>
        </ul>
      </PostList>
    </Col>
    <Col xs="6">
      <TextH5>현금거래 게시판 <ArrowIcon icon={faChevronRight} /></TextH5>
      <PostList />
    </Col>
    <Col xs="12">
      <TextH5>공지사항 <ArrowIcon icon={faChevronRight} /></TextH5>
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

const ArrowIcon = styled(FontAwesomeIcon)`
  vertical-align : text-top;
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
   }
   
   & > ul > li > a {
    color : #737373 !important;
   }
`;

export default Home;
