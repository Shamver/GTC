import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import useStores from '../../../../../stores/useStores';
import anonymous from '../../../../../resources/images/anonymous.png';

const PostViewHeader = () => {
  const { BoardStore, BoardPostStore } = useStores();
  const { currentBoard } = BoardStore;
  const { postView } = BoardPostStore;

  const {
    boardName, categoryName, writerName, title,
  } = postView;

  return (
    <>
      <BoardLink to={`/${currentBoard}`}>
        <MarginlessH3>{boardName}</MarginlessH3>
      </BoardLink>
      <div>
        <CategoryAndTitle>
          <NoMarginRow>
            <Category>{categoryName}</Category>
            <Title>{title}</Title>
          </NoMarginRow>
        </CategoryAndTitle>
        <ProfileWrapper>
          <b>{writerName}</b>님
          <ProfileImg src={anonymous} />
        </ProfileWrapper>
      </div>
    </>
  );
};

const CategoryAndTitle = styled.h4`
  font-size : 20px !important;
  font-weight : 500;
`;

const Title = styled(Col)`
  padding : 0px !important;
  padding-left : 7px;
  vertical-align: bottom;
  display: inline-block;
  max-width: 750px;
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

const MarginlessH3 = styled.h4`
  margin : 0px;
  font-weight: bold;
  border-bottom : 1px solid #e6e6e6;
  padding-bottom : 4px;
`;

const ProfileImg = styled.img`
  height : 42px;
  width : 42px;
  border-radius: 6px;
  float : right;
`;

const BoardLink = styled(Link)`
  color : black;
  text-decoration : none;
  margin-bottom : 15px;
  display : block;
  
  &:hover {
    color : black;
    text-decoration : none;
  }
`;

const ProfileWrapper = styled.div`
  height : 42px;
`;

const NoMarginRow = styled(Row)`
  margin : 0px !important; 
`;

export default PostViewHeader;
