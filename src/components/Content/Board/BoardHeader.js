import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const BoardHeader = ({ path }) => {
  const { BoardStore } = useStores();
  const { getBoardName } = BoardStore;
  const BoardName = getBoardName(path);
  return (
    <TableHead>
      <MarginlessH3>{BoardName}</MarginlessH3>
      <RightLink to={`${path}/post`}>
        <Button color="danger" size="sm">
          <FontAwesomeIcon icon={faPen} />
          &nbsp;&nbsp;글 쓰기
        </Button>
      </RightLink>
    </TableHead>
  );
};

BoardHeader.propTypes = {
  path: Proptypes.string.isRequired,
};

const TableHead = styled.div`
  margin-bottom : 10px;
`;

const MarginlessH3 = styled.h4`
  margin : 0px;
  font-weight: bold;
  border-bottom : 1px solid #e6e6e6;
  padding-bottom : 4px;
`;

const RightLink = styled(Link)`
  float : right;
  margin: 10px 0px 10px 0px;
`;

export default BoardHeader;
