import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const MenuRow = ({ data }) => {
  const { SystemMenuStore } = useStores();
  const { getMenu, getCategoryList } = SystemMenuStore;
  const {
    id, name, path, useFl,
  } = data;

  return (
    <tr onClick={() => getCategoryList(id)}>
      <td>{name}</td>
      <td>{path}</td>
      <td>{useFl}</td>
      <td>
        <Button size="sm" color="danger" onClick={(event) => getMenu(id, event)}>
          <DetailIcon icon={faInfoCircle} />
        </Button>
      </td>
    </tr>
  );
};

MenuRow.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.string,
  }).isRequired,
};

const DetailIcon = styled(FontAwesomeIcon)`
  vertical-align: text-top;
`;

export default memo(MenuRow);
