import React, { memo } from 'react';
import { TabContent } from 'reactstrap';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import ConsultSend from './ConsultSend';

const ConsultContent = ({
  currentTab, currentPage, noPagination,
}) => (
  <TabContent activeTab={currentTab}>
    <ConsultSend />
  </TabContent>
);

ConsultContent.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(ConsultContent));
