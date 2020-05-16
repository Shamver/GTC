import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStores from '../../../../../stores/useStores';
import anonymous from '../../../../../resources/images/anonymous.png';

const PostViewHeader = () => {
  const { BoardPostStore } = useStores();
  const { postView } = BoardPostStore;
  const {
    board, boardName, categoryName, writerName, title,
  } = postView;

  let link = '';
  if (board) {
    link = board.toLowerCase();
  }
  return (
    <>
      <BoardLink to={`/${link}`}>
        <h4>{boardName}</h4>
      </BoardLink>
      <div>
        <CategoryAndTitle>
          <Row>
            <Category>{categoryName}</Category>
            <Title>{title}</Title>
          </Row>
        </CategoryAndTitle>
        <ProfileWrapper>
          <b>{writerName}</b>님
          <img src={anonymous} alt="프로필 사진" />
        </ProfileWrapper>
      </div>
    </>
  );
};

const CategoryAndTitle = styled.h4`
  font-size : 20px !important;
  font-weight : 500;
  & > .row {
    margin : 0 !important;
  }
`;

const Title = styled(Col)`
  padding : 0px !important;
  padding-left : 7px;
  vertical-align: bottom;
  display: inline-block;
  max-width: 900px;
  font-size : 16px !important;
  
  @media (min-width: 992px) {
    font-size : 20px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Category = styled.div`
  height : 20px; 
  border-right : 1px dotted gray;
  padding-right : 7px;
  margin-right : 7px;
  color : blue;
`;

const BoardLink = styled(Link)`
  color : black;
  text-decoration : none;
  margin-bottom : 15px;
  display : block;
  
  & > h4 {
    margin : 0px;
    font-weight: bold;
    border-bottom : 1px solid #e6e6e6;
    padding-bottom : 4px;
  }
  
  &:hover {
    color : black;
    text-decoration : none;
  }
`;

const ProfileWrapper = styled.div`
  height : 42px;
  & > img {
    height : 42px;
    width : 42px;
    border-radius: 6px;
    float : right;
  }
`;

export default observer(PostViewHeader);
