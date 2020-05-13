import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import useStores from '../../../../../../stores/useStores';

const PostOption = () => {
  const { UtilAlertStore, BoardPostStore, BoardStore } = useStores();
  const { toggleConfirmAlert } = UtilAlertStore;
  const { deletePost, postView } = BoardPostStore;
  const { currentBoard } = BoardStore;
  const { id } = postView;


  return (
    <>
      <RightSpan>
        <GreyButton color="secondary" size="sm" outline onClick={() => toggleConfirmAlert('해당 포스트를 삭제하시겠습니까?', () => deletePost(id))}>
          <FontAwesomeIcon icon={faTrash} /> 삭제
        </GreyButton>
      </RightSpan>
      <RightSpan>
        <Link to={`/${currentBoard}/modify/${id}`}>
          <GreyButton color="secondary" size="sm" outline>
            <FontAwesomeIcon icon={faPen} /> 수정
          </GreyButton>
        </Link>
      </RightSpan>
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

const GreyButton = styled(Button)`

`;


export default PostOption;
