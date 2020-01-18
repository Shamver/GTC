import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import * as Proptypes from 'prop-types';
import PostList from './Post/PostList';

const BoardContent = ({ path }) => (
  <>
    <InnerTableHeader>
      <tbody>
        <tr>
          <td>
            <NavLink to="/free">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </td>
          <td><NavLink to="/a">자유</NavLink></td>
          <td><NavLink to="/a">잡담</NavLink></td>
        </tr>
      </tbody>
    </InnerTableHeader>
    <ManginessTable bordered hover size="sm">
      <tbody>
        <PostList path={path} />
      </tbody>
    </ManginessTable>
  </>
);

BoardContent.propTypes = {
  path: Proptypes.string.isRequired,
};

const ManginessTable = styled(Table)`
  margin : 0px !important;
  margin-top : 0px !important;
  border : none !important;
  
  & td:first-child {
    border-left : none;
  }
  
  & td:last-child {
    border-right : none;
  }
`;

const InnerTableHeader = styled(Table)`
  margin : 0px !important;
  & th {
    padding : 0px !important;
    border-top : 2px solid #DC3545 !important;
  }
  & td {
    border : none !important;
  }
`;

export default BoardContent;
