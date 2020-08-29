import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import useStores from '../../../stores/useStores';
import Category from './MenuCategory';

const MenuCategoryList = () => {
  const { SystemMenuStore } = useStores();
  const { categoryList, currentMenuType } = SystemMenuStore;

  const categoryComponentList = categoryList.length ? categoryList.map(
    (data) => <Category data={data} key={data.id} />,
  ) : (<MarginlessRow><CenterCol>해당 게시판의 카테고리가 존재하지 않습니다.</CenterCol></MarginlessRow>);

  return (currentMenuType === 'MT99')
    ? (<MarginlessRow><CenterCol>메뉴의 종류가 게시판인 경우에만 카테고리를 추가할 수 있습니다.</CenterCol></MarginlessRow>)
    : categoryComponentList;
};

const CenterCol = styled(Col)`
  text-align: center;
  padding: .75rem;
  max-width: 99.99% !important;
`;

const MarginlessRow = styled(Row)`
  margin: 0 !important;
  
  & > .col {
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
  }
`;

export default memo(observer(MenuCategoryList));
