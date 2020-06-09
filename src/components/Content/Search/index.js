import React, { memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../../stores/useStores';
import SearchContent from './SearchContent';

const Search = () => {
  const { BoardSearchStore } = useStores();
  const { searchedText } = BoardSearchStore;

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
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

export default memo(observer(Search));
