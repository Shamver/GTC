import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import ConsultSend from './ConsultSend';
import ConsultSent from './ConsultSent';

const ConsultContent = ({
  currentTab, currentPage, noPagination,
}) => (
  <TabContent activeTab={currentTab}>
    <ConsultSend currentPage={currentPage} />
    <ConsultSent />
  </TabContent>
);

ConsultContent.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(ConsultContent));
