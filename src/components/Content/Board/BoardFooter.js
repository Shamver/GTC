import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';
import BoardPagination from './Pagination';

const BoardFooter = ({ path, noPagination }) => (
  <>
    <AbsolDiv>
      <AbsoluteLeftLink to={`${path}/post`}>
        <Button outline color="warning" size="sm">
          <FontAwesomeIcon icon={faStar} />
            &nbsp;&nbsp;인기 글
        </Button>
      </AbsoluteLeftLink>
      <AbsoluteRightLink to={`${path}/post`}>
        <Button color="danger" size="sm">
          <FontAwesomeIcon icon={faPen} />
            &nbsp;&nbsp;글 쓰기
        </Button>
      </AbsoluteRightLink>
    </AbsolDiv>
    <BoardPagination path={path} noPagination={noPagination} />
  </>
);

BoardFooter.propTypes = {
  path: Proptypes.string.isRequired,
  noPagination: Proptypes.bool,
};

BoardFooter.defaultProps = {
  noPagination: false,
};

const AbsolDiv = styled.div`
  margin-top : 20px;
`;

const RightLink = styled(Link)`
  float : right;
  margin: 10px 0px 10px 0px;
`;

const AbsoluteRightLink = styled(RightLink)`
  margin : 0px;
`;
const AbsoluteLeftLink = styled(RightLink)`
  float: left;
  margin : 0px;
`;


export default BoardFooter;
