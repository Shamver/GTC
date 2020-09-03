import React, { memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import PostingHeader from './PostingHeader';
import PostingContent from './PostingContent';
import PostingFooter from './PostingFooter';

const Posting = ({ match, parentProps }) => {
  const { params } = match;
  const { board, id } = params;



  <PostingWrapper>
    <PostingHeader/>
    <PostingContent/>
    <PostingFooter/>
  </PostingWrapper>
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

export default memo(observer(Posting));
