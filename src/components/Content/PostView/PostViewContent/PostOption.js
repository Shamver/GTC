import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const PostOption = () => {
  const { UtilAlertStore, BoardPostStore, UserStore } = useStores();
  const { toggleConfirmAlert } = UtilAlertStore;
  const { deletePost, postView } = BoardPostStore;
  const { id, isMyPost } = postView;
  const { userData } = UserStore;
  const { adminYN, operatorYN } = userData;

  return (
    <>
      {(!!isMyPost || !!adminYN || !!operatorYN) && (
        <RightSpan>
          <Button color="secondary" size="sm" outline onClick={() => toggleConfirmAlert('해당 포스트를 삭제하시겠습니까?', () => deletePost(id))}>
            <FontAwesomeIcon icon={faTrash} /> 삭제
          </Button>
        </RightSpan>
      )}
      {!!isMyPost && (
        <RightSpan>
          <Link to={`/post/modify/${id}`}>
            <Button color="secondary" size="sm" outline>
              <FontAwesomeIcon icon={faPen} /> 수정
            </Button>
          </Link>
        </RightSpan>
      )}
    </>
  );
};

const RightSpan = styled.span`
  margin-left : 5px;
  float : right;
  
  & > svg {
    margin-left : 5px;
  }
  
  & button {
    background-color : white !important;
    border-color: #ccc !important;
    color : black !important;
    color: ${(props) => (props.outline ? 'black' : 'white')};
    &:hover {
      background-color : #e6e6e6 !important;
    }
  }
`;

export default memo(observer(PostOption));
