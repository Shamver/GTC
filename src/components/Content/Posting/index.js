import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import PostingHeader from './PostingHeader';
import PostingContent from './PostingContent';
import PostingFooter from './PostingFooter';
import useStores from '../../../stores/useStores';

const Posting = ({ match, parentProps }) => {
  const { UtilLoadingStore, BoardPostStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { getModifyPost } = BoardPostStore;
  const { params } = match;
  const { isModify } = parentProps;
  const { id } = params;

  useLayoutEffect(() => {
    loadingProcess([
      () => getModifyPost(id, isModify),
    ]);
  }, [loadingProcess, getModifyPost, id, isModify]);

  return (
    <PostingWrapper>
      <PostingHeader />
      <PostingContent />
      <PostingFooter isModify={isModify} />
    </PostingWrapper>
  );
};

Posting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      board: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
  parentProps: PropTypes.shape({
    isModify: PropTypes.bool.isRequired,
  }).isRequired,
};

const PostingWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
  padding : 14px;
  
  & .ck-content {
    height : 500px;
    font-family: inherit;
  }
`;

export default memo(Posting);
