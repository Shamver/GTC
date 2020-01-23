import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';

import Loading from '../../util/Loading';
import PostList from './Post/PostList';

const BoardContent = ({ path, currentPage }) => {
  const { UtilLoadingStore } = useStores();

  const { loading } = UtilLoadingStore;

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
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
          <PostList path={path} currentPage={currentPage} />
        </tbody>
      </ManginessTable>
    </>
  );
};

BoardContent.propTypes = {
  path: Proptypes.string.isRequired,
  currentPage: Proptypes.number,
};

BoardContent.defaultProps = {
  currentPage: null,
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
  
  & tr:hover {
    background-color : #fafafa !important;
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

export default observer(BoardContent);
