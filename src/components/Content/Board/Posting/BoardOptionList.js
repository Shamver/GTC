import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const BoardOptionList = () => {
  const { BoardStore } = useStores();
  const { boardList, setBoardList } = BoardStore;

  useEffect(() => {
    setBoardList();
  }, [setBoardList]);

  return boardList.map((data) => (
    <option
      value={data.id}
      key={data.id}
    >
      {data.name}
    </option>
  ));
};

export default memo(observer(BoardOptionList));
