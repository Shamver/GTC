import React, { memo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import Board from './MenuRow';

const MenuList = () => {
  const { SystemMenuStore, UserStore } = useStores();
  const { userData } = UserStore;
  const { getMenuList, menuList } = SystemMenuStore;

  useLayoutEffect(() => {
    getMenuList(userData);
  }, [getMenuList, userData]);

  return menuList.map((data) => <Board data={data} key={data.menu} />);
};

export default memo(observer(MenuList));
