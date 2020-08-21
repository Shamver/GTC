import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const Menu = ({ data }) => {
  const { SystemMenuStore } = useStores();
  const { getMenu, getCategoryList } = SystemMenuStore;
  const {
    menu, name, path, useFl,
  } = data;

  return (
    <tr onClick={() => getCategoryList(menu)}>
      <td>{name}</td>
      <td>{path}</td>
      <td>{useFl}</td>
      <td>
        <Button size="sm" color="danger" onClick={(event) => getMenu(menu, event)}>
          <DetailIcon icon={faInfoCircle} />
        </Button>
      </td>
    </tr>
  );
};

Menu.propTypes = {
  data: Proptypes.shape({
    menu: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.string,
  }).isRequired,
};

const DetailIcon = styled(FontAwesomeIcon)`
  vertical-align: text-top;
`;

export default memo(Menu);
