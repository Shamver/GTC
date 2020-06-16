import React, { useLayoutEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';

import useStores from '../../../stores/useStores';
import SearchContent from './SearchContent';

const Search = ({ currentPage, noPagination }) => {
  const { UtilLoadingStore, BoardSearchStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const { foundText, search } = BoardSearchStore;

  useLayoutEffect(() => {
    loadingProcess([
      () => search(currentPage),
    ]);
  }, [currentPage]);

  return (
    <MainContainer>
      <H3>검색 결과 - {foundText}</H3>
      <SearchContent noPagination={noPagination} currentPage={currentPage} />
    </MainContainer>
  );
};

const H3 = styled.h3`
  margin-bottom: 16px;
`;

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

Search.propTypes = {
  currentPage: Proptypes.string,
  noPagination: Proptypes.bool,
};

Search.defaultProps = {
  currentPage: '1',
  noPagination: false,
};

export default memo(observer(Search));
