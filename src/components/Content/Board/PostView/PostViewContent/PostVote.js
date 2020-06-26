import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../../../stores/useStores';

const PostVote = () => {
  const { BoardPostStore } = useStores();
  const { recommendPost, postView } = BoardPostStore;
  const {
    id, recommendCount, notRecommendCount, recommendCheck,
  } = postView;

  return (
    <VoteWrapper>
      <Button outline={recommendCheck !== 'R01'} color="success" onClick={() => recommendPost(id, 'R01')}>
        <FontAwesomeIcon icon={faThumbsUp} />
        추천 {recommendCount}
      </Button>
      <Button outline={recommendCheck !== 'R02'} color="primary" onClick={() => recommendPost(id, 'R02')}>
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
