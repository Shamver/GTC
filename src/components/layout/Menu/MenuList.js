import React, { memo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import Menu from './MenuRow';

const MenuList = () => {
  const { SystemMenuStore, UserStore } = useStores();
  const { userData } = UserStore;
  const { getUsingMenuList, menuList } = SystemMenuStore;

  useLayoutEffect(() => {
    getUsingMenuList();
  }, [getUsingMenuList, userData]);

  return menuList.map((data) => <Menu data={data} key={data.id} />);
};

export default memo(observer(MenuList));
