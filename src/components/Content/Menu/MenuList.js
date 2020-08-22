import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import MenuRow from './MenuRow';

const MenuList = () => {
  const { SystemMenuStore } = useStores();
  const { menuList } = SystemMenuStore;

  return menuList.length ? menuList.map(
    (data) => <MenuRow data={data} key={data.id} />,
  ) : (<tr><CenterTd colSpan={4}>게시판이 존재하지 않습니다.</CenterTd></tr>);
};

const CenterTd = styled.td`
  text-align: center;
`;

export default memo(observer(MenuList));
