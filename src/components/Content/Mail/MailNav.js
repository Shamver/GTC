import React, { memo } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const MailNav = () => {
  const { ComponentMailStore, UserMailStore } = useStores();
  const { activeTab, onActive } = ComponentMailStore;
  const { getMailList, sentMailList } = UserMailStore;

  const getCount = getMailList.filter((v) => !v.readDate).length;
  const sentCount = sentMailList.filter((v) => !v.readDate).length;

  return (
    <Nav tabs>
      <NavItem>
        <NavLinkBtn className={activeTab === 'get' ? 'active' : ''} onClick={onActive} name="get">
          받은 쪽지 &nbsp;
          {getCount ? (
            <CountSpan>
              {getCount}
            </CountSpan>
          ) : (
            <CountSpan>
              0
            </CountSpan>
          )}
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn className={activeTab === 'sent' ? 'active' : ''} onClick={onActive} name="sent">
          보낸 쪽지 &nbsp;
          {sentCount ? (
            <CountSpan>
              {sentCount}
            </CountSpan>
          ) : (
            <CountSpan>
              0
            </CountSpan>
          )}
        </NavLinkBtn>
      </NavItem>
      <NavItem>
        <NavLinkBtn className={activeTab === 'send' ? 'active' : ''} onClick={onActive} name="send">
          쪽지 보내기
        </NavLinkBtn>
      </NavItem>
    </Nav>
  );
};

const NavLinkBtn = styled(NavLink)`
  padding: 10px 15px !important;
  border: 1px solid transparent !important;
  margin-right: 2px;
  
  &:hover {
    cursor: pointer;
    border-color: #eee #eee #ddd;
    background-color: #eee;
  }
  
  &.active {
    cursor: default;
    border: 1px solid #c9c9c9 !important;
    border-bottom-color: transparent !important;
  }
  
  @media (max-width: 740px) {
    font-size: 14px;
    padding: 7px 12px !important;
  }
`;

const CountSpan = styled.span`
  background-color: #777;
  border-radius: .25rem;
  padding: .3rem .6rem .2rem;
  font-weight: 700;
  font-size: 0.75rem;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
  line-height: 1;
  display: inline;
  color: #fff;
  
  @media (max-width: 740px) {
    font-size: 12px;
    padding: .2rem .4rem .1rem;
  }
`;

export default memo(observer(MailNav));
