import React from 'react';
import ReplyForm from '../../Reply/ReplyForm';
import BoardContent from '../../BoardContent';
import BoardFooter from '../../BoardFooter';
import useStores from '../../../../../stores/useStores';

const PostViewFooter = ({ match }) => {
  const { BoardStore } = useStores();
  return (
    <>
      <ReplyForm match={match} />
      <TopBottomWrapper>
        { upper ? (
          <div>
            <TopBottomDiv>▲ 윗글</TopBottomDiv>
            <TopBottomLink to={`${upperId}`}>{upperTitle}</TopBottomLink>
            <TopBottomWriter>{upperWriter}</TopBottomWriter>
          </div>
        ) : ''}
        { lower ? (
          <div>
            <TopBottomDiv>▼ 아랫글</TopBottomDiv>
            <TopBottomLink to={`${lowerId}`}>{lowerTitle}</TopBottomLink>
            <TopBottomWriter>{lowerWriter}</TopBottomWriter>
          </div>
        ) : ''}
      </TopBottomWrapper>
      <BoardContent path={currentBoard} />
      <BoardFooter path={currentBoard} />
    </>
  );
};

export default PostViewFooter;
