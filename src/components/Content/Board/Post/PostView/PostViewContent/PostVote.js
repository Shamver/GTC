import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import useStores from '../../../../../../stores/useStores';

const PostVote = () => {
  const { BoardPostStore, UserStore } = useStores();
  const { recommendPost, postView } = BoardPostStore;
  const { id, recommendCount, notRecommendCount } = postView;
  const { userData } = UserStore;
  return (
    <VoteWrapper>
      <Button outline color="success" onClick={() => recommendPost(id, 'R01')} disabled={!userData}>
        <FontAwesomeIcon icon={faThumbsUp} />
        추천 {recommendCount}
      </Button>
      <Button outline color="primary" onClick={() => recommendPost(id, 'R02')} disabled={!userData}>
        <FontAwesomeIcon icon={faThumbsDown} />
        비추천 {notRecommendCount}
      </Button>
    </VoteWrapper>
  );
};

const VoteWrapper = styled.div`
  text-align : center;
  & > button {
    font-size : 14px;
  }
  
  & > button:last-child {
    margin-left : 5px;
  }
  
  & > button > svg {
    margin-right : 5px;
  }
`;

export default PostVote;
