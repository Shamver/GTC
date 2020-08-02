import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import ConsultSend from './ConsultSend';

const ConsultContent = () => {
  const activeTab = 'send';

  return (
    <TabContent activeTab={activeTab}>
      <ConsultSend />
    </TabContent>
  );
};

export default memo(observer(ConsultContent));
