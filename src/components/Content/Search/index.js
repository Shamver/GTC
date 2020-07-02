import React, { useLayoutEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';

import qs from 'query-string';
import useStores from '../../../stores/useStores';
import SearchContent from './SearchContent';

const Search = ({ currentPage, isPagination, location }) => {
  const { UtilLoadingStore, BoardSearchStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const {
    foundText, search, setIsPagination, setCurrentSearchPage, judgeFilterMode,
  } = BoardSearchStore;

  const query = qs.parse(location.search);

  useLayoutEffect(() => {
    loadingProcess([
      () => judgeFilterMode(query),
      () => setCurrentSearchPage(currentPage),
      () => setIsPagination(isPagination),
      () => search(currentPage),
    ]);
  }, [
    loadingProcess, search, currentPage, setCurrentSearchPage,
    setIsPagination, isPagination, query, judgeFilterMode,
  ]);

  return (
    <MainContainer>
      <H3>검색 결과 - {foundText}</H3>
      <SearchContent />
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
  isPagination: Proptypes.bool,
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

Search.defaultProps = {
  currentPage: '1',
  isPagination: false,
};

export default memo(observer(Search));
