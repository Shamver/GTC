import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import useStores from '../../../../../../stores/useStores';

const PostVote = () => {
  const { BoardPostStore } = useStores();
  const { recommendPost, postView } = BoardPostStore;
  const { id, recommendCount, notRecommendCount } = postView;
  return (
    <VoteWrapper>
      <Button outline color="success" onClick={() => recommendPost(id, 'R01')}>
        <FontAwesomeIcon icon={faThumbsUp} />
        &nbsp;추천 {recommendCount}
      </Button>
      <Button outline color="primary" onClick={() => recommendPost(id, 'R02')}>
        <FontAwesomeIcon icon={faThumbsDown} />
        &nbsp;비추천 {notRecommendCount}
      </Button>
    </VoteWrapper>
  );
};

const VoteWrapper = styled.div`
  text-align : center;
  
  & > button:last-child {
    margin-left : 5px;
  }
  
  & > button {
    font-size : 14px;
  }
`;

export default PostVote;
