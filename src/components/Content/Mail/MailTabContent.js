import React from 'react';
import {
  TabContent,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

import MailGet from './MailGet';
import MailSent from './MailSent';
import MailSend from './MailSend';
import MailView from './MailView';

import Loading from '../../util/Loading';

const MailTabContent = () => {
  const { ComponentMailStore, UtilLoadingStore } = useStores();
  const { loading } = UtilLoadingStore;
  const { activeTab } = ComponentMailStore;

  return (
    <>
      <Loading loading={loading} />
      <Div loading={loading}>
        <TabContent activeTab={activeTab}>
          <MailGet />
          <MailSent />
          <MailSend />
          <MailView />
        </TabContent>
      </Div>
    </>
  );
};

const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;

export default observer(MailTabContent);
