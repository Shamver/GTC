import React, { memo } from 'react';
import useStores from '../../../../stores/useStores';

const BoardOptionList = () => {
  const { BoardStore } = useStores();
  const { boards } = BoardStore;

  return boards.map((data) => (
    <option
      value={data.value}
      key={data.value}
    >
      {data.name}
    </option>
  ));
};

export default memo(BoardOptionList);
