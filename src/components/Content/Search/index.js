import React, { useLayoutEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';

import qs from 'query-string';
import useStores from '../../../stores/useStores';
import SearchContent from './SearchContent';

const Search = ({ parentProps, match, location }) => {
  const { UtilLoadingStore, BoardSearchStore } = useStores();
  const { loadingProcess } = UtilLoadingStore;
  const {
    foundText, search, setIsPagination, setCurrentSearchPage, judgeFilterMode,
  } = BoardSearchStore;
  const { params } = match;
  let { isPagination } = parentProps;
  let { currentPage } = params;
  isPagination = !!isPagination;
  currentPage = currentPage || '1';

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
  parentProps: Proptypes.shape({
    isPagination: Proptypes.bool,
  }).isRequired,
  match: Proptypes.shape({
    params: Proptypes.shape({
      currentPage: Proptypes.string,
    }).isRequired,
  }).isRequired,
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

export default memo(observer(Search));
