import React, { useEffect, memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import useStores from '../../../../../stores/useStores';
import PostViewHeader from './PostViewHeader';
import PostViewContent from './PostViewContent';
import PostViewFooter from './PostViewFooter';

const PostView = ({ match }) => {
  const { BoardPostStore, UtilLoadingStore } = useStores();
  const { getPost } = BoardPostStore;
  const { doLoading } = UtilLoadingStore;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    getPost(id);
    doLoading();
  }, [getPost, id, doLoading]);


  return (
    <>
      <PostWrapper>
        <ViewWrapper>
          <PostViewHeader />
          <PostViewContent />
          <PostViewFooter />
        </ViewWrapper>
      </PostWrapper>
    </>
  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
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
  display :  ${(props) => (props.loading ? 'none' : 'block')}
  background-color : white;
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  
  & .ck-content {
    height : 100px;
    font-family: 'Nanum Gothic',sans-serif !important;
  }
  
  & .ck.ck-editor {
    margin-bottom : 5px !important;
    border-radius: 0 0 2px 2px;
    box-shadow: 0.8px 0.8px 1px 0.8px rgb(0,0,0,.12);
  }
`;

export default memo(PostView);
