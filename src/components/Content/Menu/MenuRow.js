import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const MenuRow = ({ data }) => {
  const { SystemMenuStore } = useStores();
  const { getMenu, getCategoryList } = SystemMenuStore;
  const {
    id, name, path, useFl,
  } = data;

  return (
    <MarginlessRow onClick={() => getCategoryList(id)}>
      <PaddingCol xs="3">{name}</PaddingCol>
      <PaddingCol xs="3">{path}</PaddingCol>
      <PaddingCol xs="3">{useFl}</PaddingCol>
      <PaddingCol xs="3">
        <Button size="sm" color="danger" onClick={(event) => getMenu(id, event)}>
          <DetailIcon icon={faInfoCircle} />
        </Button>
      </PaddingCol>
    </MarginlessRow>
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

const MarginlessRow = styled(Row)`
  margin: 0 !important;
  & > .col-3 {
    border-bottom: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
  }
  
  & > .col-3:last-child {
    border-right: 1px solid #dee2e6;
  }
`;

const PaddingCol = styled(Col)`
  padding: .75rem;
`;

const DetailIcon = styled(FontAwesomeIcon)`
  vertical-align: text-top;
`;

export default memo(MenuRow);
