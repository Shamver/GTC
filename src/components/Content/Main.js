import React from 'react';
import { Row, Col } from 'reactstrap';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ArrowIcon = styled(FontAwesomeIcon)`
  vertical-align : text-top;
`;

const Texth5 = styled.h5`
  font-weight : bold;
`;

const PostList = styled.div`
  background-color : white;
  height : 300px;
  margin-bottom : 20px;
`;

const Content = () => (
  <Row>
    <Col xs="6">
      <Texth5>커뮤니티 자유게시판 <ArrowIcon icon={faChevronRight} /></Texth5>
      <PostList />
    </Col>
    <Col xs="6">
      <Texth5>현금거래 게시판 <ArrowIcon icon={faChevronRight} /></Texth5>
    </Col>
    <Col xs="12">
      <Texth5>공지사항 <ArrowIcon icon={faChevronRight} /></Texth5>
    </Col>
  </Row>
);

export default Content;
