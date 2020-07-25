import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../../../stores/useStores';

const PostVote = () => {
  const { BoardPostStore, UserStore } = useStores();
  const { userData, guestAuthor } = UserStore;
  const { recommendPost, postView } = BoardPostStore;
  const {
    id, recommendCount, notRecommendCount, recommendCheck,
  } = postView;

  return (
    <VoteWrapper>
      <Button outline={recommendCheck !== 'R01'} color="success" onClick={() => (userData ? recommendPost(id, 'R01') : guestAuthor)}>
        <FontAwesomeIcon icon={faThumbsUp} />
        추천 {recommendCount}
      </Button>
      <Button outline={recommendCheck !== 'R02'} color="primary" onClick={() => (userData ? recommendPost(id, 'R02') : guestAuthor)}>
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

export default memo(observer(PostVote));
