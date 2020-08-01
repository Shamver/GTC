import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const ConsultUser = () => {
  const {
    UtilLoadingStore,
  } = useStores();

  const { loadingProcess } = UtilLoadingStore;

  useLayoutEffect(() => {
    loadingProcess([]);
  }, []);

  return (
    <ConsultWrapper>
      gd
    </ConsultWrapper>
  );
};

ConsultUser.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      board: Proptypes.string,
      currentPage: Proptypes.string,
      currentCategory: Proptypes.string,
    }).isRequired,
  }).isRequired,
  parentProps: Proptypes.shape({
    isPagination: Proptypes.bool,
  }).isRequired,
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

const ConsultWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

export default memo(observer(ConsultUser));
