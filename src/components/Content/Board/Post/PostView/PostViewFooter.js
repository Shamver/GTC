import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReplyForm from '../../Reply/ReplyForm';
import BoardContent from '../../BoardContent';
import BoardFooter from '../../BoardFooter';
import useStores from '../../../../../stores/useStores';

const PostViewFooter = () => {
  const { BoardStore, BoardPostStore } = useStores();
  const { currentPostUpperLower, getPostUpperLower, postView } = BoardPostStore;
  const { currentBoard } = BoardStore;

  const { upper, lower } = currentPostUpperLower;
  const { id: upperId, title: upperTitle, writer: upperWriter } = upper;
  const { id: lowerId, title: lowerTitle, writer: lowerWriter } = lower;
  const { id } = postView;

  useEffect(() => {
    getPostUpperLower(id);
  }, [getPostUpperLower, id]);
  
  console.log('PostView Footer 렌더링');

  return (
    <>
      <ReplyForm />
      <TopBottomWrapper>
        { !!upper && (
          <div>
            <TopBottomDiv>▲ 윗글</TopBottomDiv>
            <TopBottomLink to={`${upperId}`}>{upperTitle}</TopBottomLink>
            <TopBottomWriter>{upperWriter}</TopBottomWriter>
          </div>
        )}
        { !!lower && (
          <div>
            <TopBottomDiv>▼ 아랫글</TopBottomDiv>
            <TopBottomLink to={`${lowerId}`}>{lowerTitle}</TopBottomLink>
            <TopBottomWriter>{lowerWriter}</TopBottomWriter>
          </div>
        )}
      </TopBottomWrapper>
      <BoardContent path={currentBoard} />
      <BoardFooter path={currentBoard} />
    </>
  );
};

const TopBottomLink = styled(Link)`
  color : inherit !important;
  text-decoration : none;
  &:hover {
    text-decoration : none !important; 
  }
`;

const TopBottomWrapper = styled.div`
  margin-top : 50px;
  font-size : 14px;
  & div {
    padding : 2px 0px;
  }
  
  & div:hover {
    background-color : #fafafa;
  }
`;

const TopBottomWriter = styled.span`
  float : right;
  color : #aaa;
  font-weight : bold;
`;

const TopBottomDiv = styled.div`
  width : 80px;
  display : inline-block;
  font-weight : bold;
`;

export default PostViewFooter;
