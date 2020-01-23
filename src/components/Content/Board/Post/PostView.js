import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../../../stores/useStores';
import PostContent from './PostContent';

const PostView = ({ match }) => {
  const {
    BoardPostStore, BoardReplyStore, BoardStore, UtilLoadingStore,
  } = useStores();
  const { getPost } = BoardPostStore;
  const { setReplyBpId } = BoardReplyStore;
  const { setCurrentBoardToId } = BoardStore;
  const { doLoading } = UtilLoadingStore;
  const { params } = match;
  const { id } = params;

  doLoading();

  useEffect(() => {
    setCurrentBoardToId(id);
    getPost(id);
    setReplyBpId(id);
  }, [getPost, setReplyBpId, id, setCurrentBoardToId]);

  return (
    <>
      <PostWrapper>
        <PostContent match={match} />
      </PostWrapper>
    </>
  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }),
};

PostView.defaultProps = {
  match: null,
};

const PostWrapper = styled.div`
  background-color : white;
  
  & .ck-content {
    height : 100px;
    font-family: 'NanumSquareRound',sans-serif !important;
  }
  
  & .ck.ck-editor {
    margin-bottom : 5px !important;
    border-radius: 0 0 2px 2px;
    box-shadow: 0.8px 0.8px 1px 0.8px rgb(0,0,0,.12);
  }
`;

export default observer(PostView);
