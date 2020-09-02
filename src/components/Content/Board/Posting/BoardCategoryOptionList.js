import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';

const BoardCategoryOptionList = ({ board }) => {
  const { BoardStore } = useStores();
  const { boardCategoryList, getBoardCategoryList } = BoardStore;
  const boardValue = board || '';

  useEffect(() => {
    getBoardCategoryList(boardValue.toUpperCase());
  }, [getBoardCategoryList, boardValue]);

  const categoryArr = JSON.parse(JSON.stringify(boardCategoryList));
  categoryArr.unshift({ id: '', name: '선택' });

  return categoryArr.map((data) => (
    <option
      value={data.id}
      key={data.id}
    >
      {data.name}
    </option>
  ));
};

BoardCategoryOptionList.propTypes = {
  board: Proptypes.string.isRequired,
};

export default memo(observer(BoardCategoryOptionList));
