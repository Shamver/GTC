import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const HomePostList = ({ board }) => {
  const { BoardPostStore, ComponentPostStore } = useStores();
  const { homePostList } = BoardPostStore;
  const { onClickPost } = ComponentPostStore;

  return homePostList[board].map((data) => {
    const { id, title, commentCount } = data;
    return (
      <li key={data.id}>
        <div>
          <PostTitle onClick={() => onClickPost(id)}>{title}</PostTitle>
        </div>
        &nbsp;&nbsp;
        { commentCount > 0 ? (
          <ReplyCount>[{commentCount}]</ReplyCount>
        ) : null}
      </li>
    );
  });
};

HomePostList.propTypes = {
  board: Proptypes.string.isRequired,
};

const ReplyCount = styled.div`
  color : #DC3545;
  display : inline-block;
  font-weight : bold;
  vertical-align : text-bottom;
`;

const PostTitle = styled.a`
  cursor: pointer;
`;

export default memo(observer(HomePostList));
