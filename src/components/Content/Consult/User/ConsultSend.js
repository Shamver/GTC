import React, { memo } from 'react';
import { TabPane } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const ConsultSend = () => {
  return (
    <TabPane tabId="send">
      <Wrapper>
        send
      </Wrapper>
    </TabPane>
  );
};

const Wrapper = styled.div`

`;

export default memo(observer(ConsultSend));
