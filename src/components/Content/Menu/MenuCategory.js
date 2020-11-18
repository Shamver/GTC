import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import useStores from '../../../stores/useStores';

const MenuCategory = ({ data }) => {
  const { SystemMenuStore } = useStores();
  const { getCategory } = SystemMenuStore;
  const {
    id, name, path, useFl,
    menu,
  } = data;
  return (
    <MarginlessRow onClick={() => getCategory(menu, id)}>
      <PaddingCol xs="4">{name}</PaddingCol>
      <PaddingCol xs="4">{path}</PaddingCol>
      <PaddingCol xs="4">{useFl}</PaddingCol>
    </MarginlessRow>
  );
};

MenuCategory.propTypes = {
  data: Proptypes.shape({
    menu: Proptypes.string,
    id: Proptypes.string,
    name: Proptypes.string,
    path: Proptypes.string,
    useFl: Proptypes.string,
  }).isRequired,
};

const PaddingCol = styled(Col)`
  padding: .75rem;
`;

const MarginlessRow = styled(Row)`
  margin: 0 !important;
  cursor: pointer;
  background-color: ${(props) => (props.active === 'true' ? '#ffd7d4' : 'white')};
  
  &:hover {
    background-color: #ffd7d4;
  }
  
  & > .col-4 {
    border-bottom: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
  }
  
  & > .col-4:last-child {
    border-right: 1px solid #dee2e6;
  }
`;

export default memo(MenuCategory);
