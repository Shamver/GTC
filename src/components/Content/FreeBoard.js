import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useStores } from '../../stores/useStores';

const FreeBoard = () => {
  const { RouteStore } = useStores();
  return (
    <div>
      <Link to={`${RouteStore.location.pathname}/post`}>
        <Button color="danger">
          <FontAwesomeIcon icon={faPen} />
          &nbsp;글 쓰기
        </Button>
      </Link>
    </div>
  );
};

export default FreeBoard;
