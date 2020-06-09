import React, { memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import NewAlertHeader from './NewAlertHeader';
import NewAlertContent from './NewAlertContent';

const NewAlert = () => (
  <MainContainer>
    <NewAlertHeader />
    <NewAlertContent />
  </MainContainer>
);

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

export default memo(observer(NewAlert));
