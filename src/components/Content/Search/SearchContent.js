import React, { memo } from 'react';
import { Row } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';

import SearchContentItem from './SearchContentItem';
import useStores from '../../../stores/useStores';
import SearchPagination from './SearchPagination';

const SearchContent = ({ currentPage, noPagination }) => {
  const { BoardSearchStore } = useStores();

  const { foundCount, foundList } = BoardSearchStore;

  const Item = foundList.map((v) => <SearchContentItem data={v} key={v.id} />);

  return (
    <>
      <H5>게시글 (총 {foundCount}건)</H5>
      <Hr />
      <ItemRow>{Item}</ItemRow>
      {foundList.length > 0 ? (<SearchPagination currentPage={currentPage} noPagination={noPagination} />) : ''}
    </>
  );
};

const ItemRow = styled(Row)`
  margin-right: 0 !important;
  margin-left: 0 !important;
`;

const H5 = styled.h5`
  margin-bottom: 0px;
`;

const Hr = styled.hr`
  background-color: #DC3545;
  width: 100%;
  margin: 6px 0 0;
  height: 1px;
`;

SearchContent.propTypes = {
  currentPage: Proptypes.string,
  noPagination: Proptypes.bool,
};

SearchContent.defaultProps = {
  currentPage: '1',
  noPagination: false,
};

export default memo(observer(SearchContent));
