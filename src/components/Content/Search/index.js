import React, { useEffect } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';
import SearchContent from './SearchContent';

const Search = () => {
  const {
    BoardSearchStore, UtilLoadingStore,
  } = useStores();
  const {
    searchedText,
  } = BoardSearchStore;
  const { doLoading } = UtilLoadingStore;

  doLoading();

  useEffect(() => {
  }, []);

  return (
    <MainContainer>
      <H3>검색 결과 - {searchedText}</H3>
      <SearchContent />
    </MainContainer>
  );
};

const H3 = styled.h3`
  margin-bottom: 16px;
`;

const MainContainer = styled(Container)`
  background-color: white;
  padding: 1rem !important;
`;

export default observer(Search);
