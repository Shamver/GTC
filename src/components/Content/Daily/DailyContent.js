import React, { memo } from 'react';
import { observer } from 'mobx-react';
import DailyInput from './DailyInput';
import DailyList from './DailyList';

const DailyContent = () => (
  <div>
    <DailyInput />
    <hr />
    <DailyList />
  </div>
);

export default memo(observer(DailyContent));
