import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import MailGet from './MailGet';
import MailSent from './MailSent';
import MailSend from './MailSend';
import MailView from './MailView';

const MailTabContent = () => {
  const { ComponentMailStore } = useStores();
  const { activeTab } = ComponentMailStore;

  return (
    <TabContent activeTab={activeTab}>
      <MailGet />
      <MailSent />
      <MailSend />
      <MailView />
    </TabContent>
  );
};

export default memo(observer(MailTabContent));
