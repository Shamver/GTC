import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const MenuRow = ({ data }) => {
  const { SystemMenuStore } = useStores();
  const { getMenu, getCategoryList, category } = SystemMenuStore;
  const { menu } = category;
  const {
    id, name, path, useFl, type,
  } = data;

  return (
    <MarginlessRow onClick={() => getCategoryList(id, type)} active={id === menu ? 'true' : 'false'}>
      <PaddingCol xs="3">
        <InnerP>{name}</InnerP>
      </PaddingCol>
      <PaddingCol xs="3">
        <InnerP>{path}</InnerP>
      </PaddingCol>
      <PaddingCol xs="3">
        <InnerP>{useFl}</InnerP>
      </PaddingCol>
      <PaddingCol xs="3">
        <InnerP onClick={(event) => getMenu(id, event)}>
          <DetailIcon icon={faInfoCircle} />
        </InnerP>
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
    type: Proptypes.string,
  }).isRequired,
};

const InnerP = styled.p`
  margin: revert;
`;

const MarginlessRow = styled(Row)`
  margin: 0 !important;
  cursor: pointer;
  background-color: ${(props) => (props.active === 'true' ? '#ffd7d4' : 'white')};
  
  &:hover {
    background-color: #ffd7d4;
  }
  
  & > .col-3 {
    border-bottom: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
  }
  
  & > .col-3:last-child {
    border-right: 1px solid #dee2e6;
  }
`;

const PaddingCol = styled(Col)`
  vertical-align: middle;
`;

const DetailIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #dc3545;
  vertical-align: middle;
  
  &:hover {
    color: red;
  }
`;

export default memo(observer(MenuRow));
