import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import SidebarContent from './SidebarContent';

const CustomSidebar = () => {
  const { UtilStore } = useStores();
  const { sidebarOpen, onSetSidebarOpen } = UtilStore;

  return (
    <>
      <Wrapper open={sidebarOpen} onClick={() => onSetSidebarOpen(false)}>
        <Content open={sidebarOpen} onClick={(event) => event.stopPropagation()}>
          <SidebarContent />
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  transition : ${(props) => (props.open ? 'background-color 0.2s' : 'background-color 0.2s, width 0s ease 0.2s, height 0s ease 0.2s;')}
  width : ${(props) => (props.open ? '100vw' : '0')}
  height : ${(props) => (props.open ? '100vh' : '0')}
  background-color : ${(props) => (props.open ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)')}
`;

const Content = styled.div`
  z-index: 1050;
  background: #DC3545;
  width : 300px;
  height : 100vh;
  transition : margin 0.25s;
  margin-left : ${(props) => (props.open ? '0px' : '-300px')}
  box-shadow : ${(props) => (props.open ? '0px 0px 10px rgba(0,0,0,.5)' : 'none')};
  color : white !important;
  font-size : 14px !important;
`;

export default observer(CustomSidebar);
