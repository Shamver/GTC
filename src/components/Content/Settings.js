import React, { useState } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col,
} from 'reactstrap';
import classnames from 'classnames';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import useStores from '../../stores/useStores';

// import useStores from '../../stores/useStores';

// reactstrap에서 빼온 컴포넌트들 스타일드로 다 구분하여 만들기.

// 20191126 hover, active 구분해서 커서 나오게 수정.

const NavLinkBtn = styled(NavLink)`
  
  &:hover {
    cursor: pointer;
  }
  
  &.active {
    cursor: default;
  }
`;

const Settings = () => {
  const { SettingStore } = useStores();
  const { activeTab } = SettingStore;

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLinkBtn
            className={classnames({ active: activeTab === 'ignore' })}
            onClick={SettingStore.onActive}
            name="ignore"
          >
            차단 목록
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={classnames({ active: activeTab === 'favorite' })}
            onClick={SettingStore.onActive}
            name="favorite"
          >
            즐겨찾기 목록
          </NavLinkBtn>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="ignore">
          <Row>
            <Col sm="12">
              <h4>차단 목록 탭이야</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="favorite">
          <Row>
            <Col sm="12">
              <h4>즐겨찾기 목록 탭이야</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default observer(Settings);
