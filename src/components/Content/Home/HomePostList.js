import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const HomePostList = ({ board }) => {
  const { BoardPostStore } = useStores();
  const { getHomePostList, homePostList } = BoardPostStore;

  useEffect(() => {
    // getHomePostList(board);
  }, [getHomePostList, board]);

  return homePostList[board].map((data) => {
    const { id, title, commentCount } = data;
    return (
      <li key={data.id}>
        <div>
          <Link to={`/post/${id}`}>
            {title}
          </Link>
        </div>
        &nbsp;&nbsp;
        { commentCount > 0 ? (
          <ReplyCount>
            [{commentCount}]
          </ReplyCount>
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

export default observer(HomePostList);
