import React, { useEffect, useLayoutEffect, memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import qs from 'query-string';
import useStores from '../../../stores/useStores';
import PostViewHeader from './PostViewHeader';
import PostViewContent from './PostViewContent';
import PostViewFooter from './PostViewFooter';

const PostView = ({ match, location }) => {
  const { BoardPostStore, UtilLoadingStore, BoardReplyStore } = useStores();
  const { getPost, getPostUpperLower, setHash } = BoardPostStore;
  const { loadingProcess } = UtilLoadingStore;
  const { getReply } = BoardReplyStore;
  const { params } = match;
  const { id } = params;
  const { hash, search } = location;
  const query = qs.parse(search);
  const isBestFilter = !!query.filer_mode;

  useEffect(() => {
    setHash(hash);
  }, [setHash, hash]);

  useLayoutEffect(() => {
    loadingProcess([
      () => getPost(id, isBestFilter),
      () => getPostUpperLower(id),
      () => getReply(id),
    ]);
  }, [
    loadingProcess, getPost, getPostUpperLower, getReply, id,
    isBestFilter,
  ]);

  return (
    <PostWrapper>
      <ViewWrapper>
        <PostViewHeader />
        <PostViewContent />
        <PostViewFooter />
      </ViewWrapper>
    </PostWrapper>
  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }).isRequired,
  location: Proptypes.shape({
    search: Proptypes.string,
    hash: Proptypes.string,
  }).isRequired,
};

const ViewWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
  @media (max-width: 992px) {
    padding : 20px 7px !important;
  }
`;

const PostWrapper = styled.div`
  background-color : white;
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  
  & .ck-content {
    height : 100px;
    font-family: 'Jeju Gothic',sans-serif !important;
  }
  
  & .ck.ck-editor {
    margin-bottom : 5px !important;
    border-radius: 0 0 2px 2px;
    box-shadow: 0.8px 0.8px 1px 0.8px rgb(0,0,0,.12);
  }
`;

export default memo(PostView);
