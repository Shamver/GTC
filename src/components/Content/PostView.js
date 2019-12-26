import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

const PostWrapper = styled.div`
  background-color : white;
`;

const ViewWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
`;

const MarginlessH3 = styled.h3`
  margin : 0px;
`;

const NavLine = styled.hr`
  background :#DC3545;
  border : 0;
  height : 2px;
  margin-bottom : 0;
`;

const PostView = ({ match }) => {
  const { BoardStore } = useStores();
  useEffect(() => {
    BoardStore.getPost(match.params.id);
  }, []);

  return (
    <PostWrapper>
      <ViewWrapper>
        <MarginlessH3>{BoardStore.postView.boardName}</MarginlessH3>
        <br />
        {BoardStore.postView.category} | {BoardStore.postView.title}
        <br />
        {BoardStore.postView.writer}
        <NavLine />

      </ViewWrapper>
    </PostWrapper>
  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.object,
  }).isRequired,
  BoardStore: Proptypes.shape({
    getPost: Proptypes.func,
    postView: Proptypes.shape({
      boardName: Proptypes.string,
    }),
  }),
};

PostView.defaultProps = {
  BoardStore: null,
};

export default observer(PostView);
